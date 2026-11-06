// Schémas propres à l'article sur Nyquist : échantillons, axe des fréquences,
// filtre anti-repliement, bande magnétique, damier PCM, lignes vidéo.

const BLEU = 'var(--accent-blue)'
const VIOLET = 'var(--accent-purple)'
const ORANGE = 'var(--accent-blog)'
const SOMBRE = 'var(--text-primary)'
const MUET = 'var(--text-muted)'
const FILET = 'rgba(13,26,46,0.15)'

const texte = { fill: SOMBRE, fontSize: 12, fontWeight: 600 } as const
const texteMuet = { fill: MUET, fontSize: 11 } as const

/* ── Une onde et ses échantillons ─────────────────────────── */

// f et fs en kHz, duree en ms : f × duree = nombre de cycles affichés.
// Cosinus pour que l'onde fantôme passe exactement par les mêmes points.
export function Echantillons({
  f,
  fs,
  duree,
  fantome = false,
  titre,
}: {
  f: number
  fs: number
  duree: number
  fantome?: boolean
  titre: string
}) {
  const L = 600
  const H = 130
  const mi = H / 2
  const amp = 46
  const x = (t: number) => 10 + (t / duree) * (L - 20)
  const courbe = (freq: number) => {
    let d = ''
    for (let i = 0; i <= 400; i++) {
      const t = (i / 400) * duree
      d += `${i ? 'L' : 'M'}${x(t).toFixed(1)} ${(mi - amp * Math.cos(2 * Math.PI * freq * t)).toFixed(1)}`
    }
    return d
  }
  const fa = Math.abs(f - fs * Math.round(f / fs))
  const points: number[] = []
  for (let n = 0; n / fs <= duree + 1e-9; n++) points.push(n / fs)

  return (
    <svg viewBox={`0 0 ${L} ${H}`} className="block h-auto w-full" role="img" aria-label={titre}>
      <title>{titre}</title>
      <line x1={0} x2={L} y1={mi} y2={mi} style={{ stroke: FILET }} />
      <path d={courbe(f)} style={{ fill: 'none', stroke: BLEU, strokeWidth: 2, opacity: fantome ? 0.45 : 1 }} />
      {fantome && (
        <path d={courbe(fa)} style={{ fill: 'none', stroke: ORANGE, strokeWidth: 2.5, strokeDasharray: '6 4' }} />
      )}
      {points.map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={mi} y2={mi - amp * Math.cos(2 * Math.PI * f * t)} style={{ stroke: SOMBRE, opacity: 0.25 }} />
          <circle cx={x(t)} cy={mi - amp * Math.cos(2 * Math.PI * f * t)} r={4.5} style={{ fill: SOMBRE }} />
        </g>
      ))}
    </svg>
  )
}

/* ── Axe des fréquences ───────────────────────────────────── */

export type Repere = { f: number; label: string; couleur?: string; creux?: boolean }

