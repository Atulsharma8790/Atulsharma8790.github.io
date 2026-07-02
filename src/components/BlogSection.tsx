'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { articles } from '../data/articles'
import { Clock, ArrowRight, Calendar } from 'lucide-react'

const categoryColors: Record<string, string> = {
  'AI & Testing': '#06B6D4',
  'Architecture': '#6366F1',
  'Automation': '#8B5CF6',
  'Performance': '#F59E0B',
  'Leadership': '#10B981',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function BlogSection() {
  return (
    <section id="blog" className="relative py-24 lg:py-32">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#06B6D4]" />
            <span className="text-[#06B6D4] text-xs font-semibold tracking-[0.2em] uppercase">Knowledge Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Thinking in Public
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--muted)' }}>
            Articles on AI-augmented testing, automation architecture, quality leadership, and engineering culture — written from real enterprise experience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => {
            const color = categoryColors[article.category] ?? '#6366F1'
            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col h-full rounded-2xl p-6 transition-all duration-300"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${color}40`
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px rgba(0,0,0,0.15), 0 0 0 1px ${color}20`
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  {/* Category + meta */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                    >
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                      <Clock size={11} />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                      <Calendar size={11} />
                      {formatDate(article.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-semibold text-base leading-snug mb-3 transition-colors"
                    style={{ color: 'var(--text)' }}
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--muted)' }}>
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {article.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all duration-200"
                    style={{ color }}
                  >
                    Read Article
                    <ArrowRight size={12} />
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
