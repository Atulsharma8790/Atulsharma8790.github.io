import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { ExperienceTimeline } from '../components/ExperienceTimeline'
import { SkillsSection } from '../components/SkillsSection'
import { ProjectsSection } from '../components/ProjectsSection'
import { AIInnovationSection } from '../components/AIInnovationSection'
import { LeadershipSection } from '../components/LeadershipSection'
import { CertificationsSection } from '../components/CertificationsSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { BlogSection } from '../components/BlogSection'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'
import { ChatBot } from '../components/ChatBot'
import { ScrollToTop } from '../components/ScrollToTop'

export default function Home() {
  return (
    <div className="min-h-screen themed-bg">
      <Navbar />
      <main>
        <Hero />
        <div className="border-t border-white/[0.05]">
          <About />
        </div>
        <div className="border-t border-white/[0.05]">
          <ExperienceTimeline />
        </div>
        <div className="border-t border-white/[0.05]">
          <SkillsSection />
        </div>
        <div className="border-t border-white/[0.05]">
          <ProjectsSection />
        </div>
        <div className="border-t border-white/[0.05]">
          <AIInnovationSection />
        </div>
        <div className="border-t border-white/[0.05]">
          <LeadershipSection />
        </div>
        <div className="border-t border-white/[0.05]">
          <CertificationsSection />
        </div>
        <div className="border-t border-white/[0.05]">
          <TestimonialsSection />
        </div>
        <div className="border-t border-white/[0.05]">
          <BlogSection />
        </div>
        <div className="border-t border-white/[0.05]">
          <ContactSection />
        </div>
      </main>
      <Footer />
      <ChatBot />
      <ScrollToTop />
    </div>
  )
}
