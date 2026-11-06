import { RiArrowLeftRightLine, RiShieldCheckFill, RiUser3Fill } from "@remixicon/react";
import type { ReactNode } from "react";
import { cx } from "@/utils/cx";
import { Ghost, Path, Plane, Tile } from "./iso";
import { Reveal } from "./reveal";
import { TokenIcon } from "./token-icon";

function Scene({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("relative h-[300px] overflow-hidden", className)}>{children}</div>;
}

/* 1 — Multi-chain: a grid of assets with the active one lifted */
function MultiChainArt() {
  const grid = [
    ["BTC", "ETH", "TRX"],
    ["DOT", "USDT", "ATOM"],
    ["SOL", "BNB", "ARB"],
  ] as const;
  return (
    <Scene>
      <Plane size={360} style={{ top: "56%" }}>
        {grid.flatMap((row, r) =>
          row.map((sym, c) => {
            const lifted = r === 1 && c === 1;
            return (
              <Tile key={sym} x={30 + c * 110} y={30 + r * 110} size={86} z={lifted ? 30 : 0} float={lifted} variant={lifted ? "light" : "light"}>
                <TokenIcon symbol={sym} className={lifted ? "size-11" : "size-9 opacity-90"} />
              </Tile>
            );
          }),
        )}
      </Plane>
    </Scene>
  );
}

/* 2 — Swap: two assets bridged through a swap node */
function SwapArt() {
  return (
    <Scene>
      <Plane size={360} style={{ top: "54%" }}>
        <Path size={360} d="M120 110 C 200 110, 230 180, 250 250" />
        <Path size={360} d="M120 130 C 120 220, 170 270, 230 280" />
        <Tile x={40} y={40} w={150} h={120} float>
          <TokenIcon symbol="ETH" className="size-14" />
        </Tile>
        <Tile x={210} y={220} w={120} h={100} float delay={1.2}>
          <TokenIcon symbol="USDT" className="size-12" />
        </Tile>
        <Tile x={40} y={230} size={70} variant="blue" z={10}>
          <RiArrowLeftRightLine className="size-8 text-text-white" aria-hidden />
        </Tile>
        {/* rate pill */}
        <div className="absolute left-[200px] top-[70px] rounded-full bg-iso-dark px-3 py-1 text-caption-1-semibold text-text-white" style={{ transform: "translateZ(40px)" }}>
          Best rate
        </div>
      </Plane>
    </Scene>
  );
}

/* 3 — Staking: rising stacks of plates, the last one in brand blue */
function StakingArt() {
  const bars = [2, 4, 6, 9];
  return (
    <Scene>
      <Plane size={360} style={{ top: "68%" }}>
        <Ghost x={20} y={20} size={320} />
        {bars.map((n, i) => (
          <div key={i} className="absolute" style={{ left: 50 + i * 72, top: 230 - i * 50 }}>
            {Array.from({ length: n }).map((_, k) => (
              <div
                key={k}
                className={cx(
                  "iso-tile absolute",
                  i === bars.length - 1 && k === n - 1 && "iso-tile--blue",
                )}
                style={{ width: 58, height: 58, transform: `translateZ(${k * 9}px)`, boxShadow: "-2px 2px 0 var(--iso-edge-deep), -4px 4px 0 var(--iso-line)" }}
              />
            ))}
          </div>
        ))}
        <div className="absolute rounded-full bg-iso-panel px-3 py-1 text-caption-1-semibold text-text-white" style={{ left: 230, top: 110, transform: "translateZ(96px)" }}>
          APY 5.2%
        </div>
      </Plane>
    </Scene>
  );
}

/* 4 — DApp browser: a field of app tiles with users connecting */
function DappArt() {
  const cells: { x: number; y: number; v?: "dark" | "blue"; icon?: ReactNode; pin?: string }[] = [
    { x: 40, y: 40, pin: "text-accent-300" },
    { x: 200, y: 40 },
    { x: 360, y: 40, icon: <TokenIcon symbol="ARB" className="size-9" /> },
    { x: 40, y: 200, icon: <TokenIcon symbol="BNB" className="size-9" /> },
    { x: 200, y: 200, pin: "text-accent-500" },
    { x: 360, y: 200, v: "dark", pin: "text-landing-ink" },
    { x: 200, y: 360, v: "blue" },
    { x: 360, y: 360, icon: <TokenIcon symbol="ETH" className="size-9" /> },
    { x: 520, y: 200 },
    { x: 520, y: 360 },
  ];
  return (
    <Scene className="h-[340px]">
      <Plane size={640} style={{ top: "58%" }}>
        <Path size={640} d="M-80 120 L 720 120" faint />
        <Path size={640} d="M-80 280 L 720 280" faint />
        <Path size={640} d="M120 -80 L 120 720" faint />
        <Path size={640} d="M280 -80 L 280 720" faint />
        {cells.map((c, i) => (
          <Tile key={i} x={c.x} y={c.y} size={110} variant={c.v ?? "light"} radius="22px">
            {c.icon}
            {c.pin ? (
              <div className="absolute inset-0 grid place-items-center" style={{ transform: "translateZ(70px) rotateZ(45deg) rotateX(-58deg)" }}>
                <div className="flex flex-col items-center">
                  <RiUser3Fill className={cx("size-8", c.pin)} aria-hidden />
                  <span className="h-14 border-l border-dashed border-iso-line" />
                </div>
              </div>
            ) : null}
          </Tile>
        ))}
      </Plane>
    </Scene>
  );
}

