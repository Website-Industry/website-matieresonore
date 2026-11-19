'use client'

import { useEffect, useRef, useState } from 'react'
import {
  GAIN_INITIAL,
  GAIN_MAX,
  GAIN_MIN,
  PLANCHER_DBFS,
  boostRequis,
  etatGain,
  snrEffectif,
  type EtatGain,
} from './calculs'

const MESSAGES: Record<EtatGain, { titre: string; texte: string; style: string }> = {
  confortable: {
    titre: 'Confortable',
    texte: 'Proche de l’optimal : le signal utilise bien la plage disponible, sans saturer.',
    style: 'border-[var(--accent-labo)] bg-[var(--accent-labo)]/10 text-[var(--accent-labo-ink)]',
  },
  raisonnable: {
    titre: 'Marge raisonnable',
    texte: 'Il faudra un léger boost en post-production, sans conséquence audible.',
    style: 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/10 text-[var(--text-primary)]',
  },
  bas: {
    titre: 'Trop bas',
    texte:
      'Le boost en post-production remonte le bruit du préampli d’autant. Le souffle devient audible sur les passages calmes et les fins de note.',
    style: 'border-[var(--accent-blog)] bg-[var(--accent-blog)]/10 text-[var(--accent-blog-ink)]',
  },
}

const DUREE_ANIMATION = 1400 // ms

/* ---------- Le schéma : enregistré, le boost, après le boost ---------- */

const L = 470
const H = 360
const HAUT = 0 // dBFS
const BAS = -120
const Y_HAUT = 36
const Y_BAS = 316
const y = (db: number) => Y_HAUT + ((HAUT - db) / (HAUT - BAS)) * (Y_BAS - Y_HAUT)
const AXE = 40
const JAUGE = 56
const X_A = 78
const X_B = 262

function Jauge({ x, signal, plancher }: { x: number; signal: number; plancher: number }) {
  return (
    <g>
      <rect x={x} y={Y_HAUT} width={JAUGE} height={Y_BAS - Y_HAUT} rx="8" fill="var(--bg-base)" stroke="var(--line)" />
      {/* Bruit du préampli : remplit le bas de la jauge jusqu'à son niveau */}
      <rect x={x} y={y(plancher)} width={JAUGE} height={Y_BAS - y(plancher)} fill="var(--text-muted)" fillOpacity="0.3" />
      <line x1={x} x2={x + JAUGE} y1={y(plancher)} y2={y(plancher)} stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="4 3" />
      {/* Signal, posé au-dessus du bruit */}
      <rect x={x + 8} y={y(signal)} width={JAUGE - 16} height={Math.max(0, y(plancher) - y(signal))} rx="3" fill="var(--accent-blue)" />
    </g>
  )
}

// Crochet du SNR, à droite d'une jauge
function Crochet({ x, signal, plancher }: { x: number; signal: number; plancher: number }) {
  const x0 = x + JAUGE + 6
  const ys = y(signal)
  const yp = y(plancher)
  return (
    <g stroke="var(--accent-labo-ink)" strokeWidth="1.5">
      <line x1={x0} x2={x0 + 6} y1={ys} y2={ys} />
      <line x1={x0 + 6} x2={x0 + 6} y1={ys} y2={yp} />
      <line x1={x0} x2={x0 + 6} y1={yp} y2={yp} />
    </g>
  )
}

function Fleche({ x1, y1, x2, y2, couleur, texte, id }: { x1: number; y1: number; x2: number; y2: number; couleur: string; texte: string; id: string }) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return (
    <g>
      <defs>
        <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0L10 5L0 10z" fill={couleur} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={couleur} strokeWidth="2" markerEnd={`url(#${id})`} />
      <rect x={mx - 26} y={my - 11} width="52" height="20" rx="10" fill="var(--bg-card)" stroke={couleur} />
      <text x={mx} y={my + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
        {texte}
      </text>
    </g>
  )
}

