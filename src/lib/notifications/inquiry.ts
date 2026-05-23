import "server-only";
import nodemailer from "nodemailer";
import { supabaseServer } from "@/lib/supabaseServer";

export type InquiryNotification = {
  name: string;
  email: string;
  serviceType: string | null;
  message: string;
};

type NotifyResult = { email: boolean; webhook: boolean };

const FETCH_TIMEOUT_MS = 15_000;

function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  return fetch(url, { ...init, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
}

function adminMessagesUrl(): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
  return `${base}/admin/messages`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailContent(inquiry: InquiryNotification, to: string) {
  const subject = `New Flux inquiry — ${inquiry.name}${inquiry.serviceType ? ` (${inquiry.serviceType})` : ""}`;
  const lines = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    inquiry.serviceType ? `Service: ${inquiry.serviceType}` : null,
    "",
    inquiry.message,
    "",
    `Open in admin: ${adminMessagesUrl()}`,
  ].filter((line): line is string => line !== null);

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">New contact form message</h2>
      <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
      <p style="margin:0 0 8px"><strong>Email:</strong>
        <a href="mailto:${escapeHtml(inquiry.email)}">${escapeHtml(inquiry.email)}</a>
      </p>
      ${
        inquiry.serviceType
          ? `<p style="margin:0 0 8px"><strong>Service:</strong> ${escapeHtml(inquiry.serviceType)}</p>`
          : ""
      }
      <p style="margin:16px 0 8px"><strong>Message</strong></p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>
      <p style="margin:24px 0 0">
        <a href="${adminMessagesUrl()}" style="color:#0891b2">View in Flux Admin →</a>
      </p>
    </div>
  `.trim();

  return { subject, text: lines.join("\n"), html, to };
}

async function resolveNotifyEmail(): Promise<string | null> {
  const fromEnv = process.env.NOTIFY_EMAIL?.trim();
  if (fromEnv) return fromEnv;

  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("key", "settings")
      .maybeSingle();
    if (error) throw error;
    const settings = data?.content as { contactEmail?: string } | null;
    const fromCms = settings?.contactEmail?.trim();
    if (fromCms) return fromCms;
  } catch {
    /* use env only */
  }

  return null;
}

function emailFromAddress(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "Flux Contact <onboarding@resend.dev>"
  );
}

async function sendViaResend(inquiry: InquiryNotification, to: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return;

  const { subject, html, text } = buildEmailContent(inquiry, to);
  const res = await fetchWithTimeout("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: emailFromAddress(),
      to: [to],
      reply_to: inquiry.email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend failed (${res.status}): ${body}`);
  }
}

async function sendViaSmtp(inquiry: InquiryNotification, to: string): Promise<void> {
  const host = process.env.SMTP_HOST?.trim();
  if (!host) return;

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    connectionTimeout: FETCH_TIMEOUT_MS,
    greetingTimeout: FETCH_TIMEOUT_MS,
    socketTimeout: FETCH_TIMEOUT_MS,
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });

  const { subject, html, text } = buildEmailContent(inquiry, to);
  await transporter.sendMail({
    from: emailFromAddress(),
    to,
    replyTo: inquiry.email,
    subject,
    html,
    text,
  });
}

type WebhookProvider = "discord" | "slack" | "generic";

