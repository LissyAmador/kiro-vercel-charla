import { speaker, speakerLinks } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Speaker() {
  return (
    <section id="ponente" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <article className="glass-card grid items-center gap-8 rounded-[2rem] border border-white/10 p-5 sm:p-8 lg:grid-cols-[280px_1fr] lg:gap-12">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-[1.5rem] border border-white/10">
            <img
              src={speaker.photo}
              alt={`${speaker.name}, speaker de la charla`}
              className="h-full w-full object-cover object-[center_15%]"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tide">
              Ponente
            </p>
            <div className="mt-4 flex items-center gap-4">
              <img
                src={speaker.logo}
                alt=""
                className="h-16 w-16 shrink-0 object-contain"
              />
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {speaker.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-cyan-100">
                  {speaker.role}
                  <span className="mx-2 text-slate-500">·</span>
                  {speaker.community}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {speaker.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {speakerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
