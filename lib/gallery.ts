export type Comment = { id: string; author: string; text: string };
export type Rating = { author: string; stars: number };
export type Project = {
  id: string;
  student: string;
  name: string;
  url: string;
  description: string;
  createdAt: string;
  ratings: Rating[];
  comments: Comment[];
};

export type GallerySnapshot = {
  updatedAt: string;
  projects: Project[];
};

const idPattern = /^[0-9a-f-]{8,80}$/i;

function clip(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function normalizeUrl(input: string) {
  const raw = input.trim();
  if (!raw || raw.length > 300) return null;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const parsed = new URL(withProtocol);
    const hostname = parsed.hostname.toLowerCase();
    const allowed =
      parsed.protocol === "http:" || parsed.protocol === "https:";
    if (!allowed || !hostname || (!hostname.includes(".") && hostname !== "localhost")) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

export function sameUrl(left: string, right: string) {
  return left.replace(/\/+$/, "").toLowerCase() === right.replace(/\/+$/, "").toLowerCase();
}

function sanitizeRating(input: unknown): Rating | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const author = clip(raw.author, 80);
  const stars = Number(raw.stars);
  if (!author || !Number.isInteger(stars) || stars < 1 || stars > 5) return null;
  return { author, stars };
}

function sanitizeComment(input: unknown): Comment | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const author = clip(raw.author, 80);
  const text = clip(raw.text, 400);
  if (!author || !text) return null;
  const id = typeof raw.id === "string" && idPattern.test(raw.id) ? raw.id : crypto.randomUUID();
  return { id, author, text };
}

export function sanitizeProject(input: unknown): Project | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const student = clip(raw.student, 80);
  const name = clip(raw.name, 80);
  const description = clip(raw.description, 500);
  const url = normalizeUrl(typeof raw.url === "string" ? raw.url : "");
  if (!student || !name || !description || !url) return null;

  const id = typeof raw.id === "string" && idPattern.test(raw.id) ? raw.id : crypto.randomUUID();
  const createdAt =
    typeof raw.createdAt === "string" && !Number.isNaN(Date.parse(raw.createdAt))
      ? new Date(raw.createdAt).toISOString()
      : new Date().toISOString();
  const ratings = Array.isArray(raw.ratings)
    ? raw.ratings
        .slice(0, 80)
        .map(sanitizeRating)
        .filter((item): item is Rating => item !== null)
    : [];
  const comments = Array.isArray(raw.comments)
    ? raw.comments
        .slice(0, 80)
        .map(sanitizeComment)
        .filter((item): item is Comment => item !== null)
    : [];

  return { id, student, name, url, description, createdAt, ratings, comments };
}

export function orderProjects(projects: Project[]) {
  return [...projects].sort(
    (left, right) =>
      right.createdAt.localeCompare(left.createdAt) || right.id.localeCompare(left.id),
  );
}
