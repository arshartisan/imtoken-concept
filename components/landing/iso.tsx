import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Isometric scene kit. A <Plane> is a square rotated into isometric space;
 * children are positioned in plane coordinates (px from its top-left).
 *   +x  → screen up-right      +y → screen down-right
 *   down on screen = (-x, +y)  right on screen = (+x, +y)
 */
export function Plane({
  size,
  className,
  style,
  children,
}: {
  size: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden
      className={cx("iso-plane left-1/2 top-1/2", className)}
      style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, ...style }}
    >
      {children}
    </div>
  );
}

export function Tile({
  x,
  y,
  size = 80,
  w,
  h,
  z = 0,
  variant = "light",
  float = false,
  delay = 0,
  radius,
  className,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  w?: number;
  h?: number;
  z?: number;
  variant?: "light" | "dark" | "blue";
  float?: boolean;
  delay?: number;
  radius?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className="absolute" style={{ left: x, top: y, transform: `translateZ(${z}px)` }}>
      <div
        className={cx(
          "iso-tile relative",
          variant === "dark" && "iso-tile--dark",
          variant === "blue" && "iso-tile--blue",
          float && "iso-float",
          className,
        )}
        style={{
          width: w ?? size,
          height: h ?? size,
          borderRadius: radius,
          animationDelay: float ? `${delay}s` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function Ghost({ x, y, size = 80, w, h }: { x: number; y: number; size?: number; w?: number; h?: number }) {
  return <div className="iso-ghost" style={{ left: x, top: y, width: w ?? size, height: h ?? size }} />;
}

/** Dashed, slowly flowing connector drawn on the plane surface. */
export function Path({ d, size, faint = false }: { d: string; size: number; faint?: boolean }) {
  return (
    <svg className="pointer-events-none absolute inset-0 overflow-visible" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path d={d} fill="none" className={cx("iso-dash stroke-iso-line", faint && "opacity-50")} strokeWidth="1.5" />
    </svg>
  );
}

/** Flat panel lying on the plane (cards, sheets, screens). */
export function Sheet({
  x,
  y,
  w,
  h,
  z = 0,
  className,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  z?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "absolute rounded-[22px] border border-iso-edge bg-iso-face/90 shadow-[-18px_18px_40px_var(--iso-glow)] backdrop-blur-sm",
        className,
      )}
      style={{ left: x, top: y, width: w, height: h, transform: `translateZ(${z}px)` }}
    >
      {children}
    </div>
  );
}

/**
 * Stacked offset shadows that fake an extruded edge. In plane space "down on
 * screen" is (-1, +1); inside a child rotated 90deg (portrait phone screen)
 * the same direction is (+1, +1), so callers pass the local direction.
 */
export function depth(layers: number, color: string, dx = -1, dy = 1, step = 1) {
  return Array.from({ length: layers }, (_, i) => `${dx * (i + 1) * step}px ${dy * (i + 1) * step}px 0 ${color}`).join(",");
}

/**
 * Real extrusion: identical rounded layers stacked along Z. Keeps rounded
 * corners correct from every angle (box-shadow depth can't do circles well).
 */
export function Extrude({
  layers,
  step = 2,
  className,
  style,
}: {
  layers: number;
  step?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <>
      {Array.from({ length: layers }, (_, i) => (
        <div
          key={i}
          className={cx("absolute inset-0", className)}
          style={{ ...style, transform: `translateZ(${i * step}px)` }}
        />
      ))}
    </>
  );
}
