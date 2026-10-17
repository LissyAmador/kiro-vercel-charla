"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { KiroGhost } from "@/components/KiroGhost";
import { consolePhases, speaker } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-14 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-32"
    >
      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3"
        >
          <a href="#ponente" className="inline-flex items-center gap-2.5 pr-1">
            <img
              src={speaker.logo}
              alt=""
              className="h-14 w-14 object-contain"
            />
            <span className="text-left">
              <span className="block text-sm font-semibold text-white">
                {speaker.name}
              </span>
              <span className="block text-[11px] text-slate-400">
                {speaker.community}
              </span>
            </span>
          </a>
          <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tide opacity-70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
          </span>
          <span className="text-xs font-medium tracking-wide text-slate-200 sm:text-sm">
            Charla en vivo & demo práctica
          </span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-6 flex items-center gap-3 sm:gap-5"
        >
          <KiroGhost className="h-24 w-[5.4rem] sm:h-32 sm:w-28" />
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.15rem]">
            Construyendo con{" "}
            <span className="gradient-text">Kiro</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
        >
          Guía paso a paso para crear y desplegar tu primera página web con
          Inteligencia Artificial.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#guia"
            className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-kiro-deep to-kiro px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
          >
            Ver guía paso a paso
            <ArrowRight size={16} />
          </a>
          <a
            href="#galeria"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3.5 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:shadow-glow-cyan"
          >
            Publicar en la galería
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.36 }}
          className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6"
        >
          {[
            ["5", "pasos para crear la web"],
            ["IA", "escribe con un prompt"],
            ["Vercel", "tu enlace público"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="text-lg font-semibold text-white sm:text-2xl">{value}</dt>
              <dd className="mt-1 text-xs leading-snug text-slate-400 sm:text-sm">
                {label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <KiroConsole />
    </section>
  );
}

function KiroConsole() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const phase = consolePhases[index];

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % consolePhases.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={
        reduce
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: [0, -10, 0] }
      }
      transition={
        reduce
          ? { duration: 0.6 }
          : { opacity: { duration: 0.7 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }
      }
      className="relative"
    >
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-kiro/20 blur-3xl" />
      <div className="border-spin rounded-[1.7rem] p-px shadow-glow">
        <div className="rounded-[1.65rem] bg-[#0b1222]/90 p-4 backdrop-blur-xl sm:p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-2 text-xs font-medium text-slate-400">
                kiro · spec session
              </span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200">
              En vivo
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            {consolePhases.map((item, itemIndex) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setIndex(itemIndex)}
                className={`h-1.5 flex-1 rounded-full transition ${
                  itemIndex === index ? "bg-white" : "bg-white/15 hover:bg-white/30"
                }`}
                aria-label={`Ver fase ${item.kicker}`}
              />
            ))}
          </div>

          <div className="relative mt-5 min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-300">
                  {phase.kicker}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{phase.title}</h3>
                <ul className="mt-5 space-y-3">
                  {phase.lines.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tide" />
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white px-3 py-2.5 text-black">
              <div className="flex items-center gap-2">
                <VercelMark />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    Destino
                  </p>
                  <p className="text-sm font-semibold">vercel.app · production</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  phase.key === "deploy"
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-600"
                }`}
              >
                {phase.key === "deploy" ? "Ready" : "En cola"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VercelMark() {
  return (
    <svg width="18" height="16" viewBox="0 0 16 14" aria-hidden="true">
      <path d="M8 0L16 14H0L8 0Z" fill="currentColor" />
    </svg>
  );
}
