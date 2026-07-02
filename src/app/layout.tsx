import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { siteMeta } from '../data/content'
import { ThemeProvider } from '../lib/theme'

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: siteMeta.title,
    template: `%s | Atul Sharma`,
  },
  description: siteMeta.description,
  metadataBase: new URL(siteMeta.url),
  keywords: [
    'QA Automation Architect',
    'Quality Engineering Leader',
    'Selenium',
    'Appium',
    'Test Automation',
    'AI Testing',
    'Performance Testing',
    'Atul Sharma',
    'SDET',
    'Test Architect',
    'Engineering Leader India',
  ],
  authors: [{ name: 'Atul Sharma', url: siteMeta.url }],
  creator: 'Atul Sharma',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteMeta.url,
    title: siteMeta.title,
    description: siteMeta.description,
    siteName: 'Atul Sharma — QA Automation Architect',
    images: [{ url: siteMeta.image, width: 1200, height: 630, alt: 'Atul Sharma — QA Automation Architect' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMeta.title,
    description: siteMeta.description,
    images: [siteMeta.image],
    creator: siteMeta.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: siteMeta.url,
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Atul Sharma',
  jobTitle: 'QA Automation Architect',
  description: siteMeta.description,
  url: siteMeta.url,
  sameAs: [
    'https://linkedin.com/in/a2l',
    'https://github.com/atulsharma8790',
  ],
  knowsAbout: [
    'Test Automation',
    'Quality Engineering',
    'Software Architecture',
    'AI Testing',
    'Performance Testing',
    'DevOps',
    'Team Leadership',
  ],
  alumniOf: [
    { '@type': 'EducationalOrganization', name: 'Guru Gobind Singh Indraprastha University' },
    { '@type': 'EducationalOrganization', name: 'University of Delhi' },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'EPAM Systems',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||((window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
