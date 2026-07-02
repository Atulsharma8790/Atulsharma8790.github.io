import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'data')
const QUESTIONS_FILE = join(DATA_DIR, 'unanswered-questions.json')
const ANALYTICS_FILE = join(DATA_DIR, 'chat-analytics.json')

export interface UnansweredQuestion {
  id: string
  question: string
  sessionId: string
  timestamp: string
  category: string
  status: 'pending' | 'answered' | 'dismissed'
  answer?: string
}

export interface ChatAnalytics {
  totalQuestions: number
  topQuestions: { question: string; count: number }[]
  categories: { category: string; count: number }[]
}

function ensureDataDir() {
  const fs = require('fs')
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

export function saveUnansweredQuestion(question: UnansweredQuestion) {
  try {
    ensureDataDir()
    const existing = loadUnansweredQuestions()
    existing.push(question)
    writeFileSync(QUESTIONS_FILE, JSON.stringify(existing, null, 2))
  } catch {}
}

export function loadUnansweredQuestions(): UnansweredQuestion[] {
  try {
    if (!existsSync(QUESTIONS_FILE)) return []
    return JSON.parse(readFileSync(QUESTIONS_FILE, 'utf-8'))
  } catch {
    return []
  }
}

export function updateQuestionStatus(id: string, status: UnansweredQuestion['status'], answer?: string) {
  try {
    const questions = loadUnansweredQuestions()
    const idx = questions.findIndex(q => q.id === id)
    if (idx !== -1) {
      questions[idx].status = status
      if (answer) questions[idx].answer = answer
      writeFileSync(QUESTIONS_FILE, JSON.stringify(questions, null, 2))
    }
  } catch {}
}

export function trackAnalytics(question: string, category: string) {
  try {
    ensureDataDir()
    let analytics: ChatAnalytics = { totalQuestions: 0, topQuestions: [], categories: [] }

    if (existsSync(ANALYTICS_FILE)) {
      analytics = JSON.parse(readFileSync(ANALYTICS_FILE, 'utf-8'))
    }

    analytics.totalQuestions++

    const existing = analytics.topQuestions.find(q => q.question === question)
    if (existing) {
      existing.count++
    } else {
      analytics.topQuestions.push({ question, count: 1 })
    }
    analytics.topQuestions.sort((a, b) => b.count - a.count)
    analytics.topQuestions = analytics.topQuestions.slice(0, 50)

    const catExisting = analytics.categories.find(c => c.category === category)
    if (catExisting) {
      catExisting.count++
    } else {
      analytics.categories.push({ category, count: 1 })
    }

    writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics, null, 2))
  } catch {}
}

export function categoriseQuestion(question: string): string {
  const q = question.toLowerCase()
  if (q.includes('skill') || q.includes('technolog') || q.includes('framework') || q.includes('tool')) return 'Skills & Tech'
  if (q.includes('experience') || q.includes('company') || q.includes('work') || q.includes('role')) return 'Experience'
  if (q.includes('project') || q.includes('case study') || q.includes('built') || q.includes('created')) return 'Projects'
  if (q.includes('ai') || q.includes('llm') || q.includes('machine learning') || q.includes('automation ai')) return 'AI Innovation'
  if (q.includes('certif') || q.includes('education') || q.includes('degree') || q.includes('course')) return 'Credentials'
  if (q.includes('contact') || q.includes('hire') || q.includes('available') || q.includes('reach')) return 'Contact & Hiring'
  if (q.includes('leader') || q.includes('team') || q.includes('mentor') || q.includes('manag')) return 'Leadership'
  if (q.includes('hobby') || q.includes('interest') || q.includes('personal') || q.includes('outside')) return 'Personal'
  return 'General'
}
