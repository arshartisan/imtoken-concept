import { cx } from "@/utils/cx";

/*
 * Partner marks, monochrome (currentColor). Glyphs: Ethereum, ENS and
 * WalletConnect from Simple Icons (CC0); TRON, Cosmos and zkSync from
 * @web3icons/core (MIT). ConsenSys, Etherscan and SlowMist have no openly
 * licensed glyph available, so they render as wordmarks only — swap in the
 * official SVGs from each brand's press kit when you have them.
 */
function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="currentColor" aria-hidden>
      <path d={d} fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

const PARTNERS: { name: string; glyph?: string; className?: string }[] = [
  {
    name: "ethereum",
    glyph: "M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z",
    className: "font-light tracking-[0.08em]",
  },
  {
    name: "TRON",
    glyph:
      "M4.42 3.186a.57.57 0 0 1 .552-.17L16.876 5.93a.5.5 0 0 1 .197.092l2.422 1.767a.565.565 0 0 1 .133.773l-8.332 12.191a.563.563 0 0 1-.998-.13L4.306 3.753a.57.57 0 0 1 .114-.566M6.383 6.23l4.16 11.712.684-6.069zm5.958 5.838-.695 6.175 5.884-8.61zm5.72-3.93-3.793 1.78 2.542-2.691zm-2.396-1.343L6.41 4.531l5.426 6.318z",
    className: "tracking-[0.18em]",
  },
  {
    name: "COSMOS",
    glyph:
      "M14.194 8.309 8.38 14.115a4.6 4.6 0 0 1-.508-2.132q0-.887.304-1.679.305-.792.845-1.374t1.298-.922a4 4 0 0 1 1.663-.34 4 4 0 0 1 2.212.64m-.513 7.683q-.758.34-1.663.34a4 4 0 0 1-2.212-.64l5.814-5.807q.113.219.203.454.305.79.305 1.679 0 .886-.305 1.678a4.2 4.2 0 0 1-.844 1.374q-.54.583-1.298.922m.88 1.8a6.4 6.4 0 0 0 2.02-1.365 6.1 6.1 0 0 0 1.324-2.009q.47-1.148.47-2.435a6.360 6.360 0 0 0-1.157-3.693L21 4.513l-1.503-1.5L15.704 6.8a6.4 6.4 0 0 0-1.109-.601q-1.167-.495-2.578-.496-1.41 0-2.578.505a6.4 6.4 0 0 0-2.020 1.365 6.1 6.1 0 0 0-1.324 2.01 6.4 6.4 0 0 0-.47 2.435A6.36 6.36 0 0 0 6.78 15.71L3 19.487l1.503 1.5L8.296 17.2q.51.347 1.108.602 1.168.495 2.578.495 1.411 0 2.579-.504",
    className: "tracking-[0.3em]",
  },
  {
    name: "ens",
    glyph:
      "M11.725.223 5.107 11.13a.146.146 0 0 1-.237.018c-.583-.692-2.753-3.64-.067-6.327 2.45-2.452 5.572-4.2 6.73-4.804.13-.068.269.08.192.206m-.366 23.747c.132.093.295-.064.206-.2-1.478-2.251-6.392-9.744-7.07-10.869-.67-1.11-1.987-2.953-2.097-4.53-.011-.158-.228-.19-.283-.042a10 10 0 0 0-.27.85c-1.105 4.11.5 8.472 3.985 10.916zm.909-.193 6.618-10.907a.146.146 0 0 1 .237-.018c.582.692 2.753 3.64.067 6.327-2.45 2.452-5.572 4.2-6.73 4.804-.13.068-.269-.08-.192-.206M12.641.028c-.132-.093-.295.065-.206.2 1.478 2.252 6.392 9.745 7.07 10.87.67 1.109 1.987 2.952 2.097 4.53.011.157.228.19.283.041.088-.239.182-.524.27-.85 1.105-4.11-.5-8.472-3.985-10.915z",
    className: "font-extrabold",
  },
  { name: "CONSENSYS", className: "tracking-[0.12em]" },
  { name: "ETHERSCAN", className: "font-extrabold tracking-[0.06em]" },
  {
    name: "WalletConnect",
    glyph:
      "M4.913 7.519c3.915-3.831 10.26-3.831 14.174 0l.471.461a.483.483 0 0 1 0 .694l-1.611 1.577a.252.252 0 0 1-.354 0l-.649-.634c-2.73-2.673-7.157-2.673-9.887 0l-.694.68a.255.255 0 0 1-.355 0L4.397 8.719a.482.482 0 0 1 0-.693l.516-.507Zm17.506 3.263 1.434 1.404a.483.483 0 0 1 0 .694l-6.466 6.331a.508.508 0 0 1-.709 0l-4.588-4.493a.126.126 0 0 0-.178 0l-4.589 4.493a.508.508 0 0 1-.709 0L.147 12.88a.483.483 0 0 1 0-.694l1.434-1.404a.508.508 0 0 1 .709 0l4.589 4.493c.05.048.129.048.178 0l4.589-4.493a.508.508 0 0 1 .709 0l4.589 4.493c.05.048.128.048.178 0l4.589-4.493a.507.507 0 0 1 .708 0Z",
    className: "font-bold",
  },
  {
    name: "zkSync",
    glyph: "m20 12-4.54-3.998v2.93l-4.506 2.931 4.506.002V16zM4 12l4.538 4v-2.9l4.476-2.934-4.473-.001V8z",
    className: "font-bold",
  },
  { name: "SLOWMIST", className: "font-extrabold italic tracking-[0.04em]" },
];

function Mark({ name, glyph, className, duplicate }: (typeof PARTNERS)[number] & { duplicate?: boolean }) {
  return (
    <li aria-hidden={duplicate || undefined} className="flex h-24 w-[220px] shrink-0 items-center justify-center border-e border-landing-frame text-text-tertiary transition-colors duration-200 hover:text-text-primary sm:h-28">
      <span className={cx("flex items-center gap-2 text-title-3-medium", className)}>
        {glyph ? <Glyph d={glyph} /> : null}
        {name}
      </span>
    </li>
  );
}

export function Partners() {
  return (
    <section aria-labelledby="partners-title" className="border-b border-landing-frame pt-16 sm:pt-20">
      <h2
        id="partners-title"
        className="text-center font-mono text-caption-1-medium tracking-[0.24em] text-text-tertiary uppercase"
      >
        Friends of imToken
      </h2>
      {/* physical scroll direction: decorative motion, not reading order */}
      <div
        dir="ltr"
        className="marquee mt-10 overflow-hidden border-t border-landing-frame [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <ul className="marquee-track flex w-max">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <Mark key={`${p.name}-${i}`} {...p} duplicate={i >= PARTNERS.length} />
          ))}
        </ul>
      </div>
    </section>
  );
}
