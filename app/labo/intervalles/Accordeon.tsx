'use client'

import { useState } from 'react'
import type { Chanson, Intervalle } from './donnees'

// Recherche YouTube sur le titre et l'artiste
function lienYouTube(chanson: Chanson) {
  const requete = [chanson.titre, chanson.artiste].filter(Boolean).join(' ')
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(requete)}`
}

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)]'

function CarteChanson({ chanson }: { chanson: Chanson }) {
  return (
    <a
      href={lienYouTube(chanson)}
      target="_blank"
      rel="noopener noreferrer"
      title="Rechercher sur YouTube"
      className={`group flex items-center gap-3 rounded-xl bg-[var(--bg-card)] p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focus}`}
    >
      <span
        aria-hidden="true"
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-base)] text-lg"
      >
        <span className="transition-opacity duration-200 group-hover:opacity-0 motion-reduce:transition-none">{chanson.emoji}</span>
        <span className="absolute text-[var(--accent-blue)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none">▶</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-blue)] motion-reduce:transition-none">
          {chanson.titre}
        </span>
        <span className="block truncate text-xs italic text-[var(--text-muted)]">{chanson.indice}</span>
        <span className="mt-0.5 block truncate text-[0.7rem] text-[var(--text-muted)]">
          {[chanson.artiste, chanson.genreEtAnnee].filter(Boolean).join(' · ')}
        </span>
      </span>
    </a>
  )
}

function Colonne({ titre, fleche, chansons }: { titre: string; fleche: string; chansons: Chanson[] }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[var(--accent-labo-ink)]">
        <span aria-hidden="true" className="text-sm">{fleche}</span> {titre}
      </div>
      {chansons.length === 0 ? (
        <p className="py-2 text-sm italic text-[var(--text-muted)]">Pas encore de référence</p>
      ) : (
        <div className="flex flex-col gap-2">
          {chansons.map((c) => <CarteChanson key={c.titre} chanson={c} />)}
        </div>
      )}
    </div>
  )
}

export function Accordeon({ intervalles }: { intervalles: Intervalle[] }) {
  // Première section ouverte au chargement
  const [ouverts, setOuverts] = useState<Set<string>>(() => new Set([intervalles[0].cle]))

  const basculer = (cle: string) =>
    setOuverts((precedent) => {
      const suivant = new Set(precedent)
      if (suivant.has(cle)) suivant.delete(cle)
      else suivant.add(cle)
      return suivant
    })

  return (
    <div className="flex flex-col gap-3">
      {intervalles.map((iv) => {
        const ouvert = ouverts.has(iv.cle)
        const idCorps = `intervalle-${iv.cle}`
        return (
          <section key={iv.cle} className="overflow-hidden rounded-[14px] bg-[var(--bg-card)] shadow-sm">
            <div className="flex items-center gap-2 pr-4">
              <button
                type="button"
                aria-expanded={ouvert}
                aria-controls={idCorps}
                onClick={() => basculer(iv.cle)}
                className={`flex flex-1 cursor-pointer items-center justify-between gap-3 py-4 pl-5 pr-2 text-left transition-colors duration-200 hover:bg-[var(--bg-base)] motion-reduce:transition-none ${focus}`}
              >
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="min-w-[2.75rem] rounded-full bg-[rgba(0,150,199,0.12)] px-2.5 py-0.5 text-center text-sm font-bold text-[var(--text-primary)]">
                    {iv.cle}
                  </span>
                  <span className="text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-syne)' }}>
                    {iv.nom}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{iv.demiTons}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`text-xl leading-none text-[var(--text-muted)] transition-transform duration-200 motion-reduce:transition-none ${ouvert ? 'rotate-90' : ''}`}
                >
                  ›
                </span>
              </button>
              {/* Lien distinct du bouton : il n'ouvre ni ne ferme la section */}
              <a
                href={iv.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${iv.nom} sur Wikipédia`}
                className={`whitespace-nowrap rounded-full border border-[var(--line)] px-3 py-1 text-xs font-medium text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] motion-reduce:transition-none ${focus}`}
              >
                Wikipédia
              </a>
            </div>
            {ouvert && (
              <div id={idCorps} className="border-t border-[var(--line)] bg-[var(--bg-base)] p-5">
                <div className="grid gap-6 min-[580px]:grid-cols-2">
                  <Colonne titre="Ascendant" fleche="↑" chansons={iv.ascendant} />
                  <Colonne titre="Descendant" fleche="↓" chansons={iv.descendant} />
                </div>
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
