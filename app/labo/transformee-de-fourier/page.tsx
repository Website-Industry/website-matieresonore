import Link from 'next/link'
import { metadataPour } from '@/lib/registre'
import { Fourier } from './Fourier'

export const metadata = metadataPour('transformee-de-fourier')

export default function TransformeeDeFourierPage() {
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
            La transformée de Fourier, à main levée
          </h1>
          <div
            className="mb-6 mt-4 h-1 w-10 rounded"
            style={{ backgroundColor: 'var(--accent-labo)' }}
          />

          <p>Au début du XIXe siècle, en étudiant la propagation de la chaleur, Joseph Fourier avance une idée qui va traverser toute la physique : une forme périodique, aussi anguleuse soit-elle, peut s&apos;écrire comme une somme de sinusoïdes. Leurs fréquences sont des multiples de la fondamentale : ce sont les harmoniques.</p>

          <p>La page sur la <Link href="/labo/serie-harmonique">série harmonique</Link> construit un son en ajoutant des harmoniques. La transformée de Fourier fait le chemin inverse : elle part de la forme d&apos;onde et retrouve les harmoniques qu&apos;elle contient, avec leur dosage. Ici, on choisit une forme, ou on la dessine, et on regarde son spectre.</p>
        </div>

        <Fourier />

        <div className="prose-article mt-12">
          <h2>Ce qu&apos;il faut regarder</h2>

          <p><strong>Le spectre de chaque forme.</strong> La sinusoïde n&apos;a qu&apos;une barre : elle est sa propre et unique harmonique. Le carré n&apos;a que des harmoniques impaires, d&apos;amplitude 1/n. Les dents de scie ont toutes les harmoniques, toujours en 1/n. Le triangle n&apos;a que les impaires, mais en 1/n² : elles s&apos;éteignent très vite, et sa forme est plus douce à l&apos;oreille.</p>

          <p><strong>La reconstruction.</strong> Avec une seule harmonique, il ne reste qu&apos;une sinusoïde. Chaque harmonique ajoutée rapproche la courbe violette de la forme d&apos;origine. Le pourcentage indique la part de l&apos;énergie déjà captée : plus de 80 % dès la première harmonique pour le carré, près de 99 % pour le triangle.</p>

          <p><strong>Les ondulations du carré.</strong> Près de chaque saut, la reconstruction déborde puis ondule. Ajouter des harmoniques resserre ces ondulations contre le saut, mais ne les fait jamais disparaître : le dépassement reste autour de 9 % de la hauteur du saut. C&apos;est le phénomène de Gibbs.</p>

          <p><strong>Le dessin.</strong> Une forme lisse se contente de quelques harmoniques. Un angle vif ou une marche brusque en réclame beaucoup : plus le dessin est anguleux, plus le spectre s&apos;étale vers l&apos;aigu.</p>

          <h2>Le lien avec le numérique</h2>

          <p>Un carré parfait demande une infinité d&apos;harmoniques. Un système numérique ne garde que celles qui restent sous la fréquence de Nyquist : il ne reproduit qu&apos;un carré tronqué, qui ondule comme celui d&apos;ici. L&apos;article <Link href="/blog/nyquist-et-44-1-khz">Nyquist, le repliement et le mystère du 44,1 kHz</Link> explique où passe cette limite, et le <Link href="/labo/simulateur-repliement">simulateur de repliement</Link> montre ce que deviennent les harmoniques qui la dépassent.</p>

          <h2>Ce que l&apos;outil ne fait pas</h2>

          <p>Il analyse une seule période, répétée à l&apos;infini, découpée en 512 points. Un vrai son change au fil du temps : les analyseurs de spectre et les spectrogrammes appliquent la même transformée sur une suite de courtes fenêtres, l&apos;une après l&apos;autre.</p>

          <p>Le spectre affiche l&apos;amplitude de chaque harmonique, pas sa phase, c&apos;est-à-dire son décalage dans le temps. La reconstruction et l&apos;écoute, elles, en tiennent compte. Pour un son stable, l&apos;oreille est peu sensible à ces phases : deux formes d&apos;onde très différentes à l&apos;œil peuvent sonner presque pareil.</p>
        </div>
      </div>
    </main>
  )
}
