'use client'

import { useRef, useState, type PointerEvent } from 'react'
import { NB_POINTS, erreurQuadratique, pourcent, type Point } from './calculs'

// Dimensions du dessin (coordonnées du viewBox, le SVG s'adapte à la largeur)
const L = 720
const H = 330
const M = 16
const SIGNAL_HAUT = 14
const SIGNAL_BAS = 204
const ERREUR_HAUT = 236
const ERREUR_BAS = 316
// Échelle fixe de la bande d'erreur : on voit l'erreur rétrécir quand les bits augmentent
const ECHELLE_ERREUR = 0.2

const x = (i: number) => M + (i / NB_POINTS) * (L - 2 * M)
const ySignal = (v: number) => (SIGNAL_HAUT + SIGNAL_BAS) / 2 - v * ((SIGNAL_BAS - SIGNAL_HAUT) / 2)
const yErreur = (v: number) => {
  const borne = Math.max(-ECHELLE_ERREUR, Math.min(ECHELLE_ERREUR, v))
  return (ERREUR_HAUT + ERREUR_BAS) / 2 - (borne / ECHELLE_ERREUR) * ((ERREUR_BAS - ERREUR_HAUT) / 2)
}

const SEUIL_GLISSER = 4 // px avant de considérer qu'on sélectionne

