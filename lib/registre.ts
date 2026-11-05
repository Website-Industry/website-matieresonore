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

export const registre: EntreePage[] = [
  {
    slug: 'ia-et-musique',
    type: ['blog'],
    titre: "L'IA ne détruit pas la musique. Le système s'en chargeait déjà.",
    date: '2026-11-04',
    extrait: "L'IA n'a pas inventé la logique du volume : elle arrive dans une industrie qui protégeait déjà mal les artistes.",
    tags: ['IA', 'industrie musicale', 'opinion'],
  },
  {
    slug: 'nyquist-et-44-1-khz',
    type: ['blog'],
    titre: 'Nyquist, le repliement et le mystère du 44,1 kHz',
    date: '2026-11-04',
    extrait: "Pourquoi 24 kHz en 48 kHz, d'où viennent les fréquences fantômes, et comment des magnétoscopes ont fixé la fréquence du CD.",
    tags: ['son numérique', 'technique', 'histoire'],
  },
  {
    slug: 'accords-m9-m11',
    type: ['blog'],
    titre: 'Pourquoi les accords m9 et m11 sonnent toujours bien',
    date: '2026-11-04',
    extrait: "Pas de triton, pas de promesse : pourquoi ces accords se posent n'importe où sans jamais sonner faux.",
    tags: ['théorie', 'harmonie', 'neo-soul'],
  },
  {
    slug: 'gamme-mineure-naturelle',
    type: ['blog'],
    titre: 'Pourquoi la gamme mineure naturelle garde une seconde majeure',
    date: '2026-11-04',
    extrait: "Le mineur aurait pu être phrygien. Ce qui l'en a empêché : la dominante, et un accord napolitain qui a gardé la porte entrouverte.",
    tags: ['théorie', 'gammes', 'modes', 'histoire'],
  },
  {
    slug: 'jeu-modes',
    type: ['labo'],
    titre: 'Reconnaître un mode avec deux accords',
    date: '2026-11-04',
    extrait: '21 modes, chacun identifié par une paire d\'accords : un accord de 7e sur le degré I, une triade sur le degré II.',
    tags: ['théorie', 'modes', 'harmonie'],
  },
  {
    slug: 'simulateur-repliement',
    type: ['labo'],
    titre: 'Le repliement, à voir et à entendre',
    date: '2026-11-04',
    extrait: "On règle un son et une fréquence d'échantillonnage : au-delà de la fréquence de Nyquist, la fréquence fantôme apparaît, à l'écran et à l'oreille.",
    tags: ['son numérique', 'technique'],
  },
  {
    slug: 'serie-harmonique',
    type: ['labo'],
    titre: 'La série harmonique, une à une',
    date: '2026-11-05',
    extrait: "Seize harmoniques à activer, couper et écouter : d'où viennent le timbre, l'accord majeur et les notes qui ne tombent pas sur le piano.",
    tags: ['théorie', 'harmonie'],
  },
]

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
