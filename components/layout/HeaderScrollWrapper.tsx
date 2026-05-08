"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeaderScrollWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function HeaderScrollWrapper({
  children,
  className,
}: HeaderScrollWrapperProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 20);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolled);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border px-4 py-2 backdrop-blur-md transition-all duration-300 ease-in-out md:px-6",
        scrolled
          ? "border-border/80 bg-bg/95 shadow-lg"
          : "border-border bg-bg/85 shadow-md",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-secondary/30 transition-opacity duration-300 ease-in-out",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
