'use client'

import { useEffect, useRef, useState } from 'react'

// Simulateur de repliement : une sinusoïde échantillonnée à une fréquence donnée.
// Le calcul est exact : les échantillons d'une onde à f sont identiques à ceux
// d'une onde à r = f - fe × (multiple le plus proche), comprise entre -fe/2 et fe/2.
// C'est cette onde à r que le système reconstruit.

const FREQUENCES_ECHANTILLONNAGE = [8000, 16000, 44100, 48000]
const PAS = 10 // Hz, pas du curseur (les fréquences de Nyquist proposées en sont des multiples)
const NB_PERIODES = 12 // nombre d'intervalles d'échantillonnage affichés
const DUREE_ECOUTE = 1.5 // s
const DUREE_BALAYAGE = 10 // s
const VOLUME = 0.2
const LIMITE_AUDIBLE = 20000 // Hz

// Fréquence signée que le système reconstruit, entre -fe/2 et fe/2
function frequenceReconstruite(f: number, fe: number) {
  return f - fe * Math.round(f / fe)
}

function formatHz(v: number) {
  const a = Math.abs(v)
  if (a >= 1000) {
    return `${(a / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} kHz`
  }
  return `${Math.round(a).toLocaleString('fr-FR')} Hz`
}

// Fondu de 20 ms aux extrémités, pour éviter les clics
function enveloppe(i: number, longueur: number, fe: number) {
  const fondu = Math.floor(fe * 0.02)
  if (i < fondu) return i / fondu
  if (i > longueur - fondu) return (longueur - i) / fondu
  return 1
}

/* ---------- Vue de l'onde ---------- */

const L_ONDE = 720
const H_ONDE = 240
const MARGE = 16

function VueOnde({ f, fe }: { f: number; fe: number }) {
  const r = frequenceReconstruite(f, fe)
  const largeur = L_ONDE - 2 * MARGE
  const x = (u: number) => MARGE + (u / NB_PERIODES) * largeur
  const y = (v: number) => H_ONDE / 2 - v * (H_ONDE / 2 - MARGE)

  const courbe = (freq: number) => {
    const nbPoints = 1200
    let d = ''
    for (let p = 0; p <= nbPoints; p++) {
      const u = (p / nbPoints) * NB_PERIODES
      const v = Math.sin(2 * Math.PI * (freq / fe) * u)
      d += `${p === 0 ? 'M' : 'L'}${x(u).toFixed(2)} ${y(v).toFixed(2)}`
    }
    return d
  }

  const echantillons = Array.from({ length: NB_PERIODES + 1 }, (_, n) => ({
    n,
    v: Math.sin(2 * Math.PI * (f / fe) * n),
  }))

  return (
    <svg
      viewBox={`0 0 ${L_ONDE} ${H_ONDE}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Onde à ${formatHz(f)} échantillonnée à ${formatHz(fe)}, et onde reconstruite à ${formatHz(r)}`}
    >
      <line x1={MARGE} x2={L_ONDE - MARGE} y1={H_ONDE / 2} y2={H_ONDE / 2} stroke="var(--line)" strokeWidth="1.5" />
      <path d={courbe(f)} fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" strokeOpacity="0.85" />
      <path
        d={courbe(r)}
        fill="none"
        stroke="var(--accent-purple)"
        strokeWidth="2.5"
        strokeDasharray="7 5"
        strokeLinecap="round"
      />
      {echantillons.map(({ n, v }) => (
        <g key={n}>
          <line x1={x(n)} x2={x(n)} y1={H_ONDE / 2} y2={y(v)} stroke="var(--text-primary)" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx={x(n)} cy={y(v)} r="5" fill="var(--text-primary)" />
        </g>
      ))}
    </svg>
  )
}

/* ---------- Courbe de repliement ---------- */

const L_PLI = 720
const H_PLI = 180

