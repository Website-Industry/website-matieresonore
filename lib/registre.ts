import type { Metadata } from 'next'

export type TypePage = 'blog' | 'labo'

export type EntreePage = {
  slug: string
  // Le premier type donne le préfixe d'URL de la page.
  type: [TypePage, ...TypePage[]]
  titre: string
  // Format AAAA-MM-JJ
  date: string
  extrait: string
  tags: string[]
}

export const registre: EntreePage[] = []

export function listerParType(type: TypePage): EntreePage[] {
  return registre
    .filter((entree) => entree.type.includes(type))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function cheminDe(entree: EntreePage): string {
  return `/${entree.type[0]}/${entree.slug}`
}

export function metadataPour(slug: string): Metadata {
  const entree = registre.find((e) => e.slug === slug)
  if (!entree) throw new Error(`Page absente de lib/registre.ts : ${slug}`)
  return {
    title: `${entree.titre} | Matière Sonore`,
    description: entree.extrait,
  }
}
