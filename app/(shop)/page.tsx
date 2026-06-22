export const revalidate = 60

import Link from "next/link";
import TipList from "@/components/shop/CategoryList";
import OblastList from "@/components/shop/OblastList";
import PaginatedPropertyGrid from "@/components/shop/PaginatedPropertyGrid";
import HomepageVideos from "@/components/nekretnine/HomepageVideos";
import TypewriterText from "@/components/nekretnine/TypewriterText";
import {
  getIstaknuteNekretnine,
  getAllTipovi,
  getAllOblasti,
  getVideoPrezentacije,
} from "@/lib/sanity/queries";

export default async function HomePage() {
  const [istaknuteNekretnine, tipovi, oblasti, videoPrezentacije] = await Promise.all([
    getIstaknuteNekretnine(),
    getAllTipovi(),
    getAllOblasti(),
    getVideoPrezentacije(30),
  ]);

  return (
    <main>
      {/* Hero */}
      <section className="relative text-white h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
        {/* Background image */}
        <img
          src="/hero.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-right md:object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/0" />

        {/* Main content */}
        <div className="relative flex-1 flex flex-col">
          <div className="max-w-6xl mx-auto w-full px-4 flex-1 flex flex-col py-4">
            {/* Logo */}
            <div className="mb-auto">
              <div className="flex flex-col items-center w-fit">
                <img src="/logo.png" alt="Haris Nekretnine" className="h-12 md:h-24 w-auto" />
                <h1 className="text-[#D4AF37] font-semibold uppercase tracking-tight mt-3 leading-tight text-center">
                  <span className="text-xl md:text-2xl block">Haris Nekretnine</span>
                  <span className="text-sm font-normal tracking-widest block">
                    — invest &amp; rent —
                  </span>
                  <span className="text-sm font-normal tracking-widest block">
                    — prijepolje zlatibor —
                  </span>
                </h1>
              </div>
            </div>

            {/* Heading + CTA */}
            <div className="flex-1 flex flex-col justify-end pb-8 md:pb-0 max-w-3xl">
              <p className="font-heading font-light text-4xl md:text-5xl lg:text-6xl leading-none mb-4">
                <TypewriterText />
              </p>
              {/* Gold divider */}
              <div className="w-16 h-px bg-[#D4AF37] mb-4" />
              <p className="text-white/75 text-base md:text-lg mb-4 leading-relaxed">
                Prava prezentacija je prvi korak do{" "}
                <span className="text-[#D4AF37]">uspešne i brze prodaje.</span>
              </p>
              <div className="flex flex-col gap-2 text-base text-white/80">
                <a
                  href="tel:+38165277705"
                  className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#D4AF37] text-[#D4AF37] shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                    </svg>
                  </span>
                  +381 65 277 705
                </a>
                <a
                  href="mailto:haris@berries.rs"
                  className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#D4AF37] text-[#D4AF37] shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  haris@berries.rs
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom features bar — desktop only */}
        <div className="hidden md:block relative pb-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 bg-black/75 border border-white/10">
              {/* Prezentacija */}
              <div className="flex flex-col items-center text-center px-3 py-2 md:py-4 gap-1 md:gap-1">
                <svg
                  className="text-[#D4AF37] w-7 h-7 mb-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <p className="text-white text-xs font-bold tracking-widest">
                  PREZENTACIJA
                  <br />
                  NEKRETNINA
                </p>
                <p className="text-white/55 text-xs leading-relaxed hidden md:block">
                  Ističemo najbolje osobine Vaše nekretnine
                </p>
              </div>
              {/* Diskrecija */}
              <div className="flex flex-col items-center text-center px-3 py-2 md:py-4 gap-1 md:gap-1">
                <svg
                  className="text-[#D4AF37] w-7 h-7 mb-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
                <p className="text-white text-xs font-bold tracking-widest">
                  DISKRECIJA
                  <br />I POVERENJE
                </p>
                <p className="text-white/55 text-xs leading-relaxed hidden md:block">
                  Profesionalno i poverljivo zastupamo Vaše interese
                </p>
              </div>
              {/* Posvećenost */}
              <div className="flex flex-col items-center text-center px-3 py-2 md:py-4 gap-1 md:gap-1">
                <svg
                  className="text-[#D4AF37] w-7 h-7 mb-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
                <p className="text-white text-xs font-bold tracking-widest">
                  POSVEĆENOST
                  <br />
                  VLASNICIMA
                </p>
                <p className="text-white/55 text-xs leading-relaxed hidden md:block">
                  Vaše ciljeve stavljamo na prvo mesto
                </p>
              </div>
              {/* Partnerstvo */}
              <div className="flex flex-col items-center text-center px-3 py-2 md:py-4 gap-1 md:gap-1">
                <svg
                  className="text-[#D4AF37] w-7 h-7 mb-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
                  />
                </svg>
                <p className="text-white text-xs font-bold tracking-widest">
                  PARTNERSTVO
                  <br />
                  KOJE TRAJE
                </p>
                <p className="text-white/55 text-xs leading-relaxed hidden md:block">
                  Dugoročna saradnja zasnovana na poverenju
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kartice — samo mobilni */}
      <div className="md:hidden bg-gray-900 border-t border-white/10">
        <div className="grid grid-cols-2 divide-x divide-white/10">
          <div className="flex flex-col items-center text-center px-4 py-6 gap-2 border-b border-white/10">
            <svg
              className="text-[#D4AF37] w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <p className="text-white text-xs font-bold tracking-widest">
              PREZENTACIJA
              <br />
              NEKRETNINA
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              Ističemo najbolje osobine Vaše nekretnine
            </p>
          </div>
          <div className="flex flex-col items-center text-center px-4 py-6 gap-2 border-b border-white/10">
            <svg
              className="text-[#D4AF37] w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
            <p className="text-white text-xs font-bold tracking-widest">
              DISKRECIJA
              <br />I POVERENJE
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              Profesionalno i poverljivo zastupamo Vaše interese
            </p>
          </div>
          <div className="flex flex-col items-center text-center px-4 py-6 gap-2">
            <svg
              className="text-[#D4AF37] w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            <p className="text-white text-xs font-bold tracking-widest">
              POSVEĆENOST
              <br />
              VLASNICIMA
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              Vaše ciljeve stavljamo na prvo mesto
            </p>
          </div>
          <div className="flex flex-col items-center text-center px-4 py-6 gap-2">
            <svg
              className="text-[#D4AF37] w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
              />
            </svg>
            <p className="text-white text-xs font-bold tracking-widest">
              PARTNERSTVO
              <br />
              KOJE TRAJE
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              Dugoročna saradnja zasnovana na poverenju
            </p>
          </div>
        </div>
      </div>

      {/* O nama sekcija */}
      <section className="bg-white border-t border-gray-100 py-14 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-center">
          {/* Slika */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/o nama.jpg"
              alt="Haris Nekretnine"
              className="max-h-120 w-auto mx-auto block"
            />
          </div>

          {/* Tekst i kontakt */}
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">O nama</p>
            <h2 className="text-2xl md:text-3xl font-bold text-green-900 leading-snug">
              Mesto gde nekretnine dobijaju prezentaciju kakvu zaslužuju.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Haris Nekretnine je moderan brend posvećen profesionalnoj prezentaciji nekretnina kroz
              fotografiju, video produkciju, digitalni marketing i promociju na savremenim online
              kanalima.
            </p>

            {/* Kontakt info */}
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <a
                href="tel:+38165277705"
                className="flex items-center gap-2 hover:text-green-900 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +381 65 2777705
              </a>
              <a
                href="mailto:haris@berries.rs"
                className="flex items-center gap-2 hover:text-green-900 transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,12 2,6" />
                </svg>
                haris@berries.rs
              </a>
            </div>

            {/* Socijalne mreže */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/haris.nekretnine_invest.rent/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-green-900 text-white flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61587038136266"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-green-900 text-white flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@haris.nekretnine"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-green-900 text-white flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                aria-label="TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </a>
            </div>

            <Link
              href="/o-nama"
              className="inline-block mt-2 px-5 py-2.5 border border-green-900 text-green-900 text-sm font-semibold rounded-lg hover:bg-green-900 hover:text-white transition-colors"
            >
              Saznaj više o nama →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 divide-y divide-gray-100 [&>*]:pt-12 [&>*:first-child]:pt-0">
        {oblasti.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-green-900 mb-6">Pretraži po oblastima</h2>
            <OblastList oblasti={oblasti} />
          </section>
        )}

        {tipovi.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-green-900 mb-6">Tipovi nekretnina</h2>
            <TipList categories={tipovi} />
          </section>
        )}

        {videoPrezentacije.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-green-900 mb-6">
              Najnovije video prezentacije
            </h2>
            <HomepageVideos videi={videoPrezentacije} />
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-green-900">Istaknute nekretnine</h2>
            <Link
              href="/nekretnine"
              className="text-sm text-[#D4AF37] hover:text-[#B8960C] transition-colors"
            >
              Sve nekretnine &rarr;
            </Link>
          </div>
          <PaginatedPropertyGrid
            products={istaknuteNekretnine}
            emptyMessage="Nema istaknutih nekretnina."
          />
        </section>
      </div>
    </main>
  );
}
