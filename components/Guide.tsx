import { FolderPlus, Keyboard, LogIn, MessageSquareText, Download } from "lucide-react";
import { guideSteps } from "@/lib/guide";
import { Reveal, SectionHeading } from "@/components/Reveal";

const icons = [Download, LogIn, FolderPlus, Keyboard, MessageSquareText];

export function Guide() {
  return (
    <section id="guia" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="04 — Cómo hacer una página web con Kiro"
        title="Paso a paso"
        text="Desde la instalación hasta el prompt. Cada paso cabe en la demo en vivo."
      />

      <ol className="relative mt-12 space-y-4">
        {guideSteps.map((step, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={step.n} delay={index * 0.05}>
              <li className="card-lift glass-card grid gap-4 rounded-3xl border border-white/10 p-5 sm:grid-cols-[auto_1fr] sm:p-6">
                <div className="flex items-center gap-4 sm:block">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-black">
                    <Icon size={18} />
                  </span>
                  <span className="font-mono text-sm text-white/40 sm:mt-3 sm:block">{step.n}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">{step.text}</p>
                  {step.example && (
                    <blockquote className="mt-4 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 px-4 py-3 text-sm leading-relaxed text-indigo-100">
                      <span className="mb-1 block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-indigo-300">
                        Ejemplo de prompt
                      </span>
                      “{step.example}”
                    </blockquote>
                  )}
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
