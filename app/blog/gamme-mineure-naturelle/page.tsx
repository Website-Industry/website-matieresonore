import Link from 'next/link'
import { metadataPour } from '@/lib/registre'
import { Clavier } from '@/components/Clavier'
import { FriseChrono } from '@/components/FriseChrono'
import { ComparateurModes } from './ComparateurModes'
import { BLEU, VIOLET, ORANGE, SOMBRE, Carte, Titre, Note, Fleche, Verdict, TitreNumerote, Encadre, Chaine } from '@/components/article/Briques'

export const metadata = metadataPour('gamme-mineure-naturelle')

/* ── Brique propre à cet article ─────────────────────────── */

function Retouches({ n, sur = 2 }: { n: number; sur?: number }) {
  return (
    <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-muted)]">
      <span>Retouches</span>
      <span className="flex gap-1" aria-label={`${n} retouche${n > 1 ? 's' : ''}`}>
        {Array.from({ length: sur }, (_, i) => (
          <span
            key={i}
            className="h-2 w-8 rounded-full"
            style={{ backgroundColor: i < n ? ORANGE : 'var(--line)' }}
          />
        ))}
      </span>
      <span className="font-semibold text-[var(--text-primary)]">{n}</span>
    </div>
  )
}

/* ── Données ───────────────────────────────────────────────── */

type Qualite = 'M' | 'm' | 'J'
const intervalles: { gamme: string; q: Qualite[]; intrus?: number }[] = [
  { gamme: 'Majeur', q: ['M', 'M', 'J', 'J', 'M', 'M'] },
  { gamme: 'Mineur naturel', q: ['M', 'm', 'J', 'J', 'm', 'm'], intrus: 0 },
  { gamme: 'Phrygien', q: ['m', 'm', 'J', 'J', 'm', 'm'] },
]
const couleurQualite: Record<Qualite, string> = { M: BLEU, m: VIOLET, J: 'rgba(13,26,46,0.35)' }

const resume = [
  { mot: 'Histoire', ligne: 'Le mineur dérive du majeur par relativité.', couleur: SOMBRE },
  { mot: 'Fonction', ligne: 'La seconde majeure laisse la place à une vraie dominante.', couleur: ORANGE },
  { mot: 'Napolitain', ligne: 'Le ♭II reste permis, comme couleur avant la dominante.', couleur: VIOLET },
  { mot: 'Oreille', ligne: 'Sensible par en dessous contre ♭II par en dessus.', couleur: BLEU },
  { mot: 'Culture', ligne: 'Un autre choix était possible, au prix d\'un système plus modal.', couleur: 'var(--accent-labo)' },
]

