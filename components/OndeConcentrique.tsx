'use client'

import { useEffect, useRef } from 'react'

// Cercles concentriques animés : une onde qui se propage dans l'eau.
// Chaque cercle ondule doucement, une impulsion part du centre à intervalle
// régulier et à chaque scroll, et les cercles s'effacent en s'éloignant du centre.

const NB_CERCLES = 8
const NB_POINTS = 120
const PERIODE_IMPULSION = 4200 // ms entre deux impulsions spontanées
const VITESSE_IMPULSION = 0.11 // px par ms
const LARGEUR_IMPULSION = 38 // px, épaisseur du front d'onde

type Impulsion = { depart: number; force: number }

function rayonsDe(c: number) {
  return Array.from({ length: NB_CERCLES }, (_, i) => c * (0.14 + (i * 0.8) / (NB_CERCLES - 1)))
}

// Opacité décroissante du centre vers l'extérieur
function opaciteDe(i: number, base: number) {
  const t = i / (NB_CERCLES - 1)
  return base * Math.pow(1 - t, 1.6) + base * 0.06
}

function tracer(c: number, r: number, i: number, temps: number, agitation: number, bosse: number) {
  const amplitude = (1.2 + r * 0.012) * agitation + bosse * 7
  const k1 = 3 + (i % 3)
  const k2 = 5 + (i % 2) * 2
  const phase = i * 1.7
  let d = ''
  for (let p = 0; p <= NB_POINTS; p++) {
    const a = (p / NB_POINTS) * Math.PI * 2
    const rr =
      r +
      bosse * 9 +
      amplitude * Math.sin(k1 * a + temps * 0.0007 + phase) * 0.7 +
      amplitude * Math.sin(k2 * a - temps * 0.0011 + phase * 0.5) * 0.3
    const x = c + rr * Math.cos(a)
    const y = c + rr * Math.sin(a)
    d += `${p === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d + 'Z'
}

export function OndeConcentrique({
  color = '#0096c7',
  opacity = 0.16,
  size = 700,
}: {
  color?: string
  opacity?: number
  size?: number
}) {
  const c = size / 2
  const rayons = rayonsDe(c)
  const svgRef = useRef<SVGSVGElement>(null)
  const cheminsRef = useRef<(SVGPathElement | null)[]>([])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rayons = rayonsDe(c)
    const impulsions: Impulsion[] = []
    let agitationScroll = 0
    let dernierScroll = window.scrollY
    let derniereImpulsionScroll = 0
    let prochaineImpulsion = performance.now() + 600
    let visible = true
    let idFrame = 0

    const lancer = (maintenant: number, force: number) => {
      impulsions.push({ depart: maintenant, force })
    }

    const surScroll = () => {
      const delta = Math.abs(window.scrollY - dernierScroll)
      dernierScroll = window.scrollY
      agitationScroll = Math.min(agitationScroll + delta * 0.04, 3)
      const maintenant = performance.now()
      if (maintenant - derniereImpulsionScroll > 700) {
        derniereImpulsionScroll = maintenant
        lancer(maintenant, Math.min(0.6 + delta * 0.02, 1.4))
      }
    }

    const image = (maintenant: number) => {
      idFrame = requestAnimationFrame(image)
      if (!visible) return

      if (maintenant >= prochaineImpulsion) {
        lancer(maintenant, 1)
        prochaineImpulsion = maintenant + PERIODE_IMPULSION
      }

      agitationScroll *= 0.95
      const agitation = 1 + agitationScroll
      const limite = c * 1.2

      for (let k = impulsions.length - 1; k >= 0; k--) {
        if ((maintenant - impulsions[k].depart) * VITESSE_IMPULSION > limite) impulsions.splice(k, 1)
      }

      rayons.forEach((r, i) => {
        let bosse = 0
        for (const imp of impulsions) {
          const front = (maintenant - imp.depart) * VITESSE_IMPULSION
          const ecart = (r - front) / LARGEUR_IMPULSION
          bosse += imp.force * Math.exp(-ecart * ecart) * (1 - (front / limite) * 0.5)
        }
        cheminsRef.current[i]?.setAttribute('d', tracer(c, r, i, maintenant, agitation, bosse))
      })
    }

    const observateur = new IntersectionObserver(([entree]) => {
      visible = entree.isIntersecting
    })
    observateur.observe(svg)
    window.addEventListener('scroll', surScroll, { passive: true })
    idFrame = requestAnimationFrame(image)

    return () => {
      cancelAnimationFrame(idFrame)
      observateur.disconnect()
      window.removeEventListener('scroll', surScroll)
    }
  }, [c])

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {rayons.map((r, i) => (
        <path
          key={i}
          ref={(el) => {
            cheminsRef.current[i] = el
          }}
          d={tracer(c, r, i, 0, 1, 0)}
          stroke={color}
          strokeOpacity={opaciteDe(i, opacity)}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}