function Schema({ niveau, boost }: { niveau: number; boost: number }) {
  const signalApres = niveau + boost
  const bruitApres = PLANCHER_DBFS + boost
  const snr = snrEffectif(niveau)
  const b = Math.round(boost)
  return (
    <svg
      viewBox={`0 0 ${L} ${H}`}
      className="mx-auto block h-auto w-full max-w-[520px]"
      role="img"
      aria-label={`Enregistré à ${niveau} dBFS avec un bruit à ${PLANCHER_DBFS} dBFS. Après un boost de ${b} dB, le signal est à ${Math.round(signalApres)} dBFS et le bruit à ${Math.round(bruitApres)} dBFS. Le SNR reste de ${snr} dB.`}
    >
      {/* Graduations */}
      {[0, -24, -48, -72, -96, -120].map((g) => (
        <g key={g}>
          <line x1={AXE - 4} x2={AXE} y1={y(g)} y2={y(g)} stroke="var(--text-muted)" />
          <text x={AXE - 8} y={y(g) + 4} textAnchor="end" fontSize="11" fill="var(--text-muted)">
            {g}
          </text>
        </g>
      ))}
      <text x={AXE - 8} y={Y_HAUT - 22} textAnchor="end" fontSize="11" fill="var(--text-muted)">dBFS</text>

      {/* 0 dBFS : la saturation */}
      <line x1={AXE} x2={L - 8} y1={y(0)} y2={y(0)} stroke="var(--accent-blog)" strokeWidth="2" />
      <text x={X_A + JAUGE + 12} y={y(0) - 6} fontSize="11" fill="var(--accent-blog-ink)">0 dBFS, saturation</text>

      {/* Titres des colonnes */}
      <text x={X_A + JAUGE / 2} y={H - 22} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">1. Enregistré</text>
      <text x={X_A + JAUGE / 2} y={H - 6} textAnchor="middle" fontSize="11" fill="var(--accent-labo-ink)">SNR {snr} dB</text>
      <text x={X_B + JAUGE / 2} y={H - 22} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">2. Après le boost</text>
      <text x={X_B + JAUGE / 2} y={H - 6} textAnchor="middle" fontSize="11" fill="var(--accent-labo-ink)">SNR {snr} dB</text>

      <Jauge x={X_A} signal={niveau} plancher={PLANCHER_DBFS} />
      <Jauge x={X_B} signal={signalApres} plancher={bruitApres} />
      <Crochet x={X_A} signal={niveau} plancher={PLANCHER_DBFS} />
      <Crochet x={X_B} signal={signalApres} plancher={bruitApres} />

      {/* Le boost : signal et bruit montent d'autant */}
      <Fleche id="fleche-signal" x1={X_A + JAUGE + 18} y1={y(niveau)} x2={X_B - 6} y2={y(signalApres)} couleur="var(--accent-blue)" texte={`+${b} dB`} />
      <Fleche id="fleche-bruit" x1={X_A + JAUGE + 18} y1={y(PLANCHER_DBFS)} x2={X_B - 6} y2={y(bruitApres)} couleur="var(--text-muted)" texte={`+${b} dB`} />

      {/* Étiquettes directes */}
      <text x={X_B + JAUGE + 18} y={Math.max(y(signalApres) + 4, Y_HAUT + 18)} fontSize="12" fontWeight="600" fill="var(--accent-blue)">Signal</text>
      <text x={X_B + JAUGE + 18} y={y(bruitApres) + 4} fontSize="12" fontWeight="600" fill="var(--text-muted)">Bruit du préampli</text>
    </svg>
  )
}

/* ---------- Le composant ---------- */

