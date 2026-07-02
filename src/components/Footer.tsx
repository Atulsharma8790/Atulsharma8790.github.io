'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react'
import { contact, navigation } from '../data/content'

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0A0A0F]">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm">
                AS
              </div>
              <span className="font-semibold text-white">Atul Sharma</span>
            </div>
            <p className="text-[#7B8FA8] text-sm leading-relaxed max-w-sm mb-5">
              QA Automation Architect · Quality Engineering Leader · AI-Driven Testing Innovator. Building the future of quality engineering, one intelligent framework at a time.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-[#12121E] border border-white/[0.07] flex items-center justify-center text-[#7B8FA8] hover:text-white hover:border-white/[0.15] transition-all"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-[#12121E] border border-white/[0.07] flex items-center justify-center text-[#7B8FA8] hover:text-white hover:border-white/[0.15] transition-all"
              >
                <Github size={15} />
              </a>
              <a
                href={`mailto:${contact.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-xl bg-[#12121E] border border-white/[0.07] flex items-center justify-center text-[#7B8FA8] hover:text-white hover:border-white/[0.15] transition-all"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Navigation</p>
            <ul className="space-y-2">
              {navigation.slice(0, 6).map(item => (
                <li key={item.href}>
                  <a href={item.href} className="text-[#7B8FA8] text-sm hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Get In Touch</p>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${contact.email}`} className="text-[#7B8FA8] text-sm hover:text-white transition-colors break-all">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.calendly} target="_blank" rel="noopener noreferrer" className="text-[#7B8FA8] text-sm hover:text-white transition-colors">
                  Schedule a Call
                </a>
              </li>
              <li>
                <a href="/Atul-Sharma.pdf" download className="text-[#6366F1] text-sm hover:text-white transition-colors font-medium">
                  Download Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6B7F96] text-xs">
            © {new Date().getFullYear()} Atul Sharma. All rights reserved. Built with Next.js, Tailwind CSS & Framer Motion.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[#6B7F96] text-xs">Available for opportunities</span>
            </div>
            <a
              href="#home"
              aria-label="Back to top"
              className="w-8 h-8 rounded-lg bg-[#12121E] border border-white/[0.07] flex items-center justify-center text-[#7B8FA8] hover:text-white hover:border-white/[0.15] transition-all"
            >
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