function detectWebhookProvider(url: string): WebhookProvider {
  const override = process.env.NOTIFY_WEBHOOK_TYPE?.trim().toLowerCase();
  if (override === "discord" || override === "slack" || override === "generic") {
    return override;
  }
  if (/discord(app)?\.com\/api\/webhooks/i.test(url)) return "discord";
  if (/hooks\.slack\.com\//i.test(url)) return "slack";
  return "generic";
}

function escapeDiscord(text: string): string {
  return text.replace(/[@<>]/g, (char) => `\\${char}`);
}

function escapeSlackPlain(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inquirySummaryLine(inquiry: InquiryNotification): string {
  const service = inquiry.serviceType ? ` — ${inquiry.serviceType}` : "";
  return `New inquiry from ${inquiry.name} (${inquiry.email})${service}`;
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

function buildWebhookBody(provider: WebhookProvider, inquiry: InquiryNotification): unknown {
  const adminUrl = adminMessagesUrl();
  const plainSummary = inquirySummaryLine(inquiry);
  const safeName = escapeDiscord(inquiry.name);
  const safeEmail = escapeDiscord(inquiry.email);
  const safeService = inquiry.serviceType ? escapeDiscord(inquiry.serviceType) : null;
  const safeMessage = escapeDiscord(inquiry.message);

  if (provider === "discord") {
    const fields = [
      { name: "Name", value: truncate(safeName, 256), inline: true },
      { name: "Email", value: truncate(safeEmail, 256), inline: true },
    ];
    if (safeService) {
      fields.push({ name: "Service", value: truncate(safeService, 256), inline: false });
    }
    fields.push({ name: "Message", value: truncate(safeMessage, 1024), inline: false });

    return {
      content: escapeDiscord(plainSummary),
      embeds: [
        {
          title: "Flux contact form",
          color: 0x22d3ee,
          fields,
          footer: { text: "Reply via email or open Admin → Messages" },
          url: adminUrl,
        },
      ],
    };
  }

  if (provider === "slack") {
    const blocks: Record<string, unknown>[] = [
      {
        type: "header",
        text: { type: "plain_text", text: "New Flux inquiry", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name*\n${escapeSlackPlain(inquiry.name)}` },
          { type: "mrkdwn", text: `*Email*\n${escapeSlackPlain(inquiry.email)}` },
        ],
      },
    ];
    if (inquiry.serviceType) {
      blocks.push({
        type: "section",
        text: { type: "mrkdwn", text: `*Service:* ${escapeSlackPlain(inquiry.serviceType)}` },
      });
    }
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*Message*\n${escapeSlackPlain(truncate(inquiry.message, 1000))}` },
    });
    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "Open in admin" },
          url: adminUrl,
        },
      ],
    });

    return { text: plainSummary, blocks };
  }

  return {
    type: "flux.inquiry.created",
    name: inquiry.name,
    email: inquiry.email,
    service_type: inquiry.serviceType,
    message: inquiry.message,
    admin_url: adminUrl,
    text: `${plainSummary}\n\n${inquiry.message}`,
  };
}

async function sendWebhook(inquiry: InquiryNotification): Promise<void> {
  const url = process.env.NOTIFY_WEBHOOK_URL?.trim();
  if (!url) return;

  const provider = detectWebhookProvider(url);
  const body = buildWebhookBody(provider, inquiry);

  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = truncate(await res.text().catch(() => ""), 200);
    throw new Error(
      `Webhook failed (${res.status}${detail ? `: ${detail}` : ""}). Provider: ${provider}.`,
    );
  }
}

/**
 * Notify owner of a new inquiry. Never throws — logs failures so the form still succeeds.
 * Email: Resend (if RESEND_API_KEY) or SMTP (if SMTP_HOST). Webhook optional.
 */
export async function notifyNewInquiry(inquiry: InquiryNotification): Promise<NotifyResult> {
  const result: NotifyResult = { email: false, webhook: false };
  const to = await resolveNotifyEmail();

  const tasks: Promise<void>[] = [];

  if (to) {
    if (process.env.RESEND_API_KEY?.trim()) {
      tasks.push(
        sendViaResend(inquiry, to)
          .then(() => {
            result.email = true;
          })
          .catch((e) => console.error("Inquiry email (Resend):", e)),
      );
    } else if (process.env.SMTP_HOST?.trim()) {
      tasks.push(
        sendViaSmtp(inquiry, to)
          .then(() => {
            result.email = true;
          })
          .catch((e) => console.error("Inquiry email (SMTP):", e)),
      );
    } else {
      console.warn(
        "Inquiry saved but no email sent: set RESEND_API_KEY or SMTP_* in env, and NOTIFY_EMAIL or contact email in Settings.",
      );
    }
  } else {
    console.warn("Inquiry saved but NOTIFY_EMAIL / Settings contact email is not set.");
  }

  if (process.env.NOTIFY_WEBHOOK_URL?.trim()) {
    tasks.push(
      sendWebhook(inquiry)
        .then(() => {
          result.webhook = true;
        })
        .catch((e) => console.error("Inquiry webhook:", e)),
    );
  }

  await Promise.all(tasks);
  return result;
}
