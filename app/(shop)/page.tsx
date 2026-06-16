import Link from "next/link";
import TipList from "@/components/shop/CategoryList";
import OblastList from "@/components/shop/OblastList";
import PaginatedPropertyGrid from "@/components/shop/PaginatedPropertyGrid";
import HomepageVideos from "@/components/nekretnine/HomepageVideos";
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
      <section className="relative text-white py-28 px-4 overflow-hidden">
        {/* Background image */}
        <img
          src="/20251119_174201.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark green overlay */}
        <div className="absolute inset-0 bg-green-950/75" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-lg text-[#D4AF37]">
            Haris Nekretnine INVEST & RENT
          </h1>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-white drop-shadow">
            Profesionalna prezentacija nekretnina kroz fotografiju, video sadržaj i digitalni
            marketing.
          </p>
          <p className="text-white text-sm">
            Specijalizovani za Zlatiborski okrug i atraktivne lokacije širom Srbije
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/nekretnine"
              className="px-6 py-3 bg-[#D4AF37] text-green-950 font-semibold rounded-lg hover:bg-[#E8C84A] transition-colors"
            >
              Pogledaj nekretnine
            </Link>
            <Link
              href="/kontakt"
              className="px-6 py-3 border border-white/50 text-white rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            >
              Kontaktirajte nas
            </Link>
          </div>
        </div>
      </section>

      {/* O nama sekcija */}
      <section className="bg-white border-t border-gray-100 py-14 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-center">
          {/* Slika */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/SnapInsta.to_625683242_17842477482688725_4996940228100488877_n_750.jpg"
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
