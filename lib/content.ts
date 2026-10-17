export const docs = {
  kiro: "https://kiro.dev/docs",
  vercel: "https://vercel.com/docs",
  kiroHome: "https://kiro.dev",
  vercelHome: "https://vercel.com",
};

export const speaker = {
  name: "Lissy Amador",
  role: "Speaker",
  community: "AWS User Group Guatemala",
  photo: "/lissy-amador.jpg",
  logo: "/aws-ug-guatemala.png",
  summary:
    "Conduce esta sesión en vivo: de la especificación en Kiro al sitio publicado en Vercel.",
};

/** Sustituye estos href por las redes reales de Lissy Amador antes de la charla. */
export const speakerLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "X", href: "#" },
];

export const navLinks = [
  { href: "#conceptos", label: "Previos" },
  { href: "#kiro", label: "Kiro" },
  { href: "#guia", label: "Guía" },
  { href: "#deploy", label: "Deploy" },
  { href: "#galeria", label: "Galería" },
  { href: "#ponente", label: "Ponente" },
];

export const consolePhases = [
  {
    key: "requirements",
    kicker: "Requirements",
    title: "Especificar antes de codificar",
    lines: [
      "Landing de robótica",
      "Menú, características y contacto",
      "HTML + Tailwind CSS",
    ],
  },
  {
    key: "design",
    kicker: "Design",
    title: "La IA propone la estructura",
    lines: [
      "HTML: el esqueleto",
      "Tailwind: colores y layout",
      "Formulario de contacto",
    ],
  },
  {
    key: "tasks",
    kicker: "Tasks",
    title: "El agente arma la landing",
    lines: [
      "Menú de navegación",
      "Sección de características",
      "Formulario listo para revisar",
    ],
  },
  {
    key: "deploy",
    kicker: "Vercel",
    title: "Publicar en un clic",
    lines: [
      "Repositorio conectado",
      "Preview generado",
      "Producción en vivo",
    ],
  },
];

export const eras = [
  {
    index: "01",
    era: "El origen",
    title: "Código desde cero",
    text: "Cada pantalla, cada estilo y cada despliegue se escribían a mano. El ritmo lo marcaba el teclado, no la idea.",
    points: ["Lento y manual", "Mucho contexto en la cabeza", "Difícil de repetir en equipo"],
    tone: "slate" as const,
  },
  {
    index: "02",
    era: "La era del chat",
    title: "Cursor acelera la escritura",
    text: "El autocompletado, el chat y la edición multifichero acortan el camino. El flujo sigue siendo code-first y el uso avanzado depende de créditos.",
    points: [
      "Sugerencias directas de código",
      "Chat interactivo",
      "Modelo de créditos / Pro",
    ],
    tone: "cursor" as const,
  },
  {
    index: "03",
    era: "La era agéntica",
    title: "Kiro planifica y construye",
    text: "Primero la especificación: requisitos, diseño y tareas. Los hooks cuidan la calidad y el tier inicial permite arrancar proyectos sin el consumo clásico de chat. El cierre es un deploy en Vercel.",
    points: [
      "Plan first: spec antes de código",
      "Agent Hooks automáticos",
      "Arranque accesible y deploy inmediato",
    ],
    tone: "kiro" as const,
  },
];

export const comparison = {
  cursor: {
    name: "Cursor",
    role: "El estándar de velocidad",
    philosophy: "Code First",
    philosophyDetail: "Tira código primero, ajusta después.",
    focus: "Autocompletado rápido, chat interactivo y edición multifichero.",
    model: "Sistema de créditos y suscripción Pro para las funciones avanzadas.",
  },
  kiro: {
    name: "Kiro",
    role: "El futuro agéntico y guiado",
    philosophy: "Plan First",
    philosophyDetail: "Estructura antes de codificar, con Agent Hooks automáticos.",
    focus: "Desarrollo basado en specs: requisitos, diseño y tareas.",
    model:
      "Acceso inicial muy accesible, sin gastar créditos en el consumo tradicional de chat. Ideal para iniciar proyectos.",
  },
};

export const steps = [
  {
    n: "01",
    title: "Escribir la especificación",
    kicker: "Spec-driven",
    text: "Define el proyecto en Kiro con requisitos claros: qué debe hacer la web, para quién y cómo se ve el resultado.",
  },
  {
    n: "02",
    title: "Generación agéntica",
    kicker: "Sub-agentes",
    text: "Deja que los sub-agentes de Kiro creen los componentes, los estilos y la estructura a partir del diseño y las tareas.",
  },
  {
    n: "03",
    title: "Hooks y calidad",
    kicker: "Agent Hooks",
    text: "Al guardar, los hooks verifican la calidad del código, formatean y ejecutan comprobaciones en segundo plano.",
  },
  {
    n: "04",
    title: "Deploy en un clic",
    kicker: "Vercel",
    text: "Conecta el repositorio de Git a Vercel y publica la web en vivo, con preview y producción en el mismo flujo.",
  },
];

export const benefits = [
  {
    title: "Zero Barriers",
    text: "Empieza el proyecto sin la presión de agotar créditos a mitad de la demo. El primer impulso cabe en el tier inicial.",
    detail: "Ideal para una charla en vivo: menos fricción, más construcción.",
  },
  {
    title: "Arquitectura estructurada",
    text: "Kiro no se limita a escribir código. Deja documentación de diseño y una lista de tareas que el equipo puede leer.",
    detail: "Requisitos, diseño y tareas quedan como artefacto, no como chat perdido.",
  },
  {
    title: "Despliegue ultra rápido",
    text: "El repositorio sale de Kiro y entra en Vercel. La URL pública aparece en la misma sesión de la charla.",
    detail: "Preview, dominio y producción dentro del ecosistema de Vercel.",
  },
  {
    title: "Hooks de automatización",
    text: "Agentes que lanzan pruebas y formateo al guardar, para que la calidad no dependa de acordarse al final.",
    detail: "El control de calidad ocurre en background, mientras sigues la narrativa.",
  },
];
