'use client'

import { useState } from 'react'
import { Clavier } from '@/components/Clavier'

// Sélecteur des trois gammes : le clavier et l'enchaînement des tons se redessinent.

const MODES = {
  majeur: {
    bouton: 'Majeur',
    nom: 'Do majeur',
    demiTons: [0, 2, 4, 5, 7, 9, 11, 12],
    noms: ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do'],
    resume: 'Tout est majeur ou juste.',
  },
  mineur: {
    bouton: 'Mineur naturel',
    nom: 'Do mineur naturel (éolien)',
    demiTons: [0, 2, 3, 5, 7, 8, 10, 12],
    noms: ['Do', 'Ré', 'Mi♭', 'Fa', 'Sol', 'La♭', 'Si♭', 'Do'],
    resume: 'Tout est mineur ou juste... sauf la seconde.',
  },
  phrygien: {
    bouton: 'Phrygien',
    nom: 'Do phrygien',
    demiTons: [0, 1, 3, 5, 7, 8, 10, 12],
    noms: ['Do', 'Ré♭', 'Mi♭', 'Fa', 'Sol', 'La♭', 'Si♭', 'Do'],
    resume: 'Le mineur « pur » : tout est mineur ou juste.',
  },
} as const

type CleMode = keyof typeof MODES
const MAJEUR = new Set<number>(MODES.majeur.demiTons)

export function ComparateurModes() {
  const [cle, setCle] = useState<CleMode>('mineur')
  const mode = MODES[cle]

  const marques = mode.demiTons.map((d, i) => ({
    demiTon: d,
    etiquette: mode.noms[i],
    couleur:
      i === 0 || i === 7
        ? 'var(--text-primary)'
        : MAJEUR.has(d)
          ? 'var(--accent-blue)'
          : 'var(--accent-purple)',
    anneau: i === 1,
  }))

  const pas = mode.demiTons.slice(1).map((d, i) => d - mode.demiTons[i])

  return (
    <figure className="my-8 rounded-[14px] bg-[var(--bg-card)] p-5 shadow-sm md:p-6">
      <div role="group" aria-label="Choisir une gamme" className="mb-5 flex flex-wrap gap-2">
        {(Object.keys(MODES) as CleMode[]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={k === cle}
            onClick={() => setCle(k)}
            className="cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)] motion-reduce:transition-none"
            style={
              k === cle
                ? { backgroundColor: 'var(--text-primary)', borderColor: 'var(--text-primary)', color: '#fff' }
                : { borderColor: 'var(--line)', color: 'var(--text-primary)' }
            }
          >
            {MODES[k].bouton}
          </button>
        ))}
      </div>

      <div
        className="mb-1 text-lg font-bold text-[var(--text-primary)]"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        {mode.nom}
      </div>
      <div className="mb-4 text-sm text-[var(--text-muted)]">{mode.resume}</div>

      <Clavier debut={0} fin={12} largeurMax={380} marques={marques} titre={`Clavier : ${mode.nom}`} />

      {/* Enchaînement des tons et demi-tons, en barres proportionnelles */}
      <div className="mt-5 flex gap-1" aria-label="Tons et demi-tons">
        {pas.map((p, i) => (
          <div
            key={i}
            className="flex h-8 items-center justify-center rounded text-xs font-semibold transition-all duration-300 motion-reduce:transition-none"
            style={{
              flexGrow: p,
              flexBasis: 0,
              backgroundColor: i === 0 ? 'var(--accent-blog)' : p === 1 ? 'rgba(123,47,255,0.15)' : 'rgba(0,150,199,0.15)',
              color: i === 0 ? '#0d1a2e' : 'var(--text-primary)',
            }}
          >
            {p === 2 ? 'ton' : '½'}
          </div>
        ))}
      </div>

      <figcaption className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
        <span><Pastille c="var(--accent-blue)" /> comme en majeur</span>
        <span><Pastille c="var(--accent-purple)" /> abaissée</span>
        <span><Pastille c="var(--accent-blog)" /> la seconde, le premier pas</span>
      </figcaption>
    </figure>
  )
}

function Pastille({ c }: { c: string }) {
  return <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ backgroundColor: c }} />
}