export function AxeFrequences({
  min = 0,
  max,
  nyquist,
  reperes,
  repli,
  graduations,
  titre,
}: {
  min?: number
  max: number
  nyquist: number
  reperes: Repere[]
  repli?: { de: number; vers: number }
  graduations: number[]
  titre: string
}) {
  const L = 600
  const H = 150
  const yAxe = 110
  const x = (f: number) => 20 + ((f - min) / (max - min)) * (L - 40)

  return (
    <svg viewBox={`0 0 ${L} ${H}`} className="block h-auto w-full" role="img" aria-label={titre}>
      <title>{titre}</title>
      {/* zone au-delà de Nyquist */}
      <rect x={x(nyquist)} y={20} width={x(max) - x(nyquist)} height={yAxe - 20} style={{ fill: 'rgba(242,96,30,0.08)' }} />
      <text x={x(max) - 8} y={34} textAnchor="end" style={{ ...texteMuet, fill: 'var(--accent-blog-ink)' }}>au-delà : repliement</text>
      <rect x={x(min)} y={20} width={x(nyquist) - x(min)} height={yAxe - 20} style={{ fill: 'rgba(0,150,199,0.06)' }} />
      {x(nyquist) - x(min) > 140 && (
        <text x={x(min) + 8} y={34} style={{ ...texteMuet, fill: BLEU }}>capturé fidèlement</text>
      )}

      {/* ligne de Nyquist, le miroir */}
      <line x1={x(nyquist)} x2={x(nyquist)} y1={14} y2={yAxe} style={{ stroke: SOMBRE, strokeWidth: 2, strokeDasharray: '4 3' }} />
      <text x={x(nyquist)} y={10} textAnchor="middle" style={texte}>Nyquist {String(nyquist).replace('.', ',')} kHz</text>

      {/* axe */}
      <line x1={x(min)} x2={x(max)} y1={yAxe} y2={yAxe} style={{ stroke: SOMBRE, strokeWidth: 2 }} />
      {graduations.map((g) => (
        <g key={g}>
          <line x1={x(g)} x2={x(g)} y1={yAxe} y2={yAxe + 5} style={{ stroke: SOMBRE }} />
          <text x={x(g)} y={yAxe + 18} textAnchor="middle" style={texteMuet}>{g}</text>
        </g>
      ))}
      <text x={x(max)} y={yAxe + 34} textAnchor="end" style={texteMuet}>kHz</text>

      {/* arc du repliement */}
      {repli && (
        <path
          d={`M${x(repli.de)} ${yAxe - 52} Q${x(nyquist)} ${yAxe - 112} ${x(repli.vers)} ${yAxe - 52}`}
          style={{ fill: 'none', stroke: ORANGE, strokeWidth: 2 }}
          markerEnd="url(#pointe)"
        />
      )}
      <defs>
        <marker id="pointe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style={{ fill: ORANGE }} />
        </marker>
      </defs>

      {/* repères */}
      {reperes.map((r) => {
        const c = r.couleur ?? BLEU
        return (
          <g key={r.label}>
            <line x1={x(r.f)} x2={x(r.f)} y1={yAxe} y2={yAxe - 26} style={{ stroke: c, strokeWidth: 3, strokeDasharray: r.creux ? '4 3' : undefined }} />
            <circle cx={x(r.f)} cy={yAxe - 26} r={5} style={{ fill: r.creux ? '#fff' : c, stroke: c, strokeWidth: 2 }} />
            <text
              x={r.f === nyquist ? x(r.f) - 10 : x(r.f)}
              y={r.f === nyquist ? yAxe - 22 : yAxe - 36}
              textAnchor={r.f === nyquist ? 'end' : 'middle'}
              style={{ ...texte, fill: c }}
            >
              {r.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ── Filtre anti-repliement à 44,1 kHz ────────────────────── */

export function FiltrePasseBas() {
  const L = 600
  const H = 190
  const haut = 50
  const bas = 140
  const max = 26
  const x = (f: number) => 30 + (f / max) * (L - 60)
  const d = `M${x(0)} ${haut} L${x(20)} ${haut} C${x(21)} ${haut} ${x(21.2)} ${bas} ${x(22.05)} ${bas} L${x(max)} ${bas}`

  return (
    <svg viewBox={`0 0 ${L} ${H}`} className="block h-auto w-full" role="img" aria-label="Réponse du filtre anti-repliement à 44,1 kHz">
      <title>Réponse du filtre anti-repliement à 44,1 kHz</title>
      <rect x={x(0)} y={30} width={x(20) - x(0)} height={bas - 30} style={{ fill: 'rgba(0,150,199,0.08)' }} />
      <rect x={x(20)} y={30} width={x(22.05) - x(20)} height={bas - 30} style={{ fill: 'rgba(242,96,30,0.15)' }} />
      <rect x={x(22.05)} y={30} width={x(max) - x(22.05)} height={bas - 30} style={{ fill: 'rgba(13,26,46,0.06)' }} />

      <text x={(x(0) + x(20)) / 2} y={44} textAnchor="middle" style={{ ...texte, fill: BLEU }}>audible, tout passe</text>
      <text x={x(21.02)} y={22} textAnchor="middle" style={{ ...texte, fill: 'var(--accent-blog-ink)' }}>pente</text>
      <text x={(x(22.05) + x(max)) / 2} y={44} textAnchor="middle" style={texteMuet}>coupé</text>

      <path d={d} style={{ fill: 'none', stroke: SOMBRE, strokeWidth: 3 }} />

      <line x1={x(0)} x2={x(max)} y1={bas} y2={bas} style={{ stroke: SOMBRE }} />
      {[0, 5, 10, 15, 20, 22.05].map((g) => (
        <g key={g}>
          <line x1={x(g)} x2={x(g)} y1={bas} y2={bas + 5} style={{ stroke: SOMBRE }} />
          <text x={x(g)} y={bas + 18} textAnchor="middle" style={g >= 20 ? texte : texteMuet}>{String(g).replace('.', ',')}</text>
        </g>
      ))}
      <text x={x(max)} y={bas + 18} textAnchor="end" style={texteMuet}>kHz</text>

      {/* limite de l'oreille */}
      <line x1={x(20)} x2={x(20)} y1={bas + 24} y2={bas + 34} style={{ stroke: VIOLET, strokeWidth: 2 }} />
      <text x={x(20)} y={bas + 46} textAnchor="middle" style={{ ...texteMuet, fill: VIOLET }}>limite de l'oreille</text>
      <text x={x(22.05)} y={bas + 46} textAnchor="start" dx={14} style={texteMuet}>Nyquist</text>
    </svg>
  )
}

/* ── Bande vidéo : balayage hélicoïdal ────────────────────── */

export function BalayageHelicoidal() {
  const L = 600
  const H = 150
  const pistes = Array.from({ length: 14 }, (_, i) => i)
  return (
    <svg viewBox={`0 0 ${L} ${H}`} className="block h-auto w-full" role="img" aria-label="Pistes en biais sur une bande vidéo">
      <title>Pistes en biais sur une bande vidéo</title>
      <rect x={20} y={30} width={L - 40} height={70} rx={4} style={{ fill: '#3a2f28', opacity: 0.85 }} />
      <clipPath id="bande">
        <rect x={20} y={30} width={L - 40} height={70} rx={4} />
      </clipPath>
      <g clipPath="url(#bande)">
        {pistes.map((i) => (
          <line key={i} x1={30 + i * 42} y1={100} x2={110 + i * 42} y2={30} style={{ stroke: i === 6 ? ORANGE : BLEU, strokeWidth: i === 6 ? 5 : 3, opacity: i === 6 ? 1 : 0.7 }} />
        ))}
      </g>
      {/* défilement lent */}
      <line x1={40} x2={140} y1={122} y2={122} style={{ stroke: MUET, strokeWidth: 2 }} markerEnd="url(#pointeMuet)" />
      <text x={150} y={126} style={texteMuet}>la bande avance lentement</text>
      {/* balayage rapide */}
      <text x={340} y={20} style={{ ...texte, fill: 'var(--accent-blog-ink)' }}>la tête balaie en biais, très vite</text>
      <defs>
        <marker id="pointeMuet" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" style={{ fill: MUET }} />
        </marker>
      </defs>
    </svg>
  )
}

/* ── Damier PCM : du son déguisé en image ─────────────────── */

export function DamierPCM() {
  const cols = 48
  const lignes = 18
  const c = 12
  let graine = 7
  const hasard = () => {
    graine = (graine * 1103515245 + 12345) % 2147483648
    return graine / 2147483648
  }
  const cases: { x: number; y: number }[] = []
  for (let y = 0; y < lignes; y++) for (let x = 0; x < cols; x++) if (hasard() > 0.5) cases.push({ x, y })

  return (
    <svg viewBox={`0 0 ${cols * c} ${lignes * c}`} className="block h-auto w-full rounded-lg" role="img" aria-label="Image vidéo remplie de points noirs et blancs codant l'audio">
      <title>Image vidéo remplie de points noirs et blancs codant l'audio</title>
      <rect width={cols * c} height={lignes * c} style={{ fill: '#f2f2f2' }} />
      {cases.map(({ x, y }) => (
        <rect key={`${x}-${y}`} x={x * c} y={y * c} width={c} height={c - 2} style={{ fill: '#111' }} />
      ))}
      <rect x={0} y={5 * c - 1} width={cols * c} height={c + 1} style={{ fill: 'none', stroke: ORANGE, strokeWidth: 3 }} />
    </svg>
  )
}

/* ── Une ligne vidéo, six échantillons ────────────────────── */

export function LignesVideo() {
  const lignes = [1, 2, 3, 4]
  return (
    <div className="flex flex-col gap-1.5" role="img" aria-label="Chaque ligne vidéo porte trois échantillons par canal">
      {lignes.map((n) => (
        <div key={n} className="flex items-center gap-2">
          <span className="w-14 shrink-0 text-xs text-[var(--text-muted)]">ligne {n}</span>
          <div className="flex flex-1 gap-1">
            {['G', 'G', 'G', 'D', 'D', 'D'].map((canal, i) => (
              <span
                key={i}
                className="flex h-7 flex-1 items-center justify-center rounded text-[0.7rem] font-bold text-white"
                style={{ backgroundColor: canal === 'G' ? BLEU : VIOLET }}
              >
                {canal}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
