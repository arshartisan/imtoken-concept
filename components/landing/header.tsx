"use client";

import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import { useState } from "react";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { Button, ButtonLink } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { Logo } from "./logo";

const NAV = [
  { label: "Wallet", href: "#features" },
  { label: "imKey", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-landing-frame bg-landing-ground/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6">
        <a href="#" aria-label="imToken home" className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-md text-headline-regular text-text-secondary transition-colors duration-150 hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring font-semibold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle appearance="segmented" size="small" />
          {/* wrapper owns the breakpoint: .button-glow sets its own display */}
          <span className="hidden sm:inline-flex">
            <ButtonLink href="#download" variant="glow">
              Download App
            </ButtonLink>
          </span>
          <Button
            variant="ghost"
            iconOnly
            leadingIcon={open ? RiCloseLine : RiMenuLine}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
          />
        </div>
      </div>

      <div className={cx("grid transition-[grid-template-rows] duration-300 ease-out md:hidden", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <nav aria-label="Mobile" className="overflow-hidden">
          <div className="flex flex-col gap-1 px-4 pb-4">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-headline-medium text-text-primary hover:bg-background-secondary-hover"
              >
                {item.label}
              </a>
            ))}
            <ButtonLink href="#download" variant="glow" className="mt-2" onClick={() => setOpen(false)}>
              Download App
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
