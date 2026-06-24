import { sanityClient } from './client'
import type { TipNekretnine, Nekretnina, Oblast, VideoPrezentacija } from '@/types/shop'

const tipFields = `
  _id,
  name,
  "slug": slug.current,
  description,
  image { asset, alt }
`

const nekretnineFields = `
  _id,
  name,
  "slug": slug.current,
  sifra,
  namena,
  cena,
  povrsina,
  brSoba,
  brKupatila,
  energetskaKlasa,
  vrstaGrejanja,
  spratnost,
  lift,
  lokacija,
  adresa,
  status,
  istaknuta,
  "slike": slike[] { asset, alt },
  "tip": tip->{ name, "slug": slug.current },
  "oblast": oblast->{ name, "slug": slug.current }
`

const nekretnineFieldsFull = `
  ${nekretnineFields},
  opis,
  "videi": videi[] {
    _key,
    tip,
    "fajlUrl": fajl.asset->url,
    url,
    naslov
  },
  lokacijaGeo { lat, lng }
`

const oblastFields = `
  _id,
  name,
  "slug": slug.current,
  opis,
  image { asset, alt }
`

export async function getAllOblasti(): Promise<Oblast[]> {
  return sanityClient.fetch(`*[_type == "oblast"] | order(redosled asc, name asc) { ${oblastFields} }`)
}

export async function getOblastBySlug(slug: string): Promise<Oblast | null> {
  return sanityClient.fetch(
    `*[_type == "oblast" && slug.current == $slug][0] { ${oblastFields} }`,
    { slug }
  )
}

export async function getNekretnineByOblast(oblastSlug: string): Promise<Nekretnina[]> {
  return sanityClient.fetch(
    `*[_type == "nekretnina" && oblast->slug.current == $oblastSlug] | order(_createdAt desc) { ${nekretnineFields} }`,
    { oblastSlug }
  )
}

export async function getAllTipovi(): Promise<TipNekretnine[]> {
  return sanityClient.fetch(`*[_type == "tipNekretnine"] | order(redosled asc, name asc) { ${tipFields} }`)
}

export async function getTipBySlug(slug: string): Promise<TipNekretnine | null> {
  return sanityClient.fetch(
    `*[_type == "tipNekretnine" && slug.current == $slug][0] { ${tipFields} }`,
    { slug }
  )
}

export async function getAllNekretnine(): Promise<Nekretnina[]> {
  return sanityClient.fetch(
    `*[_type == "nekretnina"] | order(_createdAt desc) { ${nekretnineFields} }`
  )
}

export interface NekretnineFilters {
  q?: string
  tipSlug?: string
  oblastSlug?: string
  namena?: string
  sobe?: string
  kupatila?: string
  cenaOd?: number
  cenaDo?: number
  m2Od?: number
  m2Do?: number
}

export async function getFilteredNekretnine(filters: NekretnineFilters = {}): Promise<Nekretnina[]> {
  const conditions: string[] = ['_type == "nekretnina"']
  const params: Record<string, unknown> = {}

  if (filters.q) {
    conditions.push('(name match $q || lokacija match $q || sifra match $q)')
    params.q = `*${filters.q}*`
  }
  if (filters.tipSlug) {
    conditions.push('tip->slug.current == $tipSlug')
    params.tipSlug = filters.tipSlug
  }
  if (filters.oblastSlug) {
    conditions.push('oblast->slug.current == $oblastSlug')
    params.oblastSlug = filters.oblastSlug
  }
  if (filters.namena) {
    conditions.push('namena == $namena')
    params.namena = filters.namena
  }
  if (filters.sobe) {
    const n = parseInt(filters.sobe)
    if (filters.sobe.endsWith('p')) {
      conditions.push('brSoba >= $sobeMin')
      params.sobeMin = n
    } else {
      conditions.push('brSoba == $sobe')
      params.sobe = n
    }
  }
  if (filters.kupatila) {
    const n = parseInt(filters.kupatila)
    if (filters.kupatila.endsWith('p')) {
      conditions.push('brKupatila >= $kupatilaMin')
      params.kupatilaMin = n
    } else {
      conditions.push('brKupatila == $kupatila')
      params.kupatila = n
    }
  }
  if (filters.cenaOd) {
    conditions.push('cena >= $cenaOd')
    params.cenaOd = filters.cenaOd
  }
  if (filters.cenaDo) {
    conditions.push('cena <= $cenaDo')
    params.cenaDo = filters.cenaDo
  }
  if (filters.m2Od) {
    conditions.push('povrsina >= $m2Od')
    params.m2Od = filters.m2Od
  }
  if (filters.m2Do) {
    conditions.push('povrsina <= $m2Do')
    params.m2Do = filters.m2Do
  }

  return sanityClient.fetch(
    `*[${conditions.join(' && ')}] | order(_createdAt desc) { ${nekretnineFields} }`,
    params
  )
}

