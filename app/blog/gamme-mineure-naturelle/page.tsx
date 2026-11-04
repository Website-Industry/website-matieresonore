import Link from 'next/link'
import type { ReactNode } from 'react'
import { metadataPour } from '@/lib/registre'
import { Clavier } from '@/components/Clavier'
import { FriseChrono } from '@/components/FriseChrono'
import { ComparateurModes } from './ComparateurModes'

export const metadata = metadataPour('gamme-mineure-naturelle')

const BLEU = 'var(--accent-blue)'
const VIOLET = 'var(--accent-purple)'
const ORANGE = 'var(--accent-blog)'
const SOMBRE = 'var(--text-primary)'

/* ── Petites briques visuelles ─────────────────────────────── */

function Carte({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[14px] bg-[var(--bg-card)] p-5 shadow-sm md:p-6 ${className}`}>
      {children}
    </div>
  )
}

function Titre({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1 text-lg font-bold leading-snug text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-syne)' }}>
      {children}
    </div>
  )
}

function Note({ children, couleur = BLEU, plein = false }: { children: ReactNode; couleur?: string; plein?: boolean }) {
  return (
    <span
      className="inline-flex min-w-[2.6rem] items-center justify-center rounded-lg border-2 px-2 py-1 text-sm font-semibold"
      style={{
        borderColor: couleur,
        backgroundColor: plein ? couleur : 'transparent',
        color: plein ? '#fff' : 'var(--text-primary)',
      }}
    >
      {children}
    </span>
  )
}

function Fleche({ label }: { label?: string }) {
  return (
    <span className="inline-flex flex-col items-center px-1 text-[var(--text-muted)]">
      <span className="text-lg leading-none">→</span>
      {label && <span className="text-[0.65rem] leading-tight">{label}</span>}
    </span>
  )
}

function Verdict({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div
      className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
      style={{
        backgroundColor: ok ? 'rgba(31,184,102,0.12)' : 'rgba(242,96,30,0.12)',
        color: ok ? 'var(--accent-labo-ink)' : 'var(--accent-blog-ink)',
      }}
    >
      <span aria-hidden="true">{ok ? '✓' : '✗'}</span>
      {children}
    </div>
  )
}

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

function Piste({ numero, titre }: { numero: number; titre: string }) {
  return (
    <h2 className="flex items-baseline gap-3">
      <span
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm text-white"
        style={{ backgroundColor: ORANGE }}
      >
        {numero}
      </span>
      {titre}
    </h2>
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
          </Carte>

          <p>Un « mineur pur » existe : c'est le phrygien. Une seule note le sépare du mineur naturel, la deuxième. Pourquoi notre musique a-t-elle choisi l'autre ?</p>

          <ComparateurModes />

          <p>J'ai creusé quatre pistes. Aucune ne suffit seule ; ensemble, elles racontent quelque chose.</p>

          {/* ── Piste 1 ── */}
          <Piste numero={1} titre="L'histoire, par relativité" />

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

          <p>La seconde La → Si est majeure parce qu'elle l'est déjà dans Do majeur. Vrai, mais ça déplace la question : pourquoi La, et pas Mi ?</p>

          {/* ── Piste 2 ── */}
          <Piste numero={2} titre="La fonction, ou le problème de la dominante" />

          <p>Le geste central du tonal : <strong>V → I</strong>. Il faut un V majeur, avec une sensible un demi-ton sous la tonique. Combien de retouches pour l'obtenir ?</p>

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

          <Carte className="my-6">
            <Titre>Et un « phrygien harmonique » ?</Titre>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <Note couleur={BLEU}>Sol</Note>
              <Note couleur={BLEU}>Si</Note>
              <Note couleur={ORANGE}>Ré♭</Note>
            </div>
            <Verdict ok={false}>Quinte diminuée : toujours pas de dominante</Verdict>
          </Carte>

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

          <p>La seconde majeure n'est pas un détail : elle laisse la place au <strong>Ré naturel</strong>, la quinte de la dominante.</p>

          {/* ── Le napolitain ── */}
          <h2>Attention, le ♭II n'est pas interdit</h2>

          <p>C'est mon passage préféré de cette histoire. La musique classique a un nom pour cet accord : l'<strong>accord napolitain</strong>.</p>

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

          <p>Le phrygien n'a pas été chassé : il est entré par la petite porte, comme couleur d'emprunt. Ce qu'il ne pouvait pas faire, c'est fournir la dominante lui-même.</p>

          {/* ── Piste 3 ── */}
          <Piste numero={3} titre="L'oreille, par en dessus ou par en dessous" />

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

          {/* ── Piste 4 ── */}
          <Piste numero={4} titre="Nature ou convention ?" />

          <p>On a bien inventé le mineur harmonique pour fabriquer une sensible. Un phrygien retouché aurait-il fait l'affaire ?</p>

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

          <p>Cette seconde majeure qui « dépasse » n'est pas une anomalie. C'est la trace d'un choix : celui d'un système qui met la dominante au centre de tout.</p>

          <p>Le phrygien, lui, attend juste avant la cadence, sous le nom d'accord napolitain. Et ailleurs, il est chez lui.</p>
        </article>
      </div>
    </main>
  )
}
