// Calculs de la page Rapport signal/bruit. Fonctions pures, sans état.

/* ---------- Partie A : gain staging (modèle) ---------- */

// Plancher de bruit du préampli : valeur plausible pour une interface correcte
export const PLANCHER_DBFS = -114
export const GAIN_MIN = -30
export const GAIN_MAX = 0
export const GAIN_INITIAL = -18

// SNR simplifié : signal moins plancher
export const snrEffectif = (niveau: number) => niveau - PLANCHER_DBFS
// Le boost en post-production ramène le signal à 0 dBFS
export const boostRequis = (niveau: number) => Math.abs(niveau)

export type EtatGain = 'confortable' | 'raisonnable' | 'bas'
export function etatGain(niveau: number): EtatGain {
  if (niveau >= -6) return 'confortable'
  if (niveau >= -18) return 'raisonnable'
  return 'bas'
}

/* ---------- Partie B : quantification ---------- */

export const BITS_MIN = 8
export const BITS_MAX = 24
export const BITS_INITIAL = 16
export const NB_POINTS = 400

// Vraies formules, pour les cartes chiffrées
export const dynamiqueTheorique = (bits: number) => Math.round(bits * 6.02)
export const paliersReels = (bits: number) => 2 ** bits

// Paliers dessinés : pas à l'échelle, de 6 (8 bits) à 60 (24 bits) en mappage
// linéaire, pour que le graphique reste lisible
export function paliersDessines(bits: number) {
  return Math.round(6 + ((bits - BITS_MIN) * (60 - 6)) / (BITS_MAX - BITS_MIN))
}

export type EtatResolution = 'travail' | 'diffusion' | 'grossier'
export function etatResolution(bits: number): EtatResolution {
  if (bits >= 20) return 'travail'
  if (bits >= 14) return 'diffusion'
  return 'grossier'
}

export type Signal = 'sinus' | 'fondu' | 'complexe'

// Valeur du signal en t (0 à 1), en fraction de la pleine échelle (-1 à 1)
export function signal(type: Signal, t: number) {
  switch (type) {
    case 'sinus':
      return 0.9 * Math.sin(2 * Math.PI * 2 * t)
    case 'fondu':
      // Le signal s'éteint : sur la fin, il n'utilise plus que quelques paliers
      return 0.9 * (1 - t) ** 2 * Math.sin(2 * Math.PI * 4 * t)
    case 'complexe':
      return 0.55 * Math.sin(2 * Math.PI * 2 * t) + 0.35 * Math.sin(2 * Math.PI * 7 * t + 0.6)
  }
}

// Générateur pseudo-aléatoire à graine fixe (mulberry32) : le même tirage côté
// serveur et côté client, donc pas d'erreur d'hydratation, et un bruit qui ne
// change pas à chaque rendu
function generateur(graine: number) {
  let a = graine >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Tirage uniforme entre -0,5 et 0,5, multiplié ensuite par la taille d'un palier
export const TIRAGE_DITHER: number[] = (() => {
  const aleatoire = generateur(1977)
  return Array.from({ length: NB_POINTS + 1 }, () => aleatoire() - 0.5)
})()

export type Point = { t: number; entree: number; sortie: number; erreur: number }

// Quantification sur `paliers` niveaux répartis sur la pleine échelle.
// Plus il y a de paliers, plus le pas est fin, plus l'erreur est petite.
export function quantifier(type: Signal, paliers: number, dither: boolean): Point[] {
  const pas = 2 / paliers
  return Array.from({ length: NB_POINTS + 1 }, (_, i) => {
    const t = i / NB_POINTS
    const entree = signal(type, t)
    const bruit = dither ? TIRAGE_DITHER[i] * pas : 0
    const sortie = Math.max(-1, Math.min(1, pas * Math.round((entree + bruit) / pas)))
    return { t, entree, sortie, erreur: entree - sortie }
  })
}

// Erreur quadratique moyenne entre deux indices inclus
export function erreurQuadratique(points: Point[], debut = 0, fin = points.length - 1) {
  let somme = 0
  for (let i = debut; i <= fin; i++) somme += points[i].erreur ** 2
  return Math.sqrt(somme / (fin - debut + 1))
}

export const pourcent = (v: number, decimales = 2) =>
  `${(v * 100).toLocaleString('fr-FR', { minimumFractionDigits: decimales, maximumFractionDigits: decimales })} %`
