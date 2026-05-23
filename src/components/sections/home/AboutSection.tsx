import type { AboutContent } from "@/lib/types/site";

function detectSocial(url: string): "linkedin" | "github" | "instagram" | "website" {
  const u = url.toLowerCase();
  if (u.includes("linkedin.com")) return "linkedin";
  if (u.includes("github.com")) return "github";
  if (u.includes("instagram.com")) return "instagram";
  return "website";
}

function socialLabel(type: "linkedin" | "github" | "instagram" | "website") {
  switch (type) {
    case "linkedin":
      return "LinkedIn";
    case "github":
      return "GitHub";
    case "instagram":
      return "Instagram";
    default:
      return "Website";
  }
}

function Icon({ type }: { type: "linkedin" | "github" | "instagram" | "website" }) {
  switch (type) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.68H9.32V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
          />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.35-1.17-3.35-1.17-.45-1.14-1.1-1.45-1.1-1.45-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.21-.25-4.54-1.11-4.54-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.69-4.55 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4Zm-4.5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.25-2.35a.9.9 0 1 1-.9-.9.9.9 0 0 1 .9.9Z"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M10.59 13.41a1.996 1.996 0 0 0 2.82 0l2.83-2.83a2 2 0 1 0-2.83-2.83l-.88.88-1.41-1.41.88-.88a4 4 0 0 1 5.66 5.66l-2.83 2.83a4 4 0 0 1-5.66 0l-.88-.88 1.41-1.41.89.88Zm2.82-2.82a1.996 1.996 0 0 0-2.82 0L7.76 13.42a2 2 0 1 0 2.83 2.83l.88-.88 1.41 1.41-.88.88a4 4 0 1 1-5.66-5.66l2.83-2.83a4 4 0 0 1 5.66 0l.88.88-1.41 1.41-.89-.87Z"
          />
        </svg>
      );
  }
}

function SocialLinks({ links }: { links: string[] }) {
  if (!links?.length) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {links.map((url) => {
        const type = detectSocial(url);
        return (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/80 transition hover:border-cyan-300/30 hover:text-white"
          >
            <Icon type={type} />
            <span>{socialLabel(type)}</span>
          </a>
        );
      })}
    </div>
  );
}

export default function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">{content.eyebrow}</p>
          <h2 className="max-w-[18ch] text-[clamp(1.6rem,3vw,2.7rem)] font-semibold leading-[1.06] tracking-tight text-white">
            {content.title}
          </h2>
          <p className="mt-5 text-[clamp(0.98rem,1.2vw,1.05rem)] leading-relaxed text-white/70">{content.paragraph1}</p>
          <p className="mt-4 text-[clamp(0.98rem,1.2vw,1.05rem)] leading-relaxed text-white/70">{content.paragraph2}</p>
          <SocialLinks links={content.socialLinks} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {content.cards.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[1rem] font-medium leading-snug text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
