'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { skillCategories } from '../data/content'

const iconSvg: Record<string, JSX.Element> = {
  Zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  Code2: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>,
  Brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>,
  TrendingUp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  GitBranch: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  Cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
  Server: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  Database: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id)
  const active = skillCategories.find(c => c.id === activeCategory) ?? skillCategories[0]

  return (
    <section id="skills" className="relative py-24 lg:py-32">
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
            <span className="text-[#6366F1] text-xs font-semibold tracking-[0.2em] uppercase">Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Deep Skills Across the Full QA Stack
          </h2>
          <p className="text-[#7B8FA8] text-lg max-w-2xl">
            From enterprise automation frameworks to AI-augmented testing pipelines.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Category tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {skillCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 flex-shrink-0 lg:flex-shrink"
                style={{
                  background: activeCategory === cat.id ? `${cat.color}15` : 'transparent',
                  border: `1px solid ${activeCategory === cat.id ? cat.color + '30' : 'rgba(255,255,255,0.06)'}`,
                  color: activeCategory === cat.id ? '#F1F5F9' : '#7B8FA8',
                }}
              >
                <span style={{ color: activeCategory === cat.id ? cat.color : '#6B7F96' }}>
                  {iconSvg[cat.icon]}
                </span>
                <span className="text-sm font-medium whitespace-nowrap">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Skill bars */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${active.color}18`, border: `1px solid ${active.color}30`, color: active.color }}>
                {iconSvg[active.icon]}
              </div>
              <div>
                <h3 className="text-white font-semibold">{active.label}</h3>
                <p className="text-[#6B7F96] text-xs">{active.skills.length} technologies</p>
              </div>
            </div>

            <div className="space-y-5">
              {active.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[#CBD5E1] text-sm font-medium">{skill.name}</span>
                    <span className="text-xs font-semibold" style={{ color: active.color }}>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: i * 0.06, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${active.color}, ${active.color}99)` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* All skills grid — flat view */}
        <div className="mt-12">
          <p className="text-[#6B7F96] text-xs font-semibold uppercase tracking-wider mb-5">All Technologies</p>
          <div className="flex flex-wrap gap-2">
            {skillCategories.flatMap(cat => cat.skills.map(s => ({ name: s.name, color: cat.color }))).map(item => (
              <span
                key={item.name}
                className="px-3 py-1.5 rounded-lg bg-[#12121E] border border-white/[0.07] text-[#94A3B8] text-xs font-medium hover:border-white/[0.15] hover:text-white transition-all duration-200"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
