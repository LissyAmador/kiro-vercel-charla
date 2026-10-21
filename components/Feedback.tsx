"use client";

import { FormEvent, useEffect, useState } from "react";
import { Reveal, SectionHeading } from "@/components/Reveal";

const STORAGE_KEY = "kiro-ug-feedback";

type Entry = {
  id: string;
  name: string;
  wentWell: string;
  improve: string;
  questions: string;
};

const empty = { name: "", wentWell: "", improve: "", questions: "" };

const fields = [
  {
    key: "wentWell" as const,
    label: "¿La charla se dio bien?",
    placeholder: "Cuéntame cómo se sintió: la claridad, el ritmo y la demo.",
  },
  {
    key: "improve" as const,
    label: "¿Qué mejorarías?",
    placeholder: "Contenido, ejemplos, tiempo o lo que harías distinto.",
  },
  {
    key: "questions" as const,
    label: "¿Qué le preguntarías o le dirías a Lissy?",
    placeholder: "Escribe la duda o el mensaje que quieras dejarle.",
  },
];

export function Feedback() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setEntries(JSON.parse(saved) as Entry[]);
    } catch {
      setEntries([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries, ready]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = {
      name: form.name.trim(),
      wentWell: form.wentWell.trim(),
      improve: form.improve.trim(),
      questions: form.questions.trim(),
    };
    if (!next.wentWell || !next.improve || !next.questions) {
      setError("Responde las tres preguntas para enviar tu opinión.");
      setSent(false);
      return;
    }
    setEntries((current) => [{ id: crypto.randomUUID(), ...next }, ...current]);
    setForm(empty);
    setError("");
    setSent(true);
  }

  return (
    <section id="feedback" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="07 — Feedback"
        title="Califica esta charla"
        text="Responde con tus palabras. No hay opciones cerradas: escribe cómo se dio la charla, qué mejorarías y qué le quieres decir a Lissy."
      />

      <Reveal className="mt-12">
        <form
          onSubmit={submit}
          className="glass-card grid gap-5 rounded-[2rem] border border-white/10 p-5 sm:p-8"
        >
          <label className="block text-lg text-slate-200">
            Tu nombre
            <span className="ml-2 text-base text-slate-400">opcional</span>
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-lg text-white outline-none ring-cyan-400/40 placeholder:text-slate-500 focus:ring-2"
            />
          </label>

          {fields.map((field) => (
            <label key={field.key} className="block text-lg text-slate-100">
              {field.label}
              <textarea
                value={form[field.key]}
                placeholder={field.placeholder}
                rows={4}
                onChange={(event) =>
                  setForm((current) => ({ ...current, [field.key]: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-lg leading-relaxed text-white outline-none ring-cyan-400/40 placeholder:text-slate-500 focus:ring-2"
              />
            </label>
          ))}

          {error && <p className="text-base text-rose-300">{error}</p>}
          {sent && (
            <p className="text-base text-cyan-200">Gracias. Tu opinión ya quedó registrada.</p>
          )}

          <button
            type="submit"
            className="btn-shine justify-self-start rounded-full bg-white px-6 py-3.5 text-base font-semibold text-black"
          >
            Enviar opinión
          </button>
          <p className="text-base text-slate-400">
            Las respuestas se guardan en este navegador.
          </p>
        </form>
      </Reveal>

      {entries.length > 0 && (
        <div className="mt-8 grid gap-4">
          <h3 className="text-2xl font-semibold text-white">Respuestas de este navegador</h3>
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
            >
              <p className="text-lg font-semibold text-white">{entry.name || "Sin nombre"}</p>
              <p className="mt-4 text-base font-semibold uppercase tracking-[0.14em] text-cyan-200">
                ¿La charla se dio bien?
              </p>
              <p className="mt-2 text-lg leading-relaxed text-slate-100">{entry.wentWell}</p>
              <p className="mt-4 text-base font-semibold uppercase tracking-[0.14em] text-cyan-200">
                ¿Qué mejorarías?
              </p>
              <p className="mt-2 text-lg leading-relaxed text-slate-100">{entry.improve}</p>
              <p className="mt-4 text-base font-semibold uppercase tracking-[0.14em] text-cyan-200">
                Para Lissy
              </p>
              <p className="mt-2 text-lg leading-relaxed text-slate-100">{entry.questions}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
