"use client";

import { Star } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import type { Comment, GallerySnapshot, Project, Rating } from "@/lib/gallery";

const STORAGE_KEY = "kiro-ug-galeria";

const emptyForm = {
  student: "",
  name: "",
  url: "",
  description: "",
};

const emptySnapshot: GallerySnapshot = { updatedAt: "", projects: [] };

export function Gallery() {
  const [snapshot, setSnapshot] = useState<GallerySnapshot>(emptySnapshot);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [recovered, setRecovered] = useState(false);

  function accept(data: Partial<GallerySnapshot> | null) {
    if (!data?.updatedAt || !Array.isArray(data.projects)) return false;
    setSnapshot((current) => {
      if (current.updatedAt && data.updatedAt! < current.updatedAt) return current;
      return { updatedAt: data.updatedAt!, projects: data.projects as Project[] };
    });
    setStatus("ready");
    return true;
  }

  useEffect(() => {
    let cancel = false;

    async function refresh() {
      try {
        const response = await fetch("/api/gallery", { cache: "no-store" });
        const data = (await response.json()) as Partial<GallerySnapshot> & { error?: string };
        if (cancel) return;
        if (!response.ok || !accept(data)) {
          setStatus((current) => (current === "ready" ? current : "error"));
        }
      } catch {
        if (!cancel) setStatus((current) => (current === "ready" ? current : "error"));
      }
    }

    async function migrate() {
      let saved = "";
      try {
        saved = localStorage.getItem(STORAGE_KEY) ?? "";
      } catch {
        return;
      }
      if (!saved) return;

      let local: unknown[] = [];
      try {
        const parsed = JSON.parse(saved) as unknown;
        if (Array.isArray(parsed)) local = parsed;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      if (local.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      try {
        const response = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "migrate", projects: local }),
        });
        const data = (await response.json()) as Partial<GallerySnapshot>;
        if (!response.ok || cancel) return;
        accept(data);
        localStorage.removeItem(STORAGE_KEY);
        if (!cancel) setRecovered(true);
      } catch {
        // Se conserva en este navegador para reintentar al recargar.
      }
    }

    void (async () => {
      await refresh();
      if (!cancel) await migrate();
    })();

    const timer = window.setInterval(() => {
      if (!document.hidden) void refresh();
    }, 15000);
    const onVisible = () => {
      if (!document.hidden) void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);

    return () => {
      cancel = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, []);

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const student = form.student.trim();
    const name = form.name.trim();
    const description = form.description.trim();
    const url = form.url.trim();

    if (!student || !name || !url || !description) {
      setError("Completa nombre, proyecto, enlace y descripción.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "publish", student, name, url, description }),
      });
      const data = (await response.json()) as Partial<GallerySnapshot> & { error?: string };
      if (!response.ok) {
        accept(data);
        setError(data.error || "No se pudo publicar. Inténtalo otra vez.");
        return;
      }
      accept(data);
      setForm(emptyForm);
    } catch {
      setError("No se pudo publicar. Revisa tu conexión e inténtalo otra vez.");
    } finally {
      setSaving(false);
    }
  }

  async function sendUpdate(body: Record<string, unknown>) {
    const response = await fetch("/api/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as Partial<GallerySnapshot> & { error?: string };
    if (!response.ok) {
      accept(data);
      throw new Error(data.error || "No se pudo guardar.");
    }
    accept(data);
  }

  return (
    <section id="galeria" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="06 — Galería de proyectos"
        title="Publica y califica con tus compañeros"
        text="Cada estudiante comparte su enlace de Vercel. El resto deja una puntuación de 1 a 5 estrellas y un comentario. Lo que se publica queda en un registro compartido: se ve desde cualquier celular o computadora y no se borra al cerrar el navegador."
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
          {recovered && (
            <p className="text-sm text-cyan-200">
              Se recuperaron publicaciones que estaban solo en este navegador.
            </p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="btn-shine justify-self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-black disabled:opacity-60"
          >
            {saving ? "Publicando…" : "Publicar proyecto"}
          </button>
        </form>
      </Reveal>

      <div className="mt-8 grid gap-4">
        {status === "loading" && (
          <p className="rounded-3xl border border-dashed border-white/15 px-6 py-10 text-center text-sm text-slate-400">
            Cargando el registro compartido…
          </p>
        )}
        {status === "error" && snapshot.projects.length === 0 && (
          <p className="rounded-3xl border border-dashed border-rose-300/30 px-6 py-10 text-center text-sm text-rose-200">
            No se pudo cargar el registro compartido. Recarga la página en unos segundos.
          </p>
        )}
        {status === "ready" && snapshot.projects.length === 0 && (
          <p className="rounded-3xl border border-dashed border-white/15 px-6 py-10 text-center text-sm text-slate-400">
            Aún no hay proyectos. Sé el primero en publicar el tuyo.
          </p>
        )}
        {snapshot.projects.map((project) => (
          <ProjectCard key={project.id} project={project} onUpdate={sendUpdate} />
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

function publishedOn(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-GT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function ProjectCard({
  project,
  onUpdate,
}: {
  project: Project;
  onUpdate: (body: Record<string, unknown>) => Promise<void>;
}) {
  const [author, setAuthor] = useState("");
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const score = average(project.ratings);
  const when = publishedOn(project.createdAt);

  async function run(action: () => Promise<void>, success: string) {
    setBusy(true);
    setNotice("");
    try {
      await action();
      setNotice(success);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "No se pudo guardar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="glass-card rounded-3xl border border-white/10 p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
            {project.student}
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-white">{project.name}</h3>
          {when && <p className="mt-1 text-xs text-slate-400">Publicado el {when}</p>}
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
                disabled={busy}
                onMouseEnter={() => setHover(star)}
                onClick={() => {
                  if (!author.trim()) {
                    setNotice("Escribe tu nombre antes de calificar.");
                    return;
                  }
                  void run(
                    () => onUpdate({ action: "rate", projectId: project.id, author, stars: star }),
                    `Registraste ${star} ${star === 1 ? "estrella" : "estrellas"}.`,
                  );
                }}
                className={`rounded-lg p-1 transition hover:-translate-y-0.5 disabled:opacity-50 ${
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
          disabled={busy}
          onClick={() => {
            if (!author.trim() || !text.trim()) {
              setNotice("El comentario necesita tu nombre y un mensaje.");
              return;
            }
            const message = text;
            void run(async () => {
              await onUpdate({
                action: "comment",
                projectId: project.id,
                author,
                text: message,
              });
              setText("");
            }, "Comentario publicado.");
          }}
          className="mt-3 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white hover:border-white/40 disabled:opacity-50"
        >
          Publicar comentario
        </button>
        {notice && <p className="mt-2 text-xs text-cyan-200">{notice}</p>}

        {project.comments.length > 0 && (
          <ul className="mt-4 space-y-2">
            {project.comments.map((item: Comment) => (
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
