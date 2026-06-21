"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

export type CustomSelectOption = { label: string; value: string };

type CustomSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  error?: string;
};

export function CustomSelect({ label, value, onChange, options, placeholder = "Select an option", error }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const labelId = useId();
  const listId = useId();

  const selected = options.find((option) => option.value === value && option.value !== "");
  const selectedIndex = options.findIndex((option) => option.value === value);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const node = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    node?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const openMenu = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const choose = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
  };

  const handleTriggerKey = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) {
        openMenu();
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        choose(activeIndex);
        return;
      }
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((prev) => Math.min(options.length - 1, Math.max(0, prev + delta)));
    }
  };

  return (
    <div className="bms-auth-select" ref={rootRef}>
      <span className="bms-auth-label" id={labelId}>{label}</span>
      <button
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        className="bms-auth-select-trigger"
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleTriggerKey}
        type="button"
      >
        <span className={cn(!selected && "bms-auth-select-placeholder")}>{selected ? selected.label : placeholder}</span>
        <ChevronDown aria-hidden="true" className={cn("bms-auth-select-chevron", open && "rotate-180")} size={20} />
      </button>
      {open ? (
        <ul aria-labelledby={labelId} className="bms-auth-select-menu" id={listId} ref={listRef} role="listbox" tabIndex={-1}>
          {options.map((option, index) => (
            <li
              aria-selected={option.value === value}
              className={cn(
                "bms-auth-select-option",
                index === activeIndex && "is-active",
                option.value === value && "is-selected"
              )}
              key={option.value || option.label}
              onClick={() => choose(index)}
              onMouseEnter={() => setActiveIndex(index)}
              role="option"
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <span className="bms-auth-error">{error}</span> : null}
    </div>
  );
}
