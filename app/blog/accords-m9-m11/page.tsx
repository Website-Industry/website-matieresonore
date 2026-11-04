import Link from 'next/link'
import { metadataPour } from '@/lib/registre'

export const metadata = metadataPour('accords-m9-m11')

export default function AccordsM9M11Page() {
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
            Pourquoi les accords m9 et m11 sonnent toujours bien
          </h1>
          <div
            className="mb-6 mt-4 h-1 w-10 rounded"
            style={{ backgroundColor: 'var(--accent-blog)' }}
          />

          <p><em>Le « truc » neo-soul qui marche dans toutes les tonalités, et ce qu'il cache</em></p>

          <p>C'est un conseil qu'on entend souvent : prends des accords mineurs 9 ou mineurs 11, pose-les sur n'importe quelle fondamentale, enchaîne-les comme tu veux, et ça sonne neo-soul à tous les coups. Pas besoin de réfléchir à la tonalité.</p>

          <p>Et c'est vrai. Essayez. Mais pourquoi ? Qu'est-ce qui permet à un accord de se poser n'importe où sans jamais sonner faux ?</p>

          <h2>Mon hypothèse de départ</h2>

          <p>J'avais trois intuitions. Le m9 est partout dans ce style ; avec la 7e, la 9e et la 11e, il est riche, jazzy. Le mineur ajoute une petite dose de drame. Et surtout, le cadre jazz permet de sortir de la logique tonale : on ne raisonne plus en « je suis en Do majeur », on bascule dans quelque chose de modal.</p>

          <p>L'intuition modale est la bonne. Mais il y a un mécanisme plus précis dessous.</p>

          <h2>Un accord qui contient déjà un monde</h2>

          <p>Prenons Cm9 : <strong>Do, Mi♭, Sol, Si♭, Ré</strong>. Et Cm11 ajoute <strong>Fa</strong>. Fondamentale, tierce mineure, quinte, 7e mineure, 9e, 11e : en empilant les tierces, le m11 couvre déjà six des sept notes d'une gamme. L'accord ne pointe pas vers un ailleurs. Il est complet, il se suffit.</p>

          <h2>La vraie raison : pas de triton</h2>

          <p>Ce qui donne envie à un accord de « bouger », c'est la tension. Et la tension la plus forte de l'harmonie tonale, c'est le triton, cet intervalle de trois tons pile au milieu de l'octave.</p>

          <p>Dans G7 (Sol, Si, Ré, Fa), le Si et le Fa forment un triton. Le Si veut monter vers Do, le Fa veut descendre vers Mi. L'accord <em>promet</em> une résolution. L'oreille l'attend.</p>

          <p>Maintenant, cherchez un triton dans Cm9 ou Cm11. Il n'y en a pas. Vérifiez paire par paire si vous voulez : aucun couple de notes n'est séparé de trois tons. Résultat : aucun intervalle instable ne réclame d'aller quelque part. D'où que vienne l'accord, où qu'il aille, il ne promet rien. Il ne peut donc pas décevoir.</p>

          <h2>La 9e et la 11e, deux notes qui lissent</h2>

          <p>On pourrait croire que plus on ajoute de notes, plus ça frotte. Ici, c'est l'inverse. La 9e (une seconde majeure au-dessus de la fondamentale) et la 11e (une quarte juste) sonnent ouvertes, aérées. Elles diluent le caractère mineur, ce côté sombre et dramatique. L'accord ne pleure plus : il flotte.</p>

          <h2>Glisser plutôt que résoudre</h2>

          <p>Quand on enchaîne des m9 en déplaçant tout le bloc d'un coup (Dm9, puis Em9, puis Fm9...), on change de logique. On ne raconte plus une histoire de tension et de résolution ; on déplace une couleur, une texture. Le même accord glisse sur la surface, comme une forme qui se déplace sans se déformer.</p>

          <p>Ce n'est pas une invention neo-soul. Debussy le faisait déjà au début du XXe siècle, avec ses accords parallèles qui refusent de fonctionner comme on l'apprend au conservatoire. Et Miles Davis en a fait un manifeste en 1959 avec <em>So What</em> : une seule couleur mineure (le mode dorien sur Ré) pendant des mesures entières, puis tout le bloc qui monte d'un demi-ton, en Mi♭, avant de redescendre. Pas de cadence. Juste un déplacement.</p>

          <p>Le m9 est d'ailleurs l'accord naturel du dorien : la gamme dorienne contient exactement ses notes, plus la 6te majeure qui donne au mode sa couleur.</p>

          <h2>À essayer au clavier</h2>

          <p>Jouez cette suite, à la main gauche la fondamentale, à la main droite le reste :</p>

          <pre><code>{`Dm9   Ré   Fa  La  Do  Mi
Em9   Mi   Sol Si  Ré  Fa#
Fm9   Fa   La♭ Do  Mi♭ Sol
Em9   Mi   Sol Si  Ré  Fa#`}</code></pre>

          <p>Ça glisse, ça flotte, rien ne coince.</p>

          <p>Maintenant, remplacez le Fm9 par un <strong>F7</strong> (Fa, La, Do, Mi♭). D'un coup, l'oreille se dresse : le La et le Mi♭ forment un triton, et l'accord réclame d'aller quelque part (vers Si♭). La texture se casse, une histoire commence. C'est exactement la différence entre une logique de couleur et une logique de fonction.</p>

          <h2>Pour finir</h2>

          <p>Le « truc » des m9 et m11 n'est pas magique. Il repose sur deux choses : l'absence de triton, qui supprime toute attente de résolution, et la richesse de l'accord, qui le rend autosuffisant. Chaque accord est une petite pièce close sur elle-même, qu'on peut poser n'importe où.</p>

          <p>Et c'est peut-être ça, au fond, le son neo-soul : une harmonie qui ne cherche pas à arriver quelque part. Elle préfère qu'on reste dedans.</p>
        </article>
      </div>
    </main>
  )
}
