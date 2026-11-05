import Link from 'next/link'
import { metadataPour } from '@/lib/registre'
import { SerieHarmonique } from './SerieHarmonique'

export const metadata = metadataPour('serie-harmonique')

export default function SerieHarmoniquePage() {
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
            La série harmonique, une à une
          </h1>
          <div
            className="mb-6 mt-4 h-1 w-10 rounded"
            style={{ backgroundColor: 'var(--accent-labo)' }}
          />

          <p>Une note jouée par un instrument n&apos;est presque jamais un son pur. Elle contient une fréquence fondamentale, celle qui donne son nom à la note, et toute une série de fréquences au-dessus : deux fois la fondamentale, trois fois, quatre fois, et ainsi de suite. C&apos;est la série harmonique.</p>

          <p>Le dosage de ces harmoniques fait le timbre : c&apos;est lui qui distingue deux instruments qui jouent la même note. Ici, on les active et on les coupe une par une, à l&apos;oreille et à l&apos;œil.</p>
        </div>

        <SerieHarmonique />

        <div className="prose-article mt-12">
          <h2>Ce qu&apos;il faut écouter</h2>

          <p><strong>Les intervalles se resserrent.</strong> De la fondamentale à l&apos;harmonique 2 : une octave. De 2 à 3 : une quinte. Puis une quarte, une tierce majeure, une tierce mineure. Plus on monte, plus les harmoniques se rapprochent. Le bouton « Une à une » le fait entendre d&apos;un trait.</p>

          <p><strong>Un accord caché dans chaque note.</strong> Les harmoniques 4, 5 et 6 forment un accord majeur : sur un C, ce sont C, E et G. Avec l&apos;harmonique 7, on obtient presque une septième de dominante, avec une septième un peu basse.</p>

          <p><strong>Des notes qui ne tombent pas sur le piano.</strong> La fiche donne, pour chaque harmonique, la note tempérée la plus proche et l&apos;écart en cents (un demi-ton tempéré vaut 100 cents). La quinte de la série est à 2 cents de celle du piano, la tierce majeure à 14 cents en dessous. L&apos;harmonique 7 est 31 cents sous le Bb, l&apos;harmonique 11 tombe presque entre F et F#, l&apos;harmonique 13 est 41 cents au-dessus du Ab. Le tempérament égal est un compromis : il n&apos;est juste que sur les octaves.</p>

          <h2>Ce qu&apos;il faut regarder</h2>

          <p><strong>La forme de l&apos;onde.</strong> La fondamentale seule donne une sinusoïde. Avec toutes les harmoniques, chacune à une amplitude de 1/n, on s&apos;approche d&apos;une onde en dents de scie. Avec les harmoniques impaires seulement, on s&apos;approche d&apos;un signal carré.</p>

          <p>C&apos;est ce signal carré qui pose problème en numérique : ses harmoniques montent bien au-delà de la fondamentale. L&apos;article <Link href="/blog/nyquist-et-44-1-khz">Nyquist, le repliement et le mystère du 44,1 kHz</Link> raconte pourquoi un carré à 24 kHz ressort déformé à 48 kHz, et le <Link href="/labo/simulateur-repliement">simulateur de repliement</Link> montre ce que deviennent les fréquences trop hautes.</p>

          <p><strong>La corde.</strong> L&apos;harmonique n correspond à une corde qui vibre en n segments égaux, séparés par des nœuds immobiles. C&apos;est le principe des harmoniques naturelles à la guitare ou au violon : effleurer la corde au tiers de sa longueur l&apos;empêche de vibrer en un seul morceau, et fait sortir l&apos;harmonique 3.</p>

          <h2>Ce que l&apos;outil ne fait pas</h2>

          <p>Les amplitudes sont fixes, en 1/n. Un vrai instrument dose ses harmoniques à sa façon, et ce dosage change au cours de la note.</p>

          <p>Les harmoniques sont ici des multiples exacts de la fondamentale. Sur un piano, la raideur des cordes les décale légèrement vers l&apos;aigu : c&apos;est l&apos;inharmonicité, une des raisons pour lesquelles un accordeur étire les octaves.</p>
        </div>
      </div>
    </main>
  )
}
