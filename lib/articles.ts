import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

export type ArticleMeta = {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
}

export type Article = ArticleMeta & { content: string }

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value)
}

function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

function readArticleFile(slug: string) {
  const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(fullPath, 'utf8')
  return matter(raw)
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => {
      const { data } = readArticleFile(slug)
      return {
        slug,
        title: String(data.title ?? slug),
        date: normalizeDate(data.date),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        excerpt: String(data.excerpt ?? ''),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getArticleBySlug(slug: string): Article | null {
  if (!getArticleSlugs().includes(slug)) return null
  const { data, content } = readArticleFile(slug)
  return {
    slug,
    title: String(data.title ?? slug),
    date: normalizeDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    excerpt: String(data.excerpt ?? ''),
    content,
  }
}
