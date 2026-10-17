"use client";

import { Star } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Reveal, SectionHeading } from "@/components/Reveal";

const STORAGE_KEY = "kiro-ug-galeria";

type Comment = { id: string; author: string; text: string };
type Rating = { author: string; stars: number };
type Project = {
  id: string;
  student: string;
  name: string;
  url: string;
  description: string;
  ratings: Rating[];
  comments: Comment[];
};

const emptyForm = {
  student: "",
  name: "",
  url: "",
  description: "",
};

export function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProjects(JSON.parse(saved) as Project[]);
    } catch {
      setProjects([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects, ready]);

  function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const student = form.student.trim();
    const name = form.name.trim();
    const description = form.description.trim();
    let url = form.url.trim();

    if (!student || !name || !url || !description) {
      setError("Completa nombre, proyecto, enlace y descripción.");
      return;
    }

    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;

    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new Error("protocol");
      }
      url = parsed.toString();
    } catch {
      setError("El enlace debe ser una URL válida, por ejemplo tu-proyecto.vercel.app.");
      return;
    }

    setProjects((current) => [
      {
        id: crypto.randomUUID(),
        student,
        name,
        url,
        description,
        ratings: [],
        comments: [],
      },
      ...current,
    ]);
    setForm(emptyForm);
    setError("");
  }

  function rate(projectId: string, author: string, stars: number) {
    const name = author.trim();
    if (!name || stars < 1 || stars > 5) return;
    setProjects((current) =>
      current.map((project) => {
        if (project.id !== projectId) return project;
        const ratings = project.ratings.filter(
          (item) => item.author.toLowerCase() !== name.toLowerCase(),
        );
        return { ...project, ratings: [...ratings, { author: name, stars }] };
      }),
    );
  }

  function comment(projectId: string, author: string, text: string) {
    const name = author.trim();
    const message = text.trim();
    if (!name || !message) return;
    setProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              comments: [
                ...project.comments,
                { id: crypto.randomUUID(), author: name, text: message },
              ],
            }
          : project,
      ),
    );
  }

  return (
    <section id="galeria" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="06 — Galería de proyectos"
        title="Publica y califica con tus compañeros"
        text="Cada estudiante comparte su enlace de Vercel. El resto deja una puntuación de 1 a 5 estrellas y un comentario constructivo. Esta galería se guarda en este navegador."
      />

      <Reveal className="mt-12">
        <form
          onSubmit={publish}
          className="glass-card grid gap-4 rounded-3xl border border-white/10 p-5 sm:p-7"
        >
          <h3 className="text-lg font-semibold text-white">Formulario de publicación</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nombre del alumno"
              value={form.student}
              onChange={(student) => setForm((current) => ({ ...current, student }))}
            />
            <Field
              label="Nombre del proyecto"
              value={form.name}
              onChange={(name) => setForm((current) => ({ ...current, name }))}
            />
          </div>
          <Field
            label="Enlace URL de Vercel"
            value={form.url}
            onChange={(url) => setForm((current) => ({ ...current, url }))}
            placeholder="tu-proyecto.vercel.app"
          />
          <label className="block text-sm text-slate-300">
            Breve descripción
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
              rows={3}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none ring-cyan-400/40 placeholder:text-slate-500 focus:ring-2"
            />
          </label>
          {error && <p className="text-sm text-rose-300">{error}</p>}
          <button
            type="submit"
            className="btn-shine justify-self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Publicar proyecto
          </button>
        </form>
      </Reveal>

      <div className="mt-8 grid gap-4">
        {projects.length === 0 && (
          <p className="rounded-3xl border border-dashed border-white/15 px-6 py-10 text-center text-sm text-slate-400">
            Aún no hay proyectos. Sé el primero en publicar el tuyo.
          </p>
        )}
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onRate={rate}
            onComment={comment}
          />
        ))}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none ring-cyan-400/40 placeholder:text-slate-500 focus:ring-2"
      />
    </label>
  );
}

function average(ratings: Rating[]) {
  if (ratings.length === 0) return 0;
  const total = ratings.reduce((sum, item) => sum + item.stars, 0);
  return total / ratings.length;
}

function ProjectCard({
  project,
  onRate,
  onComment,
}: {
  project: Project;
  onRate: (projectId: string, author: string, stars: number) => void;
  onComment: (projectId: string, author: string, text: string) => void;
}) {
  const [author, setAuthor] = useState("");
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [notice, setNotice] = useState("");
  const score = average(project.ratings);

  return (
    <article className="glass-card rounded-3xl border border-white/10 p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
            {project.student}
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-white">{project.name}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
            {project.description}
          </p>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex text-sm font-medium text-indigo-200 underline-offset-4 hover:underline"
          >
            {project.url.replace(/^https?:\/\//, "")}
          </a>
        </div>
        <p className="rounded-full border border-white/10 px-3 py-1 text-sm text-white">
          {score ? score.toFixed(1) : "—"} / 5
          <span className="ml-2 text-slate-400">
            {project.ratings.length} {project.ratings.length === 1 ? "voto" : "votos"}
          </span>
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
        <p className="text-sm font-medium text-white">Calificación de compañeros</p>
        <label className="mt-3 block text-xs text-slate-400">
          Tu nombre
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-400/40 sm:max-w-xs"
          />
        </label>
        <div className="mt-3 flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= (hover || Math.round(score));
            return (
              <button
                key={star}
                type="button"
                aria-label={`${star} ${star === 1 ? "estrella" : "estrellas"}`}
                onMouseEnter={() => setHover(star)}
                onClick={() => {
                  if (!author.trim()) {
                    setNotice("Escribe tu nombre antes de calificar.");
                    return;
                  }
                  onRate(project.id, author, star);
                  setNotice(`Registraste ${star} ${star === 1 ? "estrella" : "estrellas"}.`);
                }}
                className={`rounded-lg p-1 transition hover:-translate-y-0.5 ${
                  active ? "text-amber-300" : "text-slate-600"
                }`}
              >
                <Star size={22} fill={active ? "currentColor" : "none"} />
              </button>
            );
          })}
        </div>

        <label className="mt-4 block text-xs text-slate-400">
          Comentario constructivo
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={2}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-400/40"
          />
        </label>
        <button
          type="button"
          onClick={() => {
            if (!author.trim() || !text.trim()) {
              setNotice("El comentario necesita tu nombre y un mensaje.");
              return;
            }
            onComment(project.id, author, text);
            setText("");
            setNotice("Comentario publicado.");
          }}
          className="mt-3 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white hover:border-white/40"
        >
          Publicar comentario
        </button>
        {notice && <p className="mt-2 text-xs text-cyan-200">{notice}</p>}

        {project.comments.length > 0 && (
          <ul className="mt-4 space-y-2">
            {project.comments.map((item) => (
              <li key={item.id} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm">
                <span className="font-medium text-white">{item.author}. </span>
                <span className="text-slate-300">{item.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
