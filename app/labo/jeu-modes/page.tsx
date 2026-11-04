import Link from 'next/link'
import { metadataPour } from '@/lib/registre'

export const metadata = metadataPour('jeu-modes')

type Mode = [mode: string, gamme: string, accordI: string, accordII: string]

const MODES_MAJEURE: Mode[] = [
  ['Ionien', 'C D E F G A B', 'CΔ7 (C E G B)', 'Dm (D F A)'],
  ['Dorien', 'C D Eb F G A Bb', 'Cm7 (C Eb G Bb)', 'Dm (D F A)'],
  ['Phrygien', 'C Db Eb F G Ab Bb', 'Cm7 (C Eb G Bb)', 'Db (Db F Ab)'],
  ['Lydien', 'C D E F# G A B', 'CΔ7 (C E G B)', 'D (D F# A)'],
  ['Mixolydien', 'C D E F G A Bb', 'C7 (C E G Bb)', 'Dm (D F A)'],
  ['Éolien', 'C D Eb F G Ab Bb', 'Cm7 (C Eb G Bb)', 'Ddim (D F Ab)'],
  ['Locrien', 'C Db Eb F Gb Ab Bb', 'Cø7 (C Eb Gb Bb)', 'Db (Db F Ab)'],
]

const MODES_HARMONIQUE: Mode[] = [
  ['Mineur harmonique', 'C D Eb F G Ab B', 'CmΔ7 (C Eb G B)', 'Ddim (D F Ab)'],
  ['Locrien ♮6', 'C Db Eb F Gb A Bb', 'Cø7 (C Eb Gb Bb)', 'Db+ (Db F A)'],
  ['Ionien #5', 'C D E F G# A B', 'C+Δ7 (C E G# B)', 'Dm (D F A)'],
  ['Dorien #4', 'C D Eb F# G A Bb', 'Cm7 (C Eb G Bb)', 'D (D F# A)'],
  ['Phrygien dominant', 'C Db E F G Ab Bb', 'C7 (C E G Bb)', 'Db (Db F Ab)'],
  ['Lydien #2', 'C D# E F# G A B', 'CΔ7 (C E G B)', 'D#dim (D# F# A)'],
  ['Ultra Locrien', 'C Db Eb Fb Gb Ab Bbb', 'C°7 (C Eb Gb Bbb)', 'Dbm (Db Fb Ab)'],
]

const MODES_MELODIQUE: Mode[] = [
  ['Mineur mélodique', 'C D Eb F G A B', 'CmΔ7 (C Eb G B)', 'Dm (D F A)'],
  ['Dorien b2', 'C Db Eb F G A Bb', 'Cm7 (C Eb G Bb)', 'Db+ (Db F A)'],
  ['Lydien augmenté', 'C D E F# G# A B', 'C+Δ7 (C E G# B)', 'D (D F# A)'],
  ['Lydien dominant', 'C D E F# G A Bb', 'C7 (C E G Bb)', 'D (D F# A)'],
  ['Mixolydien b6', 'C D E F G Ab Bb', 'C7 (C E G Bb)', 'Ddim (D F Ab)'],
  ['Locrien ♮2', 'C D Eb F Gb Ab Bb', 'Cø7 (C Eb Gb Bb)', 'Ddim (D F Ab)'],
  ['Super Locrien (altéré)', 'C Db Eb Fb Gb Ab Bb', 'Cø7 (C Eb Gb Bb)', 'Dbm (Db Fb Ab)'],
]

function TableauModes({ titre, modes }: { titre: string; modes: Mode[] }) {
  return (
    <section className="mt-10">
      <div className="prose-article">
        <h2>{titre}</h2>
      </div>
      {/* Seul le tableau défile sur mobile, jamais la page */}
      <div
        className="overflow-x-auto rounded-xl bg-[var(--bg-card)] shadow-sm"
        role="region"
        aria-label={titre}
        tabIndex={0}
      >
        <table className="w-full border-collapse whitespace-nowrap text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--text-primary)]/10 text-[var(--text-muted)]">
              <th scope="col" className="px-4 py-3 font-medium">Mode</th>
              <th scope="col" className="px-4 py-3 font-medium">Gamme</th>
              <th scope="col" className="px-4 py-3 font-medium">Accord I</th>
              <th scope="col" className="px-4 py-3 font-medium">Accord II</th>
            </tr>
          </thead>
          <tbody>
            {modes.map(([mode, gamme, accordI, accordII]) => (
              <tr key={mode} className="border-b border-[var(--text-primary)]/5 last:border-b-0">
                <th scope="row" className="px-4 py-3 font-medium">{mode}</th>
                <td className="px-4 py-3">{gamme}</td>
                <td className="px-4 py-3">{accordI}</td>
                <td className="px-4 py-3">{accordII}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function JeuModesPage() {
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
            Reconnaître un mode avec deux accords
          </h1>
          <div
            className="mb-6 mt-4 h-1 w-10 rounded"
            style={{ backgroundColor: 'var(--accent-labo)' }}
          />

          <p>Identifier un mode avec seulement deux accords : celui du degré I et celui du degré II. La technique existe dans la pédagogie du jazz (les vamps modaux à deux accords), sans nom unique. Ici, elle devient la base d'un jeu de cartes.</p>

          <h2>La règle</h2>

          <p>L'accord I est un accord de 7e (degrés 1, 3, 5, 7 : quatre notes). L'accord II est une triade (degrés 2, 4, 6 : trois notes). Ensemble, ils contiennent les sept degrés de la gamme, chacun une fois.</p>

          <p>Tous les modes sont sur C. Notation : C D E F G A B, b pour bémol, # pour dièse.</p>
        </div>

        <TableauModes titre="Modes de la gamme majeure" modes={MODES_MAJEURE} />

        <TableauModes titre="Modes de la gamme mineure harmonique" modes={MODES_HARMONIQUE} />
        <div className="prose-article mt-4">
          <p>Ici, l'accord I suffit déjà à distinguer les sept modes ; l'accord II garde la cohérence du jeu. Bbb peut s'écrire A et Fb peut s'écrire E.</p>
        </div>

        <TableauModes titre="Modes de la gamme mineure mélodique ascendante" modes={MODES_MELODIQUE} />

        <div className="prose-article mt-10">
          <h2>Pour jouer</h2>

          <p>Une carte accord I et une carte accord II, deviner le mode ; ou l'inverse, une carte mode et retrouver la bonne paire.</p>

          <p>Niveau facile : gamme majeure. Niveau avancé : mineures harmonique et mélodique.</p>

          <p>Les 21 paires sont toutes différentes.</p>
        </div>
      </div>
    </main>
  )
}
