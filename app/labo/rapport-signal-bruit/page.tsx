import Link from 'next/link'
import { metadataPour } from '@/lib/registre'
import { BLEU, ORANGE, SOMBRE, VIOLET, Carte, Chaine, Encadre, Fleche, Note, Titre } from '@/components/article/Briques'
import { GainStaging } from './GainStaging'
import { Quantification } from './Quantification'

export const metadata = metadataPour('rapport-signal-bruit')

const titrePartie = 'text-2xl font-extrabold leading-tight text-[var(--text-primary)] md:text-3xl'
const etiquettePartie = 'mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--accent-labo-ink)]'
const texte = 'mt-3 max-w-[65ch] leading-relaxed text-[var(--text-primary)]'

// Petite échelle en décibels : le signal en haut, le bruit en bas, l'écart entre les deux
function SchemaSnr() {
  return (
    <div className="flex items-stretch gap-4" role="img" aria-label="Le rapport signal/bruit est l’écart en décibels entre le niveau du signal et celui du bruit de fond">
      <div className="relative w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--bg-base)] ring-1 ring-[var(--line)]" style={{ height: 180 }}>
        <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[var(--text-muted)]/30" />
        <div className="absolute inset-x-2 bottom-[18%] top-[15%] rounded-t bg-[var(--accent-blue)]" />
      </div>
      <div className="relative flex-1 text-sm" style={{ height: 180 }}>
        <div className="absolute left-6 top-[15%] -translate-y-1/2">
          <strong>Le signal</strong> <span className="text-[var(--text-muted)]">: la voix, l’instrument</span>
        </div>
        <div className="absolute bottom-[18%] left-6 translate-y-1/2">
          <strong>Le bruit de fond</strong> <span className="text-[var(--text-muted)]">: le souffle, toujours là</span>
        </div>
        <div className="absolute bottom-[18%] left-0 top-[15%] flex items-center">
          <span className="mr-2 h-full border-l-2 border-[var(--accent-labo)]" />
          <span className="font-semibold text-[var(--accent-labo-ink)]">l’écart = le rapport signal/bruit (SNR)</span>
        </div>
      </div>
    </div>
  )
}

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
            Écoutez la fin d&apos;une note de piano qui s&apos;éteint, ou un silence entre deux phrases : parfois, un léger
            souffle reste derrière. Ce souffle, c&apos;est le bruit. Il n&apos;apparaît pas par hasard, et on peut le
            contrôler.
          </p>
        </div>

        {/* ── Le contexte ── */}
        <section className="mt-10">
          <h2 className={titrePartie} style={{ fontFamily: 'var(--font-syne)' }}>
            D&apos;abord, de quoi on parle
          </h2>

          <Encadre
            ton="depart"
            label="Ce qui se passe quand on enregistre"
            points={[
              <>Le micro transforme le son en un courant électrique <strong>minuscule</strong>.</>,
              <>Le <strong>préampli</strong> l&apos;amplifie pour l&apos;amener à un niveau utilisable : c&apos;est le bouton « gain » d&apos;une interface audio.</>,
              <>Le <strong>convertisseur</strong> le mesure des milliers de fois par seconde et le transforme en nombres : le fichier numérique.</>,
              <>À deux de ces étapes, un peu de <strong>bruit</strong> s&apos;ajoute au son utile. Ce sont les deux parties de cette page.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>La chaîne d’enregistrement</Titre>
            <div className="mb-4 text-sm text-[var(--text-muted)]">Et les deux endroits où naît le bruit.</div>
            <div className="flex flex-wrap items-center gap-1.5">
              <Note couleur={SOMBRE}>Micro</Note>
              <Fleche />
              <Note couleur={BLEU} plein>Préampli</Note>
              <Fleche />
              <Note couleur={VIOLET} plein>Convertisseur</Note>
              <Fleche />
              <Note couleur={SOMBRE}>Fichier</Note>
            </div>
            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <strong style={{ color: BLEU }}>Partie A</strong> : le souffle électronique du préampli, réglé par le{' '}
                <strong>niveau d&apos;enregistrement</strong>.
              </div>
              <div>
                <strong style={{ color: VIOLET }}>Partie B</strong> : l&apos;erreur d&apos;arrondi du convertisseur, réglée par
                la <strong>résolution en bits</strong>.
              </div>
            </div>
          </Carte>

          <Encadre
            ton="voir"
            label="Le rapport signal/bruit"
            points={[
              <>C&apos;est l&apos;<strong>écart</strong>, en décibels, entre le niveau du son utile et celui du bruit de fond. On l&apos;abrège SNR, de l&apos;anglais <em>signal-to-noise ratio</em>.</>,
              <>Plus l&apos;écart est grand, plus le bruit est loin sous la musique, et moins on l&apos;entend.</>,
              <>Une image : une conversation dans une pièce où tourne un ventilateur. Le ventilateur fait toujours le même bruit ; si la personne parle fort, on ne l&apos;entend plus.</>,
            ]}
          />

          <Carte className="my-6">
            <SchemaSnr />
          </Carte>

          <Encadre
            ton="mode"
            label="Lire les niveaux en dBFS"
            points={[
              <>Dans le numérique, on mesure les niveaux en <strong>dBFS</strong> : décibels sous la pleine échelle.</>,
              <><strong>0 dBFS</strong>, c&apos;est le maximum. Au-delà, le son sature et s&apos;écrête : c&apos;est irréversible.</>,
              <>Tout le reste est négatif : <strong>-18 dBFS</strong>, c&apos;est 18 dB sous le maximum.</>,
            ]}
          />
        </section>

        <nav aria-label="Parties de la page" className="mt-8 flex flex-wrap gap-2 text-sm">
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
          <p className={texte}>
            « Gain staging », c&apos;est l&apos;art de régler le niveau à chaque étape de la chaîne. Ici, la première : le
            préampli.
          </p>

          <Encadre
            ton="depart"
            points={[
              <>L&apos;électronique du préampli produit un léger souffle, <strong>toujours au même niveau</strong>, quoi qu&apos;on enregistre. C&apos;est son <strong>plancher de bruit</strong>.</>,
              <>Le gain, lui, règle le niveau du <strong>signal</strong>. Le plancher ne bouge pas.</>,
              <>Ce qui compte, c&apos;est donc la distance entre les deux.</>,
            ]}
          />

          <Chaine
            titre="Le piège d’un enregistrement trop bas"
            etapes={[
              <>on enregistre avec peu de gain, par prudence</>,
              <>le signal arrive près du plancher : l&apos;écart est petit</>,
              <>au mixage, on remonte le volume pour atteindre un niveau normal, et <strong>le bruit monte d&apos;autant</strong></>,
              <>le souffle devient audible, surtout dans les passages calmes.</>,
            ]}
          />

          <Encadre
            ton="mode"
            points={[
              <><strong>Étape 1</strong> : choisissez le niveau d&apos;enregistrement. La jauge « Enregistré » montre le signal en bleu, posé au-dessus du bruit du préampli en gris.</>,
              <><strong>Étape 2</strong> : appliquez le boost du mixage, avec le bouton ou le second curseur. Les deux flèches montrent que <strong>le signal et le bruit montent du même nombre de décibels</strong>.</>,
              <>Le crochet vert, c&apos;est le SNR : il ne change pas pendant le boost. Ce qui change, c&apos;est que le bruit arrive à un niveau où on l&apos;entend.</>,
              <>Recommencez avec un enregistrement à -10, puis à -30 : plus on enregistre bas, plus le boost est grand, plus le bruit finit haut.</>,
            ]}
          />

          <GainStaging />
          <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
            Un modèle, pas une mesure : le plancher de bruit est fixé à −114 dBFS, une valeur plausible pour une interface
            correcte, et le SNR est simplifié en « signal moins plancher ». Les chiffres exacts varient d&apos;un matériel à
            l&apos;autre ; le principe relatif, lui, reste exact.
          </p>

          <Encadre
            ton="retenir"
            points={[
              <>Enregistrer <strong>assez haut</strong> éloigne le signal du plancher de bruit : c&apos;est le meilleur SNR possible.</>,
              <>Sans jamais toucher 0 dBFS : une saturation ne se répare pas, un léger manque de niveau si.</>,
              <>Le boost au mixage ne crée pas de bruit, il <strong>révèle</strong> celui qu&apos;on a enregistré.</>,
            ]}
          />
        </section>

        {/* ── Partie B ── */}
        <section id="quantification" className="mt-16 scroll-mt-24">
          <p className={etiquettePartie}>Partie B</p>
          <h2 className={titrePartie} style={{ fontFamily: 'var(--font-syne)' }}>
            La quantification : arrondir à des paliers
          </h2>
          <p className={texte}>
            Le signal arrive maintenant au convertisseur, qui doit le transformer en nombres. Pour la cadence des mesures,
            voir l&apos;article sur <Link href="/blog/nyquist-et-44-1-khz" className="text-[var(--accent-blue)] underline underline-offset-2">Nyquist et le 44,1 kHz</Link> ;
            ici, on s&apos;intéresse à la précision de chaque mesure.
          </p>

          <Encadre
            ton="depart"
            points={[
              <>Chaque mesure doit être rangée sur un nombre <strong>limité</strong> de valeurs possibles : les <strong>paliers</strong>.</>,
              <>Le nombre de <strong>bits</strong> fixe combien il y en a : 16 bits donnent 65 536 paliers, 24 bits plus de 16 millions.</>,
              <>La vraie valeur tombe presque toujours entre deux paliers : elle est <strong>arrondie</strong> au plus proche.</>,
              <>Cette petite erreur, répétée à chaque mesure, s&apos;entend comme un bruit : le <strong>bruit de quantification</strong>.</>,
            ]}
          />

          <Chaine
            titre="Pourquoi les bits comptent"
            etapes={[
              <>on ajoute un bit</>,
              <>le nombre de paliers double, ils sont deux fois plus serrés</>,
              <>l&apos;erreur d&apos;arrondi est deux fois plus petite</>,
              <>le bruit de quantification baisse d&apos;environ <strong>6 dB par bit</strong>.</>,
            ]}
          />

          <Encadre
            ton="mode"
            points={[
              <>Le curseur règle la <strong>résolution</strong>. Les cartes donnent les vrais chiffres.</>,
              <>Sur le graphique, les pointillés bleus sont le <strong>vrai signal</strong> ; le trait violet en escalier est <strong>ce que le convertisseur garde</strong>.</>,
              <>La bande verte du bas, c&apos;est l&apos;<strong>erreur</strong> entre les deux : autrement dit, le bruit. Regardez-la rétrécir quand les bits augmentent.</>,
              <>Survolez ou touchez le graphique pour lire les valeurs ; glissez pour mesurer l&apos;erreur sur une plage.</>,
              <>Essayez le signal <strong>Fondu</strong> à 8 bits, avec puis sans dithering : c&apos;est la partie expliquée plus bas.</>,
            ]}
          />

          <Quantification />
          <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
            Les 6 dB par bit valent pour un signal qui occupe toute la pleine échelle. Un signal faible n&apos;utilise
            qu&apos;une partie des paliers : sa dynamique réelle est plus petite. Le signal « Fondu » le montre sur sa fin.
          </p>

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
        </section>

        {/* ── En résumé ── */}
        <section className="mt-16">
          <h2 className={titrePartie} style={{ fontFamily: 'var(--font-syne)' }}>
            En résumé
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { mot: 'Le niveau d’enregistrement', ligne: 'Il fixe l’écart entre le signal et le souffle du préampli. Enregistrer assez haut, sans saturer.', couleur: BLEU },
              { mot: 'La résolution en bits', ligne: 'Elle fixe la finesse des paliers. Chaque bit baisse le bruit de quantification d’environ 6 dB.', couleur: VIOLET },
              { mot: 'Le dithering', ligne: 'Il échange une distorsion gênante contre un bruit très bas, à l’export vers moins de bits.', couleur: 'var(--accent-labo)' },
              { mot: 'En pratique', ligne: 'En 24 bits, le bruit de quantification passe loin sous le souffle analogique : c’est le niveau d’enregistrement qui compte le plus.', couleur: ORANGE },
            ].map((r) => (
              <div key={r.mot} className="rounded-[14px] border-l-4 bg-[var(--bg-card)] px-4 py-3 shadow-sm" style={{ borderColor: r.couleur }}>
                <div className="font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-syne)' }}>{r.mot}</div>
                <div className="text-sm text-[var(--text-muted)]">{r.ligne}</div>
              </div>
            ))}
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
