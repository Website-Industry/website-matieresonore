import Link from 'next/link'
import { metadataPour } from '@/lib/registre'
import { Encadre } from '@/components/article/Briques'
import { GainStaging } from './GainStaging'
import { Quantification } from './Quantification'

export const metadata = metadataPour('rapport-signal-bruit')

const titrePartie = 'text-2xl font-extrabold leading-tight text-[var(--text-primary)] md:text-3xl'
const etiquettePartie = 'mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--accent-labo-ink)]'

export default function RapportSignalBruitPage() {
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

        <div className="prose-article">
          <h1
            className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Le rapport signal/bruit, à voir et à bidouiller
          </h1>
          <div className="mb-6 mt-4 h-1 w-10 rounded" style={{ backgroundColor: 'var(--accent-labo)' }} />

          <p>
            Dans une chaîne d&apos;enregistrement numérique, le souffle ne vient pas d&apos;un seul endroit. Deux mécanismes
            distincts le produisent : le niveau auquel on enregistre, côté analogique, à la source ; et la résolution en bits,
            côté numérique, au moment de la conversion.
          </p>
          <p>On bouge les curseurs, on regarde l&apos;effet de chacun.</p>
        </div>

        <nav aria-label="Parties de la page" className="mt-6 flex flex-wrap gap-2 text-sm">
          <a href="#gain-staging" className="rounded-full border border-[var(--line)] px-4 py-1.5 transition-colors duration-200 hover:border-[var(--accent-labo)] motion-reduce:transition-none">
            A. Le niveau d&apos;enregistrement
          </a>
          <a href="#quantification" className="rounded-full border border-[var(--line)] px-4 py-1.5 transition-colors duration-200 hover:border-[var(--accent-labo)] motion-reduce:transition-none">
            B. La résolution en bits
          </a>
        </nav>

        {/* ── Partie A ── */}
        <section id="gain-staging" className="mt-16 scroll-mt-24">
          <p className={etiquettePartie}>Partie A</p>
          <h2 className={titrePartie} style={{ fontFamily: 'var(--font-syne)' }}>
            Le gain staging : enregistrer au bon niveau
          </h2>
          <p className="mt-3 max-w-[65ch] leading-relaxed text-[var(--text-primary)]">
            Le préampli ajoute toujours un peu de bruit, à un niveau fixe. Plus on enregistre bas, plus il faudra remonter le
            signal ensuite, et le bruit remonte avec lui.
          </p>
          <GainStaging />
          <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
            Un modèle, pas une mesure : le plancher de bruit est fixé à −114 dBFS, une valeur plausible pour une interface
            correcte, et le SNR est simplifié en « signal moins plancher ». Les chiffres exacts varient d&apos;un matériel à
            l&apos;autre ; le principe relatif, lui, reste exact.
          </p>
        </section>

        {/* ── Partie B ── */}
        <section id="quantification" className="mt-16 scroll-mt-24">
          <p className={etiquettePartie}>Partie B</p>
          <h2 className={titrePartie} style={{ fontFamily: 'var(--font-syne)' }}>
            La quantification : arrondir à des paliers
          </h2>
          <p className="mt-3 max-w-[65ch] leading-relaxed text-[var(--text-primary)]">
            Le convertisseur range chaque mesure sur le palier le plus proche. L&apos;écart entre la vraie valeur et le palier,
            c&apos;est l&apos;erreur de quantification : elle s&apos;entend comme du bruit. Chaque bit en plus double le nombre
            de paliers et réduit cette erreur.
          </p>
          <Quantification />
          <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
            Les 6 dB par bit valent pour un signal qui occupe toute la pleine échelle. Un signal faible n&apos;utilise
            qu&apos;une partie des paliers : sa dynamique réelle est plus petite. Le signal « Fondu » le montre sur sa fin.
          </p>

          <div className="prose-article mt-8 max-w-none">
            <Encadre
              ton="voir"
              label="Qu’est-ce que le dithering ?"
              points={[
                <>
                  Sur un signal faible, ou à basse résolution, l&apos;erreur d&apos;arrondi suit la forme du signal. C&apos;est une{' '}
                  <strong>distorsion corrélée</strong> : on l&apos;entend comme un grain, une aspérité, plutôt que comme un
                  souffle.
                </>,
                <>
                  Le dithering ajoute un <strong>bruit aléatoire très faible</strong> avant la quantification. Il casse cette
                  corrélation et remplace la distorsion par un bruit blanc très bas, bien moins gênant.
                </>,
                <>
                  En pratique, on l&apos;applique à l&apos;<strong>export vers une résolution plus basse</strong>, de 24 vers
                  16 bits par exemple, pas pendant le travail.
                </>,
              ]}
            />
          </div>
        </section>

        {/* ── Pour aller plus loin ── */}
        <footer className="mt-16 border-t border-[var(--line)] pt-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">Numérique et son, dans la même famille</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/labo/simulateur-repliement"
              className="group rounded-[14px] bg-[var(--bg-card)] p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="text-xs font-medium text-[var(--accent-labo-ink)]">Labo</span>
              <span className="mt-1 block font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-blue)]" style={{ fontFamily: 'var(--font-syne)' }}>
                Le repliement, à voir et à entendre
              </span>
            </Link>
            <Link
              href="/blog/nyquist-et-44-1-khz"
              className="group rounded-[14px] bg-[var(--bg-card)] p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="text-xs font-medium text-[var(--accent-blog-ink)]">Blog</span>
              <span className="mt-1 block font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-blue)]" style={{ fontFamily: 'var(--font-syne)' }}>
                Nyquist, le repliement et le mystère du 44,1 kHz
              </span>
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
