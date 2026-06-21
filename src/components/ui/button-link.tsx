import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  const external = href.startsWith("http");
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green",
    variant === "primary" && "bg-brand-green text-white hover:bg-[#057d38]",
    variant === "secondary" && "border border-brand-green bg-white text-brand-green hover:bg-brand-pale",
    variant === "ghost" && "text-brand-dark hover:text-brand-green",
    className
  );

  if (external) {
    return (
      <a className={classes} href={href} rel="noreferrer" target="_blank">
        {children}
        <ArrowRight aria-hidden="true" size={18} />
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
      <ArrowRight aria-hidden="true" size={18} />
    </Link>
  );
}
