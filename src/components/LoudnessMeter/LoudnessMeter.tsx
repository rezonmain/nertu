import { animated, useSpring } from "@react-spring/web";
import { useRef } from "react";
import constrain from "../../lib/utils/constrain";

const LoudnessMeter = ({
  loudness,
  color,
  range = { min: -60, max: 0 },
}: {
  loudness: number | undefined;
  color: string;
  range?: { min: number; max: number };
}) => {
  const prev = useRef(0);
  loudness = loudness ?? range.min;

  let w = (263 / Math.abs(range.max - range.min)) * loudness + 263;
  w = constrain(0, 263, w);

  const wProp = useSpring({ to: { width: w }, from: { width: prev.current } });

  return (
    <article
      id="loudenss-indicator"
      className="flex flex-col gap-2 mx-auto max-w-md font-mono w-full"
    >
      <div id="loudness-shell-container">
        <svg
          id="loudness-shell"
          viewBox="0 0 280 32"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#d6d3d1"
        >
          <polygon points="0,32 280,0 280,32" id="shell" />
          <clipPath id="shell-clip">
            <animated.rect x="0" y="0" {...wProp} height="32" />
          </clipPath>
          <use
            clipPath="url(#shell-clip)"
            href="#shell"
            fill={color}
            className="transition-colors"
          />
        </svg>
      </div>
      <div
        id="markers-container"
        className="flex flex-row justify-between text-neutral-400"
      >
        <span>{range.min}dB</span>
        <span>{range.max}dB</span>
      </div>
    </article>
  );
};

export default LoudnessMeter;
