"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { primaryNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const isAuthRoute =
    pathname.startsWith("/auth") || pathname === "/login" || pathname === "/register";
  // The learner dashboard + account pages render their own app header, so hide the public one.
  const isDashboardRoute =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/account" ||
    pathname.startsWith("/account/") ||
    pathname.startsWith("/learn/");
  const desktopNavigation = primaryNavigation.slice(0, 1);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
      router.refresh();
    });

    return () => data.subscription.unsubscribe();
  }, [router]);

  // Close the open dropdown on outside click or Escape.
  useEffect(() => {
    if (!openDropdown) return;
    const handlePointer = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [openDropdown]);

  const signOut = async () => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setEmail(null);
    router.push("/");
    router.refresh();
  };

  if (isAuthRoute || isDashboardRoute) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line bg-white">
      <div className="mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
        <div className="flex items-center gap-10">
          <Link aria-label="BoostMySkills home" className="shrink-0" href="/">
            <Image
              alt="BoostMySkills"
              height={56}
              priority
              src="/logos/boostmyskills-logo.png"
              style={{ height: "56px", width: "122px" }}
              width={122}
            />
          </Link>

          <nav aria-label="Primary navigation" className="hidden translate-y-[4px] items-center lg:flex" ref={navRef}>
            {desktopNavigation.map((item) => {
              const isOpen = openDropdown === item.label;
              const isActive = item.children
                ? item.children.some((child) => pathname.startsWith(child.href))
                : pathname.startsWith(item.href);

              if (!item.children) {
                return (
                  <Link
                    className={cn(
                      "inline-flex items-center gap-4 text-base font-semibold leading-[1.2] text-brand-dark hover:text-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green",
                      isActive && "text-brand-green"
                    )}
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div className="relative" key={item.label}>
                  <button
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    className="inline-flex items-center gap-4 text-base font-semibold leading-[1.2] text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green"
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    type="button"
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" className={cn("text-brand-dark transition-transform", isOpen && "rotate-180")} size={28} strokeWidth={3} />
                  </button>
                  {isOpen ? (
                    <div className="absolute left-0 top-10 z-50 min-w-56 rounded-lg bg-white py-3 shadow-soft" role="menu">
                      {item.children.map((child) => (
                        <Link
                          className="block px-5 py-3 font-medium text-brand-dark hover:bg-brand-pale hover:text-brand-green"
                          href={child.href}
                          key={child.href}
                          onClick={() => setOpenDropdown(null)}
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="hidden translate-y-[6px] items-center gap-6 lg:flex">
          {email ? (
            <>
              <Link className="font-semibold text-brand-dark hover:text-brand-green" href="/dashboard">Dashboard</Link>
              <button className="rounded-full border border-brand-green px-12 py-2 text-base font-bold leading-[30px] text-brand-dark transition-colors hover:bg-brand-green" onClick={signOut} type="button">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link className="inline-flex items-center justify-center rounded-full border border-brand-green px-12 py-2 text-base font-bold leading-[30px] text-brand-dark transition-colors hover:bg-brand-green" href="/auth/register">Register for free</Link>
              <Link className="inline-flex items-center justify-center rounded-full border border-brand-green bg-brand-green px-12 py-2 text-base font-bold leading-[30px] text-white transition-colors hover:bg-white hover:text-brand-green" href="/auth/sign-in">Sign in</Link>
            </>
          )}
        </div>

        <details className="group lg:hidden">
          <summary aria-label="Toggle menu" className="inline-flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-brand-line [&::-webkit-details-marker]:hidden">
            <Menu aria-hidden="true" className="group-open:hidden" size={22} />
            <X aria-hidden="true" className="hidden group-open:block" size={22} />
          </summary>
          <div className="absolute left-0 right-0 top-[89px] border-t border-brand-line bg-white px-4 py-5 shadow-soft">
            <nav aria-label="Mobile navigation" className="mx-auto flex max-w-[1440px] flex-col gap-2">
              {primaryNavigation.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <span className="block py-3 text-lg font-bold text-brand-dark">{item.label}</span>
                  ) : (
                    <Link className="block py-3 text-lg font-bold text-brand-dark" href={item.href}>{item.label}</Link>
                  )}
                  {item.children ? (
                    <div className="ml-4 border-l border-brand-line pl-4">
                      {item.children.map((child) => (
                        <Link className="block py-2 font-semibold text-brand-muted" href={child.href} key={child.href}>{child.label}</Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <div className="mt-4 grid gap-3">
                {email ? (
                  <>
                    <Link className="rounded-full bg-brand-green px-6 py-3 text-center font-bold text-white" href="/dashboard">Dashboard</Link>
                    <button className="rounded-full border border-brand-green px-6 py-3 font-bold text-brand-green" onClick={() => void signOut()} type="button">Sign out</button>
                  </>
                ) : (
                  <>
                    <Link className="rounded-full border border-brand-green px-6 py-3 text-center font-bold text-brand-dark" href="/auth/register">Register for free</Link>
                    <Link className="rounded-full bg-brand-green px-6 py-3 text-center font-bold text-white" href="/auth/sign-in">Sign in</Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
