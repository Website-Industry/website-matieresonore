'use client'

import { useEffect, useRef, useState } from 'react'

// Série harmonique : une fondamentale f et ses harmoniques n × f.
// Chaque harmonique a une amplitude 1/n, comme dans une onde en dents de scie.
// Notes, écarts en cents et intervalles sont calculés, jamais écrits à la main.

const NB_HARMONIQUES = 16
const FONDAMENTALES = [
  { nom: 'C', frequence: 65.41 },
  { nom: 'E', frequence: 82.41 },
  { nom: 'A', frequence: 110 },
]
const NOMS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
const NOMS_INTERVALLES: Record<number, string> = {
  2: 'octave',
  3: 'quinte juste',
  4: 'quarte juste',
  5: 'tierce majeure',
  6: 'tierce mineure',
}
const VOLUME = 0.12
const DUREE_NOTE = 0.6 // s, pour « Une à une »

const RANGS = Array.from({ length: NB_HARMONIQUES }, (_, i) => i + 1)

// Note tempérée la plus proche (la à 440 Hz) et écart en cents
function noteDe(frequence: number) {
  const midi = 69 + 12 * Math.log2(frequence / 440)
  const proche = Math.round(midi)
  return { nom: NOMS[((proche % 12) + 12) % 12], cents: Math.round((midi - proche) * 100) }
}

function formatHz(v: number) {
  return `${v.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Hz`
}

function formatCents(c: number) {
  if (c === 0) return 'juste'
  return `${c > 0 ? '+' : '−'}${Math.abs(c)} cents`
}

/* ---------- Forme de l'onde ---------- */

const L = 720
const H_ONDE = 200
const MARGE = 16

