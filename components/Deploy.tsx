import { deployOptions } from "@/lib/guide";
import { Reveal, SectionHeading } from "@/components/Reveal";

export function Deploy() {
  return (
    <section id="deploy" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="05 — Desplegar en Vercel"
        title="De la carpeta al enlace público"
        text="Crea una cuenta en vercel.com y regístrate. Puedes usar tu cuenta de GitHub."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {deployOptions.map((option, index) => (
          <Reveal key={option.name} delay={index * 0.08}>
            <article className="card-lift glass-card h-full rounded-3xl border border-white/10 p-6 hover:shadow-glow sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tide">{option.name}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{option.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{option.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/15 bg-white px-6 py-6 text-black sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Deploy</p>
            <h3 className="mt-1 text-2xl font-semibold">Haz clic en Deploy</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-700">
              En menos de un minuto tendrás el enlace público de la web, por
              ejemplo tu-proyecto.vercel.app.
            </p>
          </div>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="btn-shine inline-flex shrink-0 items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            Abrir Vercel
          </a>
        </div>
      </Reveal>
    </section>
  );
}
