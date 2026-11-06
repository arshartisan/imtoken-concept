import { cx } from "@/utils/cx";

/**
 * Simplified chain/asset marks for illustrations. Brand colors are asset data,
 * not UI color — they identify the network and don't flip with the theme.
 */
export type TokenSymbol =
  | "BTC"
  | "ETH"
  | "TRX"
  | "USDT"
  | "DOT"
  | "ATOM"
  | "SOL"
  | "BNB"
  | "LTC"
  | "ARB";

const BRAND: Record<TokenSymbol, string> = {
  BTC: "#F7931A",
  ETH: "#627EEA",
  TRX: "#FF060A",
  USDT: "#26A17B",
  DOT: "#E6007A",
  ATOM: "#2E3148",
  SOL: "#14F195",
  BNB: "#F3BA2F",
  LTC: "#345D9D",
  ARB: "#28A0F0",
};

function Glyph({ symbol }: { symbol: TokenSymbol }) {
  switch (symbol) {
    case "BTC":
      return (
        <text x="16" y="22.5" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="system-ui">
          ₿
        </text>
      );
    case "ETH":
      return (
        <g fill="#fff">
          <path d="M16 5l-6.5 11L16 19.8 22.5 16z" fillOpacity=".95" />
          <path d="M16 21.2l-6.5-3.9L16 27l6.5-9.7z" fillOpacity=".75" />
        </g>
      );
    case "TRX":
      return <path d="M8 9l17 3-8 13zM8 9l9 16M25 12l-8 4-9-7" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />;
    case "USDT":
      return (
        <g fill="#fff">
          <rect x="9" y="8.5" width="14" height="3.2" rx="1" />
          <rect x="14.4" y="10" width="3.2" height="14" rx="1" />
          <ellipse cx="16" cy="15.3" rx="7.5" ry="2" fill="none" stroke="#fff" strokeWidth="1.6" />
        </g>
      );
    case "DOT":
      return (
        <g fill="#fff">
          <ellipse cx="16" cy="8.5" rx="4" ry="2.4" />
          <ellipse cx="16" cy="23.5" rx="4" ry="2.4" />
          <ellipse cx="9.5" cy="12.2" rx="4" ry="2.4" transform="rotate(60 9.5 12.2)" />
          <ellipse cx="22.5" cy="12.2" rx="4" ry="2.4" transform="rotate(-60 22.5 12.2)" />
          <ellipse cx="9.5" cy="19.8" rx="4" ry="2.4" transform="rotate(-60 9.5 19.8)" />
          <ellipse cx="22.5" cy="19.8" rx="4" ry="2.4" transform="rotate(60 22.5 19.8)" />
        </g>
      );
    case "ATOM":
      return (
        <g fill="none" stroke="#fff" strokeWidth="1.4">
          <ellipse cx="16" cy="16" rx="10" ry="3.6" />
          <ellipse cx="16" cy="16" rx="10" ry="3.6" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="10" ry="3.6" transform="rotate(-60 16 16)" />
          <circle cx="16" cy="16" r="1.8" fill="#fff" />
        </g>
      );
    case "SOL":
      return (
        <g fill="#fff">
          <path d="M11 9h13l-3 3H8z" />
          <path d="M8 14.5h13l3 3H11z" />
          <path d="M11 20h13l-3 3H8z" />
        </g>
      );
    case "BNB":
      return (
        <g fill="#fff">
          <path d="M16 7l3 3-3 3-3-3z" />
          <path d="M16 19l3 3-3 3-3-3z" />
          <path d="M10 13l3 3-3 3-3-3z" />
          <path d="M22 13l3 3-3 3-3-3z" />
          <path d="M16 13.2l2.8 2.8-2.8 2.8-2.8-2.8z" />
        </g>
      );
    case "LTC":
      return (
        <text x="16" y="22.5" textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff" fontFamily="system-ui">
          Ł
        </text>
      );
    case "ARB":
      return <path d="M16 6l9 5v10l-9 5-9-5V11zM12.5 21l4.8-11M19.5 21l-2.2-5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />;
  }
}

export function TokenIcon({
  symbol,
  className,
  title,
}: {
  symbol: TokenSymbol;
  className?: string;
  title?: string;
}) {
  const fill = symbol === "SOL" ? "url(#sol-grad)" : BRAND[symbol];
  return (
    <svg viewBox="0 0 32 32" className={cx("size-8", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      {symbol === "SOL" ? (
        <defs>
          <linearGradient id="sol-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#9945FF" />
            <stop offset="1" stopColor="#14F195" />
          </linearGradient>
        </defs>
      ) : null}
      <circle cx="16" cy="16" r="16" fill={fill} />
      <Glyph symbol={symbol} />
    </svg>
  );
}