export async function getIstaknuteNekretnine(): Promise<Nekretnina[]> {
  return sanityClient.fetch(
    `*[_type == "nekretnina" && istaknuta == true] | order(_createdAt desc) { ${nekretnineFields} }`
  )
}

export async function getNekretnineByTip(tipSlug: string): Promise<Nekretnina[]> {
  return sanityClient.fetch(
    `*[_type == "nekretnina" && tip->slug.current == $tipSlug] | order(_createdAt desc) { ${nekretnineFields} }`,
    { tipSlug }
  )
}

export async function getNekretnineBySlug(slug: string): Promise<Nekretnina | null> {
  return sanityClient.fetch(
    `*[_type == "nekretnina" && slug.current == $slug][0] { ${nekretnineFieldsFull} }`,
    { slug }
  )
}

export async function getNekretnineByIds(ids: string[]): Promise<Nekretnina[]> {
  if (!ids.length) return []
  return sanityClient.fetch(
    `*[_type == "nekretnina" && _id in $ids] { ${nekretnineFields} }`,
    { ids }
  )
}

export async function getSlicneNekretnine(tipSlug: string, excludeSlug: string): Promise<Nekretnina[]> {
  return sanityClient.fetch(
    `*[_type == "nekretnina" && tip->slug.current == $tipSlug && slug.current != $excludeSlug] | order(_createdAt desc) [0..3] { ${nekretnineFields} }`,
    { tipSlug, excludeSlug }
  )
}

const videoPreviewFields = `
  _id,
  name,
  "slug": slug.current,
  lokacija,
  cena,
  status,
  istaknuta,
  "slike": slike[] { asset, alt },
  "videi": videi[] { _key, tip, url, naslov }
`

export async function getVideoPrezentacije(limit = 6): Promise<VideoPrezentacija[]> {
  return sanityClient.fetch(
    `*[_type == "videoPrezentacija"] | order(redosled asc, _createdAt desc) [0..$limit] {
      _id, naslov, tip, url, "fajlUrl": fajl.asset->url, opis, redosled
    }`,
    { limit: limit - 1 }
  )
}

export async function getNekretnineWithVideos(limit = 6): Promise<Nekretnina[]> {
  return sanityClient.fetch(
    `*[_type == "nekretnina" && defined(videi) && count(videi) > 0] | order(_createdAt desc) [0..$limit] { ${videoPreviewFields} }`,
    { limit: limit - 1 }
  )
}

export async function getAllSlugsForSitemap() {
  const [nekretnine, oblasti, tipovi] = await Promise.all([
    sanityClient.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "nekretnina"] { "slug": slug.current, _updatedAt }`
    ),
    sanityClient.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "oblast"] { "slug": slug.current, _updatedAt }`
    ),
    sanityClient.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "tipNekretnine"] { "slug": slug.current, _updatedAt }`
    ),
  ])
  return { nekretnine, oblasti, tipovi }
}
