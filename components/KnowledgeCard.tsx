"use client";

import { useState, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";

export function KnowledgeCard({
  question,
  answer,
  groups,
  icon,
}: {
  question: string;
  answer: string;
  groups: { title: string; items: { name: string; text: string }[] }[];
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
          ? `${question} Toca para volver a la pregunta.`
          : `${question} Toca para ver la información.`
      }
      className="group h-[34rem] w-full cursor-pointer text-left [perspective:1400px] focus-visible:outline-none"
    >
      <span
        className={`relative block h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <span className="glass-card absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-white/10 px-6 py-8 text-center [backface-visibility:hidden] group-hover:border-white/25">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-cyan-200">
            {icon}
          </span>
          <span className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            {question}
          </span>
          <span className="mt-8 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <RefreshCw size={13} />
            Toca para voltear
          </span>
        </span>

        <span className="glass-card absolute inset-0 overflow-hidden rounded-3xl border border-tide/40 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="flex h-full flex-col overflow-y-auto p-5 text-left sm:p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tide">
              Respuesta
            </span>
            <span className="mt-3 text-sm leading-relaxed text-slate-200">{answer}</span>
            <span className="mt-4 space-y-4">
              {groups.map((group) => (
                <span key={group.title} className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200">
                    {group.title}
                  </span>
                  <span className="mt-2 block space-y-2">
                    {group.items.map((item) => (
                      <span key={item.name} className="block text-sm leading-snug text-slate-300">
                        <span className="font-semibold text-white">{item.name}. </span>
                        {item.text}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </span>
            <span className="mt-auto pt-5 text-xs text-slate-400">
              Toca de nuevo para ver la pregunta.
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
