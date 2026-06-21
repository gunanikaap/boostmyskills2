"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerColumns } from "@/data/navigation";
import { siteConfig } from "@/data/site";

function FooterLink({ href, label }: { href: string; label: string }) {
  const className = "text-[1.2rem] font-semibold leading-[1.55rem] text-brand-dark hover:text-brand-green";
  if (href.startsWith("http")) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {label}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}

export function Footer() {
  const pathname = usePathname();
  const isAuthRoute =
    pathname.startsWith("/auth") || pathname === "/login" || pathname === "/register";
  const isAccountRoute = pathname === "/account" || pathname.startsWith("/account/");
  const isLearnRoute = pathname.startsWith("/learn/");

  if (isAuthRoute || isAccountRoute || isLearnRoute) return null;

  return (
    <footer className="bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 py-6 pl-6 pr-14 md:flex-row md:items-start md:justify-between md:gap-8 lg:pl-8">
        <Link aria-label="BoostMySkills home" href="/">
          <Image
            alt="BoostMySkills"
            height={56}
            priority
            src="/logos/boostmyskills-logo.png"
            style={{ height: "auto", width: "122px" }}
            width={122}
          />
        </Link>

        {footerColumns.map((column) => (
          <ul className="space-y-2.5" key={column.links[0].href}>
            {column.heading ? (
              <li className="text-2xl font-bold leading-[1.55rem] text-brand-dark">{column.heading}</li>
            ) : null}
            {column.links.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href} label={link.label} />
              </li>
            ))}
            {column.social ? (
              <li className="pt-2">
                <a
                  aria-label="BoostMySkills on LinkedIn"
                  className="inline-flex"
                  href={siteConfig.social.linkedin}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Image
                    alt="LinkedIn"
                    height={22}
                    src="/icons/linkedin.png"
                    style={{ height: "auto", width: "22px" }}
                    width={22}
                  />
                </a>
              </li>
            ) : null}
          </ul>
        ))}
      </div>
    </footer>
  );
}
