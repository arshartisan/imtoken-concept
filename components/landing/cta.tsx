import { RiAppleFill, RiGooglePlayFill } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { Reveal } from "./reveal";
import { TokenIcon, type TokenSymbol } from "./token-icon";

const ORBIT: TokenSymbol[] = ["ETH", "BTC", "USDT", "TRX", "DOT", "ATOM", "SOL", "BNB"];

function Orbit() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[60%]">
      <div className="absolute left-[55%] top-1/2 aspect-square w-[760px] -translate-x-1/2 -translate-y-1/2 md:left-[65%]">
        {[100, 78, 58, 40].map((p, i) => (
          <div
            key={p}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-iso-line/50"
            style={{
              width: `${p}%`,
              height: `${p}%`,
              background: i % 2 === 0 ? "radial-gradient(circle, transparent 55%, var(--iso-glow))" : undefined,
            }}
          />
        ))}
        <div className="orbit-spin absolute inset-[11%]">
          {ORBIT.map((sym, i) => {
            const angle = (i / ORBIT.length) * 360;
            return (
              <div
                key={sym}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `rotate(${angle}deg) translateY(-298px) rotate(${-angle}deg)` }}
              >
                <div className="orbit-counter -ml-[52px] -mt-[52px] grid size-[104px] place-items-center rounded-full border border-iso-line bg-[radial-gradient(circle_at_35%_30%,var(--iso-face)_45%,var(--iso-face-tint))] shadow-[-4px_6px_0_var(--iso-edge),-18px_24px_40px_var(--iso-glow)]">
                  <TokenIcon symbol={sym} className="size-12" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Cta() {
  return (
    <section id="download" className="scroll-mt-20 py-16 sm:py-20">
      <div className="relative overflow-hidden border-y border-landing-frame bg-background-primary-default">
        <Orbit />
        <div className="absolute inset-0 bg-gradient-to-r from-background-primary-default via-background-primary-default/85 to-transparent md:via-background-primary-default/60" />
        <div className="relative mx-auto flex min-h-[560px] max-w-[1180px] items-center px-4 sm:px-6">
          <Reveal className="max-w-[560px]">
            <h2 className="font-serif text-hero-serif text-landing-ink text-balance">Ready to Own Your Crypto?</h2>
            <p className="mt-6 max-w-[440px] text-lead-regular text-text-secondary">
              Set up a wallet in under a minute. Free on iOS and Android.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="#" variant="glow" leadingIcon={RiAppleFill}>
                App Store
              </ButtonLink>
              <ButtonLink href="#" variant="secondary" leadingIcon={RiGooglePlayFill} className="h-12 rounded-[13px] px-[26px] text-headline-medium">
                Google Play
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
