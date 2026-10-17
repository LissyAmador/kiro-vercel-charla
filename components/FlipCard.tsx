"use client";

import { useState, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";

export function FlipCard({
  question,
  answer,
  points,
  icon,
}: {
  question: string;
  answer: string;
  points: string[];
  icon: ReactNode;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={
        flipped
          ? `${question} Respuesta: ${answer} ${points.join(". ")}. Toca para volver a la pregunta.`
          : `${question} Toca para ver el concepto.`
      }
      className="group h-full min-h-[22rem] w-full cursor-pointer text-left [perspective:1200px] focus-visible:outline-none"
    >
      <span
        className={`relative block h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <span className="glass-card absolute inset-0 flex flex-col rounded-3xl border border-white/10 p-6 [backface-visibility:hidden] group-hover:border-white/25">
          <span className="flex items-center justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-cyan-200">
              {icon}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <RefreshCw size={13} />
              Voltear
            </span>
          </span>
          <span className="mt-6 text-2xl font-semibold leading-tight tracking-tight text-white">
            {question}
          </span>
          <span className="mt-auto pt-6 text-sm text-slate-400">
            Toca la tarjeta para ver el concepto.
          </span>
        </span>

        <span className="glass-card absolute inset-0 flex flex-col rounded-3xl border border-tide/40 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tide">
            Concepto
          </span>
          <span className="mt-3 text-sm leading-relaxed text-slate-200">{answer}</span>
          <span className="mt-4 space-y-2">
            {points.map((point) => (
              <span key={point} className="flex gap-2 text-sm leading-snug text-white">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kiro" />
                {point}
              </span>
            ))}
          </span>
          <span className="mt-auto pt-5 text-xs text-slate-400">Toca de nuevo para ver la pregunta.</span>
        </span>
      </span>
    </button>
  );
}
