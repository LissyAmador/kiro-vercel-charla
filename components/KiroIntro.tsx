import { ArrowUpRight } from "lucide-react";
import { KiroGhost } from "@/components/KiroGhost";
import { Reveal, SectionHeading } from "@/components/Reveal";
import {
  kiroCapabilities,
  kiroFacts,
  kiroHighlights,
  kiroLinks,
} from "@/lib/guide";

export function KiroIntro() {
  return (
    <section id="kiro" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="03 — Exploración de conocimiento"
        title="Kiro"
        text="Un IDE agéntico de AWS para pasar de una idea en lenguaje natural a un proyecto con especificación, código y revisión."
      />

      <Reveal className="mt-12">
        <article className="glass-card grid items-center gap-8 rounded-[2rem] border border-white/10 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-4">
              <KiroGhost className="h-20 w-[4.5rem]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tide">
                  Hecho por AWS
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-white">El agente en el editor</h3>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
              Kiro trabaja contigo dentro del editor. Primero deja por escrito qué se va a
              construir y después el agente implementa esas tareas. La especificación se
              queda en el proyecto, no solo en el chat.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {kiroLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>

          <a
            href="https://kiro.dev/blog/introducing-kiro/"
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-2xl border border-white/10 bg-black"
          >
            <img
              src="/kiro-intro.png"
              alt="Anuncio oficial Introducing Kiro, 14 de julio de 2025, con el personaje de Kiro"
              className="h-auto w-full object-contain"
            />
          </a>
        </article>
      </Reveal>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {kiroFacts.map((fact, index) => (
          <Reveal key={fact.question} delay={index * 0.06}>
            <article className="card-lift glass-card h-full rounded-3xl border border-white/10 p-6">
              <p className="font-mono text-xs text-white/40">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-semibold text-white">{fact.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{fact.answer}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-7">
          <h3 className="text-lg font-semibold text-white">Datos interesantes</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kiroHighlights.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-slate-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="mt-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Qué puedes hacer con Kiro</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kiroCapabilities.map((item) => (
              <li
                key={item.title}
                className="card-lift glass-card rounded-3xl border border-white/10 p-5"
              >
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
