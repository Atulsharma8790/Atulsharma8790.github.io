'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Award } from 'lucide-react'
import { certifications, education } from '../data/content'

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-24 lg:py-32">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#6366F1]" />
            <span className="text-[#6366F1] text-xs font-semibold tracking-[0.2em] uppercase">Certifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Verified Credentials</h2>
          <p className="text-[#7B8FA8] text-lg max-w-2xl">
            Professional certifications validating expertise across testing, DevOps, and cloud.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {certifications.map((cert, i) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 hover:border-white/[0.12] transition-all duration-300 group relative overflow-hidden"
            >
              {(cert.inProgress || (cert as any).comingSoon) && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-xs font-medium">
                  In Progress
                </div>
              )}

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30`, color: cert.color }}
              >
                <Award size={20} />
              </div>

              <p className="text-[#6B7F96] text-xs font-medium mb-2">{cert.provider} · {cert.year}</p>
              <h3 className="text-white font-semibold text-sm leading-snug mb-3">{cert.title}</h3>
              <p className="text-[#7B8FA8] text-xs leading-relaxed mb-5">{cert.description}</p>

              {!cert.inProgress && !(cert as any).comingSoon && cert.credentialUrl !== '#' && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
                  style={{ color: cert.color }}
                >
                  View Credential
                  <ExternalLink size={11} />
                </a>
              )}
            </motion.article>
          ))}
        </div>

        {/* Education */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#8B5CF6]" />
              <span className="text-[#8B5CF6] text-xs font-semibold tracking-[0.2em] uppercase">Education</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Academic Foundation</h2>
          </motion.div>

          <div className="space-y-4">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-[#12121E] border border-white/[0.07] p-6 hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="flex flex-wrap items-start gap-4 justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20">
                        {edu.duration}
                      </span>
                      {edu.grade && (
                        <span className="text-xs text-[#6B7F96]">{edu.grade}</span>
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-[#94A3B8] text-sm mt-1">{edu.institution}</p>
                    <p className="text-[#6B7F96] text-xs mt-0.5">{edu.location}</p>
                  </div>
                </div>
                {edu.highlight && (
                  <p className="text-[#7B8FA8] text-sm leading-relaxed mt-4 pl-0 border-l-2 border-[#8B5CF6]/30 pl-4">
                    {edu.highlight}
                  </p>
                )}
                {edu.subjects.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {edu.subjects.slice(0, 5).map(s => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-lg bg-[#0A0A0F] border border-white/[0.06] text-[#7B8FA8]">{s}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
