import { NextResponse } from "next/server";
import { GalleryError, commentProject, listGallery, migrateProjects, publishProject, rateProject } from "@/lib/gallery-store";

export const dynamic = "force-dynamic";

function failure(error: unknown) {
  if (error instanceof GalleryError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("gallery", error instanceof Error ? error.message : "error");
  return NextResponse.json(
    { error: "No se pudo usar el registro compartido. Inténtalo otra vez." },
    { status: 500 },
  );
}

export async function GET() {
  try {
    const snapshot = await listGallery();
    return NextResponse.json(snapshot, {
      headers: {
        "Cache-Control": "public, s-maxage=8, stale-while-revalidate=8",
      },
    });
  } catch (error) {
    return failure(error);
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "No se pudo leer el formulario." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "No se pudo leer el formulario." }, { status: 400 });
  }

  const action = (body as { action?: string }).action;
  try {
    if (action === "publish") {
      const snapshot = await publishProject(body as {
        student: string;
        name: string;
        url: string;
        description: string;
      });
      return NextResponse.json(snapshot);
    }
    if (action === "migrate") {
      const projects = (body as { projects?: unknown }).projects;
      const snapshot = await migrateProjects(Array.isArray(projects) ? projects : []);
      return NextResponse.json(snapshot);
    }
    return NextResponse.json({ error: "Acción desconocida." }, { status: 400 });
  } catch (error) {
    return failure(error);
  }
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "No se pudo leer el formulario." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "No se pudo leer el formulario." }, { status: 400 });
  }

  const payload = body as {
    action?: string;
    projectId?: string;
    author?: string;
    stars?: number;
    text?: string;
  };

  try {
    if (payload.action === "rate") {
      const snapshot = await rateProject(
        payload.projectId ?? "",
        payload.author ?? "",
        Number(payload.stars),
      );
      return NextResponse.json(snapshot);
    }
    if (payload.action === "comment") {
      const snapshot = await commentProject(
        payload.projectId ?? "",
        payload.author ?? "",
        payload.text ?? "",
      );
      return NextResponse.json(snapshot);
    }
    return NextResponse.json({ error: "Acción desconocida." }, { status: 400 });
  } catch (error) {
    return failure(error);
  }
}
