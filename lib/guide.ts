export const priorKnowledge = [
  {
    id: "pagina",
    question: "¿Qué es una página web?",
    answer:
      "Es lo que aparece en el navegador cuando entras a una dirección: una landing, un blog o el sitio de esta clase. Chrome, Edge, Firefox o Safari leen unos archivos y los dibujan en pantalla.",
    points: ["Se abre con un enlace", "El navegador la interpreta", "Vive hecha de archivos"],
  },
  {
    id: "hosting",
    question: "¿Qué es un hosting?",
    answer:
      "Es el servicio que guarda esos archivos en una computadora siempre encendida y conectada a Internet. Sin hosting la página solo existe en tu equipo. Con hosting, cualquiera puede abrirla a cualquier hora.",
    points: ["Aloja los archivos", "Entrega un enlace público", "Está disponible todo el día"],
  },
  {
    id: "servicios",
    question: "¿Qué servicios de hosting conocen?",
    answer:
      "En clase usaremos Vercel. Estas son las opciones que más suelen aparecer cuando alguien publica su primera web.",
    points: [
      "Vercel y Netlify: webs modernas, con plan gratis para empezar",
      "GitHub Pages: publica directo desde un repositorio",
      "Hostinger y SiteGround: hosting clásico para sitios y blogs",
    ],
  },
  {
    id: "ide",
    question: "¿Qué es un IDE?",
    answer:
      "Es el programa donde se escribe y organiza el código. Muestra los archivos del proyecto, señala errores y, en Cursor o Kiro, incluye un chat de inteligencia artificial. No es el navegador ni un bloc de notas.",
    points: ["Editor de código", "Archivos del proyecto juntos", "A veces, un agente de IA"],
  },
  {
    id: "ides",
    question: "¿Cuáles son los IDE más conocidos?",
    answer:
      "Casi todos parten de la misma idea: una ventana para escribir código. La diferencia está en cuánta ayuda de IA traen integrada.",
    points: [
      "Visual Studio Code: el editor más usado para web",
      "Cursor y Kiro: escriben y corrigen contigo con IA",
      "WebStorm y Sublime Text: otras opciones frecuentes",
    ],
  },
  {
    id: "html",
    question: "¿Qué es HTML?",
    answer:
      "El esqueleto de la página. Indica qué hay: un menú, un título, una imagen o un formulario. El navegador no inventa esa estructura; la lee del HTML.",
    points: ["Estructura", "Etiquetas como título y párrafo", "Sin HTML no hay página"],
  },
  {
    id: "css",
    question: "¿Qué es CSS?",
    answer:
      "La apariencia. Define colores, tipografías, espacios y cómo se acomoda el contenido en el celular y en la computadora. Sin CSS la página se lee, pero se ve como un documento plano.",
    points: ["Colores y tipografía", "Espacios y columnas", "Se adapta a la pantalla"],
  },
  {
    id: "javascript",
    question: "¿Qué es JavaScript?",
    answer:
      "El comportamiento. Hace que la página reaccione: un menú que se abre, un formulario que avisa si falta un dato o un mensaje que aparece al hacer clic.",
    points: ["Clics y menús", "Validación de formularios", "Mensajes y animaciones"],
  },
  {
    id: "tailwind",
    question: "¿Qué es Tailwind CSS?",
    answer:
      "Una forma rápida de aplicar CSS con clases escritas directo en el HTML, como text-white o rounded-xl. Diseñas sin armar una hoja de estilos desde cero. Es lo que usaremos en el ejercicio.",
    points: ["Clases listas para usar", "Se escribe junto al HTML", "Acelera el diseño"],
  },
];

export const kiroFacts = [
  {
    question: "¿Qué es Kiro / Cursor?",
    answer:
      "Es un editor de código (IDE) impulsado por inteligencia artificial. Sirve para acelerar el desarrollo, escribir código mediante prompts en lenguaje natural y corregir errores automáticamente.",
  },
  {
    question: "¿Cuándo nació?",
    answer:
      "Surgió como una evolución de los editores tradicionales para integrar agentes de IA avanzados directamente en la ventana de trabajo del desarrollador.",
  },
  {
    question: "¿Por qué nació y para qué se usa?",
    answer:
      "Nació para democratizar la programación. Permite a estudiantes y desarrolladores enfocarse en la lógica y la creatividad, y delegar las tareas repetitivas de código a la IA.",
  },
];

export const kiroCapabilities = [
  "Generar componentes y páginas completas a partir de descripciones en texto.",
  "Explicar líneas de código complejas.",
  "Corregir errores (bugs) de manera instantánea.",
  "Refactorizar proyectos y conectarlos con APIs externas.",
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
