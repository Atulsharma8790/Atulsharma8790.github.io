'use client'

import { motion } from 'framer-motion'
import { leadership } from '../data/content'

const metricIcons: Record<string, JSX.Element> = {
  Users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>,
  Briefcase: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Building: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22V12h6v10"/><path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/></svg>,
}

const metricColors = ['#6366F1', '#06B6D4', '#8B5CF6', '#F59E0B']

export function LeadershipSection() {
  return (
    <section id="leadership" className="relative py-24 lg:py-32">
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
            <span className="text-[#6366F1] text-xs font-semibold tracking-[0.2em] uppercase">Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {leadership.headline}
          </h2>
          <p className="text-[#7B8FA8] text-lg max-w-2xl">
            {leadership.description}
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {leadership.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 text-center group hover:border-white/[0.12] transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${metricColors[i]}15`, border: `1px solid ${metricColors[i]}30`, color: metricColors[i] }}
              >
                {metricIcons[metric.icon]}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-[#7B8FA8] text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Capabilities */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leadership.capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 hover:border-[#6366F1]/30 transition-all duration-300 group"
            >
              <div className="w-2 h-2 rounded-full bg-[#6366F1] mb-4 group-hover:shadow-[0_0_8px_#6366F1] transition-all" />
              <h3 className="text-white font-semibold text-base mb-2">{cap.title}</h3>
              <p className="text-[#7B8FA8] text-sm leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-[#7B8FA8] text-base mb-4">Interested in my leadership approach?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium text-sm transition-all duration-200 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
          >
            Let&apos;s Discuss Leadership Opportunities
          </a>
        </motion.div>
      </div>
    </section>
  )
}
