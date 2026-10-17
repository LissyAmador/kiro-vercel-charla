"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { KiroGhost } from "@/components/KiroGhost";
import { icebreakers, speaker } from "@/lib/content";

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
              src={speaker.avatar}
              alt=""
              className="h-14 w-14 rounded-full object-cover object-[center_18%] ring-2 ring-white/15"
            />
            <span className="text-left">
              <span className="block text-sm font-semibold text-white">
                {speaker.name}
              </span>
              <span className="block text-[0.7rem] text-slate-400">
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
      </div>

      <KiroConsole />
    </section>
  );
}

function KiroConsole() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const question = icebreakers[index];

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
                Rompehielos
              </span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan-200">
              En vivo
            </span>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {icebreakers.map((item, itemIndex) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setIndex(itemIndex)}
                aria-pressed={itemIndex === index}
                aria-label={`Pregunta ${itemIndex + 1}: ${item.title}`}
                className={`rounded-xl border px-2 py-2 text-xs font-semibold transition ${
                  itemIndex === index
                    ? "border-white/40 bg-white text-black"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white"
                }`}
              >
                {itemIndex + 1}
              </button>
            ))}
          </div>

          <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={question.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-indigo-300">
                  Pregunta {index + 1} de {icebreakers.length}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{question.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  “{question.prompt}”
                </p>
                <ul className="mt-4 space-y-2">
                  {question.choices.map((choice) => (
                    <li
                      key={choice.id}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5"
                    >
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cyan-200">
                        {choice.id} · {choice.gesture}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-200">
                        {choice.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
