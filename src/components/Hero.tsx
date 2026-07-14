'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowRight, Sparkles } from 'lucide-react'
import { hero } from '../data/content'

const roles = [
  'Quality Engineering Architect',
  'AI Solutions Engineer',
  'Test Automation Leader',
  'AI-Driven Testing Innovator',
  'Enterprise Quality Strategist',
  'Engineering Mentor',
]

function useTypingAnimation(words: string[], speed = 80, pause = 2200) {
  const [display, setDisplay] = useState(words[0])
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(words[0].length)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    } else {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }

    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

export function Hero() {
  const typedRole = useTypingAnimation(roles)
  const [photoError, setPhotoError] = useState(false)

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-label="Introduction"
    >
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6366F1] opacity-[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#8B5CF6] opacity-[0.05] rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-[#06B6D4] opacity-[0.04] rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#A5B4FC] text-xs font-medium tracking-wider uppercase mb-6">
                <Sparkles size={12} className="text-[#6366F1]" />
                Available for Senior Roles & Consulting
              </div>

              {/* Name */}
              <p className="text-[#94A3B8] text-sm font-medium tracking-[0.2em] uppercase mb-3">
                {hero.name}
              </p>

              {/* Dynamic title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                  {typedRole}
                </span>
                <span className="inline-block w-0.5 h-[0.85em] bg-[#6366F1] ml-1 animate-pulse align-middle" />
              </h1>

              {/* Tagline */}
              <p className="text-[#94A3B8] text-lg leading-relaxed mb-8 max-w-xl">
                {hero.tagline}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 mb-10">
                {hero.stats.map(stat => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-[#7B8FA8] mt-0.5 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="/Atul-Sharma.pdf"
                  download
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium text-sm transition-all duration-200 shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]"
                >
                  <Download size={16} />
                  Download Resume
                </a>
                <a
                  href="#experience"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] text-white font-medium text-sm transition-all duration-200"
                >
                  Explore Experience
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-[#94A3B8] hover:text-white font-medium text-sm transition-all duration-200"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — Visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            {/* Profile card */}
            <div className="relative rounded-3xl bg-[#12121E] border border-white/[0.08] p-8 overflow-hidden">
              {/* Card glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#6366F1] opacity-[0.07] rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#06B6D4] opacity-[0.06] rounded-full blur-2xl" />

              {/* Profile area */}
              <div className="relative flex items-start gap-5 mb-8">
                {!photoError ? (
                  <div className="relative group flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.4)] border border-white/10 cursor-pointer">
                      <img
                        src="/assets/atul-sharma-photo.jpg"
                        alt="Atul Sharma"
                        className="w-full h-full object-cover object-top"
                        onError={() => setPhotoError(true)}
                      />
                    </div>
                    {/* Enlarged hover preview */}
                    <div className="absolute left-0 top-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 origin-top-left">
                      <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-white/20">
                        <img
                          src="/assets/atul-sharma-photo.jpg"
                          alt="Atul Sharma"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_30px_rgba(99,102,241,0.4)] flex-shrink-0">
                    AS
                  </div>
                )}
                <div>
                  <h2 className="text-white font-semibold text-lg">Atul Sharma</h2>
                  <p className="text-[#6366F1] text-sm font-medium">Quality Engineering Architect</p>
                  <p className="text-[#7B8FA8] text-xs mt-1">Gurugram, India · Open to Remote</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs font-medium">Available</span>
                </div>
              </div>

              {/* Expertise chips */}
              <div className="mb-6">
                <p className="text-[#6B7F96] text-xs font-medium uppercase tracking-wider mb-3">Core Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {['Automation Architecture', 'AI Solutions Engineering', 'Quality Leadership', 'MCP & Agentic AI', 'Performance Eng.', 'Mobile QA'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-[#1E1E2E] border border-white/[0.07] text-[#94A3B8] text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats mini */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: '15+', label: 'Years' },
                  { val: '50+', label: 'Mentored' },
                  { val: '5+', label: 'Enterprises' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl bg-[#0A0A0F] border border-white/[0.06] p-3 text-center">
                    <div className="text-xl font-bold text-white">{s.val}</div>
                    <div className="text-[#6B7F96] text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Current role badge */}
              <div className="mt-4 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 p-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
                <div>
                  <span className="text-[#A5B4FC] text-xs font-semibold">Currently at EPAM Systems</span>
                  <p className="text-[#7B8FA8] text-xs">Quality Architect I · March 2024–Present</p>
                </div>
              </div>
            </div>

            {/* Floating decoration */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 px-3 py-2 rounded-xl bg-[#12121E] border border-white/[0.08] shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-xs text-[#94A3B8] font-medium">AI-powered QA</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl bg-[#12121E] border border-white/[0.08] shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
                </div>
                <span className="text-xs text-[#94A3B8] font-medium">100K+ tests automated</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#6B7F96] text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#6366F1] to-transparent"
        />
      </motion.div>
    </section>
  )
}