function VueOnde({ actives }: { actives: boolean[] }) {
  const nbPoints = 600
  const valeurs: number[] = []
  for (let p = 0; p <= nbPoints; p++) {
    const t = (p / nbPoints) * 2 // deux périodes de la fondamentale
    let v = 0
    actives.forEach((on, i) => {
      if (on) v += Math.sin(2 * Math.PI * (i + 1) * t) / (i + 1)
    })
    valeurs.push(v)
  }
  const max = Math.max(...valeurs.map(Math.abs), 1e-9)
  const d = valeurs
    .map((v, p) => {
      const x = MARGE + (p / nbPoints) * (L - 2 * MARGE)
      const y = H_ONDE / 2 - (v / max) * (H_ONDE / 2 - MARGE)
      return `${p === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join('')
  const nb = actives.filter(Boolean).length

  return (
    <svg
      viewBox={`0 0 ${L} ${H_ONDE}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Forme de l'onde, somme de ${nb} harmonique${nb > 1 ? 's' : ''}, sur deux périodes de la fondamentale`}
    >
      <line x1={MARGE} x2={L - MARGE} y1={H_ONDE / 2} y2={H_ONDE / 2} stroke="var(--line)" strokeWidth="1.5" />
      {nb > 0 && <path d={d} fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" strokeLinejoin="round" />}
    </svg>
  )
}

/* ---------- Corde en n segments ---------- */

const H_CORDE = 110

function Corde({ rang }: { rang: number }) {
  const nbPoints = 400
  const x0 = MARGE * 2
  const x1 = L - MARGE * 2
  const amplitude = H_CORDE / 2 - 14
  const trace = (signe: number) => {
    let d = ''
    for (let p = 0; p <= nbPoints; p++) {
      const u = p / nbPoints
      const x = x0 + u * (x1 - x0)
      const y = H_CORDE / 2 - signe * amplitude * Math.sin(Math.PI * rang * u)
      d += `${p === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
    }
    return d
  }
  // Nœuds : les points immobiles de la corde
  const noeuds = Array.from({ length: rang + 1 }, (_, k) => x0 + (k / rang) * (x1 - x0))

  return (
    <svg
      viewBox={`0 0 ${L} ${H_CORDE}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Corde qui vibre en ${rang} segment${rang > 1 ? 's' : ''}`}
    >
      <path d={trace(1)} fill="none" stroke="var(--accent-purple)" strokeWidth="2" />
      <path d={trace(-1)} fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeOpacity="0.4" />
      <line x1={x0} x2={x1} y1={H_CORDE / 2} y2={H_CORDE / 2} stroke="var(--line)" strokeWidth="1.5" />
      {noeuds.map((x, k) => (
        <circle key={k} cx={x} cy={H_CORDE / 2} r={k === 0 || k === rang ? 5 : 4} fill="var(--text-primary)" />
      ))}
    </svg>
  )
}

/* ---------- La série harmonique ---------- */

type Voix = { osc: OscillatorNode; gain: GainNode }

export function SerieHarmonique() {
  const [fondamentale, setFondamentale] = useState(FONDAMENTALES[0].frequence)
  const [actives, setActives] = useState<boolean[]>(() => RANGS.map(() => true))
  const [choisie, setChoisie] = useState(1)
  const [continu, setContinu] = useState(false)
  const [uneAUne, setUneAUne] = useState(false)

  const contexteRef = useRef<AudioContext | null>(null)
  const voixRef = useRef<Voix[]>([])
  const arpegeRef = useRef<OscillatorNode[]>([])
  const minuteursRef = useRef<number[]>([])

  const contexte = () => {
    if (!contexteRef.current) contexteRef.current = new AudioContext()
    return contexteRef.current
  }

  const volumeDe = (rang: number, on: boolean) => (on ? VOLUME / rang : 0)

  const arreterContinu = () => {
    const ctx = contexteRef.current
    voixRef.current.forEach(({ osc, gain }) => {
      if (ctx) {
        gain.gain.setTargetAtTime(0, ctx.currentTime, 0.02)
        osc.stop(ctx.currentTime + 0.15)
      }
    })
    voixRef.current = []
    setContinu(false)
  }

  const arreterUneAUne = () => {
    arpegeRef.current.forEach((osc) => {
      try {
        osc.stop()
      } catch {
        // déjà arrêté
      }
    })
    arpegeRef.current = []
    minuteursRef.current.forEach((id) => window.clearTimeout(id))
    minuteursRef.current = []
    setUneAUne(false)
  }

  useEffect(() => {
    return () => {
      minuteursRef.current.forEach((id) => window.clearTimeout(id))
      voixRef.current.forEach(({ osc }) => osc.stop())
      arpegeRef.current.forEach((osc) => {
        try {
          osc.stop()
        } catch {
          // déjà arrêté
        }
      })
      contexteRef.current?.close()
    }
  }, [])

  // Pendant l'écoute continue, le son suit les réglages en direct
  useEffect(() => {
    const ctx = contexteRef.current
    if (!ctx || voixRef.current.length === 0) return
    voixRef.current.forEach(({ osc, gain }, i) => {
      osc.frequency.setTargetAtTime(fondamentale * (i + 1), ctx.currentTime, 0.01)
      gain.gain.setTargetAtTime(volumeDe(i + 1, actives[i]), ctx.currentTime, 0.02)
    })
  }, [actives, fondamentale])

  const basculerContinu = () => {
    if (continu) return arreterContinu()
    arreterUneAUne()
    const ctx = contexte()
    voixRef.current = RANGS.map((rang, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = fondamentale * rang
      gain.gain.value = 0
      gain.gain.setTargetAtTime(volumeDe(rang, actives[i]), ctx.currentTime, 0.03)
      osc.connect(gain).connect(ctx.destination)
      osc.start()
      return { osc, gain }
    })
    setContinu(true)
  }

  const lancerUneAUne = () => {
    if (uneAUne) return arreterUneAUne()
    arreterContinu()
    const ctx = contexte()
    const t0 = ctx.currentTime + 0.05
    arpegeRef.current = RANGS.map((rang, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const debut = t0 + i * DUREE_NOTE
      const fin = debut + DUREE_NOTE
      osc.frequency.value = fondamentale * rang
      // Toutes au même volume : on écoute la hauteur, pas le dosage
      gain.gain.setValueAtTime(0, debut)
      gain.gain.linearRampToValueAtTime(VOLUME * 1.5, debut + 0.02)
      gain.gain.setValueAtTime(VOLUME * 1.5, fin - 0.05)
      gain.gain.linearRampToValueAtTime(0, fin)
      osc.connect(gain).connect(ctx.destination)
      osc.start(debut)
      osc.stop(fin)
      return osc
    })
    // La fiche suit l'harmonique jouée
    minuteursRef.current = RANGS.map((rang, i) =>
      window.setTimeout(() => setChoisie(rang), (0.05 + i * DUREE_NOTE) * 1000),
    )
    minuteursRef.current.push(
      window.setTimeout(() => {
        arpegeRef.current = []
        minuteursRef.current = []
        setUneAUne(false)
      }, (0.05 + NB_HARMONIQUES * DUREE_NOTE) * 1000),
    )
    setUneAUne(true)
  }

  const basculer = (rang: number) => {
    setChoisie(rang)
    setActives((avant) => avant.map((on, i) => (i === rang - 1 ? !on : on)))
  }

  const preregler = (filtre: (rang: number) => boolean) => setActives(RANGS.map(filtre))

  // Fiche de l'harmonique choisie
  const frequence = fondamentale * choisie
  const note = noteDe(frequence)
  const intervalle =
    choisie > 1
      ? {
          rapport: `${choisie}/${choisie - 1}`,
          cents: Math.round(1200 * Math.log2(choisie / (choisie - 1))),
          nom: NOMS_INTERVALLES[choisie],
        }
      : null

  const bouton =
    'rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)] motion-reduce:transition-none'

  return (
    <div className="mt-10 rounded-2xl bg-[var(--bg-card)] p-5 shadow-sm md:p-8">
      {/* Fondamentale */}
      <fieldset>
        <legend className="mb-3 text-sm font-medium">Fondamentale</legend>
        <div className="flex flex-wrap gap-2">
          {FONDAMENTALES.map(({ nom, frequence: valeur }) => {
            const actif = valeur === fondamentale
            return (
              <button
                key={valeur}
                type="button"
                aria-pressed={actif}
                onClick={() => setFondamentale(valeur)}
                className={`${bouton} ${
                  actif
                    ? 'border-[var(--accent-labo)] bg-[var(--accent-labo)]/10 text-[var(--accent-labo-ink)]'
                    : 'border-[var(--line)] hover:border-[var(--accent-labo)]'
                }`}
              >
                {nom} · {formatHz(valeur)}
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Les 16 harmoniques, hauteur des barres = amplitude 1/n */}
      <div className="mt-8">
        <p id="consigne-harmoniques" className="mb-3 text-sm font-medium">
          Harmoniques <span className="font-normal text-[var(--text-muted)]">(clic pour activer ou couper)</span>
        </p>
        <div className="flex h-36 items-end gap-1 sm:gap-1.5" role="group" aria-labelledby="consigne-harmoniques">
          {RANGS.map((rang, i) => {
            const on = actives[i]
            const estChoisie = rang === choisie
            return (
              <button
                key={rang}
                type="button"
                aria-pressed={on}
                aria-label={`Harmonique ${rang}, ${formatHz(fondamentale * rang)}`}
                onClick={() => basculer(rang)}
                className={`group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)]`}
              >
                <span
                  className={`w-full rounded-t-sm border-2 transition-colors duration-200 motion-reduce:transition-none ${
                    on
                      ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]'
                      : 'border-[var(--line)] bg-transparent group-hover:border-[var(--accent-blue)]'
                  } ${estChoisie ? 'outline outline-2 outline-offset-2 outline-[var(--accent-purple)]' : ''}`}
                  style={{ height: `${Math.max(100 / rang, 6)}%` }}
                />
                <span className={`text-[0.7rem] tabular-nums ${estChoisie ? 'font-bold' : 'text-[var(--text-muted)]'}`}>
                  {rang}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => preregler(() => true)} className={`${bouton} border-[var(--line)] hover:border-[var(--accent-blue)]`}>
            Toutes
          </button>
          <button type="button" onClick={() => preregler((r) => r === 1)} className={`${bouton} border-[var(--line)] hover:border-[var(--accent-blue)]`}>
            Fondamentale seule
          </button>
          <button type="button" onClick={() => preregler((r) => r % 2 === 1)} className={`${bouton} border-[var(--line)] hover:border-[var(--accent-blue)]`}>
            Impaires seulement
          </button>
        </div>
      </div>

      {/* Forme de l'onde */}
      <div className="mt-8">
        <p className="mb-1 text-sm font-medium">Forme de l&apos;onde</p>
        <VueOnde actives={actives} />
      </div>

      {/* Écoute */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={basculerContinu}
          aria-pressed={continu}
          className={`${bouton} border-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10`}
        >
          {continu ? '■ Arrêter le son' : '▶ Écouter le son'}
        </button>
        <button
          type="button"
          onClick={lancerUneAUne}
          className={`${bouton} border-[var(--accent-labo)] text-[var(--accent-labo-ink)] hover:bg-[var(--accent-labo)]/10`}
        >
          {uneAUne ? '■ Arrêter' : '↗ Une à une'}
        </button>
      </div>
      <p className="mt-2 text-xs text-[var(--text-muted)]">
        Pendant l&apos;écoute, activer ou couper une harmonique change le son en direct.
      </p>

      {/* Fiche de l'harmonique choisie */}
      <div className="mt-10 rounded-xl border border-[var(--line)] p-5" aria-live="polite">
        <h3 className="text-base font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
          Harmonique {choisie}
          {choisie === 1 && <span className="font-normal text-[var(--text-muted)]"> · la fondamentale</span>}
        </h3>
        <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-[var(--text-muted)]">Fréquence</dt>
            <dd className="font-semibold tabular-nums">
              {choisie} × {formatHz(fondamentale)} = {formatHz(frequence)}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--text-muted)]">Note la plus proche</dt>
            <dd className="font-semibold tabular-nums">
              {note.nom}, {formatCents(note.cents)}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--text-muted)]">Depuis l&apos;harmonique précédente</dt>
            <dd className="font-semibold tabular-nums">
              {intervalle
                ? `${intervalle.rapport}, ${intervalle.cents} cents${intervalle.nom ? ` (${intervalle.nom})` : ''}`
                : 'aucune'}
            </dd>
          </div>
        </dl>
        <div className="mt-4">
          <Corde rang={choisie} />
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            La corde vibre en {choisie} segment{choisie > 1 ? 's' : ''}. Les points sont les nœuds, qui ne bougent pas.
          </p>
        </div>
      </div>
    </div>
  )
}
