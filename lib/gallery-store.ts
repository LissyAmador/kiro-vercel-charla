import {
  orderProjects,
  sameUrl,
  sanitizeProject,
  type GallerySnapshot,
  type Project,
} from "@/lib/gallery";

const FILE_NAME = "gallery.json";

export class GalleryError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function gistId() {
  const id = process.env.GALLERY_GIST_ID ?? "";
  if (!/^[a-f0-9]+$/i.test(id)) {
    throw new GalleryError("El registro compartido no está configurado.", 503);
  }
  return id;
}

function token() {
  const value = process.env.GALLERY_GITHUB_TOKEN ?? "";
  if (!value) {
    throw new GalleryError("El registro compartido no está configurado.", 503);
  }
  return value;
}

type GistFile = {
  content?: string;
  truncated?: boolean;
  raw_url?: string;
};

type GistResponse = {
  updated_at?: string;
  files?: Record<string, GistFile>;
};

let cache: { at: number; ttl: number; data: GallerySnapshot } | null = null;

async function github(path: string, init?: RequestInit) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token()}`,
      "User-Agent": "kiro-charla-gallery",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  if (response.status === 401 || response.status === 403) {
    throw new GalleryError("El registro compartido no aceptó la operación.", response.status);
  }
  if (!response.ok) {
    throw new GalleryError("No se pudo usar el registro compartido.", 502);
  }
  return response;
}

function projectsFromContent(content: string) {
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new GalleryError("El registro compartido está dañado.", 502);
  }
  const projects = (parsed as { projects?: unknown }).projects;
  if (!Array.isArray(projects)) return [];
  return orderProjects(
    projects
      .slice(0, 200)
      .map((item) => sanitizeProject(item))
      .filter((item): item is Project => item !== null),
  );
}

async function snapshotFromGist(gist: GistResponse): Promise<GallerySnapshot> {
  const file = gist.files?.[FILE_NAME];
  if (!file) throw new GalleryError("No se encontró el registro compartido.", 502);

  let content = file.content ?? "";
  if (file.truncated && file.raw_url) {
    const raw = await fetch(file.raw_url, {
      cache: "no-store",
      headers: { "User-Agent": "kiro-charla-gallery" },
    });
    if (!raw.ok) throw new GalleryError("No se pudo leer el registro compartido.", 502);
    content = await raw.text();
  }

  return {
    updatedAt: gist.updated_at || new Date().toISOString(),
    projects: projectsFromContent(content || '{"projects":[]}'),
  };
}

async function readFresh() {
  const response = await github(`/gists/${gistId()}`);
  const remaining = Number(response.headers.get("x-ratelimit-remaining") ?? "5000");
  const snapshot = await snapshotFromGist((await response.json()) as GistResponse);
  cache = {
    at: Date.now(),
    ttl: remaining < 400 ? 20000 : 5000,
    data: snapshot,
  };
  return snapshot;
}

export async function listGallery() {
  if (cache && Date.now() - cache.at < cache.ttl) return cache.data;
  return readFresh();
}

async function writeProjects(projects: Project[]) {
  const ordered = orderProjects(projects).slice(0, 200);
  const payload = JSON.stringify(
    { updatedAt: new Date().toISOString(), projects: ordered },
    null,
    2,
  );
  if (payload.length > 900_000) {
    throw new GalleryError("El registro ya no tiene espacio.", 413);
  }

  const response = await github(`/gists/${gistId()}`, {
    method: "PATCH",
    body: JSON.stringify({
      files: {
        [FILE_NAME]: { content: payload },
      },
    }),
  });
  const snapshot = await snapshotFromGist((await response.json()) as GistResponse);
  cache = { at: Date.now(), ttl: cache?.ttl ?? 5000, data: snapshot };
  return snapshot;
}

async function mutate(change: (projects: Project[]) => Project[]) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const current = await readFresh();
    const next = orderProjects(change(current.projects)).slice(0, 200);
    if (JSON.stringify(current.projects) === JSON.stringify(next)) return current;

    const written = await writeProjects(next);
    const check = await readFresh();
    const kept = next.every((project) =>
      check.projects.some((item) => item.id === project.id),
    );
    if (kept && check.updatedAt === written.updatedAt) {
      cache = { at: Date.now(), ttl: cache?.ttl ?? 5000, data: check };
      return check;
    }
  }
  throw new GalleryError("Otro compañero publicó al mismo tiempo. Inténtalo otra vez.", 409);
}

export async function publishProject(input: {
  student: string;
  name: string;
  url: string;
  description: string;
}) {
  const project = sanitizeProject({
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ratings: [],
    comments: [],
  });
  if (!project) {
    throw new GalleryError(
      "Revisa el nombre, el proyecto, el enlace y la descripción.",
      400,
    );
  }

  const snapshot = await mutate((projects) => {
    if (projects.some((item) => sameUrl(item.url, project.url))) return projects;
    if (projects.length >= 200) {
      throw new GalleryError("El registro ya llegó al máximo de proyectos.", 413);
    }
    return [project, ...projects];
  });

  if (!snapshot.projects.some((item) => item.id === project.id)) {
    throw new GalleryError("Ese enlace ya está publicado.", 409);
  }
  return snapshot;
}

export async function migrateProjects(inputs: unknown[]) {
  const incoming = (Array.isArray(inputs) ? inputs : [])
    .slice(0, 40)
    .map((item) => sanitizeProject(item))
    .filter((item): item is Project => item !== null);

  return mutate((projects) => {
    const next = [...projects];
    for (const project of incoming) {
      const exists = next.some(
        (item) => item.id === project.id || sameUrl(item.url, project.url),
      );
      if (exists || next.length >= 200) continue;
      next.push(project);
    }
    return next;
  });
}

export async function rateProject(projectId: string, author: string, stars: number) {
  const ratingAuthor = author.trim().slice(0, 80);
  if (!ratingAuthor || !Number.isInteger(stars) || stars < 1 || stars > 5) {
    throw new GalleryError("Escribe tu nombre y elige de 1 a 5 estrellas.", 400);
  }

  const snapshot = await mutate((projects) =>
    projects.map((project) => {
      if (project.id !== projectId) return project;
      const ratings = project.ratings.filter(
        (item) => item.author.toLowerCase() !== ratingAuthor.toLowerCase(),
      );
      return { ...project, ratings: [...ratings, { author: ratingAuthor, stars }] };
    }),
  );

  const saved = snapshot.projects.find((project) => project.id === projectId);
  const applied = saved?.ratings.some(
    (item) => item.author.toLowerCase() === ratingAuthor.toLowerCase() && item.stars === stars,
  );
  if (!applied) throw new GalleryError("Ese proyecto ya no está en el registro.", 404);
  return snapshot;
}

export async function commentProject(projectId: string, author: string, text: string) {
  const commentAuthor = author.trim().slice(0, 80);
  const message = text.trim().slice(0, 400);
  if (!commentAuthor || !message) {
    throw new GalleryError("El comentario necesita tu nombre y un mensaje.", 400);
  }

  const comment = { id: crypto.randomUUID(), author: commentAuthor, text: message };
  const snapshot = await mutate((projects) =>
    projects.map((project) => {
      if (project.id !== projectId) return project;
      return { ...project, comments: [...project.comments, comment].slice(-80) };
    }),
  );

  const saved = snapshot.projects.find((project) => project.id === projectId);
  if (!saved?.comments.some((item) => item.id === comment.id)) {
    throw new GalleryError("Ese proyecto ya no está en el registro.", 404);
  }
  return snapshot;
}
