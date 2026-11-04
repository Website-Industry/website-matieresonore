import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} — Matière Sonore`,
    description: article.excerpt,
  }
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <main className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        {/* Back */}
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-1 text-sm transition-opacity duration-200 hover:opacity-70"
          style={{ color: 'var(--accent-orange)', fontFamily: 'var(--font-dm-sans)' }}
        >
          ← Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          {article.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: 'var(--accent-orange)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1
            className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {article.title}
          </h1>

          <time
            className="mt-4 block text-sm text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            {formatDate(article.date)}
          </time>
        </header>

        {/* Separator */}
        <div
          className="mb-10 h-px w-full"
          style={{ backgroundColor: 'var(--text-primary)', opacity: 0.08 }}
        />

        {/* Body */}
        <div
          className="prose-article"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          <MDXRemote source={article.content} options={{ blockJS: false }} />
        </div>
      </div>
    </main>
  )
}
