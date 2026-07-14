'use client'

import { motion } from 'framer-motion'
import { Linkedin, Mail, Calendar } from 'lucide-react'

const highlights = [
  {
    metric: '15+',
    label: 'Years in Quality Engineering',
    detail: 'From manual testing foundations to architecting enterprise AI-augmented QA systems',
    color: '#6366F1',
  },
  {
    metric: '50+',
    label: 'Engineers Mentored',
    detail: 'Across EPAM, PepsiCo, Airtel, FITTR, Nagarro — from junior testers to senior architects',
    color: '#10B981',
  },
  {
    metric: '16+',
    label: 'AI Tools Shipped',
    detail: 'All live on Vercel — covering test generation, SDLC orchestration, MCP tooling, and more',
    color: '#06B6D4',
  },
  {
    metric: '100K+',
    label: 'Test Cases Automated',
    detail: 'Across Playwright, Selenium, RestAssured, XCUITest, JMeter — Web, API, Mobile & Performance',
    color: '#F59E0B',
  },
  {
    metric: '5+',
    label: 'Automation Frameworks Built from Zero',
    detail: 'Designed zero-to-one QA frameworks at multiple organisations — each modular and scalable',
    color: '#A855F7',
  },
  {
    metric: '3',
    label: 'QA Verticals Led End-to-End',
    detail: 'PepsiCo global B2B, Airtel digital channels, FITTR mobile — strategy, delivery, and governance',
    color: '#EF4444',
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
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
            <div className="h-px w-8 bg-[#F59E0B]" />
            <span className="text-[#F59E0B] text-xs font-semibold tracking-[0.2em] uppercase">Career Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Numbers that tell the story
          </h2>
          <p className="text-[#7B8FA8] text-lg max-w-2xl">
            15 years of consistent delivery, across industries, tech stacks, and team sizes.
          </p>
        </motion.div>

        {/* Highlights grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 hover:border-white/[0.12] transition-all duration-300 group"
            >
              <div
                className="text-4xl font-bold mb-2 bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${h.color}, ${h.color}99)` }}
              >
                {h.metric}
              </div>
              <div className="text-white font-semibold text-sm mb-2">{h.label}</div>
              <div className="text-[#7B8FA8] text-xs leading-relaxed">{h.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* Connect CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 sm:p-10 relative overflow-hidden text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.08) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#6366F1] opacity-[0.04] rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-white text-lg sm:text-xl font-medium mb-2">Want to hear what colleagues say?</p>
            <p className="text-[#7B8FA8] text-sm mb-8 max-w-lg mx-auto">
              I&apos;m always happy to connect directly. Reach out on LinkedIn or book a 30-minute call.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://linkedin.com/in/a2l"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium text-sm transition-all duration-200"
              >
                <Linkedin size={15} />
                Connect on LinkedIn
              </a>
              <a
                href="https://calendly.com/a2l/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium text-sm transition-all duration-200"
              >
                <Calendar size={15} />
                Book a 30-min Call
              </a>
              <a
                href="mailto:atulsharma8790@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[#94A3B8] hover:text-white font-medium text-sm transition-all duration-200"
              >
                <Mail size={15} />
                Send an Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
