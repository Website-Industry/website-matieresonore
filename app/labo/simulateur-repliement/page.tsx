import Link from 'next/link'
import { metadataPour } from '@/lib/registre'
import { Simulateur } from './Simulateur'

export const metadata = metadataPour('simulateur-repliement')

export default function SimulateurRepliementPage() {
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
            Le repliement, à voir et à entendre
          </h1>
          <div
            className="mb-6 mt-4 h-1 w-10 rounded"
            style={{ backgroundColor: 'var(--accent-labo)' }}
          />

          <p>Numériser un son, c&apos;est le mesurer à intervalles réguliers. Le théorème de Nyquist-Shannon fixe la limite : une sinusoïde se reconstruit tant que sa fréquence reste sous la moitié de la fréquence d&apos;échantillonnage. Au-delà, elle se replie et devient une fréquence fantôme.</p>

          <p>Ici, on règle les deux fréquences et on regarde ce qui se passe. Pour l&apos;histoire complète, jusqu&apos;au 44,1 kHz du CD, voir l&apos;article <Link href="/blog/nyquist-et-44-1-khz">Nyquist, le repliement et le mystère du 44,1 kHz</Link>.</p>
        </div>

        <Simulateur />

        <div className="prose-article mt-12">
          <h2>Ce qu&apos;il faut regarder</h2>

          <p>Les points sont les échantillons : les seules informations que le système garde du son. Tout le reste est perdu.</p>

          <p>Sous la fréquence de Nyquist, la courbe reconstruite, en pointillés violets, se pose exactement sur le son d&apos;origine, en bleu.</p>

          <p>Au-dessus, les mêmes points décrivent aussi une onde plus lente. Le système n&apos;a aucun moyen de savoir laquelle était la vraie : il reconstruit la plus lente. Sa fréquence est l&apos;écart entre la fréquence du son et le multiple de la fréquence d&apos;échantillonnage le plus proche. À 48 kHz, un son à 26 kHz donne 48 − 26 = 22 kHz.</p>

          <p>Pile sur la fréquence de Nyquist, il reste deux échantillons par cycle, et ils peuvent tomber tous sur zéro : le son disparaît. C&apos;est pour cela que le théorème parle d&apos;une fréquence strictement inférieure.</p>

          <h2>Le balayage</h2>

          <p>Le bouton Balayage fait monter le son de 0 jusqu&apos;à deux fois la fréquence d&apos;échantillonnage, en dix secondes. On entend le son monter jusqu&apos;à la fréquence de Nyquist, puis redescendre alors qu&apos;il continue de monter, puis remonter. La fréquence reconstruite rebondit entre 0 et la fréquence de Nyquist : c&apos;est le pli du graphique.</p>

          <p>À 8 kHz, tout se passe dans l&apos;audible. À 44,1 ou 48 kHz, le repliement commence au-delà de 22 kHz : le son d&apos;origine ne s&apos;entend déjà plus, mais son fantôme, lui, redescend dans l&apos;audible.</p>

          <h2>Ce que le simulateur ne fait pas</h2>

          <p>Il n&apos;a pas de filtre anti-repliement. Dans un vrai convertisseur, ce filtre passe-bas coupe tout ce qui dépasse la fréquence de Nyquist avant la mesure : les fantômes n&apos;ont jamais l&apos;occasion d&apos;apparaître.</p>

          <p>Pour l&apos;écoute, le navigateur rejoue les échantillons tels quels, à la fréquence d&apos;échantillonnage choisie. Ce qu&apos;on entend sur « Ce que le système reconstruit » est donc bien ce que le système a gardé. Au-delà de 20 kHz environ, le son d&apos;origine est inaudible.</p>
        </div>
      </div>
    </main>
  )
}
