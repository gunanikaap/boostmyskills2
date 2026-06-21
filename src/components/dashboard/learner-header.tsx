"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils/cn";

type MenuKey = "courses" | "catalogue" | "user";

const MY_COURSES = [
  { label: "My Micro-programmes", href: "/dashboard?view=micro-programmes" },
  { label: "My Micro-credentials", href: "/dashboard" }
];
const CATALOGUE = [
  { label: "Micro-programmes", href: "/programs" },
  { label: "Micro-credentials", href: "/courses" }
];

function NavDropdown({
  label,
  items,
  open,
  onToggle,
  onClose
}: {
  label: string;
  items: { label: string; href: string }[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="bms-lh-item">
      <button aria-expanded={open} aria-haspopup="menu" className={cn("bms-lh-trigger", open && "bms-lh-trigger-open")} onClick={onToggle} type="button">
        {label}
        <ChevronDown aria-hidden="true" className={cn("bms-lh-chev", open && "bms-lh-chev-open")} size={18} strokeWidth={2.5} />
      </button>
      {open ? (
        <div className="bms-lh-menu" role="menu">
          {items.map((item) => (
            <Link className="bms-lh-menu-link" href={item.href} key={item.href} onClick={onClose} role="menuitem">
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function LearnerHeader({ username }: { username: string }) {
  const router = useRouter();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpen(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const signOut = async () => {
    const supabase = createSupabaseBrowserClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const toggle = (menu: MenuKey) => setOpen(open === menu ? null : menu);
  const close = () => setOpen(null);

  return (
    <header className="bms-lh">
      <nav aria-label="Learner navigation" className="bms-lh-inner" ref={navRef}>
        <div className="bms-lh-left">
          <Link aria-label="BoostMySkills home" className="bms-lh-logo" href="/">
            <Image alt="BoostMySkills" height={48} priority src="/logos/boostmyskills-logo.png" style={{ height: "48px", width: "104px" }} width={104} />
          </Link>
          <NavDropdown items={MY_COURSES} label="My courses" onClose={close} onToggle={() => toggle("courses")} open={open === "courses"} />
          <NavDropdown items={CATALOGUE} label="Catalogue" onClose={close} onToggle={() => toggle("catalogue")} open={open === "catalogue"} />
        </div>

        <div className="bms-lh-item bms-lh-user">
          <button aria-expanded={open === "user"} aria-haspopup="menu" className="bms-lh-user-btn" onClick={() => setOpen(open === "user" ? null : "user")} type="button">
            <User aria-hidden="true" fill="currentColor" size={20} strokeWidth={1.5} />
            <span>{username}</span>
            <ChevronDown aria-hidden="true" className={cn("bms-lh-chev", open === "user" && "bms-lh-chev-open")} size={16} strokeWidth={2.5} />
          </button>
          {open === "user" ? (
            <div className="bms-lh-menu bms-lh-menu-right bms-lh-usermenu" role="menu">
              <Link className="bms-lh-menu-link" href="/account" onClick={() => setOpen(null)} role="menuitem">Account</Link>
              <button className="bms-lh-menu-link" onClick={() => void signOut()} role="menuitem" type="button">Sign Out</button>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
