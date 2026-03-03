"use client";

import { useMemo, useState } from "react";

export default function ProjectCardImage({
  src,
  alt = "",
  className = "",
}: {
  src: string | null | undefined;
  alt?: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);

  const safeSrc = useMemo(() => {
    const s = (src ?? "").trim();
    return s.length > 0 ? s : null;
  }, [src]);

  if (!safeSrc || errored) {
    return (
      <div
        className={[
          "h-full w-full",
          "bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.14),transparent_55%),linear-gradient(to_br,rgba(15,23,42,1),rgba(0,0,0,1))]",
          className,
        ].join(" ")}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      src={safeSrc}
      alt={alt}
      className={["h-full w-full object-cover opacity-95", className].join(" ")}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}