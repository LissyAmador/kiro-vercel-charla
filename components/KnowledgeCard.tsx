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
  const itemCount = groups.reduce((total, group) => total + group.items.length, 0);
  const density = itemCount <= 4 ? "roomy" : itemCount <= 6 ? "comfortable" : "compact";
  const type = {
    roomy: {
      answer: "mt-4 text-lg leading-relaxed text-slate-800",
      title: "text-sm font-semibold uppercase tracking-[0.16em] text-sky-700",
      item: "block text-lg leading-relaxed text-slate-700",
      stack: "mt-6 flex flex-1 flex-col justify-evenly gap-6",
      group: "space-y-3",
    },
    comfortable: {
      answer: "mt-4 text-base leading-relaxed text-slate-800",
      title: "text-xs font-semibold uppercase tracking-[0.16em] text-sky-700",
      item: "block text-base leading-relaxed text-slate-700",
      stack: "mt-5 flex flex-1 flex-col justify-between gap-4",
      group: "space-y-3",
    },
    compact: {
      answer: "mt-3 text-sm leading-relaxed text-slate-800",
      title: "text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sky-700",
      item: "block text-sm leading-snug text-slate-700",
      stack: "mt-4 space-y-4",
      group: "space-y-2",
    },
  }[density];
  const questionClass =
    question.length < 22
      ? "mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
      : "mt-6 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-[2.6rem]";

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
          <span className={questionClass}>{question}</span>
          <span className="mt-8 inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <RefreshCw size={13} />
            Toca para voltear
          </span>
        </span>

        <span className="absolute inset-0 overflow-hidden rounded-3xl border border-cyan-200 bg-gradient-to-br from-amber-50 via-white to-sky-100 shadow-[0_24px_50px_-28px_rgba(2,132,199,0.55)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="flex h-full flex-col overflow-y-auto p-5 text-left sm:p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Respuesta
            </span>
            <span className={type.answer}>{answer}</span>
            <span className={type.stack}>
              {groups.map((group) => (
                <span key={group.title} className="block">
                  <span className={type.title}>{group.title}</span>
                  <span className={`mt-2 block ${type.group}`}>
                    {group.items.map((item) => (
                      <span key={item.name} className={type.item}>
                        <span className="font-semibold text-slate-950">{item.name}. </span>
                        {item.text}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </span>
            <span className="mt-auto pt-5 text-xs text-slate-500">
              Toca de nuevo para ver la pregunta.
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
