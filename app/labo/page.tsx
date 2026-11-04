import Link from 'next/link'
import { cheminDe, listerParType } from '@/lib/registre'

export const metadata = {
  title: 'Labo | Matière Sonore',
}

export default function LaboPage() {
  const pages = listerParType('labo')

  return (
    <main className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] md:text-5xl"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Labo
          </h1>
          <div
            className="mt-3 h-1 w-10 rounded"
            style={{ backgroundColor: 'var(--accent-labo)' }}
          />
          <p
            className="mt-4 text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Ressources, outils interactifs, pages expérimentales.
          </p>
        </div>

        {/* Liste */}
        {pages.length === 0 ? (
          <p className="text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            Aucune page pour l'instant.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2">
            {pages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={cheminDe(page)}
                  className="group block h-full rounded-xl bg-[var(--bg-card)] p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <h2
                    className="mb-2 text-lg font-bold leading-snug text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-blue)]"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {page.titre}
                  </h2>
                  <p
                    className="text-sm leading-relaxed text-[var(--text-muted)]"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {page.extrait}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
