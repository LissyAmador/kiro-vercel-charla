"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function KiroGhost({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const eyes = useRef<SVGGElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const node = root.current;
    const pupils = eyes.current;
    if (!node || !pupils) return;

    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      const cx = box.left + box.width * 0.5;
      const cy = box.top + box.height * 0.38;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const angle = Math.atan2(dy, dx);
      const reach = Math.min(3.4, Math.hypot(dx, dy) / 48);
      pupils.setAttribute(
        "transform",
        `translate(${(Math.cos(angle) * reach).toFixed(2)} ${(Math.sin(angle) * reach).toFixed(2)})`,
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return (
    <motion.div
      ref={root}
      className={`relative shrink-0 ${className}`}
      aria-hidden="true"
      animate={reduce ? undefined : { y: [0, -12, -4, -14, 0] }}
      transition={
        reduce
          ? undefined
          : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <svg viewBox="0 0 100 112" className="h-full w-full drop-shadow-[0_12px_24px_rgba(99,102,241,0.45)]">
        <path
          fill="#ffffff"
          d="M50 6C24 6 10 30 10 54c0 22 4 34 12 44 6 8 12 10 18 2 4-6 8-12 12-6 5 8 14 14 26 8 10-5 16-18 14-38C78 28 70 6 50 6Z"
        />
        <g ref={eyes}>
          <ellipse cx="40" cy="46" rx="6.2" ry="10" fill="#16161f" />
          <ellipse cx="62" cy="46" rx="6.2" ry="10" fill="#16161f" />
        </g>
      </svg>
      <motion.span
        className="absolute -right-1 bottom-3 h-3.5 w-3.5 rounded-[3px] bg-kiro shadow-glow"
        animate={reduce ? undefined : { y: [10, 0, 10], opacity: [0.35, 1, 0.35], rotate: [0, 12, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.span
        className="absolute -left-1 bottom-6 h-2.5 w-2.5 rounded-[3px] bg-tide"
        animate={reduce ? undefined : { y: [8, -2, 8], opacity: [0.2, 0.9, 0.2] }}
        transition={
          reduce
            ? undefined
            : { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
        }
      />
    </motion.div>
  );
}
