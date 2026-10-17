import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { docs, speaker, speakerLinks } from "@/lib/content";

const speakerIcons = [Linkedin, Github, XIcon];

export function FooterCta() {
  return (
    <footer id="cierre" className="mx-auto max-w-6xl px-5 pb-10 pt-6 sm:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black px-6 py-12 sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full bg-kiro/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-tide/30 blur-3xl" />

        <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
          Cierre de la charla
        </p>
        <h2 className="relative mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.08]">
          La ventaja ya no es escribir más líneas. Es definir mejor el problema,
          dejar que el agente construya y publicar en minutos.
        </h2>
        <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
          Sal de la sesión con una especificación, una web generada y una URL
          en Vercel. Ese es el recorrido completo: de la idea al deploy.
        </p>

        <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#guia"
            className="btn-shine inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-glow-white"
          >
            Volver al paso a paso
          </a>
          <a
            href="#galeria"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/40"
          >
            Ir a la galería
          </a>
          <a
            href={docs.kiro}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/40"
          >
            Abrir documentación de Kiro
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="relative mt-10 flex flex-wrap gap-2 text-xs text-slate-400">
          {["Prompt", "HTML", "Tailwind", "Vercel"].map((item, index) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="rounded-full border border-white/10 px-3 py-1 text-slate-200">
                {item}
              </span>
              {index < 3 && <span aria-hidden="true">→</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <a href="#ponente" className="flex items-center gap-3">
          <img
            src={speaker.logo}
            alt=""
            className="h-12 w-12 object-contain"
          />
          <span>
            <span className="block text-sm font-medium text-white">
              {speaker.name}
            </span>
            <span className="block text-xs text-slate-400">
              {speaker.community}
            </span>
          </span>
        </a>
        <div className="flex flex-wrap gap-2">
          <FooterLink href={docs.kiro} label="Docs Kiro" />
          <FooterLink href={docs.vercel} label="Docs Vercel" />
          {speakerLinks.map((link, index) => {
            const Icon = speakerIcons[index];
            return (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
              >
                <Icon />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
    >
      {label}
      <ArrowUpRight size={12} />
    </a>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <path d="M9.5 6.8 15.2 0h-1.4L8.9 5.9 4.6 0H0l6 8.7L0 16h1.4l5.2-6.1L11.4 16H16L9.5 6.8Zm-1.8 2.1-.6-.9L2 1.1h2.1l3.9 5.5.6.9 5.1 7.3H11.6L7.7 8.9Z" />
    </svg>
  );
}
