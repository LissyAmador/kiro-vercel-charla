import { QrCode } from "@/components/QrCode";
import { Reveal } from "@/components/Reveal";
import { speaker, speakerLinks } from "@/lib/content";

export function Speaker() {
  return (
    <section id="ponente" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <article className="glass-card grid items-center gap-8 rounded-[2rem] border border-white/10 p-5 sm:p-8 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-12">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-[1.5rem] border border-white/10">
            <img
              src={speaker.photo}
              alt={`${speaker.name}, Tech Educator y fundadora de EDUKIDS`}
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
                <p className="mt-2 text-sm font-medium text-cyan-100 sm:text-base">
                  {speaker.role}
                  <span className="mx-2 text-slate-500">·</span>
                  {speaker.focus}
                </p>
                <p className="mt-1 text-sm text-slate-400">{speaker.community}</p>
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {speaker.summary}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
              {speakerLinks
                .filter((link) => link.label === "LinkedIn")
                .map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${link.label} de ${speaker.name}`}
                    className="w-full max-w-[220px] rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition hover:-translate-y-0.5 hover:border-white/30"
                  >
                    <span className="block rounded-xl bg-white p-2">
                      <QrCode value={link.href} />
                    </span>
                    <span className="mt-3 block text-sm font-semibold text-white">
                      {link.label}
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">{link.detail}</span>
                  </a>
                ))}
              <div className="flex flex-wrap gap-2 pb-1">
                {speakerLinks
                  .filter((link) => link.label !== "LinkedIn")
                  .map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
