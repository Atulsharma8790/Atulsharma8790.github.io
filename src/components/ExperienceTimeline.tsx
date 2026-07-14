'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, Users, Calendar } from 'lucide-react'
import { experiences } from '../data/content'

export function ExperienceTimeline() {
  const [expanded, setExpanded] = useState<string | null>('epam')

  return (
    <section id="experience" className="relative py-24 lg:py-32">
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
            <div className="h-px w-8 bg-[#6366F1]" />
            <span className="text-[#6366F1] text-xs font-semibold tracking-[0.2em] uppercase">Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            15+ Years of Engineering Excellence
          </h2>
          <p className="text-[#7B8FA8] text-lg max-w-2xl">
            From founding automation practices at start-ups to leading QA verticals at global enterprises.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#6366F1]/60 via-[#6366F1]/20 to-transparent hidden sm:block" />

          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.4) }}
                className="relative sm:pl-14"
              >
                {/* Dot */}
                <div
                  className="absolute left-0 top-5 w-10 h-10 rounded-xl hidden sm:flex items-center justify-center text-white text-xs font-bold border border-white/[0.08] z-10"
                  style={{ background: `${exp.color}20`, boxShadow: `0 0 16px ${exp.color}30` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Card */}
                <div
                  className="rounded-2xl bg-[#12121E] border transition-all duration-300 overflow-hidden"
                  style={{
                    borderColor: expanded === exp.id ? `${exp.color}40` : 'rgba(255,255,255,0.07)',
                    boxShadow: expanded === exp.id ? `0 0 40px ${exp.color}10` : 'none',
                  }}
                >
                  {/* Card header — always visible */}
                  <button
                    onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                    className="w-full text-left p-6 flex items-start gap-4 group"
                    aria-expanded={expanded === exp.id}
                    aria-controls={`exp-body-${exp.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                          style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                        >
                          {exp.type}
                        </span>
                        <span className="text-[#6B7F96] text-xs flex items-center gap-1">
                          <Calendar size={11} />
                          {exp.duration}
                        </span>
                        {exp.teamSize && (
                          <span className="text-[#6B7F96] text-xs flex items-center gap-1">
                            <Users size={11} />
                            Team of {exp.teamSize}
                          </span>
                        )}
                        <span className="text-[#6B7F96] text-xs flex items-center gap-1">
                          <MapPin size={11} />
                          {exp.location}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold text-lg leading-tight">{exp.role}</h3>
                      <p className="text-[#94A3B8] text-sm mt-0.5 font-medium">{exp.company}</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className="text-[#6B7F96] flex-shrink-0 mt-1 transition-transform duration-300"
                      style={{ transform: expanded === exp.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  {/* Expanded body */}
                  <AnimatePresence initial={false}>
                    {expanded === exp.id && (
                      <motion.div
                        id={`exp-body-${exp.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 border-t border-white/[0.06]">
                          <div className="pt-5 grid sm:grid-cols-2 gap-6">
                            {/* Highlights */}
                            <div>
                              <p className="text-[#6B7F96] text-xs font-semibold uppercase tracking-wider mb-3">Key Responsibilities</p>
                              <ul className="space-y-2.5">
                                {exp.highlights.map((h, hi) => (
                                  <li key={hi} className="flex gap-2.5 text-sm text-[#94A3B8]">
                                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: exp.color }} />
                                    {h}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-5">
                              {/* Impact */}
                              {exp.impact.length > 0 && (
                                <div>
                                  <p className="text-[#6B7F96] text-xs font-semibold uppercase tracking-wider mb-3">Business Impact</p>
                                  <ul className="space-y-2">
                                    {exp.impact.map((imp, ii) => (
                                      <li
                                        key={ii}
                                        className="text-xs px-3 py-2 rounded-lg font-medium"
                                        style={{ background: `${exp.color}10`, color: exp.color, border: `1px solid ${exp.color}20` }}
                                      >
                                        ✓ {imp}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Stack */}
                              <div>
                                <p className="text-[#6B7F96] text-xs font-semibold uppercase tracking-wider mb-3">Tech Stack</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {exp.stack.map(tech => (
                                    <span
                                      key={tech}
                                      className="text-xs px-2 py-1 rounded-lg bg-[#0A0A0F] border border-white/[0.07] text-[#94A3B8]"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
