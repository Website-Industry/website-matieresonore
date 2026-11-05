'use client'

import { useEffect, useRef, useState, type PointerEvent } from 'react'

// Transformée de Fourier d'une forme d'onde périodique, sur une période de N points.
// Coefficients : a_k = 2/N Σ x[n] cos(2πkn/N), b_k = 2/N Σ x[n] sin(2πkn/N).
// La reconstruction avec K harmoniques additionne les K premiers termes.
// L'écoute utilise ces mêmes coefficients (PeriodicWave de l'API Web Audio).

const N = 512
const MAX_K = 64
const NB_BARRES = 32
const FREQUENCE_ECOUTE = 220 // Hz
const VOLUME = 0.15

type Forme = 'sinusoide' | 'carre' | 'scie' | 'triangle' | 'dessin'

const FORMES: { id: Exclude<Forme, 'dessin'>; nom: string; f: (u: number) => number }[] = [
  { id: 'sinusoide', nom: 'Sinusoïde', f: (u) => Math.sin(2 * Math.PI * u) },
  { id: 'carre', nom: 'Carré', f: (u) => (u < 0.5 ? 1 : -1) },
  { id: 'scie', nom: 'Dents de scie', f: (u) => 1 - 2 * u },
  { id: 'triangle', nom: 'Triangle', f: (u) => (u < 0.25 ? 4 * u : u < 0.75 ? 2 - 4 * u : 4 * u - 4) },
]

function echantillonner(f: (u: number) => number) {
  return Array.from({ length: N }, (_, n) => f(n / N))
}

type Coefficients = { a0: number; a: number[]; b: number[]; amplitudes: number[] }

function transformee(signal: number[]): Coefficients {
  const a = [0]
  const b = [0]
  const amplitudes = [0]
  const a0 = signal.reduce((s, v) => s + v, 0) / N
  for (let k = 1; k <= MAX_K; k++) {
    let ak = 0
    let bk = 0
    for (let n = 0; n < N; n++) {
      const angle = (2 * Math.PI * k * n) / N
      ak += signal[n] * Math.cos(angle)
      bk += signal[n] * Math.sin(angle)
    }
    ak *= 2 / N
    bk *= 2 / N
    a.push(ak)
    b.push(bk)
    amplitudes.push(Math.hypot(ak, bk))
  }
  return { a0, a, b, amplitudes }
}

function reconstruire({ a0, a, b }: Coefficients, K: number) {
  return Array.from({ length: N }, (_, n) => {
    let v = a0
    for (let k = 1; k <= K; k++) {
      const angle = (2 * Math.PI * k * n) / N
      v += a[k] * Math.cos(angle) + b[k] * Math.sin(angle)
    }
    return v
  })
}

/* ---------- Vue du signal, sur laquelle on dessine ---------- */

const L = 720
const H = 260
const MARGE = 16
const ECHELLE = (H / 2 - MARGE) / 1.3 // laisse de la place au dépassement de Gibbs

const xDe = (n: number) => MARGE + (n / (N - 1)) * (L - 2 * MARGE)
const yDe = (v: number) => H / 2 - v * ECHELLE

function chemin(valeurs: number[]) {
  return valeurs.map((v, n) => `${n === 0 ? 'M' : 'L'}${xDe(n).toFixed(2)} ${yDe(v).toFixed(2)}`).join('')
}

/* ---------- Le labo ---------- */

