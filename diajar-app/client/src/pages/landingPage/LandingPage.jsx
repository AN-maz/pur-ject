import Navbar from '../../components/landing-page/Navbar.jsx'
import Hero from '../../components/landing-page/Hero.jsx'
import Features from '../../components/landing-page/Features.jsx'
import Why from '../../components/landing-page/Why.jsx'
import OurTeam from '../../components/landing-page/Our-team.jsx'
import ReadyToAction from '../../components/landing-page/ReadyToAction.jsx'
import Footer from '../../components/landing-page/Footer.jsx'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Why />
        <OurTeam />
        <ReadyToAction />
      </main>
      <Footer />
    </div>
  )
}