export const priorKnowledge = [
  {
    id: "pagina",
    question: "¿Qué es una página web?",
    answer:
      "Es lo que el navegador muestra al abrir una dirección: una landing, un blog o el sitio de esta clase. Chrome, Edge, Firefox o Safari leen los archivos y los dibujan en pantalla.",
    groups: [
      {
        title: "Tecnologías actuales",
        items: [
          {
            name: "CSS",
            text: "El lenguaje de los estilos: color, tipografía, espacio y cómo se ve en el celular.",
          },
          {
            name: "Tailwind CSS",
            text: "La forma más usada hoy para diseñar rápido con clases. Es la que usaremos.",
          },
          {
            name: "React",
            text: "Interfaces actuales armadas por componentes, cuando la página necesita piezas que reaccionan.",
          },
        ],
      },
    ],
  },
  {
    id: "hosting",
    question: "¿Qué es un hosting?",
    answer:
      "Es el servicio que guarda los archivos de la página en un servidor siempre conectado, para que cualquiera pueda abrirla.",
    groups: [
      {
        title: "Dominio",
        items: [
          {
            name: "El nombre",
            text: "Es la dirección que se escribe, como tuproyecto.com. No guarda los archivos: solo apunta hacia ellos.",
          },
        ],
      },
      {
        title: "La diferencia",
        items: [
          {
            name: "Nombre y casa",
            text: "El dominio es el nombre. El hosting es donde viven los archivos. Puedes publicar en Vercel con un enlace gratis y comprar el dominio después.",
          },
        ],
      },
      {
        title: "Dónde publicar",
        items: [
          { name: "Vercel", text: "La usaremos en la charla." },
          { name: "Netlify", text: "Otra opción rápida para webs modernas." },
          { name: "Cloudflare Pages", text: "Publica desde el repositorio." },
          { name: "GitHub Pages", text: "Sitio directo desde GitHub." },
        ],
      },
      {
        title: "Dónde comprar el dominio",
        items: [
          { name: "Cloudflare", text: "Registro de dominios a precio de costo." },
          { name: "Namecheap", text: "Compra clara para empezar." },
          { name: "Porkbun", text: "Otra opción actual y sencilla." },
          { name: "GoDaddy", text: "De las más conocidas." },
        ],
      },
    ],
  },
  {
    id: "ide",
    question: "¿Qué es un IDE?",
    answer:
      "Es el programa donde se escribe y organiza el código. Reúne los archivos del proyecto, señala errores y, en los más actuales, incluye un agente de inteligencia artificial.",
    groups: [
      {
        title: "Los más usados hoy",
        items: [
          { name: "Kiro", text: "Agente en el editor. Es el de esta charla." },
          { name: "Cursor", text: "Escribe y corrige contigo con IA." },
          { name: "VS Code", text: "El editor más extendido para web." },
          { name: "WebStorm", text: "De JetBrains, frecuente en equipos." },
          { name: "Zed", text: "Editor ligero y rápido, pensado para el flujo actual." },
        ],
      },
    ],
  },
];

export const kiroLinks = [
  { label: "Sitio oficial", href: "https://kiro.dev/" },
  { label: "Documentación", href: "https://kiro.dev/docs" },
  { label: "Descargas", href: "https://kiro.dev/downloads/" },
  { label: "Anuncio oficial", href: "https://kiro.dev/blog/introducing-kiro/" },
];

export const kiroFacts = [
  {
    question: "¿Qué es?",
    answer:
      "Un IDE agéntico creado y operado por AWS. Escribes lo que necesitas y Kiro lo convierte en una especificación: requisitos, diseño y tareas, antes de implementar el código.",
  },
  {
    question: "¿Cuándo nació?",
    answer:
      "Se anunció el 14 de julio de 2025. Nikhil Swaminathan y Deepak Singh lo presentaron para acompañar un proyecto desde el prototipo hasta producción. El 17 de noviembre de 2025 pasó a disponibilidad general.",
  },
  {
    question: "¿Qué hace?",
    answer:
      "Ordena el trabajo del agente. A partir de un prompt arma la especificación, implementa las tareas y puede lanzar hooks al guardar, crear o borrar archivos.",
  },
];

export const kiroHighlights = [
  "No necesitas una cuenta de AWS para empezar.",
  "Entras con GitHub, Google, AWS Builder ID o IAM Identity Center.",
  "Está construido sobre Code OSS: puedes llevar ajustes de VS Code y extensiones de Open VSX.",
  "Funciona en Mac, Windows y Linux.",
  "También vive en la terminal, en el navegador y en el celular.",
  "Conecta otras herramientas con MCP y guía al agente con archivos de steering.",
];

export const kiroCapabilities = [
  {
    title: "De la idea a la especificación",
    text: "Un prompt se vuelve requisitos, diseño y una lista de tareas enlazadas.",
  },
  {
    title: "Implementar con el agente",
    text: "Ejecutas las tareas en orden y revisas los cambios antes de seguir.",
  },
  {
    title: "Explicar y corregir",
    text: "El chat del agente aclara un archivo, propone un arreglo o refactoriza.",
  },
  {
    title: "Automatizar con hooks",
    text: "Al guardar un archivo puede actualizar pruebas, documentación o una revisión de seguridad.",
  },
  {
    title: "Conectar herramientas",
    text: "MCP suma herramientas especializadas y steering fija cómo debe comportarse el agente.",
  },
  {
    title: "Elegir dónde trabajar",
    text: "El mismo flujo está en el IDE, en la CLI y en Kiro Web.",
  },
];

export const guideSteps = [
  {
    n: "01",
    title: "Descargar e instalar",
    text: "Descarga la aplicación desde su sitio oficial e instálala en tu computadora.",
  },
  {
    n: "02",
    title: "Iniciar sesión",
    text: "Abre el programa e inicia sesión con tu cuenta de correo o GitHub.",
  },
  {
    n: "03",
    title: "Crear tu proyecto",
    text: "Abre una carpeta vacía donde guardarás los archivos de tu proyecto.",
  },
  {
    n: "04",
    title: "Seleccionar el modo de conversación",
    text: "Abre el panel de IA con Ctrl + K o Ctrl + L (en Mac, Cmd + K o Cmd + L). Elige la modalidad de interacción: Agent o Chat.",
  },
  {
    n: "05",
    title: "Escribir el prompt",
    text: "Explícale a la IA, en español claro, lo que deseas construir.",
    example:
      "Crea una página landing en HTML y Tailwind CSS con temática de robótica que incluya un menú, una sección de características y un formulario de contacto.",
  },
];

export const deployOptions = [
  {
    name: "Opción A",
    title: "Arrastrar y soltar / CLI",
    text: "Sube tu carpeta directamente con Vercel CLI o mediante la opción de importación rápida.",
  },
  {
    name: "Opción B",
    title: "Conectado a GitHub",
    text: "Sube tu código a un repositorio de GitHub e impórtalo desde el panel de Vercel.",
  },
];
