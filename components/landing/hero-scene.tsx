"use client";

import {
  RiAddCircleLine,
  RiArrowDownLine,
  RiArrowLeftRightLine,
  RiArrowUpLine,
  RiBankCardLine,
  RiCheckboxCircleFill,
  RiMore2Fill,
  RiSearchLine,
  RiStackLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { useCountUp } from "@/hooks/use-count-up";
import { cx } from "@/utils/cx";
import { depth, Extrude, Ghost, Path, Plane } from "./iso";
import { LogoMark } from "./logo";
import { TokenIcon, type TokenSymbol } from "./token-icon";

const S = 1000;

/* Phone footprint on the plane (long axis runs along +x = up-right on screen). */
type PhoneGeo = { x: number; y: number; w: number; h: number; inset: number; radius: number };
const PHONE: PhoneGeo = { x: 190, y: 330, w: 620, h: 300, inset: 5, radius: 56 };
/* The hero is a two-layer stack: main phone over the network phone.
   Every layer repeats the same step — a small shift toward the viewer's
   bottom-right on the plane plus a fixed drop in Z — so edges stay parallel
   and the gaps stay even. */
const STACK_STEP = { dx: -18, dy: 64, dz: 40 };
const layer = (n: number): PhoneGeo => ({
  ...PHONE,
  x: PHONE.x + STACK_STEP.dx * n,
  y: PHONE.y + STACK_STEP.dy * n,
});
const NETWORK_PHONE = layer(1);
/* Height of each layer above the ground (added to the shared hover). */
const LIFT = { top: 28, bottom: 28 - STACK_STEP.dz };

/* Inside the screen we lay out a portrait UI and rotate it 90deg so its top
   points at the notch end. There, "down on screen" is local (+1, +1). */
const LOCAL_DOWN = [1, 1] as const;

type ActivityEvent = { icon: RemixiconComponentType; label: string; amount: string; delta: number };

const EVENTS: ActivityEvent[] = [
  { icon: RiArrowDownLine, label: "Received", amount: "+0.42 ETH", delta: 128436 },
  { icon: RiStackLine, label: "Staking reward", amount: "+1.85 DOT", delta: 1332 },
  { icon: RiArrowLeftRightLine, label: "Swapped", amount: "500 USDT → ETH", delta: 0 },
  { icon: RiArrowUpLine, label: "Sent", amount: "−0.015 BTC", delta: -96210 },
];

const START_BALANCE = 1248052; // cents

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function useWalletFeed() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setStarted(true);
    if (reduce) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 4200);
    return () => window.clearInterval(id);
  }, [reduce]);

  // Balance is derived from how many events have played, so it never drifts.
  let balance = started ? START_BALANCE : 0;
  for (let i = 0; i < tick; i++) balance += EVENTS[i % EVENTS.length].delta;
  const index = tick - 1;
  return { balance, event: index >= 0 ? EVENTS[index % EVENTS.length] : null, index };
}

/* -------------------------------------------------------------------------- */

function Donut() {
  const r = 38;
  const c = 2 * Math.PI * r;
  const segments = [
    { share: 0.58, className: "stroke-accent-500" },
    { share: 0.27, className: "stroke-accent-300" },
    { share: 0.15, className: "stroke-accent-100" },
  ];
  let start = -90;
  return (
    <div className="relative size-[108px]" style={{ transform: "translateZ(4px)" }}>
      {/* extruded body of the ring */}
      {Array.from({ length: 9 }, (_, i) => (
        <svg key={i} viewBox="0 0 100 100" className="absolute inset-0" style={{ transform: `translateZ(${i * 2}px)` }}>
          <circle cx="50" cy="50" r={r} fill="none" strokeWidth="18" className="stroke-accent-700" />
        </svg>
      ))}
      <svg viewBox="0 0 100 100" className="absolute inset-0" style={{ transform: "translateZ(18px)" }}>
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="18" className="stroke-iso-face" />
        {segments.map((s, i) => {
          const len = s.share * c;
          const rot = start;
          start += s.share * 360;
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              strokeWidth="18"
              className={cx("donut-draw", s.className)}
              strokeDasharray={`${len} ${c}`}
              transform={`rotate(${rot} 50 50)`}
              style={{ ["--donut-len" as string]: `${len}`, animationDelay: `${i * 0.15}s` }}
            />
          );
        })}
      </svg>
    </div>
  );
}