/* 5 — imKey: hardware signer paired with the phone */
function ImKeyArt() {
  return (
    <Scene className="h-[340px]">
      <Plane size={560} style={{ top: "56%" }}>
        <Path size={560} d="M200 300 C 260 300, 300 240, 330 200" />
        {/* phone */}
        <Tile x={330} y={40} w={150} h={250} radius="28px" float>
          <div className="absolute inset-3 rounded-[20px] border border-iso-edge bg-iso-face-tint p-3">
            <div className="h-2 w-10 rounded-full bg-iso-edge" />
            <div className="mt-4 flex flex-col gap-2">
              {(["BTC", "ETH", "TRX"] as const).map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <TokenIcon symbol={s} className="size-5" />
                  <span className="h-1.5 flex-1 rounded-full bg-iso-edge" />
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-full bg-iso-panel py-1.5 text-center text-caption-2-semibold text-text-white">Confirm</div>
          </div>
        </Tile>
        {/* hardware key */}
        <Tile x={40} y={250} w={250} h={110} variant="dark" radius="30px" z={6}>
          <div className="absolute left-5 top-1/2 h-14 w-28 -translate-y-1/2 rounded-xl border border-white/15 bg-white/10 p-2">
            <RiShieldCheckFill className="size-5 text-accent-300" aria-hidden />
            <div className="mt-1.5 h-1 w-14 rounded-full bg-white/30" />
          </div>
          <div className="absolute right-6 top-1/2 size-12 -translate-y-1/2 rounded-full border-2 border-white/20 bg-[radial-gradient(circle,#5f92ff,#2f63d6)]" />
        </Tile>
        <Ghost x={40} y={60} w={200} h={130} />
        <div className="absolute rounded-full bg-iso-face px-3 py-1 text-caption-1-semibold text-text-primary shadow-sm" style={{ left: 60, top: 200, transform: "translateZ(30px)" }}>
          Offline signing
        </div>
      </Plane>
    </Scene>
  );
}

const CARDS = [
  {
    title: "Multi-Chain Assets",
    body: "Manage BTC, ETH, TRX and 40+ networks from a single self-custody wallet.",
    art: <MultiChainArt />,
    span: "lg:col-span-2",
  },
  {
    title: "Token Swap",
    body: "Swap tokens at competitive rates without ever leaving your wallet.",
    art: <SwapArt />,
    span: "lg:col-span-2",
  },
  {
    title: "Staking & Earn",
    body: "Put idle assets to work on Ethereum, Cosmos, Polkadot and more.",
    art: <StakingArt />,
    span: "lg:col-span-2",
  },
  {
    title: "Built-in DApp Browser",
    body: "Connect to DeFi, NFTs and games through a risk-aware browser that flags suspicious contracts.",
    art: <DappArt />,
    span: "lg:col-span-3",
  },
  {
    title: "imKey Hardware Wallet",
    body: "Pair with imKey Pro for offline signing — your keys never touch the internet.",
    art: <ImKeyArt />,
    span: "lg:col-span-3",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-b border-landing-frame py-24 sm:py-32">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <Reveal>
          <h2 className="mx-auto max-w-[760px] text-center font-serif text-section-serif text-landing-ink text-balance">
            Everything Your Crypto Needs, in One Wallet
          </h2>
        </Reveal>
      </div>

      {/* full-bleed grid: the page frame supplies the outer edges; the 1px
          negative end margin tucks each row's last divider under that frame */}
      <div className="mt-16 overflow-hidden border-t border-landing-frame">
        <div className="-me-px grid grid-cols-1 bg-background-primary-default md:grid-cols-2 lg:grid-cols-6">
          {CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 0.05}
              className={cx(
                "flex flex-col border-landing-frame",
                "border-b md:border-e",
                card.span,
                i === CARDS.length - 1 && "md:col-span-2 lg:col-span-3",
              )}
            >
              <article className="flex h-full flex-col">
                <div className="px-6 pt-8 sm:px-8">
                  <h3 className="font-serif text-card-serif text-landing-ink">{card.title}</h3>
                  <p className="mt-3 max-w-[420px] text-headline-regular text-text-secondary">{card.body}</p>
                </div>
                <div className="mt-auto">{card.art}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
