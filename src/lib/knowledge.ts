import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import {
  experiences,
  skillCategories,
  projects,
  openSourceProjects,
  certifications,
  education,
  about,
  hero,
  leadership,
  aiInnovation,
  contact,
  personal,
  testimonials,
  blogPosts,
} from '../data/content'
import { articles } from '../data/articles'

// ── Knowledge Notes ────────────────────────────────────────────────────────────
// Loaded at request-time so Atul can add answers without a redeploy.
// File: /data/knowledge-notes.json
interface KnowledgeNote {
  id: string
  topic: string
  answer: string
  addedAt: string
}

function loadKnowledgeNotes(): KnowledgeNote[] {
  try {
    const filePath = join(process.cwd(), 'data', 'knowledge-notes.json')
    if (!existsSync(filePath)) return []
    const raw = JSON.parse(readFileSync(filePath, 'utf-8'))
    return Array.isArray(raw.notes) ? raw.notes : []
  } catch {
    return []
  }
}

// ── Context builder ────────────────────────────────────────────────────────────

export function buildKnowledgeContext(visibleToolCount: number = openSourceProjects.length): string {
  const expText = experiences.map(e =>
    `Company: ${e.company}
Role: ${e.role}
Duration: ${e.duration}
Location: ${e.location}
Team Size: ${e.teamSize ?? 'N/A'}
Stack: ${e.stack.join(', ')}
Highlights:
${e.highlights.map(h => `- ${h}`).join('\n')}
Impact:
${e.impact.map(i => `- ${i}`).join('\n')}`
  ).join('\n\n---\n\n')

  const skillText = skillCategories.map(c =>
    `${c.label}: ${c.skills.map(s => s.name).join(', ')}`
  ).join('\n')

  const projectText = projects.map(p =>
    `Project: ${p.title}
Subtitle: ${p.subtitle}
Problem: ${p.problem}
Solution: ${p.solution}
Stack: ${p.stack.join(', ')}
Outcome: ${p.outcome}
Impact: ${p.impact.join(', ')}`
  ).join('\n\n---\n\n')

  const aiToolsText = openSourceProjects.map(p =>
    `Tool: ${p.title} [${p.status}]
Category: ${p.category}
Tagline: ${p.tagline}
Description: ${p.description}
Key Features: ${p.features.slice(0, 4).join(' | ')}
Stack: ${p.stack.join(', ')}
Demo: ${p.demo || 'Coming soon'}`
  ).join('\n\n---\n\n')

  const certText = certifications.map(c =>
    `${c.title} by ${c.provider} (${c.year})`
  ).join('\n')

  const eduText = education.map(e =>
    `${e.degree} from ${e.institution} (${e.duration})`
  ).join('\n')

  const aiText = aiInnovation.initiatives.map(i =>
    `${i.title} [${i.status}]: ${i.description}`
  ).join('\n')

  const leadershipText = leadership.capabilities.map(c =>
    `${c.title}: ${c.description}`
  ).join('\n')

  const testimonialText = testimonials.map(t =>
    `"${t.quote}" — ${t.name}, ${t.role} at ${t.company}`
  ).join('\n\n')

  const blogText = blogPosts.map(p =>
    `Article: ${p.title}\nExcerpt: ${p.excerpt}\nCategory: ${p.category}\nTags: ${p.tags.join(', ')}`
  ).join('\n\n---\n\n')

  const articleSummaries = articles.slice(0, 6).map(a =>
    `"${a.title}" (${a.category}, ${a.readTime}): ${a.excerpt}`
  ).join('\n')

  const knowledgeNotes = loadKnowledgeNotes()
  const notesText = knowledgeNotes.length > 0
    ? knowledgeNotes.map(n => `Topic: ${n.topic}\nAnswer: ${n.answer}`).join('\n\n---\n\n')
    : 'No additional notes yet.'

  return `
## ATUL SHARMA — COMPLETE KNOWLEDGE BASE

### Personal Information
Name: Atul Sharma
Location: Gurugram, India
Email: ${contact.email}
Phone: ${contact.phone}
LinkedIn: ${contact.linkedin}
GitHub: ${contact.github}
Calendly: ${contact.calendly}
Availability: ${contact.availability}

### Professional Summary
${hero.summary}

Key Statistics:
- 15+ years of experience in QA, automation, and quality engineering
- 50+ engineers mentored across career
- 5+ enterprise clients served
- 100,000+ tests automated across frameworks
- Led teams of 6–15 QA engineers across multiple organisations

### About / Philosophy
${about.story.join('\n\n')}

### Work Experience (Full Career History)
${expText}

### Technical Skills
${skillText}

### Enterprise Projects & Case Studies
${projectText}

### AI-Powered Tools (Personal Portfolio — ${visibleToolCount} live, all deployed)
${aiToolsText}

### AI & Innovation Work
${aiInnovation.description}

Initiatives:
${aiText}

Vision: ${aiInnovation.vision}

### Leadership & Mentoring
${leadership.description}

Capabilities:
${leadershipText}

### Certifications
${certText}

### Education
${eduText}

### What Others Say (Testimonials)
${testimonialText}

### Blog / Writing Topics
${blogText}

Published Articles:
${articleSummaries}

### Personal
Interests: ${personal.interests.join(', ')}
Languages: ${personal.languages.join(', ')}
Philosophy: ${personal.philosophy}

### Additional Knowledge Notes (Curated by Atul)
The following are specific questions and topics Atul has personally answered:
${notesText}
`
}

