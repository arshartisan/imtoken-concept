import { cx } from "@/utils/cx";
import { FooterScene } from "./footer-scene";
import { LogoMark } from "./logo";
import { NewsletterForm } from "./newsletter-form";

const MENU = [
  { label: "Wallet", href: "#features" },
  { label: "imKey Pro", href: "#security" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
  { label: "Download", href: "#download" },
];

const SOCIALS = ["X (Twitter)", "GitHub", "Discord", "Telegram", "Medium"];

const LEGAL = ["Whitepaper (PDF)", "Cookies Policy", "Privacy Policy"];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-5">
      <h3 className="text-body-2-regular text-text-tertiary">{title}</h3>
      {children}
    </div>
  );
}

const linkClass =
  "rounded-sm text-headline-regular text-text-primary outline-none transition-colors duration-150 hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-border-focus-ring";

export function Footer() {
  return (
    <footer className="border-t border-landing-frame pt-12">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1fr_1fr_2fr]">
        <Column title="Menu">
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2.5">
              {MENU.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Column>
        <Column title="Socials">
          <ul className="flex flex-col gap-2.5">
            {SOCIALS.map((l) => (
              <li key={l}>
                <a href="#" className={linkClass}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </Column>
        <Column title="Newsletter">
          <p className="text-headline-regular text-text-primary">
            Subscribe for new network launches, product updates and security insights
          </p>
          <NewsletterForm />
        </Column>
      </div>

      <FooterScene />

      <div className="mx-auto grid max-w-[1280px] grid-cols-2 items-center gap-4 px-4 pt-4 pb-8 text-body-2-regular text-text-primary sm:grid-cols-4 sm:px-6">
        <span className="flex items-center gap-2">
          <LogoMark className="size-4" />
          ©{new Date().getFullYear()} imToken
        </span>
        {LEGAL.map((l, i) => (
          <a
            key={l}
            href="#"
            className={cx(
              "transition-colors duration-150 hover:text-accent-600",
              i === LEGAL.length - 1 ? "sm:justify-self-end" : "sm:justify-self-center",
            )}
          >
            {l}
          </a>
        ))}
      </div>
      <p className="border-t border-landing-frame py-4 text-center text-caption-1-regular text-text-tertiary">
        Concept redesign — not affiliated with imToken.
      </p>
    </footer>
  );
}
