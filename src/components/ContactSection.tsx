'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Download, Calendar, Send, CheckCircle2 } from 'lucide-react'
import { contact } from '../data/content'

const iconMap: Record<string, JSX.Element> = {
  Calendar: <Calendar size={16} />,
  Linkedin: <Linkedin size={16} />,
  Mail: <Mail size={16} />,
  Download: <Download size={16} />,
}

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
    setTimeout(() => {
      setStatus('idle')
      setForm({ name: '', email: '', company: '', message: '' })
    }, 4000)
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#6366F1]" />
            <span className="text-[#6366F1] text-xs font-semibold tracking-[0.2em] uppercase">Contact</span>
            <div className="h-px w-8 bg-[#6366F1]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {contact.headline}
          </h2>
          <p className="text-[#7B8FA8] text-lg max-w-xl mx-auto">
            {contact.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Availability */}
            <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Available for opportunities</span>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{contact.availability}</p>
              <p className="text-[#6B7F96] text-xs mt-2">{contact.responseTime}</p>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 gap-3">
              {contact.channels.map(ch => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  download={ch.icon === 'Download' ? true : undefined}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    ch.primary
                      ? 'bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                      : 'bg-[#12121E] border border-white/[0.07] text-[#94A3B8] hover:text-white hover:border-white/[0.15]'
                  }`}
                >
                  {iconMap[ch.icon]}
                  {ch.label}
                </a>
              ))}
            </div>

            {/* Contact details */}
            <div className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[#6366F1] flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="text-[#94A3B8] text-sm hover:text-white transition-colors">{contact.email}</a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin size={15} className="text-[#6366F1] flex-shrink-0" />
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] text-sm hover:text-white transition-colors">linkedin.com/in/a2l</a>
              </div>
              <div className="flex items-center gap-3">
                <Github size={15} className="text-[#6366F1] flex-shrink-0" />
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] text-sm hover:text-white transition-colors">github.com/atulsharma8790</a>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 sm:p-8 space-y-5"
              aria-label="Contact form"
            >
              <h3 className="text-white font-semibold text-lg">Send a Message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[#94A3B8] text-xs font-medium mb-1.5">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0F] border border-white/[0.08] text-white text-sm placeholder-[#6B7F96] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#94A3B8] text-xs font-medium mb-1.5">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0F] border border-white/[0.08] text-white text-sm placeholder-[#6B7F96] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-[#94A3B8] text-xs font-medium mb-1.5">Company / Organisation</label>
                <input
                  id="company"
                  type="text"
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0F] border border-white/[0.08] text-white text-sm placeholder-[#6B7F96] focus:outline-none focus:border-[#6366F1]/50 transition-colors"
                  placeholder="Company name (optional)"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#94A3B8] text-xs font-medium mb-1.5">Message *</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0F] border border-white/[0.08] text-white text-sm placeholder-[#6B7F96] focus:outline-none focus:border-[#6366F1]/50 transition-colors resize-none"
                  placeholder="Tell me about the opportunity, project, or question..."
                />
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-70 text-white font-medium text-sm transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
              >
                {status === 'sent' ? (
                  <><CheckCircle2 size={16} /> Message Sent!</>
                ) : status === 'sending' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>

              <p className="text-[#6B7F96] text-xs text-center">
                Or{' '}
                <a href={contact.calendly} target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">
                  schedule a call directly on Calendly
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
