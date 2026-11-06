import {
  RiAlarmWarningFill,
  RiCheckLine,
  RiChat3Fill,
  RiDownloadLine,
  RiFingerprintLine,
  RiKey2Fill,
  RiLockFill,
  RiShieldCheckFill,
} from "@remixicon/react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/base/buttons/button";
import { Ghost, Plane, Tile } from "./iso";
import { Reveal } from "./reveal";

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[300px] overflow-hidden border-y border-landing-frame bg-background-primary-default sm:h-[340px]">
      {children}
    </div>
  );
}

function CustodyArt() {
  return (
    <Panel>
      <div className="absolute -bottom-8 -left-10 h-[220px] w-[130%] origin-bottom-left -skew-y-[28deg] rounded-tr-[60px] bg-iso-panel" />
      <Plane size={360} style={{ top: "52%" }}>
        <Ghost x={60} y={190} size={110} />
        <Ghost x={80} y={210} size={70} />
        <Tile x={150} y={110} size={110} z={20} float>
          <RiKey2Fill className="size-12 text-accent-500" aria-hidden />
        </Tile>
        <Tile x={40} y={40} size={80} z={46} variant="light" float delay={1}>
          <RiFingerprintLine className="size-9 text-accent-400" aria-hidden />
        </Tile>
        <Tile x={250} y={250} size={84} variant="dark" z={10}>
          <RiLockFill className="size-9 text-accent-300" aria-hidden />
        </Tile>
      </Plane>
    </Panel>
  );
}

function RiskArt() {
  const ghosts = [
    [0, 0], [130, 0], [260, 0], [390, 0],
    [0, 130], [390, 130],
    [0, 260], [130, 260], [260, 260], [390, 260],
  ];
  return (
    <Panel>
      <Plane size={480} style={{ top: "52%" }}>
        {ghosts.map(([x, y]) => (
          <Ghost key={`${x}-${y}`} x={x} y={y} size={100} />
        ))}
        <Tile x={110} y={110} size={110} float>
          <RiShieldCheckFill className="size-12 text-accent-500" aria-hidden />
        </Tile>
        <Tile x={250} y={130} size={110} float delay={0.8}>
          <RiAlarmWarningFill className="size-11 text-text-error-primary" aria-hidden />
        </Tile>
        <Tile x={130} y={250} size={110} float delay={1.6}>
          <RiCheckLine className="size-12 text-accent-500" aria-hidden />
        </Tile>
        <Tile x={270} y={270} size={110} variant="blue" float delay={2.4}>
          <span className="text-title-3-semibold text-text-white">Audit</span>
        </Tile>
      </Plane>
    </Panel>
  );
}

function SupportArt() {
  return (
    <Panel>
      <div className="absolute -right-10 top-6 h-[400px] w-[60%] origin-top-right skew-y-[28deg] rounded-tl-[60px] bg-iso-panel" />
      <div className="absolute right-[12%] top-[22%] flex flex-col gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 opacity-90">
            <span className="grid size-10 place-items-center rounded-lg border-2 border-white/70">
              <RiCheckLine className="size-6 text-text-white" aria-hidden />
            </span>
            <span className="h-2 w-16 rounded-full bg-white/40" />
          </div>
        ))}
      </div>
      <Plane size={320} style={{ top: "55%", left: "38%" }}>
        <Tile x={60} y={150} w={110} h={130} radius="26px" float>
          <div className="grid size-16 place-items-center rounded-full bg-[linear-gradient(135deg,#6d9bff,#3d7bff)]">
            <span className="text-title-1-semibold text-text-white">24</span>
          </div>
        </Tile>
        <Tile x={40} y={30} w={110} h={86} radius="26px" z={40} float delay={1}>
          <RiChat3Fill className="size-10 text-accent-400" aria-hidden />
        </Tile>
      </Plane>
    </Panel>
  );
}

const ITEMS = [
  {
    title: "Self-Custody by Design",
    body: "Private keys are encrypted on your device. imToken never sees, stores or recovers them for you.",
    art: <CustodyArt />,
  },
  {
    title: "Risk Alerts That Actually Work",
    body: "Phishing detection, contract risk warnings and independently audited code guard every transaction.",
    art: <RiskArt />,
  },
  {
    title: "Support That Stays",
    body: "A 24/7 help center, multilingual community and recovery-first onboarding keep you moving.",
    art: <SupportArt />,
  },
];

export function Security() {
  return (
    <section id="security" className="scroll-mt-20 border-b border-landing-frame py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <Reveal>
          <h2 className="mx-auto max-w-[820px] text-center font-serif text-section-serif text-landing-ink text-balance">
            Bank-Grade Security,
            <br />
            100% in Your Hands
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-landing-frame">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <article>
              {item.art}
              <div className="px-6 pt-8 pb-4 sm:px-10">
                <h3 className="font-serif text-card-serif text-landing-ink">{item.title}</h3>
                <p className="mt-3 max-w-[440px] text-headline-regular text-text-secondary">{item.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-[1180px] px-4 sm:px-6">
        <div className="mt-20 flex justify-center">
          <ButtonLink href="#download" variant="glow" leadingIcon={RiDownloadLine}>
            Download imToken
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
