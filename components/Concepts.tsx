import {
  AppWindow,
  Braces,
  Code2,
  Globe,
  MonitorSmartphone,
  Palette,
  Server,
  Sparkles,
  Wind,
} from "lucide-react";
import { FlipCard } from "@/components/FlipCard";
import { SectionHeading } from "@/components/Reveal";
import { priorKnowledge } from "@/lib/guide";

const icons = {
  pagina: Globe,
  hosting: Server,
  servicios: MonitorSmartphone,
  ide: Code2,
  ides: AppWindow,
  html: Braces,
  css: Palette,
  javascript: Sparkles,
  tailwind: Wind,
} as const;

export function Concepts() {
  return (
    <section id="conceptos" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="02 — Conocimientos previos"
        title="Antes de escribir la primera línea"
        text="Nueve preguntas para alinear al grupo: qué es una página, dónde se publica, con qué programa se escribe y con qué piezas se arma. Toca una tarjeta para voltearla y ver el concepto."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {priorKnowledge.map((card) => {
          const Icon = icons[card.id as keyof typeof icons];
          return (
            <FlipCard
              key={card.id}
              question={card.question}
              answer={card.answer}
              points={card.points}
              icon={<Icon size={18} />}
            />
          );
        })}
      </div>
    </section>
  );
}