export function GraphiqueQuantification({ points, paliers }: { points: Point[]; paliers: number }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const appui = useRef<{ index: number; clientX: number; glisse: boolean } | null>(null)
  const [survol, setSurvol] = useState<number | null>(null)
  const [selection, setSelection] = useState<[number, number] | null>(null)

  const indexDepuis = (clientX: number) => {
    const svg = svgRef.current
    if (!svg) return 0
    const r = svg.getBoundingClientRect()
    const px = ((clientX - r.left) / r.width) * L
    return Math.max(0, Math.min(NB_POINTS, Math.round(((px - M) / (L - 2 * M)) * NB_POINTS)))
  }

  const surAppui = (e: PointerEvent<SVGSVGElement>) => {
    const i = indexDepuis(e.clientX)
    appui.current = { index: i, clientX: e.clientX, glisse: false }
    e.currentTarget.setPointerCapture(e.pointerId)
    setSurvol(i)
  }
  const surDeplacement = (e: PointerEvent<SVGSVGElement>) => {
    const i = indexDepuis(e.clientX)
    setSurvol(i)
    const a = appui.current
    if (!a) return
    if (!a.glisse && Math.abs(e.clientX - a.clientX) > SEUIL_GLISSER) a.glisse = true
    if (a.glisse) setSelection([Math.min(a.index, i), Math.max(a.index, i)])
  }
  const surRelache = () => {
    // Un clic sans glisser efface la sélection
    if (appui.current && !appui.current.glisse) setSelection(null)
    appui.current = null
  }
  const surAnnulation = () => {
    appui.current = null
  }

  // Tracés
  const entree = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${ySignal(p.entree).toFixed(1)}`).join('')
  const sortie = points
    .map((p, i) =>
      i === 0
        ? `M${x(0).toFixed(1)} ${ySignal(p.sortie).toFixed(1)}`
        : `L${x(i).toFixed(1)} ${ySignal(points[i - 1].sortie).toFixed(1)}L${x(i).toFixed(1)} ${ySignal(p.sortie).toFixed(1)}`,
    )
    .join('')
  const erreur =
    `M${x(0)} ${yErreur(0)}` +
    points.map((p, i) => `L${x(i).toFixed(1)} ${yErreur(p.erreur).toFixed(1)}`).join('') +
    `L${x(NB_POINTS)} ${yErreur(0)}Z`
  const niveaux = Array.from({ length: paliers + 1 }, (_, k) => -1 + (2 * k) / paliers)

  const eqm = selection ? erreurQuadratique(points, selection[0], selection[1]) : erreurQuadratique(points)
  const p = survol !== null ? points[survol] : null

  return (
    <div>
      {/* Lecture au survol */}
      <dl className="mb-2 grid grid-cols-3 gap-2 text-sm" aria-live="off">
        {[
          { nom: 'Entrée', valeur: p?.entree, trait: 'border-t-2 border-dashed border-[var(--accent-blue)]' },
          { nom: 'Sortie', valeur: p?.sortie, trait: 'border-t-2 border-[var(--accent-purple)]' },
          { nom: 'Erreur', valeur: p?.erreur, trait: 'border-t-4 border-[var(--accent-labo)]' },
        ].map((v) => (
          <div key={v.nom} className="rounded-lg bg-[var(--bg-base)] px-3 py-2">
            <dt className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <span aria-hidden="true" className={`w-4 ${v.trait}`} /> {v.nom}
            </dt>
            <dd className="font-semibold tabular-nums">{v.valeur === undefined ? '·' : pourcent(v.valeur, 1)}</dd>
          </div>
        ))}
      </dl>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${L} ${H}`}
        className="h-auto w-full cursor-crosshair select-none"
        style={{ touchAction: 'pan-y' }}
        role="img"
        aria-label="Signal d’entrée en pointillés, sortie quantifiée en trait plein, et erreur entre les deux dans la bande du bas"
        onPointerDown={surAppui}
        onPointerMove={surDeplacement}
        onPointerUp={surRelache}
        onPointerCancel={surAnnulation}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse' && !appui.current) setSurvol(null)
        }}
      >
        {/* Paliers dessinés */}
        {niveaux.map((n) => (
          <line key={n} x1={M} x2={L - M} y1={ySignal(n)} y2={ySignal(n)} stroke="var(--line)" strokeWidth="1" />
        ))}
        <line x1={M} x2={L - M} y1={ySignal(0)} y2={ySignal(0)} stroke="var(--text-muted)" strokeOpacity="0.4" strokeWidth="1" />

        {/* Bande d'erreur */}
        <rect x={M} y={ERREUR_HAUT} width={L - 2 * M} height={ERREUR_BAS - ERREUR_HAUT} rx="6" fill="var(--bg-base)" />
        <line x1={M} x2={L - M} y1={yErreur(0)} y2={yErreur(0)} stroke="var(--line)" strokeWidth="1" />
        <text x={M + 8} y={ERREUR_HAUT + 14} fontSize="11" fill="var(--text-muted)">
          Erreur (entrée moins sortie), échelle fixe ±20 %
        </text>

        {/* Sélection */}
        {selection && (
          <rect
            x={x(selection[0])}
            y={SIGNAL_HAUT - 6}
            width={Math.max(1, x(selection[1]) - x(selection[0]))}
            height={ERREUR_BAS - SIGNAL_HAUT + 6}
            fill="var(--accent-blue)"
            fillOpacity="0.1"
            stroke="var(--accent-blue)"
            strokeOpacity="0.4"
          />
        )}

        <path d={erreur} fill="var(--accent-labo)" fillOpacity="0.35" stroke="var(--accent-labo)" strokeWidth="1.2" />
        <path d={sortie} fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinejoin="round" />
        <path d={entree} fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />

        {/* Survol */}
        {p && survol !== null && (
          <g pointerEvents="none">
            <line x1={x(survol)} x2={x(survol)} y1={SIGNAL_HAUT - 6} y2={ERREUR_BAS} stroke="var(--text-primary)" strokeOpacity="0.5" strokeWidth="1" />
            <circle cx={x(survol)} cy={ySignal(p.entree)} r="5" fill="var(--bg-card)" stroke="var(--accent-blue)" strokeWidth="2.5" />
            <circle cx={x(survol)} cy={ySignal(p.sortie)} r="5" fill="var(--accent-purple)" />
            <circle cx={x(survol)} cy={yErreur(p.erreur)} r="4.5" fill="var(--accent-labo-ink)" />
          </g>
        )}
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm">
          <span className="text-[var(--text-muted)]">
            Erreur quadratique moyenne {selection ? 'sur la sélection' : 'sur tout le graphique'} :{' '}
          </span>
          <strong className="tabular-nums">{pourcent(eqm)}</strong>
          <span className="text-[var(--text-muted)]"> de la pleine échelle</span>
        </p>
        <button
          type="button"
          onClick={() => setSelection(null)}
          disabled={!selection}
          className="rounded-full border border-[var(--line)] px-4 py-1.5 text-sm font-medium transition-colors duration-200 hover:border-[var(--accent-blue)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
        >
          Effacer la sélection
        </button>
      </div>
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        Survolez ou touchez le graphique pour lire les valeurs ; glissez pour sélectionner une plage.
      </p>
    </div>
  )
}