export function Fourier() {
  const [forme, setForme] = useState<Forme>('carre')
  const [signal, setSignal] = useState<number[]>(() => echantillonner(FORMES[1].f))
  const [K, setK] = useState(8)
  const [ecoute, setEcoute] = useState(false)

  const svgRef = useRef<SVGSVGElement | null>(null)
  const dernierPointRef = useRef<{ n: number; v: number } | null>(null)
  const contexteRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const coefs = transformee(signal)
  const reconstruction = reconstruire(coefs, K)

  const energieTotale = coefs.amplitudes.reduce((s, A) => s + A * A, 0)
  const energieGardee = coefs.amplitudes.slice(1, K + 1).reduce((s, A) => s + A * A, 0)
  const partEnergie = energieTotale > 1e-12 ? (energieGardee / energieTotale) * 100 : null
  const maxAmplitude = Math.max(...coefs.amplitudes.slice(1, NB_BARRES + 1), 1e-9)

  /* --- Dessin --- */

  const pointDe = (e: { clientX: number; clientY: number }) => {
    const svg = svgRef.current
    if (!svg) return null
    const rect = svg.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * L
    const py = ((e.clientY - rect.top) / rect.height) * H
    const n = Math.round(((px - MARGE) / (L - 2 * MARGE)) * (N - 1))
    const v = (H / 2 - py) / ECHELLE
    return { n: Math.min(N - 1, Math.max(0, n)), v: Math.min(1, Math.max(-1, v)) }
  }

  const tracerVers = (point: { n: number; v: number }) => {
    const depart = dernierPointRef.current ?? point
    setSignal((avant) => {
      const suite = avant.slice()
      const debut = Math.min(depart.n, point.n)
      const fin = Math.max(depart.n, point.n)
      for (let n = debut; n <= fin; n++) {
        const t = fin === debut ? 1 : (n - depart.n) / (point.n - depart.n)
        suite[n] = depart.v + (point.v - depart.v) * t
      }
      return suite
    })
    dernierPointRef.current = point
  }

  const surPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    const point = pointDe(e)
    if (!point) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dernierPointRef.current = null
    setForme('dessin')
    tracerVers(point)
  }

  const surPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    if (!dernierPointRef.current) return
    const point = pointDe(e)
    if (point) tracerVers(point)
  }

  const surPointerUp = () => {
    dernierPointRef.current = null
  }

  /* --- Écoute --- */

  const appliquerOnde = () => {
    const ctx = contexteRef.current
    const osc = oscRef.current
    const gain = gainRef.current
    if (!ctx || !osc || !gain) return
    // PeriodicWave : real = termes en cosinus, imag = termes en sinus
    const reel = [0, ...coefs.a.slice(1, K + 1)]
    const imag = [0, ...coefs.b.slice(1, K + 1)]
    const silence = reel.every((v) => Math.abs(v) < 1e-6) && imag.every((v) => Math.abs(v) < 1e-6)
    if (!silence) osc.setPeriodicWave(ctx.createPeriodicWave(reel, imag))
    gain.gain.setTargetAtTime(silence ? 0 : VOLUME, ctx.currentTime, 0.02)
  }

  // Le son suit le dessin et le nombre d'harmoniques en direct
  useEffect(() => {
    if (ecoute) appliquerOnde()
  })

  useEffect(() => {
    return () => {
      oscRef.current?.stop()
      contexteRef.current?.close()
    }
  }, [])

  const basculerEcoute = () => {
    if (ecoute) {
      const ctx = contexteRef.current
      if (ctx && oscRef.current && gainRef.current) {
        gainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.02)
        oscRef.current.stop(ctx.currentTime + 0.15)
      }
      oscRef.current = null
      gainRef.current = null
      setEcoute(false)
      return
    }
    if (!contexteRef.current) contexteRef.current = new AudioContext()
    const ctx = contexteRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.frequency.value = FREQUENCE_ECOUTE
    gain.gain.value = 0
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    oscRef.current = osc
    gainRef.current = gain
    appliquerOnde()
    setEcoute(true)
  }

  const choisirForme = (id: Exclude<Forme, 'dessin'>) => {
    const modele = FORMES.find((f) => f.id === id)
    if (!modele) return
    setForme(id)
    setSignal(echantillonner(modele.f))
  }

  const effacer = () => {
    setForme('dessin')
    setSignal(Array.from({ length: N }, () => 0))
  }

  const bouton =
    'rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)] motion-reduce:transition-none'

  return (
    <div className="mt-10 rounded-2xl bg-[var(--bg-card)] p-5 shadow-sm md:p-8">
      {/* Forme de départ */}
      <fieldset>
        <legend className="mb-3 text-sm font-medium">Forme d&apos;onde</legend>
        <div className="flex flex-wrap gap-2">
          {FORMES.map(({ id, nom }) => {
            const actif = id === forme
            return (
              <button
                key={id}
                type="button"
                aria-pressed={actif}
                onClick={() => choisirForme(id)}
                className={`${bouton} ${
                  actif
                    ? 'border-[var(--accent-labo)] bg-[var(--accent-labo)]/10 text-[var(--accent-labo-ink)]'
                    : 'border-[var(--line)] hover:border-[var(--accent-labo)]'
                }`}
              >
                {nom}
              </button>
            )
          })}
          <button type="button" onClick={effacer} className={`${bouton} border-[var(--line)] hover:border-[var(--accent-labo)]`}>
            Effacer
          </button>
        </div>
      </fieldset>

      {/* Signal et reconstruction */}
      <div className="mt-6">
        <div className="mb-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-0.5 w-6 rounded bg-[var(--accent-blue)]" />
            <span className="text-[var(--text-muted)]">{forme === 'dessin' ? 'Le dessin' : "Forme d'origine"}</span>
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="w-6 border-t-2 border-dashed border-[var(--accent-purple)]" />
            <span className="text-[var(--text-muted)]">
              Reconstruction avec {K} harmonique{K > 1 ? 's' : ''}
            </span>
          </span>
        </div>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${L} ${H}`}
          className="h-auto w-full cursor-crosshair touch-none select-none rounded-lg bg-[var(--bg-base)]/60"
          role="img"
          aria-label={`Une période de la forme d'onde et sa reconstruction avec ${K} harmoniques. On peut dessiner dessus à la souris ou au doigt.`}
          onPointerDown={surPointerDown}
          onPointerMove={surPointerMove}
          onPointerUp={surPointerUp}
          onPointerCancel={surPointerUp}
        >
          <line x1={MARGE} x2={L - MARGE} y1={H / 2} y2={H / 2} stroke="var(--line)" strokeWidth="1.5" />
          <line x1={MARGE} x2={L - MARGE} y1={yDe(1)} y2={yDe(1)} stroke="var(--line)" strokeWidth="1" strokeDasharray="3 5" />
          <line x1={MARGE} x2={L - MARGE} y1={yDe(-1)} y2={yDe(-1)} stroke="var(--line)" strokeWidth="1" strokeDasharray="3 5" />
          <path d={chemin(signal)} fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" strokeLinejoin="round" />
          <path
            d={chemin(reconstruction)}
            fill="none"
            stroke="var(--accent-purple)"
            strokeWidth="2.5"
            strokeDasharray="7 5"
            strokeLinecap="round"
          />
        </svg>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          Dessiner sur la courbe pour la modifier, à la souris ou au doigt.
        </p>
      </div>

      {/* Nombre d'harmoniques gardées */}
      <div className="mt-6">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <label htmlFor="nb-harmoniques" className="text-sm font-medium">
            Harmoniques gardées
          </label>
          <span className="text-sm text-[var(--text-muted)]">
            <span className="text-lg font-semibold text-[var(--text-primary)] tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
              {K}
            </span>
            {partEnergie !== null && (
              <> · {partEnergie.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}&nbsp;% de l&apos;énergie</>
            )}
          </span>
        </div>
        <input
          id="nb-harmoniques"
          type="range"
          min={1}
          max={MAX_K}
          step={1}
          value={K}
          onChange={(e) => setK(Number(e.target.value))}
          className="w-full accent-[var(--accent-blue)]"
        />
      </div>

      {/* Spectre */}
      <div className="mt-8">
        <p id="titre-spectre" className="mb-3 text-sm font-medium">
          Spectre{' '}
          <span className="font-normal text-[var(--text-muted)]">
            (amplitude de chaque harmonique ; clic sur une barre pour garder jusqu&apos;à elle)
          </span>
        </p>
        <div className="flex h-32 items-end gap-[2px] sm:gap-1" role="group" aria-labelledby="titre-spectre">
          {Array.from({ length: NB_BARRES }, (_, i) => i + 1).map((k) => {
            const A = coefs.amplitudes[k]
            const gardee = k <= K
            return (
              <button
                key={k}
                type="button"
                onClick={() => setK(k)}
                aria-label={`Harmonique ${k}, amplitude ${A.toLocaleString('fr-FR', { maximumFractionDigits: 3 })}`}
                aria-pressed={gardee}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)]"
              >
                <span
                  className={`w-full rounded-t-sm transition-colors duration-200 motion-reduce:transition-none ${
                    gardee ? 'bg-[var(--accent-blue)]' : 'bg-[var(--text-muted)]/25'
                  }`}
                  style={{ height: `${(A / maxAmplitude) * 100}%`, minHeight: A > 1e-4 ? '2px' : '0' }}
                />
                <span className="h-3 text-[0.6rem] leading-3 text-[var(--text-muted)] tabular-nums">
                  {k === 1 || k % 4 === 0 ? k : ''}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Écoute */}
      <div className="mt-6">
        <button
          type="button"
          onClick={basculerEcoute}
          aria-pressed={ecoute}
          className={`${bouton} border-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10`}
        >
          {ecoute ? '■ Arrêter le son' : '▶ Écouter la reconstruction'}
        </button>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          À 220 Hz. Le son suit le dessin et le nombre d&apos;harmoniques en direct.
        </p>
      </div>
    </div>
  )
}
