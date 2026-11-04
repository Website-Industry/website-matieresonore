import Link from 'next/link'
import { metadataPour } from '@/lib/registre'

export const metadata = metadataPour('gamme-mineure-naturelle')

const cellule = 'border border-[rgba(13,26,46,0.12)] px-3 py-2 text-left align-top'

export default function GammeMineureNaturellePage() {
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
            Pourquoi la gamme mineure naturelle garde une seconde majeure
          </h1>
          <div
            className="mb-6 mt-4 h-1 w-10 rounded"
            style={{ backgroundColor: 'var(--accent-blog)' }}
          />

          <p><em>Une asymétrie qui m'a longtemps gratté, et ce qu'elle raconte de notre système</em></p>

          <p>Regardez la gamme majeure depuis sa tonique : tous ses intervalles sont justes ou majeurs. Seconde majeure, tierce majeure, quarte juste, quinte juste, sixte majeure, septième majeure. Propre.</p>

          <p>Regardez maintenant la gamme mineure naturelle : tous ses intervalles sont justes ou mineurs... sauf un. La seconde reste majeure.</p>

          <p>Pourquoi ? Si on voulait un « mineur pur », symétrique du majeur, il faudrait une seconde mineure. Ce mode existe, il s'appelle le phrygien. Alors pourquoi notre musique a-t-elle choisi l'autre ?</p>

          <pre><code>{`Do majeur           Do  Ré   Mi   Fa  Sol  La   Si
Do mineur naturel   Do  Ré   Mi♭  Fa  Sol  La♭  Si♭
Do phrygien         Do  Ré♭  Mi♭  Fa  Sol  La♭  Si♭`}</code></pre>

          <p>Entre le mineur naturel (qu'on appelle aussi éolien) et le phrygien, une seule note change : la deuxième. J'ai creusé plusieurs pistes. Aucune ne suffit seule ; ensemble, elles racontent quelque chose.</p>

          <h2>Piste 1 : l'histoire, par relativité</h2>

          <p>Le mineur naturel n'a pas été construit comme un miroir du majeur. Il en dérive par relativité : La mineur reprend exactement les notes de Do majeur, en partant de La. La seconde La → Si est majeure tout simplement parce qu'elle l'est déjà dans la collection de Do.</p>

          <p>C'est vrai, et c'est intéressant. Mais ça déplace la question plus que ça n'y répond : pourquoi avoir retenu ce point de départ-là, et pas le Mi, qui donne le phrygien avec les mêmes touches blanches ?</p>

          <h2>Piste 2 : la fonction, ou le problème de la dominante</h2>

          <p>C'est l'argument qui m'a convaincu. Notre musique tonale tourne autour d'un geste : la dominante qui retombe sur la tonique. V → I. Pour ça, il faut un accord de dominante majeur, avec une sensible un demi-ton sous la tonique.</p>

          <p>En Do mineur naturel, le Ve degré donne Sol mineur (Sol, Si♭, Ré). Une seule retouche suffit : on remonte le Si♭ en Si, et on obtient G7 (Sol, Si, Ré, Fa). C'est d'ailleurs comme ça qu'est né le mineur harmonique. Et le IIe degré, Ré diminué (Ré, Fa, La♭), prépare ce G7 en douceur : le Ré et le Fa restent en place, le La♭ descend d'un demi-ton sur le Sol. Un II-V-I mineur parfaitement huilé.</p>

          <p>En Do phrygien, regardez le Ve degré : Sol, Si♭, <strong>Ré♭</strong>. Un accord diminué. Pour en faire une dominante, il faudrait remonter le Si♭ <em>et</em> le Ré♭. Or le Ré♭, c'est précisément la note qui fait le phrygien. Le corriger, c'est quitter le mode.</p>

          <p>Même en imaginant un « phrygien harmonique » (Do, Ré♭, Mi♭, Fa, Sol, La♭, Si), on n'y arrive pas : le Ve degré devient Sol, Si, Ré♭, avec une quinte diminuée. Toujours pas un vrai accord de dominante.</p>

          <p>La seconde majeure n'est donc pas un détail : c'est elle qui laisse la place au Ré naturel, la quinte de la dominante. Sans elle, pas de V → I solide.</p>

          <h2>Attention, le ♭II n'est pas interdit</h2>

          <p>On entend parfois qu'un accord sur le IIe degré abaissé « ne fonctionne pas » dans la musique tonale. C'est faux, et c'est même mon passage préféré de cette histoire.</p>

          <p>La musique classique a un nom pour cet accord : l'<strong>accord napolitain</strong>. En Do mineur, c'est Ré♭ majeur, joué le plus souvent en premier renversement (Fa, La♭, Ré♭). Il mène très bien à la dominante, puis à la tonique : ♭II6 → V → i. Une cadence standard, qu'on croise chez Mozart, Beethoven ou Chopin.</p>

          <p>Le phrygien n'a donc pas été chassé de la musique tonale. Il y est entré par la petite porte, comme une couleur d'emprunt posée juste avant la dominante. Ce qu'il ne pouvait pas faire, c'est fournir la dominante lui-même.</p>

          <h2>Piste 3 : l'oreille, par en dessus ou par en dessous</h2>

          <p>En tonal classique, la note la plus attirée par la tonique arrive par en dessous : la sensible, Si → Do, un demi-ton qui monte.</p>

          <p>En phrygien, la note la plus attirée arrive par en dessus : Ré♭ → Do, un demi-ton qui descend. Ça donne une autre couleur de conclusion, la cadence ♭II → I. Si elle vous dit quelque chose, c'est normal : c'est la fin de la cadence andalouse (La mineur, Sol, Fa, Mi), l'ossature du flamenco. Le Fa qui tombe sur le Mi, c'est exactement ce geste.</p>

          <p>Deux polarités, deux mondes : l'une tire vers la tonique en montant, l'autre en descendant.</p>

          <h2>Piste 4 : nature ou convention ?</h2>

          <p>Reste la question qui me travaille le plus. On a bien « inventé » le mineur harmonique pour fabriquer une sensible qui n'existait pas. Si l'histoire avait choisi le phrygien comme mineur de référence, on aurait pu le bricoler de la même façon, et nos oreilles trouveraient ça naturel aujourd'hui.</p>

          <p>En partie, oui. Ce qu'on trouve « naturel » est largement culturel. Mais ce qu'on vient de voir montre la limite : un phrygien retouché n'aurait jamais donné une dominante aussi solide. Le système qui en serait sorti aurait sans doute été plus modal que tonal, organisé autour de la descente ♭II → I plutôt qu'autour de V → I.</p>

          <p>Ce système existe, d'ailleurs. Le flamenco vit sur le phrygien depuis des siècles, et personne ne lui reproche de manquer de résolution.</p>

          <h2>En résumé</h2>

          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className={cellule}>Piste</th>
                  <th className={cellule}>Ce qu'elle dit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cellule}>Histoire</td>
                  <td className={cellule}>Le mineur naturel dérive du majeur par relativité</td>
                </tr>
                <tr>
                  <td className={cellule}>Fonction</td>
                  <td className={cellule}>La seconde majeure laisse la place à une vraie dominante ; le phrygien ne le peut pas sans se renier</td>
                </tr>
                <tr>
                  <td className={cellule}>Napolitain</td>
                  <td className={cellule}>Le ♭II reste utilisable, comme couleur avant la dominante</td>
                </tr>
                <tr>
                  <td className={cellule}>Oreille</td>
                  <td className={cellule}>Sensible par en dessous (tonal) contre ♭II par en dessus (phrygien, flamenco)</td>
                </tr>
                <tr>
                  <td className={cellule}>Culture</td>
                  <td className={cellule}>Un autre choix était possible, au prix d'un système plus modal</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Pour finir</h2>

          <p>Cette seconde majeure qui « dépasse » dans la gamme mineure n'est pas une anomalie. C'est la trace d'un choix : celui d'un système qui met la dominante au centre de tout.</p>

          <p>Le phrygien, lui, n'a pas disparu. Il attend juste avant la cadence, sous le nom d'accord napolitain. Et ailleurs, dans d'autres traditions, il est chez lui.</p>
        </article>
      </div>
    </main>
  )
}
