import { RiShieldCheckFill } from "@remixicon/react";
import type { CSSProperties } from "react";
import { depth, Extrude, Plane } from "./iso";
import { TokenIcon, type TokenSymbol } from "./token-icon";

const S = 1000;

/* Belt runs along +y (upper-left → lower-right on screen) through the vault. */
const BELT = { x: 400, w: 200, top: -620, h: 2400 };
const TILE = 84;
const RUN = 18; // seconds per pass — keep in sync with .belt-move in landing.css
const TOKENS: TokenSymbol[] = ["BTC", "ETH", "USDT", "SOL", "TRX", "BNB", "DOT", "ATOM", "ARB"];

/* Vault footprint, centred on the belt; tiles cross its middle at 50% of the run. */
const VAULT = { x: 340, y: 300, size: 320, height: 120 };

function BeltTile({ symbol, index }: { symbol: TokenSymbol; index: number }) {
  const delay: CSSProperties = { animationDelay: `${-(index * RUN) / TOKENS.length}s` };
  return (
    <div className="absolute" style={{ left: BELT.x + (BELT.w - TILE) / 2, top: -480, width: TILE, height: TILE }}>
      <div className="belt-move absolute inset-0" style={delay}>
        <div className="absolute -inset-3 rounded-[26px] border-[1.5px] border-dashed border-iso-line opacity-60" />
        <div className="iso-tile" style={{ width: TILE, height: TILE, transform: "translateZ(2px)" }}>
          <TokenIcon symbol={symbol} className="size-[46%]" />
          <div className="iso-tile iso-tile--blue belt-processed inset-[-1px] opacity-0" style={delay}>
            <RiShieldCheckFill className="size-[44%] text-text-white" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

function Screw({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute size-5" style={{ left: x, top: y }}>
      <Extrude layers={4} step={1} className="rounded-full bg-iso-body-side" />
      <div className="absolute inset-0 rounded-full border border-iso-edge bg-iso-face" style={{ transform: "translateZ(4px)" }} />
    </div>
  );
}

function Vault() {
  const { size, height } = VAULT;
  const layers = height / 4;
  return (
    <div className="absolute" style={{ left: VAULT.x, top: VAULT.y, width: size, height: size }}>
      {/* contact glow */}
      <div className="absolute -inset-16 rounded-full bg-[radial-gradient(circle,var(--iso-glow),transparent_65%)]" />
      {/* body: stacked slices keep the rounded corners true */}
      <Extrude layers={layers} step={4} className="rounded-[40px] bg-iso-body-side" />
      <div className="absolute inset-0 rounded-[40px] border border-iso-edge bg-iso-body-side shadow-[-30px_30px_50px_var(--iso-glow)]" />

      {/* front-right face (+y): exit hatch where tiles leave */}
      <div
        className="absolute flex items-end justify-center"
        style={{ left: 40, top: size - height + 1, width: size - 80, height, transformOrigin: "bottom", transform: "rotateX(-90deg)" }}
      >
        <div className="h-16 w-[124px] rounded-t-2xl bg-iso-hole" />
      </div>
      {/* front-left face (−x): vents */}
      <div
        className="absolute flex flex-col justify-center gap-3 ps-5"
        style={{ left: -1, top: 40, width: height, height: size - 80, transformOrigin: "left", transform: "rotateY(-90deg)" }}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="h-1 w-9 rounded-full bg-iso-line opacity-70" />
        ))}
      </div>

      {/* lid */}
      <div
        className="absolute inset-0 rounded-[40px] border border-iso-edge bg-iso-face"
        style={{ transform: `translateZ(${height}px)` }}
      >
        <div className="absolute inset-6 rounded-[30px] border border-iso-edge">
          <div className="absolute inset-6 overflow-hidden rounded-[22px] border border-iso-edge bg-iso-face-tint">
            <div className="scan-sweep absolute inset-x-0 top-4 h-0.5 bg-accent-400 opacity-70 shadow-[0_0_14px_var(--color-accent-400)]" />
          </div>
        </div>
        {/* raised target */}
        <div className="absolute left-1/2 top-1/2 size-[120px] -translate-x-1/2 -translate-y-1/2">
          <Extrude layers={10} step={2} className="rounded-[28px] bg-accent-600" />
          <div
            className="absolute inset-0 grid place-items-center rounded-[28px] bg-[linear-gradient(135deg,var(--iso-frame-from),var(--iso-frame-to))]"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="grid size-[72%] place-items-center rounded-full border-[9px] border-white/85">
              <div className="grid size-[56%] place-items-center rounded-full border-[7px] border-white/60">
                <span className="relative flex size-3">
                  <span className="live-ping absolute inset-0 rounded-full bg-text-white" />
                  <span className="relative size-3 rounded-full bg-text-white" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <Screw x={14} y={14} />
        <Screw x={size - 34} y={14} />
        <Screw x={14} y={size - 34} />
        <Screw x={size - 34} y={size - 34} />
      </div>
    </div>
  );
}

/* Fee control panel: gauge arc + a slider whose knob glides back and forth. */
function FeePanel() {
  return (
    <div className="absolute" style={{ left: 100, top: 420, width: 150, height: 300 }}>
      <div className="absolute -inset-5 rounded-[40px] border-[1.5px] border-dashed border-iso-line opacity-60" />
      <div
        className="absolute inset-0 rounded-[30px] border border-iso-edge bg-iso-face"
        style={{ boxShadow: `${depth(8, "var(--iso-edge)")}, -24px 24px 36px var(--iso-glow)` }}
      >
        <svg viewBox="0 0 100 60" className="absolute left-6 top-6 w-[100px]" aria-hidden>
          <path d="M10 50 A40 40 0 0 1 90 50" fill="none" strokeWidth="9" strokeLinecap="round" className="stroke-accent-100" />
          <path d="M10 50 A40 40 0 0 1 70 15" fill="none" strokeWidth="9" strokeLinecap="round" className="stroke-accent-500" />
        </svg>
        <span className="absolute left-7 top-[100px] size-3 rounded-full bg-accent-500" />
        {/* slider track */}
        <div className="absolute left-[92px] top-[100px] h-[170px] w-2 rounded-full border border-iso-edge bg-iso-face-tint" />
        <div className="knob-slide absolute left-[78px] top-[100px] size-9">
          <div className="iso-tile iso-tile--blue size-9 rounded-[10px]" />
        </div>
      </div>
    </div>
  );
}

export function FooterScene() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative mt-6 h-[420px] overflow-hidden select-none sm:h-[540px] [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent),linear-gradient(to_bottom,transparent,black_14%,black_88%,transparent)]"
    >
      <div className="absolute left-1/2 top-1/2 h-0 w-0 scale-[0.55] sm:scale-[0.75] lg:scale-[0.9]">
        <Plane size={S}>
          {/* belt */}
          <div
            className="absolute border-x border-iso-edge bg-iso-face"
            style={{ left: BELT.x, top: BELT.top, width: BELT.w, height: BELT.h, boxShadow: depth(5, "var(--iso-edge)") }}
          >
            <div className="absolute inset-y-0 left-3 border-l border-dashed border-iso-edge" />
            <div className="absolute inset-y-0 right-3 border-r border-dashed border-iso-edge" />
          </div>
          {TOKENS.map((t, i) => (
            <BeltTile key={t} symbol={t} index={i} />
          ))}
          <Vault />
          <FeePanel />
        </Plane>
      </div>
    </div>
  );
}
