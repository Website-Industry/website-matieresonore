import Link from 'next/link'
import { metadataPour } from '@/lib/registre'

export const metadata = metadataPour('nyquist-et-44-1-khz')

const cellule = 'border border-[rgba(13,26,46,0.12)] px-3 py-2 text-left'

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
          <div
            className="mb-6 mt-4 h-1 w-10 rounded"
            style={{ backgroundColor: 'var(--accent-blog)' }}
          />

          <p><em>Une petite question sous un reel, un grand plongeon jusqu'aux cassettes vidéo des années 70</em></p>

          <p>Sous un reel Instagram, quelqu'un demandait : « quelle est la fréquence maximale qu'on peut enregistrer en 48 kHz ? ». Question simple. Réponse simple : 24 kHz. Sauf qu'en tirant le fil, on tombe sur un théorème, des fréquences fantômes, deux standards qui cohabitent depuis quarante ans, et un nombre, 44 100, qui n'a rien d'un hasard.</p>

          <h2>Deux points par vague, au minimum</h2>

          <p>Numériser un son, c'est mesurer sa hauteur à intervalles réguliers. À 48 kHz, on prend 48 000 mesures par seconde. Chaque mesure s'appelle un échantillon.</p>

          <p>L'intuition de départ est la bonne : pour décrire une onde, il faut au moins attraper un point quand elle monte et un point quand elle descend. Deux échantillons par cycle, pas moins. C'est le théorème de Nyquist-Shannon : on peut reconstruire une sinusoïde tant que sa fréquence reste en dessous de la moitié de la fréquence d'échantillonnage.</p>

          <p>Cette moitié porte un nom, la fréquence de Nyquist. À 48 kHz, elle vaut 24 kHz. À 44,1 kHz, 22,05 kHz.</p>

          <p>Une précision qui compte : ce qu'on reconstruit proprement, ce sont des sinusoïdes. Un signal carré à 24 kHz n'est pas une simple onde à 24 kHz. Il contient des harmoniques bien plus hautes (72 kHz, 120 kHz...), impossibles à capturer à 48 kHz. Il ressortira déformé.</p>

          <h2>Au-delà : les fréquences fantômes</h2>

          <p>Que se passe-t-il si un son à 26 kHz arrive quand même jusqu'au convertisseur réglé à 48 kHz ? Il ne disparaît pas. Il se replie.</p>

          <p>Les échantillons pris sur ce 26 kHz sont exactement ceux qu'on aurait pris sur une onde à 48 − 26 = 22 kHz. Le système ne peut pas faire la différence : il reconstruit un 22 kHz qui n'a jamais existé dans le son d'origine. C'est le repliement, ou <em>aliasing</em>. Une fréquence fantôme, qui reflète l'original comme un miroir posé sur la fréquence de Nyquist.</p>

          <p>Pour le voir et l'entendre, le Labo a un <Link href="/labo/simulateur-repliement">simulateur de repliement</Link> : on règle les deux fréquences, et le fantôme apparaît.</p>

          <p>D'où une pièce indispensable avant toute conversion : le filtre anti-repliement, un passe-bas qui coupe tout ce qui dépasse la fréquence de Nyquist.</p>

          <p>Seulement, un vrai filtre ne coupe pas à la verticale. Il lui faut une pente, une zone de transition. Le signal utile plafonne donc plutôt vers 20 à 22 kHz. Bonne nouvelle : l'oreille humaine s'arrête autour de 20 kHz, et moins avec l'âge. À 44,1 kHz, la zone de transition s'étale de 20 kHz à 22,05 kHz : environ 2 kHz de marge, sans rien toucher d'audible.</p>

          <h2>Pourquoi deux standards ?</h2>

          <p>Si 40 kHz suffisent en théorie, pourquoi 44,1 et 48 ? Et pourquoi les deux ?</p>

          <p><strong>48 kHz</strong> est le standard du monde professionnel et de l'image : télévision, cinéma, et le DAT à partir de 1987. C'est le format attendu dès que la musique passe sous une vidéo.</p>

          <p><strong>44,1 kHz</strong> est celui du CD. Et pour comprendre ce chiffre bizarre, il faut remonter avant le CD, à une époque où aucun support grand public ne savait stocker autant de données.</p>

          <p>Conseil pratique au passage : 44,1 kHz pour la musique seule (streaming, CD), 48 kHz pour tout ce qui ira en vidéo. On évite ainsi une conversion entre les deux, dont le rapport (147 pour 160) n'a rien de simple.</p>

          <h2>Du son déguisé en image</h2>

          <p>À la fin des années 70, enregistrer de l'audio numérique demande un débit énorme. Le seul appareil courant capable d'avaler autant d'information, c'est le magnétoscope.</p>

          <p>Petit détour par la cassette. Un ruban de plastique couvert de particules magnétiques défile devant une tête, un minuscule électroaimant. À l'écriture, la tête oriente les particules ; à la lecture, elle capte leurs variations. Plus le son est aigu, plus ces variations sont serrées sur le ruban, donc plus il faut que la bande défile vite : 4,75 cm/s pour une cassette audio, jusqu'à 38 cm/s pour une bande de studio.</p>

          <p>La vidéo demande bien plus. Les magnétoscopes comme le U-matic contournent le problème avec des têtes montées sur un tambour qui tourne, en biais par rapport à la bande. La bande avance lentement, mais la tête la balaie à toute vitesse. Assez pour enregistrer une image.</p>

          <p>L'astuce vient alors d'un boîtier : l'adaptateur PCM. Il convertit l'audio en bits, puis traduit ces bits en points noirs et blancs le long de chaque ligne d'un signal vidéo. Le magnétoscope croit enregistrer une image ; il enregistre du son déguisé en pixels. À l'écran, on verrait un damier qui grésille, pas une image : tout le signal vidéo sert à l'audio.</p>

          <p>Sony sort son premier adaptateur, le PCM-1, en 1977. Le PCM-1600, couplé à des magnétoscopes U-matic modifiés, devient l'outil avec lequel les grands labels masterisent leurs premiers CD au début des années 80. Les bandes U-matic partent ensuite à l'usine de pressage.</p>

          <h2>Le calcul qui tombe juste</h2>

          <p>Une image vidéo est faite de lignes, et elle est balayée en deux passes, les trames : d'abord les lignes impaires, puis les paires. Une partie des lignes ne porte rien d'utile (le temps que le faisceau remonte, notamment). Reste un certain nombre de lignes utiles par trame.</p>

          <p>L'idée des ingénieurs : caser un nombre entier d'échantillons par ligne, pour chaque canal. Trois.</p>

          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className={cellule}>Système</th>
                  <th className={cellule}>Lignes utiles par trame</th>
                  <th className={cellule}>Trames par seconde</th>
                  <th className={cellule}>Échantillons par ligne et par canal</th>
                  <th className={cellule}>Résultat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cellule}>NTSC (monochrome)</td>
                  <td className={cellule}>245</td>
                  <td className={cellule}>60</td>
                  <td className={cellule}>3</td>
                  <td className={cellule}><strong>44 100</strong></td>
                </tr>
                <tr>
                  <td className={cellule}>PAL</td>
                  <td className={cellule}>294</td>
                  <td className={cellule}>50</td>
                  <td className={cellule}>3</td>
                  <td className={cellule}><strong>44 100</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>Deux systèmes vidéo différents, américain et européen, tombent sur le même nombre. Pas par coïncidence : ce nombre a été choisi pour ça. 44,1 kHz est la fréquence la plus haute compatible avec les deux, sans dépasser 3 échantillons par ligne et par canal. En stéréo, chaque ligne porte donc 6 échantillons.</p>

          <p>Et pourquoi pas 2 par ligne ? On tomberait à 29,4 kHz, soit une fréquence de Nyquist de 14,7 kHz. Bien trop bas : tout le haut du spectre audible y passerait.</p>

          <p>Autrement dit : en une seconde de vidéo, on stocke une seconde d'audio, et chaque ligne de chaque trame porte trois échantillons par canal, codés comme des pixels.</p>

          <p>Le CD a repris ce chiffre en 1980, et nos fichiers de streaming le portent encore. Chaque fois qu'on exporte un morceau en 44,1 kHz, on rend un petit hommage involontaire aux magnétoscopes des années 70.</p>

          <h2>Pour finir</h2>

          <p>Une question de quatre mots sous une vidéo, et derrière : un théorème de traitement du signal, l'oreille humaine, des filtres imparfaits, et des ingénieurs qui ont fait passer de la musique pour de la télévision.</p>

          <p>C'est souvent comme ça. Les standards qu'on manipule sans y penser sont des fossiles : ils gardent la forme des contraintes qui les ont vus naître, longtemps après que ces contraintes ont disparu.</p>
        </article>
      </div>
    </main>
  )
}
