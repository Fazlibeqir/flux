import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={[
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className,
      ].join(" ")}
    >
      <div className={centered ? "max-w-2xl" : "max-w-3xl"}>
        {eyebrow && (
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
        )}
        <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
        {description && (
          <p className="mt-3 text-base text-white/65 sm:text-lg">{description}</p>
        )}
      </div>
      {action && <div className={centered ? "" : "shrink-0"}>{action}</div>}
    </div>
  );
}
