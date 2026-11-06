import { RiArrowRightLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { HeroScene } from "./hero-scene";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section className="relative min-h-[1060px] overflow-hidden border-b border-landing-frame sm:min-h-[1280px] lg:min-h-[1400px]">
      <HeroScene />
      <div className="relative z-10 mx-auto flex max-w-[980px] flex-col items-center px-4 pt-20 text-center sm:pt-28">
        <Reveal>
          <a
            href="#features"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-landing-frame bg-background-primary-default/80 py-1 pr-3 pl-1 text-body-medium text-text-secondary backdrop-blur transition-colors duration-150 hover:text-text-primary"
          >
            <span className="rounded-full bg-accent-500 px-2 py-0.5 text-caption-1-semibold text-text-white">New</span>
            imKey Pro hardware wallet support
            <RiArrowRightLine className="size-4" aria-hidden />
          </a>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-serif text-hero-serif text-landing-ink text-balance">
            Your Digital World,
            <br />
            Under Your Control.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-[600px] text-lead-regular text-text-secondary text-pretty">
            imToken is a reliable and intuitive digital wallet trusted by millions.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="#download" variant="glow" trailingIcon={RiArrowRightLine}>
              Try imToken
            </ButtonLink>
            <ButtonLink href="#features" variant="secondary" className="h-12 rounded-[13px] px-[26px] text-headline-medium">
              Explore Features
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