/* ── Page ──────────────────────────────────────────────────── */

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
          <div className="mb-6 mt-4 h-1 w-10 rounded" style={{ backgroundColor: ORANGE }} />

          <p><em>Une asymétrie qui m'a longtemps gratté, et ce qu'elle raconte de notre système.</em></p>

          <Encadre
            ton="depart"
            points={[
              <>La gamme majeure, vue depuis sa tonique : tous ses intervalles sont <strong>majeurs ou justes</strong>. Propre.</>,
              <>On s'attendrait à ce que la gamme mineure naturelle soit son miroir : tous ses intervalles <strong>mineurs ou justes</strong>.</>,
              <>Ce n'est pas tout à fait le cas : un intervalle résiste, <strong>la seconde reste majeure</strong>.</>,
            ]}
          />

          {/* ── Le problème en un coup d'œil ── */}
          <Carte className="my-8">
            <Titre>Les intervalles depuis la tonique</Titre>
            <div className="mb-4 text-sm text-[var(--text-muted)]">Un intrus dans le mineur.</div>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-1.5 text-sm">
                <thead>
                  <tr className="text-xs text-[var(--text-muted)]">
                    <th />
                    {['2de', '3ce', '4te', '5te', '6te', '7e'].map((h) => (
                      <th key={h} className="font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {intervalles.map((ligne) => (
                    <tr key={ligne.gamme}>
                      <th className="whitespace-nowrap pr-2 text-left font-semibold text-[var(--text-primary)]">{ligne.gamme}</th>
                      {ligne.q.map((q, i) => (
                        <td key={i} className="p-0">
                          <div
                            className="flex h-9 items-center justify-center rounded-md font-bold text-white"
                            style={{
                              backgroundColor: couleurQualite[q],
                              outline: ligne.intrus === i ? `3px solid ${ORANGE}` : undefined,
                              outlineOffset: 2,
                            }}
                          >
                            {q}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
              <span><b style={{ color: BLEU }}>M</b> majeur</span>
              <span><b style={{ color: VIOLET }}>m</b> mineur</span>
              <span><b>J</b> juste</span>
              <span><b style={{ color: 'var(--accent-blog-ink)' }}>□</b> l'intrus</span>
            </div>
            <div className="mt-3 text-xs text-[var(--text-muted)]">Une ligne par gamme, une case par intervalle mesuré depuis Do.</div>
          </Carte>

          <Encadre
            ton="voir"
            label="La question"
            points={[
              <>Un mineur « pur », vraiment symétrique du majeur, existe : c'est le <strong>phrygien</strong>, avec sa seconde mineure (dernière ligne de la grille).</>,
              <>Entre le mineur naturel (qu'on appelle aussi éolien) et le phrygien, <strong>une seule note change</strong> : la deuxième, Ré ou Ré♭.</>,
              <>Alors pourquoi notre musique a-t-elle pris le mineur naturel comme mineur de référence, et pas le phrygien ?</>,
            ]}
          />

          <ComparateurModes />

          <Encadre
            ton="mode"
            points={[
              <>Choisissez une gamme : le clavier montre ses notes à partir de Do.</>,
              <><strong style={{ color: BLEU }}>Bleu</strong> : la note est la même qu'en majeur. <strong style={{ color: VIOLET }}>Violet</strong> : elle est abaissée.</>,
              <>Les barres du dessous : l'écart entre deux notes voisines, un ton ou un demi-ton (½). La première barre, en orange, c'est la seconde.</>,
              <>Passez de <em>Mineur naturel</em> à <em>Phrygien</em> : seule la première barre change.</>,
            ]}
          />

          <p>J'ai creusé quatre pistes. Aucune ne suffit seule ; ensemble, elles racontent quelque chose :</p>
          <ol>
            <li><strong>L'histoire</strong> : d'où vient le mineur naturel.</li>
            <li><strong>La fonction</strong> : ce que chaque gamme permet de construire comme accords.</li>
            <li><strong>L'oreille</strong> : comment chaque gamme conclut.</li>
            <li><strong>La culture</strong> : un autre choix était-il possible ?</li>
          </ol>

          {/* ── Piste 1 ── */}
          <TitreNumerote numero={1} titre="L'histoire, par relativité" />

          <Encadre
            ton="depart"
            points={[
              <>Le mineur naturel n'a pas été construit comme un miroir du majeur : il en <strong>dérive</strong>.</>,
              <>La mineur reprend exactement les notes de Do majeur, en partant de La. C'est ce qu'on appelle la <strong>relativité</strong> (La mineur est le relatif de Do majeur).</>,
              <>Le schéma ci-dessous le montre sur les touches blanches, qui forment Do majeur.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Mêmes touches blanches, deux départs</Titre>
            <div className="mb-4 text-sm text-[var(--text-muted)]">Partir de La donne l'éolien, partir de Mi donne le phrygien.</div>
            <Clavier
              debut={0}
              fin={23}
              titre="Touches blanches : départ sur Mi et sur La"
              marques={[
                { demiTon: 4, etiquette: 'Mi', couleur: VIOLET },
                { demiTon: 5, etiquette: 'Fa', couleur: ORANGE, anneau: true },
                { demiTon: 9, etiquette: 'La', couleur: SOMBRE },
                { demiTon: 11, etiquette: 'Si', couleur: ORANGE, anneau: true },
              ]}
            />
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div><Note couleur={SOMBRE}>La</Note> <Fleche label="ton" /> <Note couleur={ORANGE}>Si</Note> <span className="text-[var(--text-muted)]">éolien</span></div>
              <div><Note couleur={VIOLET}>Mi</Note> <Fleche label="½" /> <Note couleur={ORANGE}>Fa</Note> <span className="text-[var(--text-muted)]">phrygien</span></div>
            </div>
          </Carte>

          <Encadre
            ton="voir"
            points={[
              <>En partant de La, le premier pas La → Si est <strong>un ton</strong> : seconde majeure.</>,
              <>En partant de Mi, le premier pas Mi → Fa est <strong>un demi-ton</strong> : seconde mineure, le phrygien.</>,
              <>La seconde du mineur naturel est donc majeure tout simplement parce qu'elle l'est déjà dans Do majeur.</>,
            ]}
          />

          <Encadre
            ton="limite"
            points={[
              <>C'est vrai, et c'est intéressant. Mais ça déplace la question plus que ça n'y répond.</>,
              <>Pourquoi avoir retenu le départ sur La, et pas sur Mi, qui donne le phrygien avec les mêmes touches ?</>,
              <>Pour répondre, il faut regarder ce qu'on <strong>fait</strong> avec ces gammes : les accords.</>,
            ]}
          />

          {/* ── Piste 2 ── */}
          <TitreNumerote numero={2} titre="La fonction, ou le problème de la dominante" />

          <p>C'est l'argument qui m'a convaincu.</p>

          <Encadre
            ton="depart"
            points={[
              <>Notre musique tonale tourne autour d'un geste : la <strong>dominante</strong> (l'accord du Ve degré) qui retombe sur la <strong>tonique</strong>. On l'écrit <strong>V → I</strong>.</>,
              <>Pour que ce geste marche, l'accord de dominante doit être <strong>majeur</strong>.</>,
              <>Il doit contenir la <strong>sensible</strong> : la note un demi-ton sous la tonique. En Do, c'est Si.</>,
              <>Le test : prendre le Ve degré de chaque gamme et compter les notes à corriger pour obtenir cette dominante (ici G7 : Sol, Si, Ré, Fa).</>,
            ]}
          />

          <div className="my-6 grid gap-4 sm:grid-cols-2">
            <Carte>
              <Titre>Do mineur naturel</Titre>
              <div className="mb-3 flex flex-wrap items-center gap-1">
                <Note couleur={VIOLET}>Sol m</Note>
                <Fleche label="Si♭ → Si" />
                <Note couleur={BLEU} plein>G7</Note>
              </div>
              <Clavier
                debut={7}
                fin={17}
                largeurMax={260}
                titre="G7 : Sol, Si, Ré, Fa"
                marques={[
                  { demiTon: 7, etiquette: 'Sol' },
                  { demiTon: 11, etiquette: 'Si', couleur: ORANGE, anneau: true },
                  { demiTon: 14, etiquette: 'Ré' },
                  { demiTon: 17, etiquette: 'Fa' },
                ]}
              />
              <Retouches n={1} />
              <Verdict ok>Une vraie dominante</Verdict>
            </Carte>

            <Carte>
              <Titre>Do phrygien</Titre>
              <div className="mb-3 flex flex-wrap items-center gap-1">
                <Note couleur={VIOLET}>Sol dim</Note>
                <Fleche label="Si♭ et Ré♭" />
                <Note couleur={BLEU}>G7 ?</Note>
              </div>
              <Clavier
                debut={7}
                fin={17}
                largeurMax={260}
                titre="Sol, Si♭, Ré♭ : deux notes à corriger"
                marques={[
                  { demiTon: 7, etiquette: 'Sol', couleur: VIOLET },
                  { demiTon: 10, etiquette: 'Si♭', couleur: VIOLET, anneau: true },
                  { demiTon: 13, etiquette: 'Ré♭', couleur: VIOLET, anneau: true },
                ]}
              />
              <Retouches n={2} />
              <Verdict ok={false}>Corriger le Ré♭, c'est quitter le mode</Verdict>
            </Carte>
          </div>

          <Encadre
            ton="voir"
            points={[
              <><strong>Mineur naturel</strong> : le Ve degré donne Sol mineur (Sol, Si♭, Ré). On remonte le Si♭ en Si, et on a G7. <strong>Une seule retouche.</strong> C'est d'ailleurs comme ça qu'est né le mineur harmonique.</>,
              <><strong>Phrygien</strong> : le Ve degré donne Sol, Si♭, <strong>Ré♭</strong>, un accord diminué. Il faut remonter le Si♭ <em>et</em> le Ré♭.</>,
              <>Or le Ré♭, c'est précisément la note qui fait le phrygien. <strong>Le corriger, c'est quitter le mode.</strong></>,
            ]}
          />

          <Encadre
            ton="depart"
            label="Et si on trichait ?"
            points={[
              <>On a bien retouché le mineur naturel pour obtenir le mineur harmonique. Faisons pareil avec le phrygien.</>,
              <>On remonte seulement la 7e : Do, Ré♭, Mi♭, Fa, Sol, La♭, <strong>Si</strong>. Un « phrygien harmonique ».</>,
              <>Son Ve degré devient Sol, Si, Ré♭.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Et un « phrygien harmonique » ?</Titre>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <Note couleur={BLEU}>Sol</Note>
              <Note couleur={BLEU}>Si</Note>
              <Note couleur={ORANGE}>Ré♭</Note>
            </div>
            <Verdict ok={false}>Quinte diminuée : toujours pas de dominante</Verdict>
          </Carte>

          <Encadre
            ton="depart"
            label="Un bonus du mineur naturel"
            points={[
              <>Son IIe degré, Ré diminué (Ré, Fa, La♭), prépare G7 en douceur.</>,
              <>Le Ré et le Fa restent en place, le La♭ descend d'un demi-ton sur le Sol.</>,
              <>Ça donne un II-V-I mineur, le schéma ci-dessous suit chaque note.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>Le II-V-I mineur, parfaitement huilé</Titre>
            <div className="mb-4 text-sm text-[var(--text-muted)]">Ré diminué prépare G7 en douceur.</div>
            <div className="grid grid-cols-[auto_auto_auto] items-center justify-start gap-x-4 gap-y-2 text-sm">
              <div className="text-xs font-semibold text-[var(--text-muted)]">Ré dim</div>
              <div />
              <div className="text-xs font-semibold text-[var(--text-muted)]">G7</div>
              {[
                ['La♭', '↘ ½', 'Sol', ORANGE],
                ['Fa', '=', 'Fa', BLEU],
                ['Ré', '=', 'Ré', BLEU],
              ].map(([a, f, b, c]) => (
                <div key={a} className="contents">
                  <Note couleur={c}>{a}</Note>
                  <span className="text-center font-semibold" style={{ color: c }}>{f}</span>
                  <Note couleur={c}>{b}</Note>
                </div>
              ))}
            </div>
          </Carte>

          <Chaine
            titre="Le raisonnement"
            etapes={[
              <>la gamme garde une <strong>seconde majeure</strong> (Ré naturel)</>,
              <>le Ré est disponible pour l'accord du Ve degré, dont il est la quinte</>,
              <>une seule retouche (Si♭ → Si) suffit pour une vraie dominante</>,
              <>la seconde majeure n'est pas un détail : sans elle, <strong>pas de V → I solide</strong>.</>,
            ]}
          />

          {/* ── Le napolitain ── */}
          <h2>Attention, le ♭II n'est pas interdit</h2>

          <p>C'est mon passage préféré de cette histoire.</p>

          <Encadre
            ton="depart"
            points={[
              <>On entend parfois qu'un accord sur le IIe degré abaissé (le <strong>♭II</strong>, l'accord phrygien) « ne fonctionne pas » en tonal.</>,
              <>C'est faux : la musique classique lui a même donné un nom, l'<strong>accord napolitain</strong>.</>,
              <>En Do mineur, c'est Ré♭ majeur, joué le plus souvent en premier renversement : Fa, La♭, Ré♭ (d'où le « 6 » de ♭II6).</>,
              <>Il mène très bien à la dominante, puis à la tonique.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>La cadence napolitaine en Do mineur</Titre>
            <div className="mt-4 flex flex-wrap items-stretch gap-2">
              {[
                { deg: '♭II6', notes: 'Fa La♭ Ré♭', c: ORANGE, info: 'emprunt phrygien' },
                { deg: 'V', notes: 'Sol Si Ré', c: BLEU, info: 'dominante' },
                { deg: 'i', notes: 'Do Mi♭ Sol', c: SOMBRE, info: 'tonique' },
              ].map((a, i) => (
                <div key={a.deg} className="flex items-center gap-2">
                  {i > 0 && <Fleche />}
                  <div className="rounded-xl border-2 px-4 py-3 text-center" style={{ borderColor: a.c }}>
                    <div className="text-xl font-extrabold" style={{ fontFamily: 'var(--font-syne)', color: a.c }}>{a.deg}</div>
                    <div className="text-xs font-medium text-[var(--text-primary)]">{a.notes}</div>
                    <div className="text-[0.65rem] text-[var(--text-muted)]">{a.info}</div>
                  </div>
                </div>
              ))}
            </div>
          </Carte>

          <p>Une cadence standard, qu'on croise chez Mozart, Beethoven ou Chopin. La frise replace ces noms dans le temps, du moment où l'on nomme les modes jusqu'au flamenco.</p>

          <Carte className="my-6">
            <Titre>Le phrygien à travers le temps</Titre>
            <div className="mb-5 text-sm text-[var(--text-muted)]">Du nom des modes jusqu'au flamenco.</div>
            <FriseChrono
              debut={1500}
              fin={1900}
              evenements={[
                { debut: 1547, titre: 'Glarean, Dodecachordon', detail: 'nomme le mode éolien', couleur: SOMBRE },
                { debut: 1680, fin: 1720, titre: 'Majeur et mineur s\'imposent', date: 'vers 1680-1720', couleur: BLEU },
                { debut: 1700, titre: 'École napolitaine', detail: 'l\'accord napolitain lui doit son nom', date: 'vers 1700', couleur: ORANGE },
                { debut: 1756, fin: 1791, titre: 'Mozart', couleur: VIOLET },
                { debut: 1770, fin: 1827, titre: 'Beethoven', couleur: VIOLET },
                { debut: 1810, fin: 1849, titre: 'Chopin', couleur: VIOLET },
                { debut: 1800, fin: 1900, titre: 'Le flamenco prend forme', detail: 'sur le phrygien', date: 'XIXe siècle', couleur: 'var(--accent-labo)' },
              ]}
            />
            <div className="mt-4 text-xs text-[var(--text-muted)]">
              <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ backgroundColor: VIOLET }} />
              ils utilisent tous le ♭II6 avant la dominante
            </div>
          </Carte>

          <Encadre
            ton="retenir"
            points={[
              <>Le phrygien n'a pas été chassé de la musique tonale.</>,
              <>Il y est entré par la petite porte, comme une <strong>couleur d'emprunt</strong> posée juste avant la dominante.</>,
              <>Ce qu'il ne pouvait pas faire, c'est fournir la dominante lui-même.</>,
            ]}
          />

          {/* ── Piste 3 ── */}
          <TitreNumerote numero={3} titre="L'oreille, par en dessus ou par en dessous" />

          <Encadre
            ton="depart"
            points={[
              <>Pour conclure, chaque système compte sur une note très <strong>attirée par la tonique</strong>, à un demi-ton d'elle.</>,
              <>Ce qui change, c'est le côté d'où elle arrive.</>,
            ]}
          />

          <div className="my-6 grid gap-4 sm:grid-cols-2">
            {[
              { titre: 'Tonal', haut: 'Do', bas: 'Si', sens: '↑', label: 'la sensible monte', cible: 'haut', c: BLEU },
              { titre: 'Phrygien', haut: 'Ré♭', bas: 'Do', sens: '↓', label: 'le ♭II descend', cible: 'bas', c: ORANGE },
            ].map((v) => (
              <Carte key={v.titre}>
                <Titre>{v.titre}</Titre>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <Note couleur={v.cible === 'haut' ? SOMBRE : v.c} plein={v.cible === 'haut'}>{v.haut}</Note>
                    <span className="text-2xl font-bold leading-none" style={{ color: v.c }}>{v.sens}</span>
                    <Note couleur={v.cible === 'bas' ? SOMBRE : v.c} plein={v.cible === 'bas'}>{v.bas}</Note>
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    <div className="font-semibold text-[var(--text-primary)]">½ ton</div>
                    {v.label}
                  </div>
                </div>
              </Carte>
            ))}
          </div>

          <Encadre
            ton="voir"
            points={[
              <><strong>Tonal classique</strong> : la note attirée arrive par en dessous. C'est la sensible, Si → Do, un demi-ton qui monte.</>,
              <><strong>Phrygien</strong> : elle arrive par en dessus. Ré♭ → Do, un demi-ton qui descend.</>,
              <>Ça donne une autre couleur de conclusion : la cadence <strong>♭II → I</strong>.</>,
              <>Si elle vous dit quelque chose, c'est normal : c'est la fin de la cadence andalouse, l'ossature du flamenco.</>,
            ]}
          />

          <Carte className="my-6">
            <Titre>La cadence andalouse</Titre>
            <div className="mb-4 text-sm text-[var(--text-muted)]">L'ossature du flamenco finit sur ce geste.</div>
            <div className="flex flex-wrap items-center gap-1.5">
              <Note couleur={VIOLET}>La m</Note>
              <Fleche />
              <Note couleur={VIOLET}>Sol</Note>
              <Fleche />
              <Note couleur={ORANGE} plein>Fa</Note>
              <Fleche label="♭II → I" />
              <Note couleur={SOMBRE} plein>Mi</Note>
            </div>
          </Carte>

          <Encadre
            ton="retenir"
            points={[
              <>Dans la cadence andalouse, le Fa qui tombe sur le Mi, c'est exactement le geste ♭II → I.</>,
              <>Deux polarités, deux mondes : l'une tire vers la tonique <strong>en montant</strong>, l'autre <strong>en descendant</strong>.</>,
            ]}
          />

          {/* ── Piste 4 ── */}
          <TitreNumerote numero={4} titre="Nature ou convention ?" />

          <p>Reste la question qui me travaille le plus.</p>

          <Encadre
            ton="depart"
            points={[
              <>On a bien « inventé » le mineur harmonique pour fabriquer une sensible qui n'existait pas.</>,
              <>Si l'histoire avait choisi le phrygien comme mineur de référence, on aurait pu le bricoler de la même façon.</>,
              <>Nos oreilles trouveraient-elles ça naturel aujourd'hui ? En partie, oui : ce qu'on trouve « naturel » est largement <strong>culturel</strong>.</>,
            ]}
          />

          <Chaine
            titre="Mais la piste 2 pose une limite"
            etapes={[
              <>l'histoire avait choisi le <strong>phrygien</strong> comme mineur de référence</>,
              <>on l'aurait retouché, mais il n'aurait jamais donné une dominante aussi solide</>,
              <>la musique se serait organisée autour de la descente ♭II → I plutôt qu'autour de V → I</>,
              <>on aurait eu un système <strong>plus modal que tonal</strong>.</>,
            ]}
          />

          <div className="my-6 grid gap-4 sm:grid-cols-2">
            <Carte>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: BLEU }}>Ce qu'on a eu</div>
              <Titre>Un système tonal</Titre>
              <div className="mt-2 text-2xl font-extrabold" style={{ fontFamily: 'var(--font-syne)', color: BLEU }}>V → I</div>
              <div className="mt-1 text-sm text-[var(--text-muted)]">La dominante au centre de tout.</div>
            </Carte>
            <Carte>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: ORANGE }}>Ce qu'on aurait pu avoir</div>
              <Titre>Un système plus modal</Titre>
              <div className="mt-2 text-2xl font-extrabold" style={{ fontFamily: 'var(--font-syne)', color: ORANGE }}>♭II → I</div>
              <div className="mt-1 text-sm text-[var(--text-muted)]">Il existe : le flamenco en vit, sans manquer de résolution.</div>
            </Carte>
          </div>

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

          <p>Cette seconde majeure qui « dépasse » n'est pas une anomalie. C'est la trace d'un choix : celui d'un système qui met la dominante au centre de tout.</p>

          <p>Le phrygien, lui, attend juste avant la cadence, sous le nom d'accord napolitain. Et ailleurs, il est chez lui.</p>
        </article>
      </div>
    </main>
  )
}
