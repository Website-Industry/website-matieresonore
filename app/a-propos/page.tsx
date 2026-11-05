import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos | Matière Sonore',
  description: "Matière Sonore, le carnet d'explorations musicales de Marc Charton : un Blog pour écrire, un Labo pour construire.",
}

// Texte que Marc n'a pas encore fourni : placeholder explicite, visible
function AFournir({ children }: { children: string }) {
  return (
    <span className="rounded border border-dashed border-[var(--text-muted)] px-1.5 py-0.5 text-[0.95em] text-[var(--text-muted)]">
      {children}
    </span>
  )
}

export default function AProposPage() {
  return (
    <main className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <article className="prose-article">
          <h1
            className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            À propos
          </h1>
          <div
            className="mb-6 mt-4 h-1 w-10 rounded"
            style={{ backgroundColor: 'var(--accent-blue)' }}
          />

          <p className="text-xl leading-relaxed" style={{ fontFamily: 'var(--font-syne)' }}>
            Ressentir ce qu&apos;on comprend. Comprendre ce qu&apos;on ressent.
          </p>

          <p>Matière Sonore est le carnet d&apos;explorations musicales de Marc Charton. Un espace public pour partager ce qu&apos;il découvre, comprend et construit autour de la musique : théorie, piano, production, cultures musicales, outils.</p>

          <p>Au départ, il y a une envie simple : avoir un lien à partager. « Tu as entendu parler de ça ? », « Regarde ce que j&apos;ai fait », « Voilà ce que j&apos;en pense ». Et une conviction : la musique se vit avec le corps et se comprend avec la tête, et l&apos;un nourrit l&apos;autre. La musique vibre, le cerveau analyse.</p>

          <h2>Deux espaces</h2>

          <p><strong><Link href="/blog">Le Blog</Link></strong>, pour écrire : des avis, des réflexions, des tutos, des critiques, des analyses. Une question entendue au détour d&apos;une vidéo peut y devenir une plongée jusqu&apos;à l&apos;histoire d&apos;un standard.</p>

          <p><strong><Link href="/labo">Le Labo</Link></strong>, pour construire : des ressources et des outils à manipuler, chacun avec son propre univers. On y règle, on y écoute, on y dessine, pour comprendre en faisant.</p>

          <p>Les deux se répondent : un article renvoie vers l&apos;outil qui le rend tangible, un outil renvoie vers l&apos;article qui raconte le pourquoi.</p>

          <h2>Pour qui</h2>

          <p>Pour les débutants curieux comme pour les musiciens confirmés. Ce qui les rassemble, c&apos;est l&apos;envie de comprendre en profondeur. Ici, on ne parle de haut à personne : on explore, on vérifie, on partage ce qu&apos;on a trouvé.</p>

          <p>Il n&apos;y a pas de rythme de publication imposé. Un contenu paraît quand il a quelque chose à dire.</p>

          <h2>Pourquoi l&apos;eau</h2>

          <p>La matière sonore, c&apos;est l&apos;eau dans laquelle on plonge. Pas la mer ni la plage : l&apos;eau comme matière physique, un milieu où l&apos;on s&apos;immerge tout entier. Les ondes de l&apos;eau et les ondes sonores partagent la même forme et le même mot. Les cercles concentriques du site sont ceux d&apos;une onde qui se propage. D&apos;où l&apos;invitation de l&apos;accueil : plongeons dans la musique.</p>

          <h2>L&apos;auteur</h2>

          <p>Marc Charton est musicien. <AFournir>[PARCOURS DE MARC]</AFournir></p>

          <p>Matière Sonore est rattaché à Ghost-Note. <AFournir>[GHOST-NOTE : CE QUE C&apos;EST, LIEN]</AFournir></p>

          <h2>La fabrication</h2>

          <p>Le site est aussi un terrain d&apos;apprentissage : c&apos;est le premier projet de Marc réalisé entièrement avec Claude Code, et cet apprentissage est documenté au fil des sessions. Le code est public, sur <a href="https://github.com/Website-Industry/website-matieresonore">GitHub</a>.</p>
        </article>
      </div>
    </main>
  )
}
