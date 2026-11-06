"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { useCountUp } from "@/hooks/use-count-up";
import { LogoMark } from "./logo";
import { Reveal } from "./reveal";

const STATS = [
  { value: 10, format: (n: number) => `${n}th`, label: "Anniversary, since 2016" },
  { value: 20, format: (n: number) => `${n}M+`, label: "Customers served" },
  { value: 150, format: (n: number) => `${n}+`, label: "Countries & regions" },
];

/* Two bundles of curves sweep in from the top corners and converge below the
   stats. Drawn once as static paths: animating SVG strokes (draw-in, travelling
   pulses) repaints the whole section-sized SVG every frame, which made
   scrolling lag. The bundle only fades in, which the compositor handles. */
const LINES = 12;
const W = 1440;
const H = 640;

function bundlePath(i: number, mirror: boolean) {
  const m = (x: number) => (mirror ? W - x : x);
  const x0 = -80 + i * 16;
  return `M ${m(x0)} -20 C ${m(x0 + 170)} ${230 + i * 6}, ${m(560 + i * 9)} ${300 + i * 4}, ${m(640 + i * 11)} ${H + 40}`;
}

const FLOW_PATHS = Array.from({ length: LINES }, (_, i) => [bundlePath(i, false), bundlePath(i, true)]).flat();

function FlowLines({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 size-full transition-opacity duration-1000 ease-out"
      style={{ opacity: active ? 1 : 0 }}
    >
      <defs>
        <linearGradient id="flow-stroke" x1="0" y1="0" x2="0" y2={H} gradientUnits="userSpaceOnUse">
          <stop offset="0" className="[stop-color:var(--color-accent-300)]" />
          <stop offset="0.55" className="[stop-color:var(--color-accent-500)]" />
          <stop offset="1" className="[stop-color:var(--color-accent-600)]" stopOpacity="0" />
        </linearGradient>
      </defs>
      {FLOW_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="url(#flow-stroke)"
          strokeWidth={1}
          opacity={0.25 + (Math.floor(i / 2) / LINES) * 0.45}
        />
      ))}
    </svg>
  );
}

function Stat({ value, format, label, active }: (typeof STATS)[number] & { active: boolean }) {
  const shown = useCountUp(active ? value : 0, 1600);
  return (
    // dt must precede dd in the markup; flex-col-reverse puts the number on top
    <div className="flex flex-col-reverse items-center gap-3">
      <dt className="text-headline-medium text-text-primary">{label}</dt>
      <dd className="text-outline text-stat-outline whitespace-nowrap tabular-nums">{format(shown)}</dd>
    </div>
  );
}

export function AboutStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      data-anim
      aria-labelledby="about-title"
      className="relative overflow-hidden border-b border-landing-frame bg-landing-ground py-24 sm:py-32"
    >
      <FlowLines active={inView} />
      <div className="relative mx-auto max-w-[1180px] px-4 text-center sm:px-6">
        <Reveal>
          <p className="font-mono text-caption-1-medium tracking-[0.3em] text-text-tertiary uppercase">Trusted since 2016</p>
          <h2 id="about-title" className="mt-6 flex items-center justify-center gap-4 font-serif text-section-serif text-landing-ink">
            <LogoMark className="size-[0.9em]" />
            <span>
              im<em className="italic">Token</em>
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-lead-regular text-text-secondary text-pretty">
            Secure, trusted non-custodial wallet services for millions of users in more than 150 countries and regions
            around the world.
          </p>
        </Reveal>
        <dl className="mt-16 grid gap-12 sm:mt-20 sm:grid-cols-3 sm:gap-6">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} active={inView} />
          ))}
        </dl>
      </div>
    </section>
  );
}
