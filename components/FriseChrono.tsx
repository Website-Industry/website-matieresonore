// Frise chronologique : une ligne par événement, positionnée sur une échelle commune.
// Un événement sans `fin` est un point, avec `fin` c'est une période.

export type Evenement = {
  debut: number
  fin?: number
  titre: string
  detail?: string
  couleur?: string
  date?: string
}

export function FriseChrono({
  debut,
  fin,
  pas = 100,
  evenements,
}: {
  debut: number
  fin: number
  pas?: number
  evenements: Evenement[]
}) {
  const pos = (annee: number) => ((annee - debut) / (fin - debut)) * 100
  const graduations: number[] = []
  for (let a = Math.ceil(debut / pas) * pas; a <= fin; a += pas) graduations.push(a)

  return (
    <div className="relative" style={{ fontFamily: 'var(--font-dm-sans)' }}>
      {/* repères verticaux */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 top-0">
        {graduations.map((a) => (
          <div
            key={a}
            className="absolute top-0 h-full border-l border-dashed border-[var(--line)]"
            style={{ left: `${pos(a)}%` }}
          />
        ))}
      </div>

      <ol className="frise relative flex flex-col gap-3">
        {evenements.map((e) => {
          const g = pos(e.debut)
          const d = e.fin ? pos(e.fin) : g
          const aDroite = g > 55
          const couleur = e.couleur ?? 'var(--accent-blue)'
          const date = e.date ?? (e.fin ? `${e.debut}-${e.fin}` : `${e.debut}`)
          return (
            <li key={e.titre} className="relative">
              <div
                className={`text-[0.8rem] leading-snug ${aDroite ? 'text-right' : ''}`}
                style={
                  aDroite
                    ? { marginRight: `${100 - d}%` }
                    : { marginLeft: `${g}%` }
                }
              >
                <span className="font-semibold text-[var(--text-primary)]">{e.titre}</span>{' '}
                <span className="text-[var(--text-muted)]">{date}</span>
                {e.detail && (
                  <span className="block text-[var(--text-muted)]">{e.detail}</span>
                )}
              </div>
              <div className="relative mt-1 h-2.5">
                {e.fin ? (
                  <div
                    className="absolute h-full rounded-full"
                    style={{ left: `${g}%`, width: `${d - g}%`, backgroundColor: couleur }}
                  />
                ) : (
                  <div
                    className="absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full"
                    style={{ left: `${g}%`, backgroundColor: couleur }}
                  />
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {/* axe */}
      <div className="relative mt-3 h-6 border-t-2 border-[var(--text-primary)]">
        {graduations.map((a) => (
          <span
            key={a}
            className="absolute top-1 -translate-x-1/2 text-xs text-[var(--text-muted)]"
            style={{ left: `${pos(a)}%` }}
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  )
}
