import type { SVGProps } from "react";

export const ConstellationLines = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="500"
      height="400"
      viewBox="0 0 500 400"
      aria-label="Constellation Lines"
      {...props}
    >
      <title>Constellation Lines</title>
      <line
        x1="75"
        y1="345"
        x2="135"
        y2="240"
        stroke="#00ff88"
        strokeWidth="2"
      />
      <line
        x1="135"
        y1="240"
        x2="230"
        y2="235"
        stroke="#00ff88"
        strokeWidth="2"
      />
      <line
        x1="230"
        y1="235"
        x2="315"
        y2="210"
        stroke="#00ff88"
        strokeWidth="2"
      />
      <line
        x1="315"
        y1="210"
        x2="385"
        y2="135"
        stroke="#00ff88"
        strokeWidth="2"
      />
      <line
        x1="385"
        y1="135"
        x2="465"
        y2="95"
        stroke="#00ff88"
        strokeWidth="2"
      />

      {/* Circles at each node - smaller sizes to match image */}
      <circle cx="75" cy="345" r="5" fill="#00ff88" />
      <circle cx="135" cy="240" r="4" fill="#00ff88" />
      <circle cx="230" cy="235" r="4" fill="#00ff88" />
      <circle cx="315" cy="210" r="4" fill="#00ff88" />
      <circle cx="385" cy="135" r="4" fill="#00ff88" />
      <circle cx="465" cy="95" r="5" fill="#00ff88" />

      {/* Subtle glow effect for circles */}
      <circle cx="75" cy="345" r="8" fill="#00ff88" opacity="0.2" />
      <circle cx="135" cy="240" r="7" fill="#00ff88" opacity="0.2" />
      <circle cx="230" cy="235" r="7" fill="#00ff88" opacity="0.2" />
      <circle cx="315" cy="210" r="7" fill="#00ff88" opacity="0.2" />
      <circle cx="385" cy="135" r="7" fill="#00ff88" opacity="0.2" />
      <circle cx="465" cy="95" r="8" fill="#00ff88" opacity="0.2" />
    </svg>
  );
};
