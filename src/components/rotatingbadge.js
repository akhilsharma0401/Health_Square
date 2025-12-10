"use client";
import { useId } from "react";
import Image from "next/image";
import clsx from "clsx";

export default function RotatingBadge({
  text="HEALTH SQUARE • PHARMACY • DENTAL • MEDICAL • ",
  size = 240,
  speed = "slow",
  reverse = false,
  pauseOnHover = true,
  className,
  children,
}) {
  const id = useId();
  const r = size / 2 - 28;


  return (
    <div
      className={clsx(
        "relative inline-grid bg-[#0070C9 place-items-center",
        pauseOnHover && "[&:hover_svg]:!animation-none",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
         viewBox={`-10 -10 ${size + 20} ${size + 20}`}
        width={size}
        height={size}
        className={clsx(
          "pointer-events-none select-none",
          reverse ? "-scale-x-100" : "",
          speed === "slow" && "animate-spin-slow",
          speed === "med" && "animate-spin-med",
          speed === "fast" && "animate-spin-fast"
        )}
      >
        <defs>
          <path
            id={`circlePath-${id}`}
            d={`M ${size / 2},${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${
              2 * r
            },0 a ${r},${r} 0 1,1 -${2 * r},0`}
          />
        </defs>
        <g aria-hidden>
          <text
            className="font-semibold tracking-[0.25em] uppercase"
            fontSize="15"
          >
            <textPath href={`#circlePath-${id}`} startOffset="0">
  {text.trim().endsWith("•") ? text : text + " • "}
</textPath>

          </text>
        </g>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className="opacity-20"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="grid place-items-center bg-white rounded-full  shadow-sm p-3">
          {children ?? (
<div className="absolute inset-0 flex items-center justify-center">
  <div className="rounded-full bg-white overflow-hidden shadow-md w-16 h-16">
    <Image
      src="/images/rotedlogo.png"
      alt="Health Square Logo"
      width={80}
      height={80}
      className="object-cover w-full h-full"
    />
  </div>
</div>




          )}
        </div>
      </div>
      <span className="sr-only">{text}</span>
    </div>
  );
}