function CourbeRepliement({ f, fe }: { f: number; fe: number }) {
  const max = 2 * fe
  const nyquist = fe / 2
  const largeur = L_PLI - 2 * MARGE
  const hauteur = H_PLI - 2 * MARGE
  const x = (F: number) => MARGE + (F / max) * largeur
  const y = (F: number) => H_PLI - MARGE - (F / nyquist) * hauteur
  const fa = Math.abs(frequenceReconstruite(f, fe))

  const zigzag = [0, nyquist, fe, 1.5 * fe, 2 * fe]
    .map((F, i) => `${i === 0 ? 'M' : 'L'}${x(F)} ${y(i % 2 === 0 ? 0 : nyquist)}`)
    .join('')

  const pct = (F: number) => `${(x(F) / L_PLI) * 100}%`

  return (
    <div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${L_PLI} ${H_PLI}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Fréquence reconstruite en fonction de la fréquence du son : ${formatHz(f)} donne ${formatHz(fa)}`}
        >
          {/* Zone fidèle : sous la fréquence de Nyquist */}
          <rect x={x(0)} y={MARGE} width={x(nyquist) - x(0)} height={hauteur} fill="var(--accent-labo)" fillOpacity="0.08" />
          <line x1={x(0)} x2={x(max)} y1={y(0)} y2={y(0)} stroke="var(--line)" strokeWidth="1.5" />
          {/* Le miroir */}
          <line x1={x(nyquist)} x2={x(nyquist)} y1={MARGE} y2={y(0)} stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1={x(fe)} x2={x(fe)} y1={MARGE} y2={y(0)} stroke="var(--line)" strokeWidth="1.5" />
          <path d={zigzag} fill="none" stroke="var(--text-muted)" strokeOpacity="0.6" strokeWidth="2" strokeLinejoin="round" />
          {/* Position actuelle */}
          <line x1={x(f)} x2={x(f)} y1={MARGE} y2={y(0)} stroke="var(--accent-blue)" strokeWidth="2" />
          <line x1={x(0)} x2={x(f)} y1={y(fa)} y2={y(fa)} stroke="var(--accent-purple)" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx={x(f)} cy={y(fa)} r="7" fill="var(--accent-purple)" />
        </svg>
      </div>
      {/* Graduations en HTML, lisibles à toutes les tailles */}
      <div className="relative mt-1 h-10 text-xs text-[var(--text-muted)]">
        {[
          { F: 0, texte: '0' },
          { F: nyquist, texte: `Nyquist\n${formatHz(nyquist)}` },
          { F: fe, texte: `fe\n${formatHz(fe)}` },
          { F: max, texte: `2 × fe\n${formatHz(max)}` },
        ].map(({ F, texte }) => (
          <span
            key={F}
            className="absolute whitespace-pre text-center leading-tight"
            style={{
              left: pct(F),
              transform: F === 0 ? 'none' : F === max ? 'translateX(-100%)' : 'translateX(-50%)',
              textAlign: F === 0 ? 'left' : F === max ? 'right' : 'center',
            }}
          >
            {texte}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Le simulateur ---------- */

export function Simulateur() {
  const [fe, setFe] = useState(8000)
  const [f, setF] = useState(1500)
  const [balayage, setBalayage] = useState(false)

  const contexteRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<AudioScheduledSourceNode | null>(null)
  const frameRef = useRef(0)

  const nyquist = fe / 2
  const fa = Math.abs(frequenceReconstruite(f, fe))
  const tousAZero = f > 0 && f % nyquist === 0

  let etat: string
  if (f === 0) etat = 'Fréquence nulle : pas de son.'
  else if (tousAZero && f === nyquist)
    etat = 'Pile sur la fréquence de Nyquist : deux échantillons par cycle, et ici ils tombent tous sur zéro. Le son disparaît.'
  else if (tousAZero)
    etat = 'Les échantillons tombent tous sur zéro : le système ne reconstruit rien.'
  else if (f < nyquist)
    etat = `Sous la fréquence de Nyquist (${formatHz(nyquist)}) : le son est reconstruit tel quel.`
  else
    etat = `Au-dessus de la fréquence de Nyquist : le son se replie. Le système reconstruit ${formatHz(fa)}, une fréquence absente du son d'origine.`

  const contexte = () => {
    if (!contexteRef.current) contexteRef.current = new AudioContext()
    return contexteRef.current
  }

  const arreter = () => {
    cancelAnimationFrame(frameRef.current)
    if (sourceRef.current) {
      sourceRef.current.onended = null
      try {
        sourceRef.current.stop()
      } catch {
        // déjà arrêtée
      }
      sourceRef.current = null
    }
    setBalayage(false)
  }

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frameRef.current)
      sourceRef.current?.stop()
      contexteRef.current?.close()
    }
  }, [])

  // Le buffer est déclaré à la fréquence d'échantillonnage choisie :
  // le navigateur rejoue ces échantillons tels quels, puis reconstruit le son.
  const jouerBuffer = (longueur: number, remplir: (donnees: Float32Array) => void) => {
    const ctx = contexte()
    const buffer = ctx.createBuffer(1, longueur, fe)
    remplir(buffer.getChannelData(0))
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.connect(ctx.destination)
    source.start()
    sourceRef.current = source
    return source
  }

  const ecouterOrigine = () => {
    arreter()
    const ctx = contexte()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const t = ctx.currentTime
    osc.frequency.value = f
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(VOLUME, t + 0.02)
    gain.gain.setValueAtTime(VOLUME, t + DUREE_ECOUTE - 0.02)
    gain.gain.linearRampToValueAtTime(0, t + DUREE_ECOUTE)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + DUREE_ECOUTE)
    sourceRef.current = osc
  }

  const ecouterReconstruit = () => {
    arreter()
    const longueur = Math.floor(fe * DUREE_ECOUTE)
    jouerBuffer(longueur, (donnees) => {
      for (let n = 0; n < longueur; n++) {
        donnees[n] = VOLUME * enveloppe(n, longueur, fe) * Math.sin((2 * Math.PI * f * n) / fe)
      }
    })
  }

  const lancerBalayage = () => {
    arreter()
    const ctx = contexte()
    const max = 2 * fe
    const longueur = Math.floor(fe * DUREE_BALAYAGE)
    const source = jouerBuffer(longueur, (donnees) => {
      let phase = 0
      for (let n = 0; n < longueur; n++) {
        const freq = (max * n) / longueur
        donnees[n] = VOLUME * enveloppe(n, longueur, fe) * Math.sin(phase)
        phase += (2 * Math.PI * freq) / fe
      }
    })
    const debut = ctx.currentTime
    source.onended = () => {
      cancelAnimationFrame(frameRef.current)
      sourceRef.current = null
      setBalayage(false)
    }
    setBalayage(true)

    // Le curseur suit le son, calé sur l'horloge audio
    const suivre = () => {
      const ecoule = ctx.currentTime - debut
      const valeur = Math.min(max, Math.round((max * ecoule) / DUREE_BALAYAGE / PAS) * PAS)
      setF(valeur)
      if (ecoule < DUREE_BALAYAGE) frameRef.current = requestAnimationFrame(suivre)
    }
    frameRef.current = requestAnimationFrame(suivre)
  }

  const changerFe = (valeur: number) => {
    arreter()
    setFe(valeur)
    setF((actuelle) => Math.min(actuelle, 2 * valeur))
  }

  const origineAudible = f > 0 && f <= LIMITE_AUDIBLE
  const bouton =
    'rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none'

  return (
    <div className="mt-10 rounded-2xl bg-[var(--bg-card)] p-5 shadow-sm md:p-8">
      {/* Fréquence d'échantillonnage */}
      <fieldset>
        <legend className="mb-3 text-sm font-medium">Fréquence d&apos;échantillonnage</legend>
        <div className="flex flex-wrap gap-2">
          {FREQUENCES_ECHANTILLONNAGE.map((valeur) => {
            const actif = valeur === fe
            return (
              <button
                key={valeur}
                type="button"
                aria-pressed={actif}
                disabled={balayage}
                onClick={() => changerFe(valeur)}
                className={`${bouton} ${
                  actif
                    ? 'border-[var(--accent-labo)] bg-[var(--accent-labo)]/10 text-[var(--accent-labo-ink)]'
                    : 'border-[var(--line)] hover:border-[var(--accent-labo)]'
                }`}
              >
                {formatHz(valeur)}
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Fréquence du son */}
      <div className="mt-6">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <label htmlFor="frequence-son" className="text-sm font-medium">
            Fréquence du son
          </label>
          <span className="text-lg font-semibold tabular-nums" style={{ fontFamily: 'var(--font-syne)' }}>
            {formatHz(f)}
          </span>
        </div>
        <input
          id="frequence-son"
          type="range"
          min={0}
          max={2 * fe}
          step={PAS}
          value={f}
          disabled={balayage}
          onChange={(e) => setF(Number(e.target.value))}
          aria-valuetext={formatHz(f)}
          className="w-full accent-[var(--accent-blue)]"
        />
      </div>

      {/* Lecture des valeurs */}
      <dl className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-6 rounded bg-[var(--accent-blue)]" />
          <dt className="text-[var(--text-muted)]">Son d&apos;origine</dt>
          <dd className="ml-auto font-semibold tabular-nums sm:ml-0">{formatHz(f)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--text-primary)]" />
          <dt className="text-[var(--text-muted)]">Échantillons par cycle</dt>
          <dd className="ml-auto font-semibold tabular-nums sm:ml-0">
            {f === 0 ? '∞' : (fe / f).toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-6 rounded border-t-2 border-dashed border-[var(--accent-purple)]" />
          <dt className="text-[var(--text-muted)]">Son reconstruit</dt>
          <dd className="ml-auto font-semibold tabular-nums sm:ml-0">{formatHz(fa)}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <VueOnde f={f} fe={fe} />
      </div>

      <p aria-live="polite" className="mt-4 min-h-[3rem] text-[0.95rem] leading-relaxed">
        {etat}
      </p>

      {/* Écoute */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={ecouterOrigine}
          disabled={balayage || !origineAudible}
          title={origineAudible ? undefined : 'Au-delà de 20 kHz, le son est inaudible'}
          className={`${bouton} border-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10`}
        >
          ▶ Son d&apos;origine
        </button>
        <button
          type="button"
          onClick={ecouterReconstruit}
          disabled={balayage || f === 0}
          className={`${bouton} border-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/10`}
        >
          ▶ Ce que le système reconstruit
        </button>
        <button
          type="button"
          onClick={balayage ? arreter : lancerBalayage}
          className={`${bouton} border-[var(--accent-labo)] text-[var(--accent-labo-ink)] hover:bg-[var(--accent-labo)]/10`}
        >
          {balayage ? '■ Arrêter' : '↗ Balayage'}
        </button>
      </div>
      {!origineAudible && f > 0 && (
        <p className="mt-2 text-xs text-[var(--text-muted)]">Au-delà de 20 kHz, le son d&apos;origine est inaudible.</p>
      )}

      {/* Courbe de repliement */}
      <div className="mt-10">
        <h3 className="mb-1 text-base font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
          Le pli
        </h3>
        <p className="mb-3 text-sm text-[var(--text-muted)]">
          En abscisse, la fréquence du son ; en hauteur, la fréquence reconstruite. La zone verte est reproduite fidèlement.
        </p>
        <CourbeRepliement f={f} fe={fe} />
      </div>
    </div>
  )
}
