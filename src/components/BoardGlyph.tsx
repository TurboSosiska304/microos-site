type BoardGlyphProps = {
  className?: string;
  label?: string;
};

/**
 * A stylised StickC Plus2: the board drawn from its description, not a photo.
 * Colours come from the variant palette, so the same drawing belongs to all
 * three directions.
 */
export function BoardGlyph({
  className = "",
  label = "Stylised drawing of the M5Stack StickC Plus2 board",
}: BoardGlyphProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 440 300"
      fill="none"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id="board-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
          <stop offset="55%" stopColor="var(--accent-2)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="var(--accent-3)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="screen-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <rect
        x="24"
        y="20"
        width="392"
        height="260"
        rx="20"
        fill="var(--panel)"
        stroke="var(--line-strong)"
      />
      <rect x="24" y="20" width="392" height="260" rx="20" fill="url(#board-sheen)" />

      {[
        [44, 44],
        [396, 44],
        [44, 256],
        [396, 256],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="5" stroke="var(--line-strong)" />
          <circle cx={cx} cy={cy} r="2" fill="var(--faint)" />
        </g>
      ))}

      {/* TFT */}
      <rect
        x="52"
        y="56"
        width="122"
        height="92"
        rx="5"
        fill="url(#screen-glow)"
        stroke="var(--line-strong)"
      />
      <path d="M64 74h34M64 84h58M64 94h46M64 104h64M64 114h28" stroke="var(--accent)" strokeOpacity="0.55" />
      <path d="M64 128h72" stroke="var(--accent-2)" strokeOpacity="0.5" />
      <text
        x="52"
        y="168"
        fill="var(--muted)"
        fontFamily="var(--font-mono)"
        fontSize="7"
        letterSpacing="1.6"
      >
        135 × 240 TFT
      </text>

      {/* The SoC */}
      <rect
        x="250"
        y="80"
        width="118"
        height="104"
        rx="9"
        fill="var(--bg-soft)"
        stroke="var(--line-strong)"
      />
      <rect
        x="270"
        y="100"
        width="78"
        height="64"
        rx="4"
        fill="var(--panel-2)"
        stroke="var(--accent)"
        strokeOpacity="0.7"
      />
      <text
        x="309"
        y="130"
        textAnchor="middle"
        fill="var(--ink)"
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="0.8"
      >
        ESP32
      </text>
      <text
        x="309"
        y="142"
        textAnchor="middle"
        fill="var(--muted)"
        fontFamily="var(--font-mono)"
        fontSize="5.5"
        letterSpacing="0.6"
      >
        PICO V3-02
      </text>

      {/* Pins around the SoC */}
      {[0, 1, 2, 3, 4].map((pin) => (
        <g key={pin}>
          <line
            x1="238"
            y1={92 + pin * 18}
            x2="250"
            y2={92 + pin * 18}
            stroke="var(--faint)"
          />
          <line
            x1="368"
            y1={92 + pin * 18}
            x2="380"
            y2={92 + pin * 18}
            stroke="var(--faint)"
          />
        </g>
      ))}

      {/* Traces */}
      <g stroke="var(--accent-2)" strokeOpacity="0.45">
        <path d="M174 72h30v34h46" />
        <path d="M174 90h22v52h54" />
        <path d="M174 126h18v-12h58" />
        <path d="M238 150h-40v62h-40" />
        <path d="M368 108h26v-38h18" />
        <path d="M368 158h26v46h-34" />
        <path d="M380 184v32h-42" />
      </g>
      <g fill="var(--accent)" fillOpacity="0.75">
        <circle cx="204" cy="106" r="2" />
        <circle cx="250" cy="90" r="2" />
        <circle cx="198" cy="166" r="2" />
        <circle cx="394" cy="70" r="2" />
        <circle cx="394" cy="204" r="2" />
      </g>

      {/* Antenna */}
      <path
        d="M386 246v-22h10v-10h10v-10h10"
        stroke="var(--accent-3)"
        strokeOpacity="0.6"
        strokeWidth="1.2"
      />

      {/* Button and battery */}
      <circle cx="330" cy="226" r="13" fill="var(--panel-2)" stroke="var(--line-strong)" />
      <circle cx="330" cy="226" r="5" fill="var(--accent)" fillOpacity="0.55" />
      <rect x="60" y="202" width="54" height="26" rx="3" stroke="var(--line-strong)" />
      <path d="M68 215h38" stroke="var(--faint)" strokeDasharray="2 3" />
      <text
        x="60"
        y="246"
        fill="var(--faint)"
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="1.4"
      >
        8 MB FLASH · 2 MB PSRAM
      </text>

      {/* Board signature */}
      <text
        x="250"
        y="226"
        fill="var(--muted)"
        fontFamily="var(--font-mono)"
        fontSize="7"
        letterSpacing="2"
      >
        MICRO OS
      </text>
      <path d="M250 234h62" stroke="var(--accent)" strokeOpacity="0.5" />
    </svg>
  );
}
