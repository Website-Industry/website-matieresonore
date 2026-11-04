import Link from 'next/link'
import { cheminDe, listerParType } from '@/lib/registre'

function ConcentricCircles({
  color = '#0096c7',
  opacity = 0.07,
  size = 600,
}: {
  color?: string
  opacity?: number
  size?: number
}) {
  const c = size / 2
  const radii = [c * 0.2, c * 0.37, c * 0.54, c * 0.71, c * 0.88]
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {radii.map((r) => (
        <circle
          key={r}
          cx={c}
          cy={c}
          r={r}
          stroke={color}
          strokeOpacity={opacity}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Home() {
  const articles = listerParType('blog').slice(0, 3)
  const pagesLabo = listerParType('labo').slice(0, 3)

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-24 md:py-36 lg:py-48">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <ConcentricCircles />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <h1
            className="text-5xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] md:text-7xl"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Plongeons dans la musique.
          </h1>
          <p
            className="mt-6 text-lg text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Ressentir ce qu'on ressent. Comprendre ce qu'on ressent.
          </p>
          <p
            className="mt-2 text-sm font-light text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Un carnet d'immersions sonores par Marc Charton
          </p>
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────────── */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-10 flex items-center gap-3 text-2xl font-bold text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Blog
            <span
              className="inline-block h-1 w-8 rounded"
              style={{ backgroundColor: 'var(--accent-blog)' }}
            />
          </h2>

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

                  <h3
                    className="mb-2 text-lg font-bold leading-snug text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-blue)]"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {article.titre}
                  </h3>

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

          <div className="mt-10">
            <Link
              href="/blog"
              className="text-sm font-medium transition-opacity duration-200 hover:opacity-70"
              style={{ color: 'var(--accent-blog-ink)', fontFamily: 'var(--font-dm-sans)' }}
            >
              Voir tous les articles →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Labo ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 py-20 md:py-28"
        style={{ backgroundColor: 'var(--bg-dark)' }}
      >
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
          <ConcentricCircles color="#ffffff" opacity={0.04} size={500} />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <h2
            className="mb-4 flex items-center gap-3 text-2xl font-bold text-white"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Labo
            <span
              className="inline-block h-1 w-8 rounded"
              style={{ backgroundColor: 'var(--accent-labo)' }}
            />
          </h2>

          {pagesLabo.length === 0 ? (
            <p className="max-w-md text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-dm-sans)' }}>
              Des pages expérimentales arrivent bientôt.
            </p>
          ) : (
            <ul className="space-y-4">
              {pagesLabo.map((page) => (
                <li key={page.slug}>
                  <Link href={cheminDe(page)} className="group block max-w-md">
                    <span
                      className="block font-bold text-white transition-opacity duration-200 group-hover:opacity-70"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {page.titre}
                    </span>
                    <span
                      className="block text-sm text-white/70"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {page.extrait}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <Link
              href="/labo"
              className="text-sm font-medium transition-opacity duration-200 hover:opacity-70"
              style={{ color: 'var(--accent-labo)', fontFamily: 'var(--font-dm-sans)' }}
            >
              Voir tout le Labo →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