export function buildSystemPrompt(visibleToolCount?: number): string {
  const knowledge = buildKnowledgeContext(visibleToolCount)

  return `You are "Digital Atul" — the AI assistant on Atul Sharma's personal brand website. You help recruiters, hiring managers, clients, and fellow engineers learn about Atul quickly and naturally — like a knowledgeable colleague, not a Wikipedia article.

━━━ RESPONSE STYLE (most important) ━━━

KEEP IT SHORT AND CONVERSATIONAL. Every response must feel like a chat message, not a report.

- Maximum 3–4 lines of text OR 3–4 bullet points per response. Never both together.
- NO headers, NO markdown titles (##, ###, bold section names), NO horizontal rules (---).
- NO long lists. If there are 5+ items (e.g. listing all tools), name 2–3 highlights and offer to share more: "Want the full list?"
- Bullet points: max 3–4, each one SHORT (one line). No sub-bullets.
- Bold only a name or key term — not whole sentences.
- End with a natural follow-up offer when relevant: "Want to know more about any of these?" or "Happy to go deeper on any area."
- NEVER dump everything you know about a topic in one message. Answer the specific question asked, then invite a follow-up.

Examples of good responses:
  Q: "What does Atul do?"
  A: "Atul is a Quality Engineering Architect and AI Solutions Engineer with 15+ years of experience. He specialises in building enterprise automation frameworks, agentic AI workflows, and AI-powered engineering tools — currently at EPAM Systems as Quality Architect I. Want to hear about his work or his tech stack?"

  Q: "What tools has Atul built?"
  A: "Atul has built 16 AI-powered tools — all live and deployed. Highlights: QA Autopilot (CI failure triage), ReleaseGuard (GO/NO-GO release gate), GhostQA (bug hunter agent), QA MCP Server (15 tools via MCP), and more. Want details on any specific one?"

  Q: "What's his experience?"
  A: "15+ years across QA, automation, and AI engineering. He's worked at EPAM Systems, PepsiCo, Airtel, FITTR, and Nagarro — covering banking, FMCG, telecom, and health-tech. Want me to walk through his career timeline?"

━━━ ACCURACY RULES ━━━
1. Always speak in third person: "Atul has...", "He's worked at..." — never "I" or "my".
2. Answer ONLY from the knowledge base. No fabricating.
3. Partially confident → "Based on what I know about Atul..." then keep it short.
4. No information at all → "I don't have verified details on that — I've logged your question for Atul to review. You can also reach him directly at atulsharma8790@gmail.com"
5. For scheduling: https://calendly.com/a2l/30min
6. For resume: /Atul-Sharma.pdf
7. For LinkedIn: https://linkedin.com/in/a2l

KNOWLEDGE BASE:
${knowledge}`
}
