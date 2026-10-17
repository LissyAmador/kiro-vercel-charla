export const feedbackForm = "https://docs.google.com/forms/d/e/FORM_ID/viewform";

export const docs = {
  kiro: "https://kiro.dev/docs",
  vercel: "https://vercel.com/docs",
  kiroHome: "https://kiro.dev",
  vercelHome: "https://vercel.com",
};

export const speaker = {
  name: "Lissy Amador",
  role: "Licenciada en Innovación Educativa",
  focus: "Estudiante de Maestría en Docencia Universitaria",
  community: "AWS User Group Guatemala",
  photo: "/lissy-amador.jpg",
  avatar: "/lissy-amador-perfil.png",
  logo: "/aws-ug-guatemala.png",
  summary:
    "Apasionada por la tecnología y convencida de su poder para transformar vidas, fundé EDUKIDS para despertar la curiosidad, impulsar la creatividad y acercar las nuevas tecnologías a las futuras generaciones. Actualmente exploro cómo la programación y la inteligencia artificial pueden convertirse en herramientas para crear soluciones con impacto.",
};

export const speakerLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lissyamadorsazo/",
    detail: "lissyamadorsazo",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lissyamadors/",
    detail: "@lissyamadors",
  },
  {
    label: "EDUKIDS",
    href: "https://www.facebook.com/gaming/edukidsgt",
    detail: "Academia en Facebook",
  },
];

export const navLinks = [
  { href: "#conceptos", label: "Previos" },
  { href: "#kiro", label: "Kiro" },
  { href: "#guia", label: "Guía" },
  { href: "#deploy", label: "Deploy" },
  { href: "#galeria", label: "Galería" },
  { href: "#ponente", label: "Ponente" },
  { href: "#feedback", label: "Califica" },
];

export const icebreakers = [
  {
    key: "error-404",
    title: "El Error 404",
    prompt:
      "Entras a una URL buscando documentación o información y te sale un “Error 404: Not Found”...",
    choices: [
      {
        id: "A",
        gesture: "Manos en la cabeza",
        text: "Asumo que el servidor o el enlace están caídos, modifico manualmente la URL a ver si le atino al directorio correcto.",
      },
      {
        id: "B",
        gesture: "Brazos cruzados",
        text: "Cierro la pestaña de inmediato, regreso a Google y busco un enlace alternativo.",
      },
      {
        id: "C",
        gesture: "Brazos arriba",
        text: "Le pido a una IA o a un agente que me resuma el tema o me busque una fuente similar activa.",
      },
    ],
  },
  {
    key: "busqueda",
    title: "La búsqueda de información",
    prompt:
      "Llevas 15 minutos en Google y no encuentras la solución a un problema técnico o de investigación...",
    choices: [
      {
        id: "A",
        gesture: "Manos en la cabeza",
        text: "Cambio las palabras clave en la búsqueda (queries) y pruebo buscando directamente en inglés.",
      },
      {
        id: "B",
        gesture: "Brazos cruzados",
        text: "Abro los comentarios de Reddit, Stack Overflow o foros para ver cómo lo resolvió alguien más.",
      },
      {
        id: "C",
        gesture: "Brazos arriba",
        text: "Abro Kiro o ChatGPT, le describo el problema exacto y le pido que me redacte la solución paso a paso.",
      },
    ],
  },
  {
    key: "validacion",
    title: "Validación y “stalkeo” técnico",
    prompt:
      "Antes de usar una herramienta, librería o repositorio nuevo para un proyecto...",
    choices: [
      {
        id: "A",
        gesture: "Manos en la cabeza",
        text: "Reviso la documentación oficial a fondo para entender la arquitectura antes de probar nada.",
      },
      {
        id: "B",
        gesture: "Brazos cruzados",
        text: "Reviso opiniones, estrellas en GitHub o comentarios de la comunidad para corroborar si realmente funciona.",
      },
      {
        id: "C",
        gesture: "Brazos arriba",
        text: "Corro un ejemplo rápido en vivo o dejo que la IA genere un prototipo básico para probarlo en minutos.",
      },
    ],
  },
  {
    key: "proyecto",
    title: "Empezar un proyecto web desde cero",
    prompt:
      "Tienes que crear la interfaz de una página web desde cero para un proyecto o presentación...",
    choices: [
      {
        id: "A",
        gesture: "Manos en la cabeza",
        text: "Abro el editor y escribo toda la estructura desde cero a mano para tener control total de cada línea.",
      },
      {
        id: "B",
        gesture: "Brazos cruzados",
        text: "Busco una plantilla o un maquetador visual para no complicarme con el diseño.",
      },
      {
        id: "C",
        gesture: "Brazos arriba",
        text: "Le describo a Kiro en lenguaje natural lo que necesito para que me entregue el código listo y desplegarlo en Vercel.",
      },
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
