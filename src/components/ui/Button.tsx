// components/ui/Button.tsx
"use client";

import Link from "next/link";
import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md";

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

// ✅ allow href to be optional so we can fail-safe without runtime crash
type LinkButtonProps = Common & {
  href?: string | null;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

const base =
  "inline-flex items-center justify-center rounded-xl font-medium transition select-none " +
  "focus:outline-none focus:ring-2 focus:ring-cyan-300/40 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm sm:text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-cyan-400 text-black hover:scale-[1.02] hover:bg-cyan-300 active:scale-[0.99]",
  secondary:
    "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-300/30",
  ghost:
    "text-white/85 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10",
  destructive: "bg-red-500 text-white hover:bg-red-400 active:scale-[0.99]",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  return (
    <button {...rest} className={cx(base, sizes[size], variants[variant], className)}>
      {children}
    </button>
  );
}

export function ButtonLink(props: LinkButtonProps) {
  const {
    href,
    target,
    rel,
    onClick,
    variant = "primary",
    size = "md",
    className,
    children,
  } = props;

  const classes = cx(base, sizes[size], variants[variant], className);

  // ✅ If href is missing, render a disabled-looking span (no crash, no navigation)
  if (!href) {
    return (
      <span className={cx(classes, "opacity-60 cursor-not-allowed")} aria-disabled="true">
        {children}
      </span>
    );
  }

  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noreferrer"}
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}