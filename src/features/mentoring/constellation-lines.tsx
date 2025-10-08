import type { SVGProps } from "react";

export const ConstellationLines = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 400 300" aria-label="Constellation Lines" {...props}>
      <title>Constellation Lines</title>
      <line
        x1="40"
        y1="260"
        x2="120"
        y2="160"
        stroke="#00ff88"
        strokeWidth="1"
      />
      <line
        x1="120"
        y1="160"
        x2="190"
        y2="150"
        stroke="#00ff88"
        strokeWidth="1"
      />
      <line
        x1="190"
        y1="150"
        x2="250"
        y2="120"
        stroke="#00ff88"
        strokeWidth="1"
      />
      <line
        x1="250"
        y1="120"
        x2="320"
        y2="70"
        stroke="#00ff88"
        strokeWidth="1"
      />
      <line
        x1="320"
        y1="70"
        x2="370"
        y2="40"
        stroke="#00ff88"
        strokeWidth="1"
      />
      <circle cx="40" cy="260" r="6" fill="#00ff88" />
      <circle cx="120" cy="160" r="5" fill="#00ff88" />
      <circle cx="190" cy="150" r="5" fill="#00ff88" />
      <circle cx="250" cy="120" r="5" fill="#00ff88" />
      <circle cx="320" cy="70" r="5" fill="#00ff88" />
      <circle cx="370" cy="40" r="6" fill="#00ff88" />
      <circle cx="40" cy="260" r="6" fill="#00ff88" opacity="0.3" />
      <circle cx="120" cy="160" r="5" fill="#00ff88" opacity="0.3" />
      <circle cx="190" cy="150" r="5" fill="#00ff88" opacity="0.3" />
      <circle cx="250" cy="120" r="5" fill="#00ff88" opacity="0.3" />
      <circle cx="320" cy="70" r="5" fill="#00ff88" opacity="0.3" />
      <circle cx="370" cy="40" r="6" fill="#00ff88" opacity="0.3" />
    </svg>
  );
};
