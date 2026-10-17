"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, speaker } from "@/lib/content";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#0b1224]/95 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <a href="#inicio" className="flex items-center gap-2.5">
          <img
            src={speaker.avatar}
            alt=""
            className="h-10 w-10 rounded-full object-cover object-[center_18%] ring-1 ring-white/15"
          />
          <span className="text-sm font-semibold tracking-tight text-white">
            Kiro
            <span className="mx-1.5 text-slate-500">×</span>
            Vercel
          </span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Secciones">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#guia"
            className="btn-shine hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-glow-white sm:inline-flex"
          >
            Ver guía
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-white/10 bg-[#0b1224] px-5 py-4 lg:hidden"
          aria-label="Secciones móviles"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-xl px-3 py-3 text-sm text-slate-200 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#guia"
                className="mt-2 block rounded-full bg-white px-3 py-3 text-center text-sm font-semibold text-black"
                onClick={() => setOpen(false)}
              >
                Ver guía paso a paso
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
