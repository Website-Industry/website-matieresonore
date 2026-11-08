import Link from 'next/link'
import { metadataPour } from '@/lib/registre'
import { Accordeon } from './Accordeon'
import { INTERVALLES, RESSOURCES } from './donnees'

export const metadata = metadataPour('intervalles')

export default function IntervallesPage() {
  return (
    <main className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/labo"
          className="mb-10 inline-flex items-center gap-1 text-sm transition-opacity duration-200 hover:opacity-70"
          style={{ color: 'var(--accent-labo-ink)', fontFamily: 'var(--font-dm-sans)' }}
        >
          ← Labo
        </Link>

        <h1
          className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Intervalles
        </h1>
        <p className="mt-2 text-lg text-[var(--text-muted)]">Aide-mémoire</p>
        <div className="mb-8 mt-4 h-1 w-10 rounded" style={{ backgroundColor: 'var(--accent-labo)' }} />

        <div className="mb-8 rounded-[14px] bg-[var(--bg-card)] p-6 shadow-sm">
          <p className="mb-4 leading-relaxed text-[var(--text-primary)]">
            Entraîne ton oreille à reconnaître les 12 intervalles simples, de la seconde mineure à
            l&apos;octave. Clique sur une chanson pour l&apos;écouter sur YouTube. Clique sur{' '}
            <strong className="font-semibold">Wikipédia</strong> pour lire la théorie de chaque intervalle.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">
              Ressources générales
            </span>
            {RESSOURCES.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-medium text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)] motion-reduce:transition-none"
              >
                {r.emoji} {r.libelle}
              </a>
            ))}
          </div>
        </div>

        <Accordeon intervalles={INTERVALLES} />

        <p className="mt-10 text-center text-xs text-[var(--text-muted)]">
          Chansons repères reprises du cheat sheet Interval d&apos;Open Minded Singing
        </p>
      </div>
    </main>
  )
}
