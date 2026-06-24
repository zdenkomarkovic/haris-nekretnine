export const revalidate = 60

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import type { Metadata } from 'next'
import { getNekretnineBySlug, getSlicneNekretnine } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/metadata'
import { SITE_URL, SITE_NAME, PHONE } from '@/lib/constants'
import { JsonLd } from '@/components/seo/JsonLd'
import { urlFor } from '@/lib/sanity/image'
import ProductGallery from '@/components/shop/ProductGallery'
import ShareButton from '@/components/shop/ShareButton'
import PropertyGrid from '@/components/shop/ProductGrid'
import InquiryForm from '@/components/nekretnine/InquiryForm'
import VideoCards from '@/components/nekretnine/VideoCards'
import MapEmbed from '@/components/nekretnine/MapEmbed'
import FavoriteButton from '@/components/nekretnine/FavoriteButton'

interface Props {
  params: Promise<{ slug: string }>
}

const statusLabel: Record<string, string> = {
  dostupno: 'Dostupno',
  rezervisano: 'Rezervisano',
  prodato: 'Prodato',
}

const statusColor: Record<string, string> = {
  dostupno: 'text-green-600',
  rezervisano: 'text-yellow-600',
  prodato: 'text-red-500',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const nekretnina = await getNekretnineBySlug(slug)
  if (!nekretnina) return {}

  const parts: string[] = [nekretnina.name]
  if (nekretnina.cena != null) parts.push(`${nekretnina.cena.toLocaleString('sr-RS')} EUR`)
  if (nekretnina.lokacija) parts.push(nekretnina.lokacija)

  return buildMetadata({
    title: nekretnina.name,
    description: parts.join(' — '),
    url: `/nekretnine/${slug}`,
    type: 'website',
  })
}

