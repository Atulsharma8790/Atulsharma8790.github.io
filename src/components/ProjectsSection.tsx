'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Layers, Github, ExternalLink, Construction } from 'lucide-react'
import { projects, openSourceProjects } from '../data/content'

const caseStudyColors: Record<string, string> = {
  Architecture: '#6366F1',
  'AI & Innovation': '#06B6D4',
  Mobile: '#8B5CF6',
  Performance: '#F59E0B',
}

type Tab = 'case-studies' | 'open-source'

const DESCRIPTION_LIMIT = 160  // chars before "Show more"
const FEATURES_LIMIT    = 3    // bullets before "Show more"

export function ProjectsSection() {
  const [tab, setTab]       = useState<Tab>('case-studies')
  const [expanded, setExpanded] = useState<string | null>('enterprise-automation-platform')
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
  const [customOrder, setCustomOrder] = useState<string[]>([])
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const toggleCard = (id: string) =>
    setExpandedCards(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })

  useEffect(() => {
    fetch('/api/projects/visibility')
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d.hidden)) setHiddenIds(new Set(d.hidden))
        if (Array.isArray(d.order) && d.order.length > 0) setCustomOrder(d.order)
      })
      .catch(() => {})
  }, [])

  const orderedProjects = customOrder.length > 0
    ? [...customOrder.map(id => openSourceProjects.find(p => p.id === id)).filter(Boolean) as typeof openSourceProjects,
       ...openSourceProjects.filter(p => !customOrder.includes(p.id))]
    : openSourceProjects

  const visibleOpenSource = orderedProjects.filter(p => !hiddenIds.has(p.id))

  return (
    <section id="projects" className="relative py-24 lg:py-32">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#6366F1]" />
            <span className="text-[#6366F1] text-xs font-semibold tracking-[0.2em] uppercase">Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Real Problems. Engineered Solutions.
          </h2>
          <p className="text-[#7B8FA8] text-lg max-w-2xl">
            Enterprise case studies from real engagements, alongside open-source tools built to solve actual QA problems.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-10 p-1 rounded-xl bg-[#12121E] border border-white/[0.07] w-fit">
          {[
            { id: 'case-studies' as Tab, label: 'Enterprise Case Studies' },
            { id: 'open-source' as Tab, label: `Open Source Tools (${visibleOpenSource.length})` },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: tab === t.id ? '#6366F1' : 'transparent',
                color: tab === t.id ? '#fff' : '#7B8FA8',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'case-studies' && (
            <motion.div
              key="case-studies"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {/* Featured projects */}
              <div className="space-y-4 mb-8">
                {projects.filter(p => p.featured).map((project, i) => {
                  const color = caseStudyColors[project.category] ?? '#6366F1'
                  const isOpen = expanded === project.id
                  return (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="rounded-2xl bg-[#12121E] overflow-hidden transition-all duration-300"
                      style={{ border: `1px solid ${isOpen ? color + '40' : 'rgba(255,255,255,0.07)'}` }}
                    >
                      <button
                        className="w-full text-left p-6 flex items-start gap-4"
                        onClick={() => setExpanded(isOpen ? null : project.id)}
                        aria-expanded={isOpen}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span
                              className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                              style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                            >
                              {project.category}
                            </span>
                            <span className="text-[#6B7F96] text-xs">{project.subtitle}</span>
                            {project.featured && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
                                Featured
                              </span>
                            )}
                          </div>
                          <h3 className="text-white font-bold text-xl sm:text-2xl">{project.title}</h3>
                          <p className="text-[#7B8FA8] text-sm mt-2 line-clamp-2">{project.problem}</p>
                        </div>
                        <ChevronDown
                          size={20}
                          className="text-[#6B7F96] flex-shrink-0 mt-1 transition-transform duration-300"
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 border-t border-white/[0.06]">
                              <div className="pt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7F96] mb-2">The Problem</p>
                                  <p className="text-[#94A3B8] text-sm leading-relaxed">{project.problem}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7F96] mb-2">The Architecture</p>
                                  <p className="text-[#94A3B8] text-sm leading-relaxed">{project.solution}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7F96] mb-2">Business Outcome</p>
                                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">{project.outcome}</p>
                                  <div className="space-y-1.5">
                                    {project.impact.map(imp => (
                                      <div key={imp} className="text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-2" style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}>
                                        <span>✓</span> {imp}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-6 flex flex-wrap gap-1.5">
                                <span className="text-[#6B7F96] text-xs font-medium mr-2 self-center">Stack:</span>
                                {project.stack.map(t => (
                                  <span key={t} className="text-xs px-2 py-1 rounded-lg bg-[#0A0A0F] border border-white/[0.07] text-[#94A3B8]">{t}</span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  )
                })}
              </div>

              {/* Other case studies grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {projects.filter(p => !p.featured).map((project, i) => {
                  const color = caseStudyColors[project.category] ?? '#6366F1'
                  return (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 hover:border-white/[0.12] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                          {project.category}
                        </span>
                        <Layers size={16} className="text-[#6B7F96]" />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-[#6B7F96] text-xs mb-2">{project.subtitle}</p>
                      <p className="text-[#7B8FA8] text-sm leading-relaxed mb-4">{project.problem}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 4).map(t => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[#0A0A0F] border border-white/[0.07] text-[#7B8FA8]">{t}</span>
                        ))}
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </motion.div>
          )}

          {tab === 'open-source' && (
            <motion.div
              key="open-source"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {visibleOpenSource.map((project, i) => {
                const isCardExpanded = expandedCards.has(project.id)
                const descTruncated  = project.description.length > DESCRIPTION_LIMIT && !isCardExpanded
                const displayDesc    = descTruncated ? project.description.slice(0, DESCRIPTION_LIMIT).trimEnd() + '…' : project.description
                const displayFeatures = isCardExpanded ? project.features : project.features.slice(0, FEATURES_LIMIT)
                const hiddenFeatures  = project.features.length - FEATURES_LIMIT

                return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 flex flex-col hover:border-white/[0.14] transition-all duration-300"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
                    >
                      {project.category}
                    </div>
                    {project.status === 'live' ? (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400 text-xs font-medium">Live</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                        <Construction size={10} className="text-[#F59E0B]" />
                        <span className="text-[#F59E0B] text-xs font-medium">Building</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-white font-bold text-base mb-1">{project.title}</h3>
                  <p className="text-xs font-medium mb-3" style={{ color: project.color }}>{project.tagline}</p>

                  {/* Description with Show more/less */}
                  <p className="text-[#7B8FA8] text-sm leading-relaxed mb-1">{displayDesc}</p>
                  {project.description.length > DESCRIPTION_LIMIT && (
                    <button
                      onClick={() => toggleCard(project.id)}
                      className="text-xs mb-3 text-left transition-colors"
                      style={{ color: project.color }}
                    >
                      {isCardExpanded ? '↑ Show less' : '↓ Show more'}
                    </button>
                  )}

                  {/* Features */}
                  <ul className="space-y-1 mb-4 mt-1">
                    {displayFeatures.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                        <span className="mt-0.5 flex-shrink-0" style={{ color: project.color }}>›</span>
                        {f}
                      </li>
                    ))}
                    {!isCardExpanded && hiddenFeatures > 0 && (
                      <li>
                        <button
                          onClick={() => toggleCard(project.id)}
                          className="text-xs pl-4 transition-colors hover:text-white"
                          style={{ color: project.color }}
                        >
                          +{hiddenFeatures} more features ↓
                        </button>
                      </li>
                    )}
                  </ul>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1 mb-5 mt-auto">
                    {project.stack.slice(0, 4).map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-[#0A0A0F] border border-white/[0.07] text-[#7B8FA8]">{t}</span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#0A0A0F] border border-white/[0.07] text-[#6B7F96]">+{project.stack.length - 4}</span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] hover:text-white transition-colors"
                      >
                        <Github size={13} />
                        GitHub
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-[#6B7F96]">
                        <Github size={13} />
                        Coming soon
                      </span>
                    )}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold transition-colors ml-auto px-3 py-1.5 rounded-lg"
                        style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}35` }}
                      >
                        {project.demo.startsWith('http://localhost') ? '🖥 Open Locally' : '🚀 Live Demo'}
                        <ExternalLink size={11} />
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-[#6B7F96] ml-auto">
                        🔨 Coming soon
                      </span>
                    )}
                  </div>
                </motion.article>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
