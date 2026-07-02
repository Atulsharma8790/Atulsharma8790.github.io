'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 10 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-200"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border-strong)',
            color: 'var(--muted)',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.15)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.4)'
            ;(e.currentTarget as HTMLElement).style.color = '#6366F1'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--card)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'
            ;(e.currentTarget as HTMLElement).style.color = 'var(--muted)'
          }}
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
