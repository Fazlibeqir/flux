import { NextResponse } from "next/server";
import { notifyNewInquiry } from "@/lib/notifications/inquiry";
import { supabaseServer } from "@/lib/supabaseServer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch (e) {
    if (e instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    console.error("inquiry parse error:", e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }

  try {
    const record = body as Record<string, unknown>;
    const name = String(record.name ?? "").trim();
    const email = String(record.email ?? "").trim();
    const serviceType =
      String(record.serviceType ?? record.service_type ?? "").trim() || null;
    const message = String(record.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }
    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const supabase = supabaseServer();
    const { error } = await supabase.from("inquiries").insert({
      name,
      email,
      service_type: serviceType,
      message,
      status: "new",
    });

    if (error) {
      console.error("inquiry insert error:", error.message);
      return NextResponse.json({ error: "Could not save your message. Please email us directly." }, { status: 500 });
    }

    try {
      await notifyNewInquiry({ name, email, serviceType, message });
    } catch (e) {
      console.error("inquiry notification error:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("inquiry handler error:", e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
