"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function AuthShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSignIn = pathname.startsWith("/auth/sign-in");

  return (
    <div className="bms-auth-page">
      <section aria-label="BoostMySkills authentication" className="bms-auth-intro">
        <Link aria-label="Go to BoostMySkills home page" className="bms-auth-logo" href="/">
          <Image
            alt="BoostMySkills"
            height={56}
            priority
            src="/logos/boostmyskills-logo.png"
            width={122}
          />
        </Link>
        <h1>Start learning with BoostMySkills</h1>
        <p>100% free. No credit card needed.</p>
      </section>

      <section aria-label={isSignIn ? "Sign in" : "Register"} className="bms-auth-card">
        <div aria-label="Authentication" className="bms-auth-tabs" role="tablist">
          <span aria-hidden="true" className={cn("bms-auth-tabs-pill", isSignIn && "is-right")} />
          <Link
            aria-current={isSignIn ? undefined : "page"}
            aria-selected={!isSignIn}
            className={cn("bms-auth-tab", !isSignIn && "active")}
            href="/auth/register"
            role="tab"
          >
            Register
          </Link>
          <Link
            aria-current={isSignIn ? "page" : undefined}
            aria-selected={isSignIn}
            className={cn("bms-auth-tab", isSignIn && "active")}
            href="/auth/sign-in"
            role="tab"
          >
            Sign in
          </Link>
        </div>
        {children}
      </section>
    </div>
  );
}