export default async function NekretninaPage({ params }: Props) {
  const { slug } = await params
  const nekretnina = await getNekretnineBySlug(slug)

  if (!nekretnina) notFound()

  const slicne = nekretnina.tip
    ? await getSlicneNekretnine(nekretnina.tip.slug, slug)
    : []

  const coverImage = nekretnina.slike?.[0]
    ? urlFor(nekretnina.slike[0].asset).width(1200).height(630).url()
    : undefined

  const descriptionParts: string[] = [nekretnina.name]
  if (nekretnina.cena != null) descriptionParts.push(`${nekretnina.cena.toLocaleString('sr-RS')} EUR`)
  if (nekretnina.lokacija) descriptionParts.push(nekretnina.lokacija)
  if (nekretnina.povrsina) descriptionParts.push(`${nekretnina.povrsina} m²`)

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        name: nekretnina.name,
        description: descriptionParts.join(' — '),
        url: `${SITE_URL}/nekretnine/${slug}`,
        ...(coverImage && { image: coverImage }),
        ...(nekretnina.cena != null && {
          offers: {
            "@type": "Offer",
            price: nekretnina.cena,
            priceCurrency: "EUR",
            availability: nekretnina.status === 'dostupno'
              ? "https://schema.org/InStock"
              : "https://schema.org/SoldOut",
          },
        }),
        ...(nekretnina.lokacija && {
          address: {
            "@type": "PostalAddress",
            addressLocality: nekretnina.lokacija,
            addressCountry: "RS",
          },
        }),
        seller: {
          "@type": "RealEstateAgent",
          name: SITE_NAME,
          telephone: PHONE,
          url: SITE_URL,
        },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Početna", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Nekretnine", item: `${SITE_URL}/nekretnine` },
          ...(nekretnina.tip ? [{ "@type": "ListItem", position: 3, name: nekretnina.tip.name, item: `${SITE_URL}/tipovi/${nekretnina.tip.slug}` }, { "@type": "ListItem", position: 4, name: nekretnina.name }] : [{ "@type": "ListItem", position: 3, name: nekretnina.name }]),
        ],
      }} />
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors">Početna</Link>
        <span>/</span>
        <Link href="/nekretnine" className="hover:text-black transition-colors">Nekretnine</Link>
        {nekretnina.tip && (
          <>
            <span>/</span>
            <Link
              href={`/tipovi/${nekretnina.tip.slug}`}
              className="hover:text-black transition-colors"
            >
              {nekretnina.tip.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-600 truncate">{nekretnina.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <div className="flex flex-col gap-3">
          <ProductGallery images={nekretnina.slike ?? []} productName={nekretnina.name} />
          {nekretnina.videi && nekretnina.videi.length > 0 && (
            <VideoCards videi={nekretnina.videi} />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            {nekretnina.tip && (
              <Link
                href={`/tipovi/${nekretnina.tip.slug}`}
                className="text-xs text-gray-400 uppercase tracking-wide hover:text-black transition-colors"
              >
                {nekretnina.tip.name}
              </Link>
            )}
            <h1 className="text-2xl font-semibold mt-1">{nekretnina.name}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            {nekretnina.cena != null ? (
              <span className="text-2xl font-bold">
                {nekretnina.cena.toLocaleString('sr-RS')} EUR
              </span>
            ) : (
              <span className="text-gray-500 italic">Cena na upit</span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm border-y border-gray-100 py-4">
            {nekretnina.sifra && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Šifra</p>
                <p className="font-medium">{nekretnina.sifra}</p>
              </div>
            )}
            {nekretnina.povrsina && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Površina</p>
                <p className="font-medium">{nekretnina.povrsina} m²</p>
              </div>
            )}
            {nekretnina.brSoba && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Broj soba</p>
                <p className="font-medium">{nekretnina.brSoba}</p>
              </div>
            )}
            {nekretnina.brKupatila && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Kupatila</p>
                <p className="font-medium">{nekretnina.brKupatila}</p>
              </div>
            )}
            {nekretnina.spratnost && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Spratnost</p>
                <p className="font-medium">{nekretnina.spratnost}</p>
              </div>
            )}
            {nekretnina.brTerasa != null && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Terase</p>
                <p className="font-medium">{nekretnina.brTerasa}</p>
              </div>
            )}
            {nekretnina.parkingMesta != null && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Parking</p>
                <p className="font-medium">{nekretnina.parkingMesta} {nekretnina.parkingMesta === 1 ? 'mesto' : 'mesta'}</p>
              </div>
            )}
            {nekretnina.lift != null && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Lift</p>
                <p className="font-medium">{nekretnina.lift ? 'Da' : 'Ne'}</p>
              </div>
            )}
            {nekretnina.vrstaGrejanja && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Grejanje</p>
                <p className="font-medium capitalize">{nekretnina.vrstaGrejanja}</p>
              </div>
            )}
            {nekretnina.energetskaKlasa && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">En. klasa</p>
                <p className="font-medium">{nekretnina.energetskaKlasa}</p>
              </div>
            )}
            {nekretnina.lokacija && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Lokacija</p>
                <p className="font-medium">{nekretnina.lokacija}</p>
              </div>
            )}
            {nekretnina.adresa && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Adresa</p>
                <p className="font-medium">{nekretnina.adresa}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${statusColor[nekretnina.status] ?? 'text-gray-500'}`}>
              {statusLabel[nekretnina.status] ?? nekretnina.status}
            </span>
            <div className="flex items-center gap-2">
              <FavoriteButton id={nekretnina._id} />
              <ShareButton
                title={nekretnina.name}
                url={`${SITE_URL}/nekretnine/${slug}`}
              />
            </div>
          </div>

          <InquiryForm nekretnina={{ name: nekretnina.name, slug: nekretnina.slug }} />

          {nekretnina.opis && nekretnina.opis.length > 0 && (
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                Opis
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                <PortableText value={nekretnina.opis} />
              </div>
            </div>
          )}
        </div>
      </div>

      {nekretnina.lokacijaGeo && (
        <section className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-lg font-semibold mb-5">Lokacija na mapi</h2>
          <MapEmbed lat={nekretnina.lokacijaGeo.lat} lng={nekretnina.lokacijaGeo.lng} />
        </section>
      )}

      {slicne.length > 0 && (
        <section className="mt-16 pt-10 border-t border-gray-100">
          <h2 className="text-lg font-semibold mb-6">Slične nekretnine</h2>
          <PropertyGrid products={slicne} />
        </section>
      )}
    </main>
  )
}
