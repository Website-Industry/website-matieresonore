import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

export const metadata = {
  title: 'Blog — Matière Sonore',
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/blog/${article.slug}`}>{article.title}</Link>
            <p>{article.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
