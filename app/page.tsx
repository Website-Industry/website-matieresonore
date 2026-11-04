import Link from 'next/link'
import { cheminDe, listerParType, type EntreePage, type TypePage } from '@/lib/registre'

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

const colonnes: {
  type: TypePage
  titre: string
  phrase: string
  lienTout: string
  nature: string
  prochain: string
  suiteProchain: string
  vif: string
  ink: string
}[] = [
  {
    type: 'blog',
    titre: 'Blog',
    phrase: 'Écrire : avis, analyses, tutos, critiques.',
    lienTout: 'Tous les articles →',
    nature: 'Article',
    prochain: 'Prochain article',
    suiteProchain: 'en préparation.',
    vif: 'var(--accent-blog)',
    ink: 'var(--accent-blog-ink)',
  },
  {
    type: 'labo',
    titre: 'Labo',
    phrase: 'Construire : outils et ressources à manipuler.',
    lienTout: 'Tout le Labo →',
    nature: 'Ressource',
    prochain: 'Prochain outil',
    suiteProchain: 'en construction.',
    vif: 'var(--accent-labo)',
    ink: 'var(--accent-labo-ink)',
  },
]

function Carte({
  entree,
  nature,
  vif,
  ink,
}: {
  entree: EntreePage
  nature: string
  vif: string
  ink: string
}) {
  return (
    <Link
      href={cheminDe(entree)}
      className="group flex cursor-pointer flex-col rounded-[14px] bg-[var(--bg-card)] p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {entree.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {entree.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-2 py-0.5 text-xs font-medium"
              style={{ borderColor: vif, color: ink }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h3
        className="mb-2 text-[1.2rem] font-bold leading-snug text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-blue)] motion-reduce:transition-none"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        {entree.titre}
      </h3>

      <p
        className="mb-4 text-sm leading-relaxed text-[var(--text-muted)]"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        {entree.extrait}
      </p>

      <div
        className="mt-auto flex items-center justify-between gap-4 text-xs"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        <time dateTime={entree.date} className="text-[var(--text-muted)]">
          {formatDate(entree.date)}
        </time>
        <span className="font-medium" style={{ color: ink }}>
          {nature}
        </span>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-10 pt-12 min-[760px]:pb-14 min-[760px]:pt-[72px]">
        <div className="pointer-events-none absolute right-[-200px] top-1/2 -translate-y-1/2">
          <ConcentricCircles />
        </div>
        <div className="relative mx-auto max-w-[72rem]">
          <h1
            className="max-w-[14ch] text-[length:min(10.4vw,3rem)] font-extrabold leading-tight tracking-tight text-[var(--text-primary)] [text-wrap:balance] md:text-7xl"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Plongeons dans la musique.
          </h1>
          <p
            className="mt-6 text-lg text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Ressentir ce qu'on comprend. Comprendre ce qu'on ressent.
          </p>
          <p
            className="mt-2 text-sm font-light text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Un carnet d'immersions sonores par Marc Charton
          </p>
        </div>
      </section>

      {/* ── Blog et Labo ─────────────────────────────────────── */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto grid max-w-[72rem] gap-12 min-[760px]:grid-cols-2">
          {colonnes.map((colonne) => {
            const entrees = listerParType(colonne.type).slice(0, 3)
            return (
              <div key={colonne.type} className="min-w-0">
                <div className="mb-6 border-b-2 pb-4" style={{ borderColor: colonne.vif }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h2
                      className="text-[1.9rem] font-extrabold text-[var(--text-primary)]"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {colonne.titre}
                    </h2>
                    <Link
                      href={`/${colonne.type}`}
                      className="rounded text-sm font-medium transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)] motion-reduce:transition-none"
                      style={{ color: colonne.ink, fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {colonne.lienTout}
                    </Link>
                  </div>
                  <p
                    className="mt-1 text-[var(--text-muted)]"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {colonne.phrase}
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {entrees.map((entree) => (
                    <Carte
                      key={entree.slug}
                      entree={entree}
                      nature={colonne.nature}
                      vif={colonne.vif}
                      ink={colonne.ink}
                    />
                  ))}

                  {entrees.length < 3 && (
                    <p
                      className="rounded-[14px] border border-dashed border-[var(--line)] p-6 text-sm text-[var(--text-muted)]"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      <strong className="font-medium">{colonne.prochain}</strong>{' '}
                      {colonne.suiteProchain}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
