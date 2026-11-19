'use client'

import { useMemo, useState } from 'react'
import {
  BITS_INITIAL,
  BITS_MAX,
  BITS_MIN,
  dynamiqueTheorique,
  etatResolution,
  paliersDessines,
  paliersReels,
  quantifier,
  type EtatResolution,
  type Signal,
} from './calculs'
import { GraphiqueQuantification } from './GraphiqueQuantification'

const SIGNAUX: { cle: Signal; nom: string }[] = [
  { cle: 'sinus', nom: 'Sinusoïde' },
  { cle: 'fondu', nom: 'Fondu' },
  { cle: 'complexe', nom: 'Signal complexe' },
]

const MESSAGES: Record<EtatResolution, { titre: string; texte: string; style: string }> = {
  travail: {
    titre: 'Bruit négligeable',
    texte: 'C’est le standard de travail interne : on enregistre et on mixe à cette résolution.',
    style: 'border-[var(--accent-labo)] bg-[var(--accent-labo)]/10 text-[var(--accent-labo-ink)]',
  },
  diffusion: {
    titre: 'Résolution de diffusion',
    texte:
      'Celle du CD et du streaming, 16 bits. Le bruit de quantification est masqué par celui de la chaîne analogique, sauf sur un signal très faible ou après un traitement agressif.',
    style: 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/10 text-[var(--text-primary)]',
  },
  grossier: {
    titre: 'Paliers grossiers',
    texte: 'Ils créent une distorsion audible sur les signaux faibles. C’est là que le dithering devient indispensable.',
    style: 'border-[var(--accent-blog)] bg-[var(--accent-blog)]/10 text-[var(--accent-blog-ink)]',
  },
}

const puce =
  'rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)] motion-reduce:transition-none'

export function Quantification() {
  const [bits, setBits] = useState(BITS_INITIAL)
  const [type, setType] = useState<Signal>('sinus')
  const [dither, setDither] = useState(false)

  const paliers = paliersDessines(bits)
  const points = useMemo(() => quantifier(type, paliers, dither), [type, paliers, dither])
  const message = MESSAGES[etatResolution(bits)]

  return (
    <div className="mt-6 rounded-2xl bg-[var(--bg-card)] p-5 shadow-sm md:p-8">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor="resolution" className="text-sm font-medium">
          Résolution
        </label>
        <span className="text-lg font-semibold tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
          {bits} bits
        </span>
      </div>
      <input
        id="resolution"
        type="range"
        min={BITS_MIN}
        max={BITS_MAX}
        step={1}
        value={bits}
        onChange={(e) => setBits(Number(e.target.value))}
        aria-valuetext={`${bits} bits`}
        className="w-full accent-[var(--accent-blue)]"
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--line)] p-4">
          <div className="text-xs text-[var(--text-muted)]">Dynamique théorique</div>
          <div className="mt-1 text-2xl font-extrabold tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
            {dynamiqueTheorique(bits)} dB
          </div>
        </div>
        <div className="rounded-xl border border-[var(--line)] p-4">
          <div className="text-xs text-[var(--text-muted)]">Paliers de quantification</div>
          <div className="mt-1 text-2xl font-extrabold tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
            {paliersReels(bits).toLocaleString('fr-FR')}
          </div>
        </div>
      </div>

      <div aria-live="polite" className={`mt-4 rounded-xl border-l-4 px-4 py-3 text-[0.95rem] leading-relaxed ${message.style}`}>
        <strong className="font-semibold">{message.titre}.</strong> {message.texte}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Signal d’entrée</legend>
          <div className="flex flex-wrap gap-2">
            {SIGNAUX.map((s) => {
              const actif = s.cle === type
              return (
                <button
                  key={s.cle}
                  type="button"
                  aria-pressed={actif}
                  onClick={() => setType(s.cle)}
                  className={`${puce} ${
                    actif
                      ? 'border-[var(--accent-labo)] bg-[var(--accent-labo)]/10 text-[var(--accent-labo-ink)]'
                      : 'border-[var(--line)] hover:border-[var(--accent-labo)]'
                  }`}
                >
                  {s.nom}
                </button>
              )
            })}
          </div>
        </fieldset>

        <button
          type="button"
          role="switch"
          aria-checked={dither}
          onClick={() => setDither((d) => !d)}
          className="flex items-center gap-3 rounded-full py-1 pr-1 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)]"
        >
          <span
            aria-hidden="true"
            className={`relative h-6 w-11 rounded-full transition-colors duration-200 motion-reduce:transition-none ${
              dither ? 'bg-[var(--accent-labo)]' : 'bg-[var(--text-muted)]/30'
            }`}
          >
            <span
              className={`absolute left-0 top-0.5 h-5 w-5 rounded-full bg-[var(--bg-card)] shadow transition-transform duration-200 motion-reduce:transition-none ${
                dither ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </span>
          Activer le dithering
        </button>
      </div>

      <div className="mt-6">
        <GraphiqueQuantification points={points} paliers={paliers} />
      </div>

      <p className="mt-4 rounded-lg bg-[var(--bg-base)] px-4 py-3 text-xs leading-relaxed text-[var(--text-muted)]">
        <strong className="font-semibold text-[var(--text-primary)]">Graphique pas à l’échelle.</strong> Pour rester lisible, il
        dessine de 6 paliers (8 bits) à 60 paliers (24 bits), en progression linéaire : ici, {paliers}. Seules les cartes
        chiffrées suivent la vraie formule.
      </p>
    </div>
  )
}
