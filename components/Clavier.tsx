// Clavier de piano en SVG, réutilisable dans les articles.
// Les notes se repèrent en demi-tons depuis Do (Do = 0, Do♯ = 1, ... Si = 11, Do aigu = 12).

const NOIRES = new Set([1, 3, 6, 8, 10])
const L_BLANCHE = 30
const H_BLANCHE = 110
const L_NOIRE = 18
const H_NOIRE = 68
const MARGE_HAUT = 20
const MARGE_BAS = 24

export type Marque = {
  demiTon: number
  etiquette?: string
  couleur?: string
  anneau?: boolean
}

export function Clavier({
  debut = 0,
  fin = 12,
  marques = [],
  titre,
  largeurMax = 520,
}: {
  debut?: number
  fin?: number
  marques?: Marque[]
  titre?: string
  largeurMax?: number
}) {
  const parTouche = new Map(marques.map((m) => [m.demiTon, m]))
  const blanches: { demiTon: number; x: number }[] = []
  const noires: { demiTon: number; x: number }[] = []

  for (let d = debut; d <= fin; d++) {
    if (NOIRES.has(((d % 12) + 12) % 12)) {
      noires.push({ demiTon: d, x: blanches.length * L_BLANCHE - L_NOIRE / 2 })
    } else {
      blanches.push({ demiTon: d, x: blanches.length * L_BLANCHE })
    }
  }

  const largeur = blanches.length * L_BLANCHE
  const hauteur = MARGE_HAUT + H_BLANCHE + MARGE_BAS

  return (
    <svg
      viewBox={`-1 0 ${largeur + 2} ${hauteur}`}
      className="mx-auto block h-auto w-full"
      style={{ maxWidth: largeurMax }}
      role="img"
      aria-label={titre ?? 'Clavier'}
    >
      {titre && <title>{titre}</title>}
      {blanches.map(({ demiTon, x }) => {
        const m = parTouche.get(demiTon)
        return (
          <g key={demiTon}>
            <rect
              x={x}
              y={MARGE_HAUT}
              width={L_BLANCHE}
              height={H_BLANCHE}
              rx={3}
              style={{
                fill: m ? (m.couleur ?? 'var(--accent-blue)') : '#ffffff',
                fillOpacity: m ? 0.85 : 1,
                stroke: 'rgba(13,26,46,0.25)',
              }}
            />
            {m?.anneau && (
              <rect
                x={x + 2}
                y={MARGE_HAUT + 2}
                width={L_BLANCHE - 4}
                height={H_BLANCHE - 4}
                rx={3}
                style={{ fill: 'none', stroke: 'var(--accent-blog)', strokeWidth: 3 }}
              />
            )}
            {m?.etiquette && (
              <text
                x={x + L_BLANCHE / 2}
                y={MARGE_HAUT + H_BLANCHE + 17}
                textAnchor="middle"
                style={{ fill: 'var(--text-primary)', fontSize: 12, fontWeight: 600 }}
              >
                {m.etiquette}
              </text>
            )}
          </g>
        )
      })}
      {noires.map(({ demiTon, x }) => {
        const m = parTouche.get(demiTon)
        return (
          <g key={demiTon}>
            <rect
              x={x}
              y={MARGE_HAUT}
              width={L_NOIRE}
              height={H_NOIRE}
              rx={2}
              style={{
                fill: m ? (m.couleur ?? 'var(--accent-blue)') : 'var(--bg-dark)',
                stroke: m?.anneau ? 'var(--accent-blog)' : 'var(--bg-dark)',
                strokeWidth: m?.anneau ? 3 : 1,
              }}
            />
            {m?.etiquette && (
              <text
                x={x + L_NOIRE / 2}
                y={MARGE_HAUT - 6}
                textAnchor="middle"
                style={{ fill: 'var(--text-primary)', fontSize: 12, fontWeight: 600 }}
              >
                {m.etiquette}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