function ActivityRow({ symbol, label, value, width, delay }: { symbol: TokenSymbol; label: string; value: string; width: string; delay: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <TokenIcon symbol={symbol} className="size-5" />
        <span className="text-caption-1-semibold text-text-primary">{label}</span>
        <span className="ms-auto text-caption-1-medium text-text-tertiary">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-accent-50">
        <div className="bar-grow h-full rounded-full bg-accent-400" style={{ width, animationDelay: `${delay}s` }} />
      </div>
    </div>
  );
}

const ACTIONS = [
  { icon: RiArrowUpLine, label: "Send" },
  { icon: RiArrowDownLine, label: "Receive" },
  { icon: RiArrowLeftRightLine, label: "Swap" },
  { icon: RiStackLine, label: "Stake" },
];

/** Portrait UI inside a landscape screen, rotated so its top meets the notch end. */
function Portrait({ geo, children }: { geo: PhoneGeo; children: React.ReactNode }) {
  const sw = geo.w - geo.inset * 2; // along +x → the phone's "height"
  const sh = geo.h - geo.inset * 2; // along +y → the phone's "width"
  return (
    <div
      className="absolute"
      style={{ width: sh, height: sw, left: (sw - sh) / 2, top: (sh - sw) / 2, transform: "rotate(90deg)" }}
    >
      {children}
    </div>
  );
}

