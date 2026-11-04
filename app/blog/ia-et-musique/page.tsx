import Link from 'next/link'
import { metadataPour } from '@/lib/registre'

export const metadata = metadataPour('ia-et-musique')

export default function IaEtMusiquePage() {
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
            L'IA ne détruit pas la musique. Le système s'en chargeait déjà.
          </h1>
          <div
            className="mb-6 mt-4 h-1 w-10 rounded"
            style={{ backgroundColor: 'var(--accent-blog)' }}
          />

          <p><em>Un coup de gueule pédago sur le vrai problème</em></p>

          <p>Récemment, je suis tombé sur un fil de discussion enflammé. Des musiciens en colère. Des labels qui s'indignent. Des artistes qui signent des pétitions. Le sujet : l'intelligence artificielle qui « vole » la musique, qui « tue » la créativité, qui va « détruire » les artistes.</p>

          <p>Je comprends la peur. Vraiment.</p>

          <p>Mais je pense qu'on regarde dans la mauvaise direction.</p>

          <h2>Premièrement : l'IA peut être un outil créatif, et c'est fascinant</h2>

          <p>Commençons par là, parce que c'est souvent le point qu'on zappe dans ces débats.</p>

          <p>Il existe des artistes qui utilisent l'IA comme d'autres utilisent un synthétiseur, un looper ou un logiciel de MAO. Pas pour remplacer leur sensibilité, mais pour l'étendre.</p>

          <p>Holly Herndon, compositrice et chercheuse, entraîne des modèles sur sa propre voix pour créer des textures chorales impossibles. Son projet <em>Holly+</em> permet même à d'autres artistes d'utiliser sa voix numérique, avec son accord explicite. Ce n'est pas de la tricherie. C'est de la lutherie du XXIe siècle.</p>

          <p>Arca, Grimes, des producteurs de club music expérimental... Beaucoup de ces artistes utilisent des outils génératifs non pas pour produire du contenu en masse, mais pour explorer des territoires sonores qu'ils n'auraient pas pu atteindre autrement.</p>

          <p>L'IA comme outil dans les mains d'un artiste conscient, c'est légitime. C'est même passionnant.</p>

          <p>Le problème, ce n'est pas ça.</p>

          <h2>Deuxièmement : le vrai problème, c'est l'usage industriel et de masse</h2>

          <p>Ce qui pose un problème éthique et économique réel, c'est quand l'IA devient une machine à fabriquer du volume.</p>

          <p>Des milliers de titres générés automatiquement pour saturer Spotify. Des albums entiers produits sans aucun humain impliqué, uploadés en masse pour capter des fractions de centime de royalties. Des modèles entraînés sur des millions d'œuvres sans consentement ni rémunération des artistes originaux.</p>

          <p>Là, oui. Il y a un problème concret.</p>

          <p>Mais remarquez bien de qui vient ce problème. Pas d'un musicien expérimental qui joue avec Suno dans son coin. Pas d'un producteur qui utilise un plugin IA pour harmoniser ses maquettes.</p>

          <p>Ce problème vient d'acteurs économiques qui ont flairé une opportunité d'optimiser des coûts de production à zéro. Des plateformes qui laissent faire parce que plus de contenu = plus d'écoutes = plus de données. Un système qui récompense le volume plutôt que la valeur.</p>

          <p>L'IA n'a pas inventé cette logique. Elle l'amplifie.</p>

          <h2>Troisièmement, et c'est là que ça fait mal : l'industrie musicale protégeait déjà très mal les artistes avant l'IA</h2>

          <p>Soyons honnêtes.</p>

          <p>Selon les estimations couramment citées, Spotify verse en moyenne entre 0,003 et 0,005 dollar par stream. Un artiste qui accumule un million d'écoutes empoche donc environ 3 000 à 5 000 dollars bruts. Avant les parts du label. Avant les parts du distributeur. Avant les taxes.</p>

          <p>Les contrats d'édition signés par de jeunes artistes naïfs cèdent leurs droits pour des décennies entières, parfois à vie.</p>

          <p>Le modèle de l'avance sur recette signifie que beaucoup d'artistes sous contrat remboursent leur propre succès pendant des années avant de toucher quoi que ce soit.</p>

          <p>Live Nation et les grandes salles de concert absorbent une part croissante des revenus des tournées, l'un des derniers endroits où un musicien pouvait encore gagner correctement sa vie.</p>

          <p>Tout ça existait avant ChatGPT, avant Suno, avant Udio. L'IA n'a pas créé un système prédateur. Elle arrive dans un système qui l'était déjà.</p>

          <p>Alors quand des majors s'indignent que l'IA utilise leurs catalogues sans permission, j'ai un sourire un peu amer. Ce sont souvent les mêmes qui ont utilisé les artistes sans permission réelle, avec des contrats léonins signés par des gens qui voulaient juste faire de la musique.</p>

          <h2>Ce qu'on devrait vraiment demander</h2>

          <p>Plutôt que « interdire l'IA en musique » (impossible, inutile, contre-productif), voici les vraies questions à poser :</p>

          <p><strong>Sur la formation des modèles</strong> : comment s'assurer que les artistes dont les œuvres ont servi à entraîner ces systèmes soient reconnus et rémunérés ? C'est un chantier juridique et éthique réel, et des solutions commencent à émerger (opt-out, licences collectives, fonds de compensation).</p>

          <p><strong>Sur les plateformes de streaming</strong> : pourquoi ne pas imposer un plancher de rémunération, un ratio minimal entre contenus humains et contenus générés, une transparence sur les algorithmes de recommandation ?</p>

          <p><strong>Sur les droits des artistes</strong> : comment réformer des contrats qui datent d'une époque où « stream » n'existait pas ? Comment redonner aux créateurs une part équitable de la valeur qu'ils génèrent ?</p>

          <p><strong>Sur la transparence</strong> : faut-il obliger à labelliser les œuvres entièrement générées par IA ? Probablement. Pas pour stigmatiser, mais pour permettre au public de faire des choix éclairés.</p>

          <h2>Pour finir</h2>

          <p>L'IA en musique, c'est une technologie. Comme le synthétiseur était une technologie. Comme Pro Tools était une technologie. Comme le disque vinyle, la cassette, le MP3 étaient des technologies.</p>

          <p>Chaque fois, des gens ont crié à la mort de la musique. Chaque fois, la musique a muté, s'est adaptée, a trouvé de nouvelles formes.</p>

          <p>Ce qui ne s'adapte pas aussi facilement, c'est un système économique construit sur l'extraction de valeur des artistes au profit d'intermédiaires. Ce système existait avant l'IA. Il survivra à la prochaine vague si on ne le remet pas en question sérieusement.</p>

          <p>Alors oui, parlons d'IA. Mais parlons aussi, enfin, du fond du problème.</p>

          <p><em>Marc, musicien, quelqu'un qui pense que la technologie n'est ni bonne ni mauvaise mais que les systèmes qui l'entourent, eux, font toute la différence.</em></p>
        </article>
      </div>
    </main>
  )
}
