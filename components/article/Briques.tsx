import type { ReactNode } from 'react'

// Briques visuelles partagées par les articles : cartes, notes, verdicts,
// encadrés explicatifs en listes et raisonnements en chaîne.

export const BLEU = 'var(--accent-blue)'
export const VIOLET = 'var(--accent-purple)'
export const ORANGE = 'var(--accent-blog)'
export const SOMBRE = 'var(--text-primary)'

/* ── Petites briques visuelles ─────────────────────────────── */

export function Carte({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[14px] bg-[var(--bg-card)] p-5 shadow-sm md:p-6 ${className}`}>
      {children}
    </div>
  )
}

export function Titre({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1 text-lg font-bold leading-snug text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-syne)' }}>
      {children}
    </div>
  )
}

export function Note({ children, couleur = BLEU, plein = false }: { children: ReactNode; couleur?: string; plein?: boolean }) {
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

export function Fleche({ label }: { label?: string }) {
  return (
    <span className="inline-flex flex-col items-center px-1 text-[var(--text-muted)]">
      <span className="text-lg leading-none">→</span>
      {label && <span className="text-[0.65rem] leading-tight">{label}</span>}
    </span>
  )
}

export function Verdict({ ok, children }: { ok: boolean; children: ReactNode }) {
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

export function TitreNumerote({ numero, titre }: { numero: number; titre: string }) {
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

export type TonEncadre = 'depart' | 'voir' | 'retenir' | 'limite' | 'mode'
export const encadres: Record<TonEncadre, { label: string; couleur: string; fond: string }> = {
  depart: { label: 'Le point de départ', couleur: BLEU, fond: 'rgba(0,150,199,0.06)' },
  voir: { label: 'Ce qu\'on voit', couleur: VIOLET, fond: 'rgba(123,47,255,0.05)' },
  retenir: { label: 'À retenir', couleur: ORANGE, fond: 'rgba(242,96,30,0.07)' },
  limite: { label: 'La limite', couleur: 'var(--text-muted)', fond: 'rgba(13,26,46,0.04)' },
  mode: { label: 'Mode d\'emploi', couleur: 'var(--accent-labo)', fond: 'rgba(31,184,102,0.07)' },
}

// Encadré explicatif : une étiquette et une liste de points courts
export function Encadre({ ton, label, points }: { ton: TonEncadre; label?: string; points: ReactNode[] }) {
  const e = encadres[ton]
  return (
    <div className="my-6 rounded-r-xl border-l-4 px-5 py-4" style={{ borderColor: e.couleur, backgroundColor: e.fond }}>
      <div className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: e.couleur }}>
        {label ?? e.label}
      </div>
      <div role="list" className="flex flex-col gap-2 text-[0.98rem] leading-relaxed text-[var(--text-primary)]">
        {points.map((pt, i) => (
          <div role="listitem" key={i} className="flex gap-3">
            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: e.couleur }} />
            <span>{pt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Raisonnement en chaîne : si... alors... donc...
export function Chaine({ titre, etapes }: { titre?: string; etapes: ReactNode[] }) {
  return (
    <div className="my-6">
      {titre && (
        <div className="mb-3 text-xs font-bold uppercase tracking-wide" style={{ color: ORANGE }}>{titre}</div>
      )}
      <div role="list" className="flex flex-col">
        {etapes.map((et, i) => {
          const mot = i === 0 ? 'Si' : i === etapes.length - 1 ? 'Donc' : 'Alors'
          return (
            <div role="listitem" key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className="flex h-7 min-w-[3.4rem] items-center justify-center rounded-full px-2 text-xs font-bold"
                  style={{
                    backgroundColor: i === etapes.length - 1 ? ORANGE : 'var(--bg-card)',
                    color: i === etapes.length - 1 ? '#0d1a2e' : 'var(--text-primary)',
                    border: `2px solid ${ORANGE}`,
                  }}
                >
                  {mot}
                </span>
                {i < etapes.length - 1 && <span className="w-0.5 flex-1 bg-[var(--accent-blog)] opacity-40" style={{ minHeight: 12 }} />}
              </div>
              <div className="pb-3 pt-0.5 text-[0.98rem] leading-relaxed text-[var(--text-primary)]">{et}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
