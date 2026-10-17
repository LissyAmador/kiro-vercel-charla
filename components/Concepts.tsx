import { Globe, HardDrive, Code2, Braces } from "lucide-react";
import { hostingTools, technologies } from "@/lib/guide";
import { Reveal, SectionHeading } from "@/components/Reveal";

const icons = [Globe, HardDrive, Code2, Braces];

export function Concepts() {
  return (
    <section id="conceptos" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="02 — Conceptos fundamentales"
        title="Antes de escribir la primera línea"
        text="Repasamos los términos clave para entender qué estamos construyendo, dónde vivirá la página y con qué piezas se arma."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <article className="card-lift glass-card h-full rounded-3xl border border-white/10 p-6 sm:p-7">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-cyan-200">
              <Globe size={18} />
            </span>
            <h3 className="mt-5 text-2xl font-semibold text-white">¿Qué es una página web?</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Es un documento digital accesible a través de Internet mediante un
              navegador, como Chrome, Edge o Safari.
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="card-lift glass-card h-full rounded-3xl border border-white/10 p-6 sm:p-7">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-indigo-200">
              <HardDrive size={18} />
            </span>
            <h3 className="mt-5 text-2xl font-semibold text-white">¿Qué es un hosting?</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Es el servicio de alojamiento donde se guardan los archivos de tu
              página web para que cualquier persona en el mundo pueda acceder a
              ella las 24 horas del día.
            </p>
          </article>
        </Reveal>
      </div>

      <Reveal className="mt-4">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-7">
          <h3 className="text-lg font-semibold text-white">Herramientas de hosting populares</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {hostingTools.map((tool) => (
              <div key={tool.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm font-semibold text-white">{tool.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{tool.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <article className="card-lift glass-card h-full rounded-3xl border border-white/10 p-6 sm:p-7">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-cyan-200">
              <Code2 size={18} />
            </span>
            <h3 className="mt-5 text-2xl font-semibold text-white">¿Qué es un IDE?</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Es el entorno o editor de código donde los programadores escriben
              y organizan sus proyectos. Por ejemplo, VS Code o Cursor.
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid h-full gap-3 sm:grid-cols-2">
            {technologies.map((tech, index) => {
              const Icon = icons[index];
              return (
                <article
                  key={tech.name}
                  className="card-lift glass-card rounded-3xl border border-white/10 p-5 hover:shadow-glow"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className="text-indigo-200" />
                    <h3 className="font-semibold text-white">{tech.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{tech.text}</p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
