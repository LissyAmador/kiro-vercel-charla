import { kiroCapabilities, kiroFacts } from "@/lib/guide";
import { Reveal, SectionHeading } from "@/components/Reveal";

export function KiroIntro() {
  return (
    <section id="kiro" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="03 — Conociendo a Kiro / Cursor"
        title="El editor que escribe contigo"
        text="Un IDE impulsado por inteligencia artificial para pasar de una idea en español a una página que ya se puede abrir en el navegador."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {kiroFacts.map((fact, index) => (
          <Reveal key={fact.question} delay={index * 0.06}>
            <article className="card-lift glass-card h-full rounded-3xl border border-white/10 p-6 hover:shadow-glow">
              <p className="font-mono text-xs text-white/40">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-semibold text-white">{fact.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{fact.answer}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4">
        <div className="rounded-3xl border border-white/10 bg-black p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-white">¿Qué se puede hacer con él?</h3>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {kiroCapabilities.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-slate-200">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-tide" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
