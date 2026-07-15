import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }))
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
    <article>
      <h1>{article.title}</h1>
      <MDXRemote source={article.content} options={{ blockJS: false }} />
    </article>
  )
}
