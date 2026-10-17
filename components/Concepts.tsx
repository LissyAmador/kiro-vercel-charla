import { Code2, Globe, Server } from "lucide-react";
import { KnowledgeCard } from "@/components/KnowledgeCard";
import { SectionHeading } from "@/components/Reveal";
import { priorKnowledge } from "@/lib/guide";

const icons = {
  pagina: Globe,
  hosting: Server,
  ide: Code2,
} as const;

export function Concepts() {
  return (
    <section id="conceptos" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="02 — Conocimientos previos"
        title="Antes de escribir la primera línea"
        text="Tres preguntas. Toca una tarjeta para voltearla y ver la respuesta."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {priorKnowledge.map((card) => {
          const Icon = icons[card.id as keyof typeof icons];
          return (
            <KnowledgeCard
              key={card.id}
              question={card.question}
              answer={card.answer}
              groups={card.groups}
              icon={<Icon size={20} />}
            />
          );
        })}
      </div>
    </section>
  );
}
