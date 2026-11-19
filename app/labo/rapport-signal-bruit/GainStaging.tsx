'use client'

import { useState } from 'react'
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

// Échelle des jauges, en dBFS
const BAS = -120
const HAUT = 0
const hauteur = (db: number) => `${((db - BAS) / (HAUT - BAS)) * 100}%`
const GRADUATIONS = [0, -24, -48, -72, -96, -120]

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

const formatDb = (v: number) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v)} dB`

function Jauge({ titre, signal, plancher }: { titre: string; signal: number; plancher: number }) {
  return (
    <figure className="flex flex-col items-center">
      <figcaption className="mb-3 text-center text-xs font-medium text-[var(--text-muted)]">{titre}</figcaption>
      <div className="relative h-64 w-16 overflow-hidden rounded-lg bg-[var(--bg-base)] ring-1 ring-[var(--line)]">
        {/* Plancher de bruit */}
        <div
          className="absolute inset-x-0 bottom-0 bg-[var(--text-muted)]/30 transition-[height] duration-200 motion-reduce:transition-none"
          style={{ height: hauteur(plancher) }}
        />
        <div
          className="absolute inset-x-0 border-t-2 border-dashed border-[var(--text-muted)] transition-[bottom] duration-200 motion-reduce:transition-none"
          style={{ bottom: hauteur(plancher) }}
        />
        {/* Signal */}
        <div
          className="absolute inset-x-2 rounded-t bg-[var(--accent-blue)] transition-[bottom,top] duration-200 motion-reduce:transition-none"
          style={{ bottom: hauteur(plancher), top: `calc(100% - ${hauteur(signal)})` }}
        />
        {/* 0 dBFS */}
        <div className="absolute inset-x-0 top-0 border-t-2 border-[var(--accent-blog)]" />
      </div>
      <dl className="mt-3 text-center text-xs leading-snug">
        <div>
          <dt className="inline text-[var(--text-muted)]">Signal </dt>
          <dd className="inline font-semibold tabular-nums">{signal} dBFS</dd>
        </div>
        <div>
          <dt className="inline text-[var(--text-muted)]">Bruit </dt>
          <dd className="inline font-semibold tabular-nums">{plancher} dBFS</dd>
        </div>
      </dl>
    </figure>
  )
}

export function GainStaging() {
  const [niveau, setNiveau] = useState(GAIN_INITIAL)
  const etat = etatGain(niveau)
  const message = MESSAGES[etat]
  const boost = boostRequis(niveau)

  return (
    <div className="mt-6 rounded-2xl bg-[var(--bg-card)] p-5 shadow-sm md:p-8">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor="gain-preampli" className="text-sm font-medium">
          Gain préampli (niveau du signal)
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
        onChange={(e) => setNiveau(Number(e.target.value))}
        aria-valuetext={`${niveau} dBFS`}
        className="w-full accent-[var(--accent-blue)]"
      />

      <div className="mt-8 grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
        {/* Les deux jauges et leur échelle */}
        <div className="flex justify-center gap-4">
          <div className="relative h-64 w-10 text-right text-[0.65rem] tabular-nums text-[var(--text-muted)]" style={{ marginTop: '1.75rem' }} aria-hidden="true">
            {GRADUATIONS.map((g) => (
              <span key={g} className="absolute right-0 -translate-y-1/2" style={{ top: `calc(100% - ${hauteur(g)})` }}>
                {g === 0 ? '0 dBFS' : g}
              </span>
            ))}
          </div>
          <Jauge titre="À l’enregistrement" signal={niveau} plancher={PLANCHER_DBFS} />
          <Jauge titre="Après le boost" signal={GAIN_MAX} plancher={PLANCHER_DBFS + boost} />
        </div>

        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--line)] p-4">
              <div className="text-xs text-[var(--text-muted)]">SNR effectif à l’enregistrement</div>
              <div className="mt-1 text-2xl font-extrabold tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
                {snrEffectif(niveau)} dB
              </div>
            </div>
            <div className="rounded-xl border border-[var(--line)] p-4">
              <div className="text-xs text-[var(--text-muted)]">Boost requis en post-prod</div>
              <div className="mt-1 text-2xl font-extrabold tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
                {formatDb(boost)}
              </div>
            </div>
          </div>

          <div aria-live="polite" className={`mt-4 rounded-xl border-l-4 px-4 py-3 text-[0.95rem] leading-relaxed ${message.style}`}>
            <strong className="font-semibold">{message.titre}.</strong> {message.texte}
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[var(--text-muted)]">
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-[var(--accent-blue)]" /> signal
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-[var(--text-muted)]/30 ring-1 ring-[var(--text-muted)]" /> plancher de bruit du préampli
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="h-0.5 w-3 bg-[var(--accent-blog)]" /> 0 dBFS, la saturation
            </li>
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
            Le boost remonte le signal et le bruit ensemble : l’écart entre les deux ne change pas, mais le bruit devient audible.
          </p>
        </div>
      </div>
    </div>
  )
}
