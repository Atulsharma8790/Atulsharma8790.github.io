'use client'

import { motion } from 'framer-motion'
import { testimonials } from '../data/content'
import { Quote } from 'lucide-react'

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]" />
            <span className="text-[#F59E0B] text-xs font-semibold tracking-[0.2em] uppercase">Testimonials</span>
            <div className="h-px w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Colleagues Say</h2>
          <p className="text-[#7B8FA8] text-lg max-w-xl mx-auto">
            Perspectives from managers, clients, and engineers who have worked alongside Atul.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 flex flex-col gap-5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center">
                <Quote size={16} className="text-[#F59E0B]" />
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <footer className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-[#6B7F96] text-xs">{t.role} · {t.company}</div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <a
            href="https://linkedin.com/in/a2l"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#6366F1] hover:text-white text-sm font-medium transition-colors"
          >
            View all recommendations on LinkedIn →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
