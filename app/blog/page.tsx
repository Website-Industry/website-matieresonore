import Link from 'next/link'
import { cheminDe, listerParType } from '@/lib/registre'

export const metadata = {
  title: 'Blog — Matière Sonore',
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const articles = listerParType('blog')

  return (
    <main className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] md:text-5xl"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Blog
          </h1>
          <div
            className="mt-3 h-1 w-10 rounded"
            style={{ backgroundColor: 'var(--accent-blog)' }}
          />
          <p
            className="mt-4 text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Avis, réflexions, tutos, analyses — la musique en mots.
          </p>
        </div>

        {/* Grid */}
        {articles.length === 0 ? (
          <p className="text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            Aucun article pour l'instant.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={cheminDe(article)}
                className="group flex cursor-pointer flex-col rounded-xl bg-[var(--bg-card)] p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                {article.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-2 py-0.5 text-xs font-medium"
                        style={{ borderColor: 'var(--accent-blog)', color: 'var(--accent-blog-ink)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2
                  className="mb-2 text-lg font-bold leading-snug text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-blue)]"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {article.titre}
                </h2>

                <p
                  className="mb-4 flex-1 text-sm leading-relaxed text-[var(--text-muted)]"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {article.extrait}
                </p>

                <time className="text-xs text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                  {formatDate(article.date)}
                </time>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
