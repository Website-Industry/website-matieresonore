import Link from 'next/link'
import type { ReactNode } from 'react'
import { metadataPour } from '@/lib/registre'
import { FriseChrono } from '@/components/FriseChrono'
import { BLEU, VIOLET, ORANGE, SOMBRE, Carte, Titre, Note, Fleche, Verdict, TitreNumerote, Encadre, Chaine } from '@/components/article/Briques'
import { Echantillons, AxeFrequences, FiltrePasseBas, BalayageHelicoidal, DamierPCM, LignesVideo } from './schemas'

export const metadata = metadataPour('nyquist-et-44-1-khz')

/* ── Briques propres à cet article ─────────────────────────── */

function Legende({ items }: { items: { c: string; t: string; tirets?: boolean }[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
      {items.map((i) => (
        <span key={i.t} className="inline-flex items-center gap-1.5">
          <span
            className="inline-block h-0 w-5 border-t-[3px]"
            style={{ borderColor: i.c, borderTopStyle: i.tirets ? 'dashed' : 'solid' }}
          />
          {i.t}
        </span>
      ))}
    </div>
  )
}

function Chiffre({ valeur, unite, legende, couleur = BLEU }: { valeur: string; unite: string; legende: ReactNode; couleur?: string }) {
  return (
    <div className="flex-1 rounded-xl border-2 px-4 py-3" style={{ borderColor: couleur }}>
      <div className="text-3xl font-extrabold leading-none" style={{ fontFamily: 'var(--font-syne)', color: couleur }}>
        {valeur} <span className="text-base font-bold">{unite}</span>
      </div>
      <div className="mt-1 text-xs text-[var(--text-muted)]">{legende}</div>
    </div>
  )
}

function Barre({ label, valeur, max, texte, couleur }: { label: string; valeur: number; max: number; texte: string; couleur: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium text-[var(--text-primary)]">{label}</span>
        <span className="font-semibold" style={{ color: couleur }}>{texte}</span>
      </div>
      <div className="h-3 rounded-full bg-[var(--line)]">
        <div className="h-full rounded-full" style={{ width: `${(valeur / max) * 100}%`, backgroundColor: couleur }} />
      </div>
    </div>
  )
}

function Facteur({ n, sous }: { n: string; sous: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-extrabold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-syne)' }}>{n}</span>
      <span className="max-w-[6.5rem] text-center text-[0.65rem] leading-tight text-[var(--text-muted)]">{sous}</span>
    </div>
  )
}

function Calcul({ systeme, lignes, trames, parLigne, resultat, couleur = ORANGE }: { systeme: string; lignes: string; trames: string; parLigne: string; resultat: string; couleur?: string }) {
  const op = 'self-start pt-1 text-xl font-bold text-[var(--text-muted)]'
  return (
    <div className="rounded-xl bg-[var(--bg-base)] px-4 py-3">
      <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--text-muted)]">{systeme}</div>
      <div className="flex flex-wrap items-start gap-x-3 gap-y-2">
        <Facteur n={lignes} sous="lignes utiles par trame" />
        <span className={op}>×</span>
        <Facteur n={trames} sous="trames par seconde" />
        <span className={op}>×</span>
        <Facteur n={parLigne} sous="échantillons par ligne et par canal" />
        <span className={op}>=</span>
        <span className="text-2xl font-extrabold" style={{ fontFamily: 'var(--font-syne)', color: couleur }}>{resultat}</span>
      </div>
    </div>
  )
}

const resume = [
  { mot: 'Le théorème', ligne: 'Deux échantillons par cycle au minimum : la limite est la moitié de la fréquence d\'échantillonnage.', couleur: BLEU },
  { mot: 'Les fantômes', ligne: 'Au-delà, une fréquence se replie en miroir et devient un son qui n\'existait pas.', couleur: ORANGE },
  { mot: 'Le filtre', ligne: 'Il coupe avant la conversion, avec une pente : d\'où la marge entre 20 et 22,05 kHz.', couleur: VIOLET },
  { mot: 'Deux standards', ligne: '48 kHz pour l\'image, 44,1 kHz pour la musique seule.', couleur: SOMBRE },
  { mot: '44 100', ligne: 'Trois échantillons par ligne vidéo, en NTSC comme en PAL.', couleur: 'var(--accent-labo)' },
]