export function GainStaging() {
  const [niveau, setNiveau] = useState(GAIN_INITIAL)
  const [boost, setBoost] = useState(0)
  const [anime, setAnime] = useState(false)
  const frame = useRef(0)

  const requis = boostRequis(niveau)
  const etat = etatGain(niveau)
  const message = MESSAGES[etat]
  const boostApplique = Math.min(boost, requis)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const changerNiveau = (v: number) => {
    cancelAnimationFrame(frame.current)
    setAnime(false)
    setNiveau(v)
    setBoost(0) // nouvel enregistrement : le boost est à refaire
  }

  const appliquerBoost = () => {
    cancelAnimationFrame(frame.current)
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduit) {
      setBoost(requis)
      return
    }
    setAnime(true)
    const debut = performance.now()
    const pas = (maintenant: number) => {
      const t = Math.min(1, (maintenant - debut) / DUREE_ANIMATION)
      const adouci = 1 - (1 - t) ** 3
      setBoost(requis * adouci)
      if (t < 1) frame.current = requestAnimationFrame(pas)
      else setAnime(false)
    }
    setBoost(0)
    frame.current = requestAnimationFrame(pas)
  }

  const bouton =
    'rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none'

  return (
    <div className="mt-6 rounded-2xl bg-[var(--bg-card)] p-5 shadow-sm md:p-8">
      {/* Étape 1 */}
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor="gain-preampli" className="text-sm font-medium">
          1. Niveau d’enregistrement (gain du préampli)
        </label>
        <span className="text-lg font-semibold tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
          {niveau} dBFS
        </span>
      </div>
      <input
        id="gain-preampli"
        type="range"
        min={GAIN_MIN}
        max={GAIN_MAX}
        step={1}
        value={niveau}
        onChange={(e) => changerNiveau(Number(e.target.value))}
        aria-valuetext={`${niveau} dBFS`}
        className="w-full accent-[var(--accent-blue)]"
      />

      {/* Étape 2 */}
      <div className="mt-6 mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor="boost" className="text-sm font-medium">
          2. Boost au mixage, pour remonter le signal à 0 dBFS
        </label>
        <span className="text-lg font-semibold tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
          +{Math.round(boostApplique)} dB <span className="text-sm font-normal text-[var(--text-muted)]">sur {requis}</span>
        </span>
      </div>
      <input
        id="boost"
        type="range"
        min={0}
        max={requis}
        step={1}
        value={Math.round(boostApplique)}
        disabled={anime || requis === 0}
        onChange={(e) => setBoost(Number(e.target.value))}
        aria-valuetext={`+${Math.round(boostApplique)} dB`}
        className="w-full accent-[var(--accent-labo)]"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={appliquerBoost} disabled={anime || requis === 0} className={`${bouton} border-[var(--accent-labo)] text-[var(--accent-labo-ink)] hover:bg-[var(--accent-labo)]/10`}>
          ▶ Appliquer le boost
        </button>
        <button type="button" onClick={() => setBoost(0)} disabled={anime || boostApplique === 0} className={`${bouton} border-[var(--line)] hover:border-[var(--accent-labo)]`}>
          Revenir à l’enregistrement
        </button>
      </div>

      <div className="mt-6">
        <Schema niveau={niveau} boost={boostApplique} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--line)] p-4">
          <div className="text-xs text-[var(--text-muted)]">SNR effectif à l’enregistrement</div>
          <div className="mt-1 text-2xl font-extrabold tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
            {snrEffectif(niveau)} dB
          </div>
        </div>
        <div className="rounded-xl border border-[var(--line)] p-4">
          <div className="text-xs text-[var(--text-muted)]">Boost requis en post-prod</div>
          <div className="mt-1 text-2xl font-extrabold tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
            +{requis} dB
          </div>
        </div>
        <div className="rounded-xl border border-[var(--line)] p-4">
          <div className="text-xs text-[var(--text-muted)]">Bruit après le boost complet</div>
          <div className="mt-1 text-2xl font-extrabold tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
            {PLANCHER_DBFS + requis} dBFS
          </div>
        </div>
      </div>

      <div aria-live="polite" className={`mt-4 rounded-xl border-l-4 px-4 py-3 text-[0.95rem] leading-relaxed ${message.style}`}>
        <strong className="font-semibold">{message.titre}.</strong> {message.texte}
      </div>
    </div>
  )
}
