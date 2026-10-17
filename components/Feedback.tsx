import { ArrowUpRight, MessageCircle, Star, Wrench } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { feedbackForm } from "@/lib/content";

const prompts = [
  {
    icon: Star,
    title: "¿La charla se dio bien?",
    text: "Qué tan clara fue, cómo se sintió el ritmo y si la demo se entendió.",
  },
  {
    icon: Wrench,
    title: "¿Qué mejorarías?",
    text: "Contenido, ejemplos o el tiempo. Lo que ayude a la siguiente sesión.",
  },
  {
    icon: MessageCircle,
    title: "Preguntas para Lissy",
    text: "Dudas que quedaron y cualquier comentario directo para la ponente.",
  },
];

export function Feedback() {
  return (
    <section id="feedback" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="07 — Feedback"
        title="Califica esta charla"
        text="Tu opinión llega directo a Lissy. El formulario pregunta si la charla se dio bien, qué mejorarías y qué dudas te quedaron."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {prompts.map((prompt, index) => {
          const Icon = prompt.icon;
          return (
            <Reveal key={prompt.title} delay={index * 0.06}>
              <article className="glass-card h-full rounded-3xl border border-white/10 p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-cyan-200">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-white">{prompt.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-200">{prompt.text}</p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-8">
        <div className="flex flex-col items-start gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-xl text-lg leading-relaxed text-slate-200">
            Se abre en otra pestaña. No pide cuenta para responder.
          </p>
          <a
            href={feedbackForm}
            target="_blank"
            rel="noreferrer"
            className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-glow-white"
          >
            Calificar en Forms
            <ArrowUpRight size={18} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