function PhoneScreen({ balance }: { balance: number }) {
  const shown = useCountUp(balance, balance === START_BALANCE ? 1600 : 700);
  return (
    <Portrait geo={PHONE}>
      {/* notch */}
      <div className="absolute top-3 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-iso-hole" />

      <div className="absolute inset-x-5 top-12 flex items-center justify-between">
        <LogoMark className="size-7" />
        <div className="flex flex-col gap-1">
          <span className="h-0.5 w-5 rounded-full bg-text-primary" />
          <span className="h-0.5 w-5 rounded-full bg-text-primary" />
          <span className="h-0.5 w-3.5 self-end rounded-full bg-text-primary" />
        </div>
      </div>

      {/* balance */}
      <div className="absolute inset-x-5 top-24">
        <p className="text-caption-2-semibold tracking-widest text-text-tertiary uppercase">Total balance</p>
        <p className="mt-1 text-title-1-semibold text-text-primary tabular-nums">{usd.format(shown / 100)}</p>
        <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2 py-0.5 text-caption-2-semibold text-accent-600">
          <span className="relative flex size-1.5">
            <span className="live-ping absolute inset-0 rounded-full bg-accent-500" />
            <span className="relative size-1.5 rounded-full bg-accent-500" />
          </span>
          +2.41% today
        </span>
      </div>

      {/* quick actions */}
      <div className="absolute inset-x-5 top-[196px] grid grid-cols-4 gap-2">
        {ACTIONS.map((a) => (
          <div key={a.label} className="flex flex-col items-center gap-1">
            <span className="grid size-10 place-items-center rounded-full bg-accent-500 text-text-white">
              <a.icon className="size-4" aria-hidden />
            </span>
            <span className="text-caption-2-medium text-text-secondary">{a.label}</span>
          </div>
        ))}
      </div>

      {/* raised activity card */}
      <div className="absolute inset-x-4 top-[270px]" style={{ transform: "translateZ(24px)" }}>
        <div
          className="iso-float flex flex-col gap-3 rounded-2xl border border-iso-edge bg-iso-face p-4"
          style={{
            boxShadow: `${depth(8, "var(--iso-edge)", ...LOCAL_DOWN)}, 26px 26px 34px var(--iso-glow)`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-body-2-semibold text-text-primary">Recent activity</span>
            <span className="text-caption-2-medium text-text-tertiary">Today</span>
          </div>
          <ActivityRow symbol="ETH" label="Received" value="0.42 ETH" width="78%" delay={0} />
          <ActivityRow symbol="USDT" label="Swapped" value="500 USDT" width="52%" delay={0.2} />
        </div>
      </div>

      {/* portfolio card with an extruded donut */}
      <div className="absolute inset-x-4 top-[430px] flex items-center gap-3 rounded-2xl border border-iso-edge bg-iso-face-tint p-3">
        <Donut />
        <div className="flex flex-col gap-2">
          <span className="text-body-2-semibold text-text-primary">Portfolio</span>
          {[
            ["bg-accent-500", "ETH", "58%"],
            ["bg-accent-300", "BTC", "27%"],
            ["bg-accent-100", "Other", "15%"],
          ].map(([dot, k, v]) => (
            <span key={k} className="flex items-center gap-1.5 text-caption-2-medium text-text-secondary">
              <span className={cx("size-2 rounded-full", dot)} />
              {k}
              <span className="text-text-primary">{v}</span>
            </span>
          ))}
        </div>
      </div>

      {/* home indicator */}
      <div className="absolute bottom-3 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-text-primary/80" />
    </Portrait>
  );
}

function Phone({
  geo,
  lift = 0,
  delay = 0.25,
  hoverDelay = 0,
  pullOut,
  children,
}: {
  geo: PhoneGeo;
  lift?: number;
  delay?: number;
  hoverDelay?: number;
  /** Plane offset the phone slides to while hovered (or tapped), clear of the stack. */
  pullOut?: { x: number; y: number; z: number };
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(false);
  const screenRadius = geo.radius - geo.inset;
  return (
    <div
      className="absolute"
      style={{ left: geo.x, top: geo.y, width: geo.w, height: geo.h, transform: `translateZ(${lift}px)` }}
      onPointerEnter={pullOut ? (e) => e.pointerType === "mouse" && setOut(true) : undefined}
      onPointerLeave={pullOut ? (e) => e.pointerType === "mouse" && setOut(false) : undefined}
    >
      {/* Hit zones over the edges the layer above leaves exposed. They stay put
          while the phone slides, so the pointer never "loses" it mid-motion. */}
      {pullOut ? (
        <>
          <div
            aria-hidden
            className="pointer-events-auto absolute inset-x-0 bottom-0 h-[120px] cursor-pointer"
            onClick={() => setOut((v) => !v)}
          />
          <div
            aria-hidden
            className="pointer-events-auto absolute inset-y-0 left-0 w-[60px] cursor-pointer"
            onClick={() => setOut((v) => !v)}
          />
        </>
      ) : null}
      {/* entrance: the phone drops into place from above */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { z: 280, rotateZ: -10 }}
        animate={{ z: 0, rotateZ: 0 }}
        transition={{ type: "spring", stiffness: 55, damping: 15, mass: 1.1, delay }}
      >
        <motion.div
          className={cx("absolute inset-0", pullOut && out && "pointer-events-auto cursor-pointer")}
          animate={pullOut && out ? pullOut : { x: 0, y: 0, z: 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 20, mass: 0.9 }}
          onClick={pullOut && out ? () => setOut(false) : undefined}
        >
          <div className="phone-hover absolute inset-0" style={{ animationDelay: `${hoverDelay}s` }}>
            {/* slim bezel */}
            <div
              className="absolute inset-0 border border-iso-frame-edge"
              style={{
                borderRadius: geo.radius,
                background: "linear-gradient(90deg, var(--iso-frame-from), var(--iso-frame-to))",
                boxShadow: `${depth(7, "var(--iso-frame-edge)")}, -60px 60px 80px var(--iso-glow)`,
              }}
            />
            {/* travelling light on the bezel ring */}
            <div
              className="bezel-light absolute inset-0 opacity-80"
              style={{ borderRadius: geo.radius, padding: geo.inset, transform: "translateZ(0.5px)" }}
            />
            {/* screen */}
            <div
              className="absolute border border-iso-edge bg-iso-face"
              style={{ inset: geo.inset, borderRadius: screenRadius, transform: "translateZ(1px)" }}
            >
              {children}
            </div>
            {/* glass reflection, under the raised card so it reads as the screen surface */}
            <div
              className="absolute overflow-hidden"
              style={{ inset: geo.inset, borderRadius: screenRadius, transform: "translateZ(2px)" }}
            >
              <div className="screen-sheen absolute inset-0" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function CoinFace({ symbol, z, back = false }: { symbol: TokenSymbol; z: number; back?: boolean }) {
  return (
    <div
      className="absolute inset-0 grid place-items-center rounded-full border-2 bg-[linear-gradient(135deg,var(--iso-frame-from),var(--iso-frame-to))] [backface-visibility:hidden]"
      style={{ transform: `translateZ(${z}px)${back ? " rotateY(180deg)" : ""}`, borderColor: "var(--iso-coin-edge)" }}
    >
      <div className="grid size-[72%] place-items-center rounded-full border-2 border-text-white/50">
        <TokenIcon symbol={symbol} className="size-[70%]" />
      </div>
    </div>
  );
}

/* A coin hovering above its own ground shadow; it flips every few seconds to
   show the token on its other face. */
function Coin({
  x,
  y,
  size,
  front,
  back,
  z = 120,
  delay = 0,
}: {
  x: number;
  y: number;
  size: number;
  front: TokenSymbol;
  back: TokenSymbol;
  z?: number;
  delay?: number;
}) {
  const thickness = Math.max(10, Math.round(size / 8));
  return (
    <div className="absolute" style={{ left: x, top: y, width: size, height: size }}>
      <div
        className="iso-shadow-pulse absolute inset-0 rounded-full bg-accent-300/40 blur-[2px]"
        style={{ animationDelay: `${delay}s` }}
      />
      <div className="absolute inset-0" style={{ transform: `translateZ(${z}px)` }}>
        <div className="iso-float absolute inset-0" style={{ animationDelay: `${delay}s` }}>
          <div className="coin-flip absolute inset-0" style={{ animationDelay: `${delay * 1.7}s` }}>
            <CoinFace symbol={back} z={-0.5} back />
            <Extrude layers={thickness} step={1} className="rounded-full" style={{ background: "var(--iso-coin-rim)" }} />
            <CoinFace symbol={front} z={thickness} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Transaction toast that pops off the phone each time the feed ticks. */
function ActivityToast({ event, index }: { event: ActivityEvent | null; index: number }) {
  return (
    <div className="absolute" style={{ left: 700, top: 450, transform: "rotate(90deg)" }}>
      <AnimatePresence>
        {event ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, z: 60 }}
            animate={{ opacity: 1, z: 120 }}
            exit={{ opacity: 0, z: 170 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute flex w-[210px] items-center gap-3 rounded-2xl border border-iso-edge bg-iso-face p-3"
            style={{ boxShadow: `${depth(6, "var(--iso-edge)", ...LOCAL_DOWN)}, 30px 30px 40px var(--iso-glow)` }}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-500 text-text-white">
              <event.icon className="size-4" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-body-2-semibold text-text-primary">{event.label}</span>
              <span className="text-caption-1-medium text-accent-600">{event.amount}</span>
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Network picker screen                                                      */
/* -------------------------------------------------------------------------- */

/* Brand marks for networks the token set doesn't cover. Brand colours are asset
   data (they identify the chain), like the token icons. */
function NetMark({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="grid size-full place-items-center rounded-full text-caption-2-bold"
      style={{ color, background: `color-mix(in oklab, ${color} 14%, transparent)` }}
    >
      {children}
    </span>
  );
}

type Network = { id: string; name: string; icon: React.ReactNode };

const NETWORK_GROUPS: { label: string; items: Network[] }[] = [
  {
    label: "Layer 1",
    items: [
      { id: "eth", name: "Ethereum", icon: <TokenIcon symbol="ETH" className="size-full" /> },
      { id: "btc", name: "Bitcoin", icon: <TokenIcon symbol="BTC" className="size-full" /> },
      { id: "trx", name: "Tron", icon: <TokenIcon symbol="TRX" className="size-full" /> },
    ],
  },
  {
    label: "Layer 2",
    items: [
      { id: "arb", name: "Arbitrum", icon: <TokenIcon symbol="ARB" className="size-full" /> },
      {
        id: "zk",
        name: "zkSync Era",
        icon: (
          <NetMark color="#1e69ff">
            <svg viewBox="0 0 24 24" className="size-[70%]" fill="currentColor" aria-hidden>
              <path d="m20 12-4.54-3.998v2.93l-4.506 2.931 4.506.002V16zM4 12l4.538 4v-2.9l4.476-2.934-4.473-.001V8z" />
            </svg>
          </NetMark>
        ),
      },
      { id: "op", name: "Optimism", icon: <NetMark color="#ff0420">OP</NetMark> },
    ],
  },
  {
    label: "EVM",
    items: [
      { id: "bnb", name: "BNB Smart Chain", icon: <TokenIcon symbol="BNB" className="size-full" /> },
      { id: "pol", name: "Polygon", icon: <NetMark color="#8247e5">◆</NetMark> },
      { id: "avax", name: "Avalanche", icon: <NetMark color="#e84142">▲</NetMark> },
    ],
  },
];

const INITIAL = ["eth", "btc"];
const ADD_ORDER = ["trx", "arb", "zk", "op", "bnb", "pol", "avax"];

/** Adds one network every tick, then resets to the defaults and starts over. */
function useNetworkCycle() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setStep((n) => (n + 1) % (ADD_ORDER.length + 2)), 1500);
    return () => window.clearInterval(id);
  }, [reduce]);
  return new Set([...INITIAL, ...ADD_ORDER.slice(0, Math.min(step, ADD_ORDER.length))]);
}

function NetworkTile({ net, selected }: { net: Network; selected: boolean }) {
  return (
    <div
      className={cx(
        "relative flex flex-col items-center gap-1 rounded-xl border px-1 pt-2.5 pb-2 transition-colors duration-300",
        selected ? "border-iso-line bg-iso-face-tint" : "border-iso-edge bg-iso-face",
      )}
    >
      <RiMore2Fill className="absolute top-1.5 right-1 size-3 text-foreground-icon-quaternary" aria-hidden />
      <span className="size-7">{net.icon}</span>
      <span className="w-full truncate text-center text-caption-2-medium text-text-secondary">{net.name}</span>
      <span className="relative grid size-4 place-items-center">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={selected ? "on" : "off"}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 520, damping: 26 }}
            className="absolute inset-0 grid place-items-center text-accent-500"
          >
            {selected ? <RiCheckboxCircleFill className="size-4" aria-hidden /> : <RiAddCircleLine className="size-4" aria-hidden />}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

function NetworkScreen() {
  const selected = useNetworkCycle();
  return (
    <Portrait geo={NETWORK_PHONE}>
      <div className="absolute top-3 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-iso-hole" />
      <div className="absolute inset-x-3.5 top-10 flex items-center justify-between">
        <span className="text-body-2-semibold text-text-primary">Networks</span>
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-accent-50 px-2 py-0.5 text-caption-2-semibold text-accent-600 tabular-nums">
            {selected.size} selected
          </span>
          <RiSearchLine className="size-3.5 text-foreground-icon-tertiary" aria-hidden />
        </span>
      </div>
      <div className="absolute inset-x-3.5 top-[72px] flex flex-col gap-2.5">
        {NETWORK_GROUPS.map((g) => (
          <div key={g.label} className="flex flex-col gap-1.5">
            <span className="text-caption-2-medium text-text-tertiary">{g.label}</span>
            <div className="grid grid-cols-3 gap-1.5">
              {g.items.map((n) => (
                <NetworkTile key={n.id} net={n} selected={selected.has(n.id)} />
              ))}
            </div>
          </div>
        ))}
        <div className="mt-1 flex items-center gap-2.5 rounded-xl border border-iso-edge bg-iso-face px-3 py-2.5">
          <span className="grid size-7 place-items-center rounded-lg bg-accent-50 text-accent-500">
            <RiBankCardLine className="size-4" aria-hidden />
          </span>
          <span className="text-caption-1-semibold text-text-primary">imToken Card</span>
          <RiCheckboxCircleFill className="ms-auto size-4 text-accent-500" aria-hidden />
        </div>
      </div>
      <div className="absolute bottom-2.5 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-text-primary/80" />
    </Portrait>
  );
}

/** Pointer position (−1…1) eased into a small turntable rotation of the scene. */
function usePointerTilt() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);
  const spring = { stiffness: 40, damping: 18, mass: 0.8 };
  const rotateZ = useSpring(useTransform(px, [-1, 1], [-3.5, 3.5]), spring);
  const rotateX = useSpring(useTransform(py, [-1, 1], [2.5, -2.5]), spring);
  return { rotateZ, rotateX };
}

export function HeroScene() {
  const { balance, event, index } = useWalletFeed();
  const tilt = usePointerTilt();
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[330px] overflow-hidden select-none sm:top-[300px]">
      <div className="absolute left-1/2 top-[370px] h-0 w-0 sm:top-[490px] lg:top-[545px] scale-[0.5] sm:scale-[0.85] lg:scale-100">
        <Plane size={S}>
          <motion.div className="absolute inset-0" style={tilt}>
            {/* ground texture */}
            <Ghost x={-180} y={240} size={80} />
            <Ghost x={60} y={900} size={70} />
            <Ghost x={880} y={760} size={90} />
            <Ghost x={940} y={160} w={190} h={120} />
            <Path size={S} d="M60 300 C 140 300, 170 330, 200 380" />
            <Path size={S} d="M860 760 C 860 700, 830 660, 800 640" />
            <Path size={S} d="M110 840 C 170 800, 200 720, 250 660" faint />

            {/* dashed footprint around the stack */}
            <div
              className="absolute rounded-[80px] border-[1.5px] border-dashed border-iso-line opacity-60"
              style={{
                left: NETWORK_PHONE.x - 40,
                top: NETWORK_PHONE.y - 40,
                width: NETWORK_PHONE.w + 80,
                height: NETWORK_PHONE.h + 80,
              }}
            />

            <Phone geo={NETWORK_PHONE} lift={LIFT.bottom} delay={0.55} hoverDelay={-0.6} pullOut={{ x: 40, y: 250, z: 34 }}>
              <NetworkScreen />
            </Phone>
            <Phone geo={PHONE} lift={LIFT.top}>
              <PhoneScreen balance={balance} />
            </Phone>

            <Coin x={20} y={210} size={120} front="ETH" back="USDT" z={130} />
            <Coin x={790} y={650} size={130} front="BTC" back="TRX" z={110} delay={1.2} />
            <Coin x={820} y={980} size={70} front="SOL" back="BNB" z={90} delay={2.4} />
            <Coin x={900} y={420} size={64} front="DOT" back="ATOM" z={100} delay={3.1} />

            <ActivityToast event={event} index={index} />
          </motion.div>
        </Plane>
      </div>
      {/* fade the scene into the page ground at the edges */}
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-landing-ground to-transparent" />
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-landing-ground to-transparent" />
    </div>
  );
}
