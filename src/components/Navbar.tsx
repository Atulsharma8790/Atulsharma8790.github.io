'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Sun, Moon } from 'lucide-react'
import { navigation, siteMeta } from '../data/content'
import { cn } from '../lib/utils'
import { useTheme } from '../lib/theme'

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navigation.map(n => n.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? theme === 'light'
              ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.08)]'
              : 'bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.15)]'
            : 'bg-transparent'
        )}
      >
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5 group" aria-label="Atul Sharma">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all duration-300">
              AS
            </div>
            <span className={cn('font-semibold hidden sm:block text-sm tracking-wide', theme === 'light' ? 'text-[#0F172A]' : 'text-white/90')}>
              Atul Sharma
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {navigation.slice(0, 7).map(item => {
              const id = item.href.replace('#', '')
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm transition-all duration-200 font-medium',
                    activeSection === id
                      ? 'text-[color:var(--text)] bg-[color:var(--border)]'
                      : 'text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--border)]'
                  )}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.05 }}
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]"
              style={{
                background: theme === 'dark' ? 'rgba(99,102,241,0.12)' : 'rgba(79,70,229,0.08)',
                border: '1px solid rgba(99,102,241,0.25)',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="moon"
                    initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center text-[#94A3B8]"
                  >
                    <Moon size={15} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="sun"
                    initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center text-yellow-500"
                  >
                    <Sun size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <a
              href={siteMeta.resumeUrl}
              download
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-medium transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              <Download size={14} />
              Resume
            </a>
            <button
              className="lg:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-all"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 backdrop-blur-xl border-b lg:hidden themed-bg"
          >
            <nav className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navigation.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.06] text-sm font-medium transition-all"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={siteMeta.resumeUrl}
                download
                className="mt-2 flex items-center gap-1.5 px-4 py-3 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-medium transition-all"
              >
                <Download size={14} />
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
