import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Construyendo con Kiro | AWS User Group Guatemala",
  description:
    "Guía paso a paso para crear y desplegar una página web con el agente Kiro de AWS, en el Congreso Informático 2026 de la Universidad Mariano Gálvez de Huehuetenango.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body className="font-sans antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-ink" />
          <div className="bg-grid absolute inset-0" />
          <div className="absolute -left-24 top-[-6rem] h-[28rem] w-[28rem] rounded-full bg-kiro/30 blur-[120px]" />
          <div className="absolute right-[-8rem] top-40 h-[26rem] w-[26rem] rounded-full bg-tide/20 blur-[120px]" />
          <div className="absolute bottom-[-10rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-indigo-500/10 blur-[120px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
