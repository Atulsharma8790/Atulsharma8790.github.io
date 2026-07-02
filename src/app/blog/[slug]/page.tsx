import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { articles } from '../../../data/articles'
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
  }
}

const categoryColors: Record<string, string> = {
  'AI & Testing': '#06B6D4',
  'Architecture': '#6366F1',
  'Automation': '#8B5CF6',
  'Performance': '#F59E0B',
  'Leadership': '#10B981',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) notFound()

  const color = categoryColors[article.category] ?? '#6366F1'

  return (
    <div className="min-h-screen themed-bg">
      {/* Top nav */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.06]" style={{ background: 'var(--nav-bg)' }}>
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/#blog"
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--muted)' }}
          >
            <ArrowLeft size={15} />
            Back to Knowledge Hub
          </Link>
          <Link href="/" className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
            Atul Sharma
          </Link>
        </div>
      </div>

      <main className="max-w-[800px] mx-auto px-4 sm:px-6 py-16">
        {/* Category badge */}
        <div className="mb-6">
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
          >
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl font-bold leading-tight mb-6"
          style={{ color: 'var(--text)' }}
        >
          {article.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--muted)' }}>
            <Calendar size={13} />
            {formatDate(article.date)}
          </span>
          <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--muted)' }}>
            <Clock size={13} />
            {article.readTime} read
          </span>
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--muted)' }}
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Excerpt */}
        <p
          className="text-lg leading-relaxed mb-10 font-medium"
          style={{ color: 'var(--text-2, var(--muted))' }}
        >
          {article.excerpt}
        </p>

        {/* Article body */}
        <div className="prose-article space-y-6">
          {article.content.map((section, i) => {
            if (section.type === 'heading') {
              return (
                <h2
                  key={i}
                  className="text-xl sm:text-2xl font-bold mt-10 mb-4"
                  style={{ color: 'var(--text)' }}
                >
                  {section.text}
                </h2>
              )
            }
            if (section.type === 'paragraph') {
              return (
                <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {section.text}
                </p>
              )
            }
            if (section.type === 'list') {
              return (
                <ul key={i} className="space-y-3 pl-0">
                  {section.items?.map((item, j) => (
                    <li key={j} className="flex gap-3 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                      <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )
            }
            if (section.type === 'callout') {
              const bgMap: Record<string, string> = {
                tip: 'rgba(16,185,129,0.07)',
                insight: 'rgba(99,102,241,0.07)',
                warning: 'rgba(245,158,11,0.07)',
              }
              const borderMap: Record<string, string> = {
                tip: 'rgba(16,185,129,0.25)',
                insight: 'rgba(99,102,241,0.25)',
                warning: 'rgba(245,158,11,0.25)',
              }
              const labelMap: Record<string, string> = {
                tip: '💡 Tip',
                insight: '🔍 Insight',
                warning: '⚠️ Watch out',
              }
              const v = section.variant ?? 'insight'
              return (
                <div
                  key={i}
                  className="rounded-xl p-5 my-6"
                  style={{
                    background: bgMap[v],
                    border: `1px solid ${borderMap[v]}`,
                  }}
                >
                  <div className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--muted)' }}>
                    {labelMap[v]}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{section.text}</p>
                </div>
              )
            }
            if (section.type === 'divider') {
              return <hr key={i} style={{ borderColor: 'var(--border)' }} />
            }
            return null
          })}
        </div>

        {/* Share on LinkedIn */}
        <div
          className="mt-16 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Found this useful?</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Share it with someone who might benefit.</p>
          </div>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://atulsharma.vercel.app/blog/${article.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200"
            style={{ background: '#0A66C2' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Share on LinkedIn
          </a>
        </div>

        {/* Related articles */}
        <div className="mt-16">
          <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--text)' }}>More from the Knowledge Hub</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {articles
              .filter(a => a.slug !== article.slug)
              .slice(0, 2)
              .map(related => {
                const relColor = categoryColors[related.category] ?? '#6366F1'
                return (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block rounded-xl p-4 transition-all duration-200"
                    style={{
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full mb-3 inline-block"
                      style={{ background: `${relColor}15`, color: relColor, border: `1px solid ${relColor}30` }}
                    >
                      {related.category}
                    </span>
                    <h4
                      className="text-sm font-semibold leading-snug group-hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--text)' }}
                    >
                      {related.title}
                    </h4>
                    <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{related.readTime} read</p>
                  </Link>
                )
              })}
          </div>
        </div>
      </main>
    </div>
  )
}