/* ── Page ──────────────────────────────────────────────────── */

export default function NyquistPage() {
  return (
    <main className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-1 text-sm transition-opacity duration-200 hover:opacity-70"
          style={{ color: 'var(--accent-blog-ink)', fontFamily: 'var(--font-dm-sans)' }}
        >
          ← Blog
        </Link>

        <article className="prose-article">
          <h1
            className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Nyquist, le repliement et le mystère du 44,1 kHz
          </h1>
          <div className="mb-6 mt-4 h-1 w-10 rounded" style={{ backgroundColor: ORANGE }} />

          <p><em>Une petite question sous un reel, un grand plongeon jusqu&apos;aux cassettes vidéo des années 70.</em></p>

          {/* ── La question ── */}
          <Carte className="my-8">
            <div className="text-xs font-bold uppercase tracking-wide text-[var(--text-muted)]">Sous un reel Instagram</div>
            <div className="mt-3 rounded-2xl rounded-tl-sm bg-[var(--bg-base)] px-4 py-3 text-[var(--text-primary)]">
              «&nbsp;Quelle est la fréquence maximale qu&apos;on peut enregistrer en 48&nbsp;kHz&nbsp;?&nbsp;»
            </div>
            <div className="mt-3 flex items-center justify-end gap-3">
              <span className="text-sm text-[var(--text-muted)]">Réponse simple</span>
              <span className="rounded-2xl rounded-tr-sm px-4 py-2 text-xl font-extrabold text-white" style={{ backgroundColor: BLEU, fontFamily: 'var(--font-syne)' }}>
                24&nbsp;kHz
              </span>
            </div>
          </Carte>

          <p>Question simple, réponse simple. Sauf qu&apos;en tirant le fil, on tombe sur :</p>
          <ol>
            <li><strong>un théorème</strong>, celui de Nyquist-Shannon ;</li>
            <li><strong>des fréquences fantômes</strong>, et le filtre qui les chasse ;</li>
            <li><strong>deux standards</strong> qui cohabitent depuis quarante ans ;</li>
            <li><strong>un nombre</strong>, 44&nbsp;100, qui n&apos;a rien d&apos;un hasard.</li>
          </ol>

          {/* ── 1. Le théorème ── */}
          <TitreNumerote numero={1} titre="Deux points par vague, au minimum" />

          <Encadre
            ton="depart"
            points={[
              <>Numériser un son, c&apos;est <strong>mesurer sa hauteur à intervalles réguliers</strong>.</>,
              <>À 48&nbsp;kHz, on prend <strong>48&nbsp;000 mesures par seconde</strong>.</>,
              <>Chaque mesure s&apos;appelle un <strong>échantillon</strong> : les points noirs sur les schémas.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Une onde, des mesures</Titre>
            <div className="mb-4 text-sm text-[var(--text-muted)]">Échantillonnage à 48&nbsp;kHz.</div>
            <div className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Un son grave : beaucoup de points par cycle</div>
            <Echantillons f={6} fs={48} duree={0.5} titre="Onde à 6 kHz échantillonnée à 48 kHz" />
            <div className="mb-1 mt-5 text-sm font-semibold text-[var(--text-primary)]">Un son aigu : à peine plus de deux points par cycle</div>
            <Echantillons f={20} fs={48} duree={0.25} titre="Onde à 20 kHz échantillonnée à 48 kHz" />
            <Legende items={[{ c: BLEU, t: 'le son' }, { c: SOMBRE, t: 'les échantillons' }]} />
          </Carte>

          <Encadre
            ton="voir"
            points={[
              <>L&apos;intuition de départ est la bonne : pour décrire une onde, il faut au moins attraper <strong>un point quand elle monte et un point quand elle descend</strong>.</>,
              <>Deux échantillons par cycle, pas moins.</>,
              <>C&apos;est le <strong>théorème de Nyquist-Shannon</strong> : on peut reconstruire une sinusoïde tant que sa fréquence reste en dessous de la moitié de la fréquence d&apos;échantillonnage.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>La fréquence de Nyquist</Titre>
            <div className="mb-4 text-sm text-[var(--text-muted)]">Cette moitié porte un nom.</div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Chiffre valeur="24" unite="kHz" legende="à 48 kHz" />
              <Chiffre valeur="22,05" unite="kHz" legende="à 44,1 kHz" couleur={VIOLET} />
            </div>
          </Carte>

          <Encadre
            ton="limite"
            label="Une précision qui compte"
            points={[
              <>Ce qu&apos;on reconstruit proprement, ce sont des <strong>sinusoïdes</strong>.</>,
              <>Un signal carré à 24&nbsp;kHz n&apos;est pas une simple onde à 24&nbsp;kHz : il contient des harmoniques bien plus hautes (72&nbsp;kHz, 120&nbsp;kHz...).</>,
              <>Elles sont impossibles à capturer à 48&nbsp;kHz : le carré <strong>ressortira déformé</strong>.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Un carré à 24 kHz, vu en fréquences</Titre>
            <AxeFrequences
              max={130}
              nyquist={24}
              graduations={[0, 24, 48, 72, 96, 120]}
              titre="Un signal carré à 24 kHz et ses harmoniques au-delà de Nyquist"
              reperes={[
                { f: 24, label: '24', couleur: BLEU },
                { f: 72, label: '72', couleur: ORANGE, creux: true },
                { f: 120, label: '120', couleur: ORANGE, creux: true },
              ]}
            />
            <div className="mt-2 text-xs text-[var(--text-muted)]">Le fondamental tient tout juste, les harmoniques (en creux) tombent hors de portée.</div>
          </Carte>

          {/* ── 2. Les fantômes ── */}
          <TitreNumerote numero={2} titre="Au-delà : les fréquences fantômes" />

          <Encadre
            ton="depart"
            points={[
              <>Que se passe-t-il si un son à <strong>26&nbsp;kHz</strong> arrive quand même jusqu&apos;au convertisseur réglé à 48&nbsp;kHz ?</>,
              <>Il ne disparaît pas. <strong>Il se replie.</strong></>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Mêmes points, deux ondes possibles</Titre>
            <div className="mb-4 text-sm text-[var(--text-muted)]">Un son à 26&nbsp;kHz échantillonné à 48&nbsp;kHz.</div>
            <Echantillons f={26} fs={48} duree={0.25} fantome titre="Le 26 kHz et son fantôme à 22 kHz passent par les mêmes échantillons" />
            <Legende items={[{ c: BLEU, t: 'le vrai son, 26 kHz' }, { c: ORANGE, t: 'le fantôme, 22 kHz', tirets: true }, { c: SOMBRE, t: 'les échantillons, communs aux deux' }]} />
          </Carte>

          <Encadre
            ton="voir"
            points={[
              <>Les échantillons pris sur ce 26&nbsp;kHz sont exactement ceux qu&apos;on aurait pris sur une onde à <strong>48 − 26 = 22&nbsp;kHz</strong>.</>,
              <>Le système ne peut pas faire la différence : il reconstruit un 22&nbsp;kHz qui n&apos;a jamais existé dans le son d&apos;origine.</>,
              <>C&apos;est le <strong>repliement</strong>, ou <em>aliasing</em>.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Un miroir posé sur la fréquence de Nyquist</Titre>
            <AxeFrequences
              min={16}
              max={32}
              nyquist={24}
              graduations={[16, 20, 24, 28, 32]}
              titre="Le 26 kHz se replie en 22 kHz, symétrique par rapport à 24 kHz"
              repli={{ de: 26, vers: 22 }}
              reperes={[
                { f: 26, label: '26', couleur: BLEU },
                { f: 22, label: '22', couleur: ORANGE, creux: true },
              ]}
            />
            <div className="mt-2 text-xs text-[var(--text-muted)]">2&nbsp;kHz au-dessus de 24 deviennent 2&nbsp;kHz en dessous.</div>
          </Carte>

          <Encadre
            ton="mode"
            label="À manipuler"
            points={[
              <>Le Labo a un <Link href="/labo/simulateur-repliement">simulateur du repliement</Link> : on règle les deux fréquences et on voit, et on entend, le fantôme apparaître.</>,
            ]}
          />

          {/* ── 3. Le filtre ── */}
          <TitreNumerote numero={3} titre="Le filtre anti-repliement" />

          <Encadre
            ton="depart"
            points={[
              <>D&apos;où une pièce indispensable avant toute conversion : le <strong>filtre anti-repliement</strong>.</>,
              <>C&apos;est un passe-bas : il coupe tout ce qui dépasse la fréquence de Nyquist, avant que ça puisse se replier.</>,
            ]}
          />

          <Encadre
            ton="limite"
            points={[
              <>Un vrai filtre ne coupe pas à la verticale.</>,
              <>Il lui faut une <strong>pente</strong>, une zone de transition.</>,
              <>Le signal utile plafonne donc plutôt vers 20 à 22&nbsp;kHz.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Le filtre d&apos;un convertisseur à 44,1 kHz</Titre>
            <div className="mb-3 text-sm text-[var(--text-muted)]">Ce qui passe, ce qui est coupé, et la pente entre les deux.</div>
            <FiltrePasseBas />
          </Carte>

          <Encadre
            ton="retenir"
            points={[
              <>Bonne nouvelle : l&apos;oreille humaine s&apos;arrête autour de <strong>20&nbsp;kHz</strong>, et moins avec l&apos;âge.</>,
              <>À 44,1&nbsp;kHz, la pente s&apos;étale de 20 à 22,05&nbsp;kHz : environ <strong>2&nbsp;kHz de marge</strong>, sans rien toucher d&apos;audible.</>,
            ]}
          />

          {/* ── 4. Deux standards ── */}
          <TitreNumerote numero={4} titre="Pourquoi deux standards ?" />

          <Encadre
            ton="depart"
            points={[
              <>L&apos;oreille s&apos;arrête vers 20&nbsp;kHz : en théorie, <strong>40&nbsp;kHz suffisent</strong>.</>,
              <>Alors pourquoi 44,1 et 48 ? Et pourquoi les deux ?</>,
            ]}
          />

          <div className="my-6 grid gap-4 sm:grid-cols-2">
            <Carte>
              <div className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-syne)', color: BLEU }}>48 kHz</div>
              <div className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Le monde pro et l&apos;image</div>
              <div className="flex flex-wrap gap-1.5">
                <Note>Télévision</Note>
                <Note>Cinéma</Note>
                <Note>DAT, 1987</Note>
              </div>
              <div className="mt-3 text-sm text-[var(--text-muted)]">Le format attendu dès que la musique passe sous une vidéo.</div>
            </Carte>
            <Carte>
              <div className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-syne)', color: VIOLET }}>44,1 kHz</div>
              <div className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Le CD</div>
              <div className="flex flex-wrap gap-1.5">
                <Note couleur={VIOLET}>CD</Note>
                <Note couleur={VIOLET}>Streaming</Note>
              </div>
              <div className="mt-3 text-sm text-[var(--text-muted)]">Un chiffre bizarre, qui oblige à remonter avant le CD.</div>
            </Carte>
          </div>

          <Carte className="my-6">
            <Titre>Lequel choisir ?</Titre>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-56 font-medium text-[var(--text-primary)]">Musique seule (streaming, CD)</span>
                <Fleche />
                <Note couleur={VIOLET} plein>44,1 kHz</Note>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-56 font-medium text-[var(--text-primary)]">Tout ce qui ira en vidéo</span>
                <Fleche />
                <Note plein>48 kHz</Note>
              </div>
            </div>
            <Verdict ok={false}>On évite la conversion entre les deux : un rapport de 147 pour 160, rien de simple</Verdict>
          </Carte>

          {/* ── 5. Le magnétoscope ── */}
          <TitreNumerote numero={5} titre="Du son déguisé en image" />

          <Encadre
            ton="depart"
            points={[
              <>Fin des années 70 : enregistrer de l&apos;audio numérique demande un <strong>débit énorme</strong>.</>,
              <>Aucun support grand public ne sait stocker autant de données.</>,
              <>Le seul appareil courant capable d&apos;en avaler autant : le <strong>magnétoscope</strong>.</>,
            ]}
          />

          <Encadre
            ton="voir"
            label="Petit détour par la cassette"
            points={[
              <>Un ruban de plastique couvert de particules magnétiques défile devant une <strong>tête</strong>, un minuscule électroaimant.</>,
              <>À l&apos;écriture, la tête oriente les particules ; à la lecture, elle capte leurs variations.</>,
              <>Plus le son est aigu, plus ces variations sont serrées sur le ruban, donc <strong>plus la bande doit défiler vite</strong>.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Vitesse de défilement</Titre>
            <div className="mt-4 flex flex-col gap-4">
              <Barre label="Cassette audio" valeur={4.75} max={38} texte="4,75 cm/s" couleur={VIOLET} />
              <Barre label="Bande de studio" valeur={38} max={38} texte="38 cm/s" couleur={BLEU} />
            </div>
            <div className="mt-3 text-xs text-[var(--text-muted)]">Huit fois plus vite pour la bande de studio. Et la vidéo demande bien plus encore.</div>
          </Carte>

          <Encadre
            ton="voir"
            label="L'astuce des magnétoscopes"
            points={[
              <>Les magnétoscopes comme le <strong>U-matic</strong> montent leurs têtes sur un tambour qui tourne, en biais par rapport à la bande.</>,
              <>La bande avance lentement, mais la tête la balaie à toute vitesse.</>,
              <>Assez pour enregistrer une image.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Des pistes en biais</Titre>
            <div className="mb-3 text-sm text-[var(--text-muted)]">Chaque trait est un passage de la tête.</div>
            <BalayageHelicoidal />
          </Carte>

          <Carte className="my-6">
            <Titre>L&apos;adaptateur PCM</Titre>
            <div className="mb-4 text-sm text-[var(--text-muted)]">Un boîtier qui fait passer le son pour une image.</div>
            <div className="flex flex-wrap items-center gap-1.5">
              <Note couleur={BLEU}>Audio</Note>
              <Fleche />
              <Note couleur={VIOLET}>Bits</Note>
              <Fleche />
              <Note couleur={SOMBRE}>Points noirs et blancs</Note>
              <Fleche label="sur chaque ligne" />
              <Note couleur={ORANGE} plein>Signal vidéo</Note>
            </div>
            <div className="mb-2 mt-5 text-sm font-semibold text-[var(--text-primary)]">Ce qu&apos;on verrait à l&apos;écran</div>
            <DamierPCM />
            <div className="mt-2 text-xs text-[var(--text-muted)]">Un damier qui grésille, pas une image : tout le signal vidéo sert à l&apos;audio. En orange, une ligne.</div>
          </Carte>

          <Chaine
            etapes={[
              <>l&apos;adaptateur traduit les bits en points le long des lignes vidéo</>,
              <>le magnétoscope <strong>croit enregistrer une image</strong></>,
              <>il enregistre en réalité <strong>du son déguisé en pixels</strong>.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Du magnétoscope au CD</Titre>
            <div className="mb-5 text-sm text-[var(--text-muted)]">Les dates de l&apos;histoire.</div>
            <FriseChrono
              debut={1975}
              fin={1990}
              pas={5}
              evenements={[
                { debut: 1976, fin: 1980, titre: 'Le magnétoscope, seul support assez rapide', date: 'fin des années 70', couleur: SOMBRE },
                { debut: 1977, titre: 'Sony PCM-1', detail: 'le premier adaptateur', couleur: VIOLET },
                { debut: 1980, titre: 'Le CD adopte 44,1 kHz', couleur: ORANGE },
                { debut: 1980, fin: 1984, titre: 'PCM-1600 et U-matic', detail: 'les masters des premiers CD', date: 'début des années 80', couleur: VIOLET },
                { debut: 1987, titre: 'Le DAT, en 48 kHz', couleur: BLEU },
              ]}
            />
          </Carte>

          <Encadre
            ton="retenir"
            points={[
              <>Le <strong>PCM-1600</strong>, couplé à des magnétoscopes U-matic modifiés, devient l&apos;outil avec lequel les grands labels masterisent leurs premiers CD.</>,
              <>Les bandes U-matic partent ensuite à l&apos;usine de pressage.</>,
            ]}
          />

          {/* ── 6. Le calcul ── */}
          <TitreNumerote numero={6} titre="Le calcul qui tombe juste" />

          <Encadre
            ton="depart"
            points={[
              <>Une image vidéo est faite de <strong>lignes</strong>.</>,
              <>Elle est balayée en deux passes, les <strong>trames</strong> : d&apos;abord les lignes impaires, puis les paires.</>,
              <>Une partie des lignes ne porte rien d&apos;utile (le temps que le faisceau remonte, notamment). Reste un certain nombre de <strong>lignes utiles</strong> par trame.</>,
              <>L&apos;idée des ingénieurs : caser un nombre entier d&apos;échantillons par ligne, pour chaque canal. <strong>Trois.</strong></>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Trois échantillons par canal et par ligne</Titre>
            <div className="mb-4 text-sm text-[var(--text-muted)]">En stéréo, six par ligne.</div>
            <LignesVideo />
            <div className="mt-3 flex gap-4 text-xs text-[var(--text-muted)]">
              <span><b style={{ color: BLEU }}>G</b> canal gauche</span>
              <span><b style={{ color: VIOLET }}>D</b> canal droit</span>
            </div>
          </Carte>

          <Carte className="my-6">
            <Titre>Le même nombre, deux fois</Titre>
            <div className="mb-4 text-sm text-[var(--text-muted)]">Américain et européen.</div>
            <div className="flex flex-col gap-3">
              <Calcul systeme="NTSC (monochrome)" lignes="245" trames="60" parLigne="3" resultat="44 100" />
              <Calcul systeme="PAL" lignes="294" trames="50" parLigne="3" resultat="44 100" />
            </div>
          </Carte>

          <Encadre
            ton="voir"
            points={[
              <>Deux systèmes vidéo différents tombent sur <strong>le même nombre</strong>.</>,
              <>Pas par coïncidence : ce nombre a été choisi pour ça.</>,
              <>44,1&nbsp;kHz est la fréquence la plus haute compatible avec les deux, sans dépasser 3 échantillons par ligne et par canal.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Et pourquoi pas 2 par ligne ?</Titre>
            <div className="mt-3">
              <Calcul systeme="PAL, 2 par ligne" lignes="294" trames="50" parLigne="2" resultat="29 400" couleur="var(--accent-blog-ink)" />
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <Barre label="Ce que l'oreille entend" valeur={20} max={22.05} texte="jusqu'à 20 kHz" couleur={VIOLET} />
              <Barre label="Ce qu'on capterait à 29,4 kHz" valeur={14.7} max={22.05} texte="jusqu'à 14,7 kHz" couleur={ORANGE} />
            </div>
            <Verdict ok={false}>Nyquist à 14,7 kHz : tout le haut du spectre audible y passerait</Verdict>
          </Carte>

          <Encadre
            ton="retenir"
            points={[
              <>En une seconde de vidéo, on stocke <strong>une seconde d&apos;audio</strong>.</>,
              <>Chaque ligne de chaque trame porte trois échantillons par canal, codés comme des pixels.</>,
              <>Le CD a repris ce chiffre en 1980, et nos fichiers de streaming le portent encore.</>,
              <>Chaque export en 44,1&nbsp;kHz est un petit hommage involontaire aux magnétoscopes des années 70.</>,
            ]}
          />

          {/* ── Résumé ── */}
          <h2>En résumé</h2>

          <div className="my-6 grid gap-3 sm:grid-cols-2">
            {resume.map((r) => (
              <div key={r.mot} className="rounded-[14px] border-l-4 bg-[var(--bg-card)] px-4 py-3 shadow-sm" style={{ borderColor: r.couleur }}>
                <div className="font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-syne)' }}>{r.mot}</div>
                <div className="text-sm text-[var(--text-muted)]">{r.ligne}</div>
              </div>
            ))}
          </div>

          <p>Une question de quatre mots sous une vidéo, et derrière : un théorème de traitement du signal, l&apos;oreille humaine, des filtres imparfaits, et des ingénieurs qui ont fait passer de la musique pour de la télévision.</p>

          <p>C&apos;est souvent comme ça. Les standards qu&apos;on manipule sans y penser sont des <strong>fossiles</strong> : ils gardent la forme des contraintes qui les ont vus naître, longtemps après que ces contraintes ont disparu.</p>
        </article>
      </div>
    </main>
  )
}
