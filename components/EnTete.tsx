import Link from 'next/link'

const liens = [
  { href: '/blog', libelle: 'Blog', couleur: 'var(--accent-blog)' },
  { href: '/labo', libelle: 'Labo', couleur: 'var(--accent-labo)' },
]

const focusClavier =
  'rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)]'

function Marque() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="14" cy="14" r="3" fill="var(--accent-blue)" />
      <circle
        cx="14"
        cy="14"
        r="7.5"
        stroke="var(--accent-blue)"
        strokeOpacity={0.55}
        strokeWidth="1.5"
      />
      <circle
        cx="14"
        cy="14"
        r="12"
        stroke="var(--accent-purple)"
        strokeOpacity={0.35}
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default function EnTete() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-[rgba(247,244,239,0.88)] px-6 py-3.5 backdrop-blur">
      <div className="mx-auto flex max-w-[72rem] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Matière Sonore, accueil"
          className={`flex items-center gap-2 whitespace-nowrap text-base font-extrabold text-[var(--text-primary)] min-[760px]:text-[1.15rem] ${focusClavier}`}
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          <Marque />
          Matière Sonore
        </Link>

        <nav aria-label="Navigation principale" className="flex items-center gap-1 min-[760px]:gap-2">
          {liens.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className={`group relative inline-block px-2 py-1 font-bold text-[var(--text-primary)] min-[760px]:px-3 ${focusClavier}`}
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {lien.libelle}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-[35%] rounded-full transition-[width] duration-200 group-hover:w-full group-focus-visible:w-full motion-reduce:transition-none"
                style={{ backgroundColor: lien.couleur }}
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
