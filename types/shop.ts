export interface Oblast {
  _id: string
  name: string
  slug: string
  opis?: string
  image?: SanityImage
}

export interface TipNekretnine {
  _id: string
  name: string
  slug: string
  description?: string
  image?: SanityImage
}

export interface Nekretnina {
  _id: string
  name: string
  slug: string
  sifra?: string
  opis?: PortableTextBlock[]
  cena?: number
  povrsina?: number
  brSoba?: number
  brKupatila?: number
  brTerasa?: number
  parkingMesta?: number
  energetskaKlasa?: string
  vrstaGrejanja?: string
  spratnost?: string
  lift?: boolean
  videi?: Video[]
  lokacijaGeo?: { lat: number; lng: number }
  lokacija?: string
  adresa?: string
  namena?: 'prodaja' | 'izdavanje'
  status: 'dostupno' | 'prodato' | 'rezervisano'
  slike: SanityImage[]
  tip?: { name: string; slug: string }
  oblast?: { name: string; slug: string }
  istaknuta: boolean
}

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
}

export interface PortableTextBlock {
  _type: string
  [key: string]: unknown
}

export interface Video {
  _key: string
  tip: 'fajl' | 'youtube' | 'instagram' | 'facebook' | 'tiktok'
  fajlUrl?: string
  url?: string
  naslov?: string
}

export interface VideoPrezentacija {
  _id: string
  naslov: string
  tip: 'youtube' | 'facebook' | 'tiktok' | 'instagram' | 'fajl'
  url?: string
  fajlUrl?: string
  opis?: string
  redosled?: number
}

export interface EdukacijaUnos {
  _id: string
  naslov: string
  tekst?: PortableTextBlock[]
  slike?: SanityImage[]
  redosled?: number
  _createdAt: string
}

export interface InquiryFormData {
  ime: string
  prezime: string
  email: string
  telefon: string
  poruka?: string
}
