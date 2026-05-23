import { ButtonLink } from "@/components/ui/Button";
import type { ComponentProps } from "react";

type CTAButtonProps = ComponentProps<typeof ButtonLink>;

/** Primary marketing CTA — thin wrapper over ButtonLink for consistent usage. */
export default function CTAButton(props: CTAButtonProps) {
  return <ButtonLink {...props} />;
}
