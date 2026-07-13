import { CapabilitySections } from './components/CapabilitySections'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { MacSection } from './components/MacSection'
import { Navigation } from './components/Navigation'
import { ProductDemo } from './components/ProductDemo'
import { WorkflowStrip } from './components/WorkflowStrip'
import './styles.css'

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProductDemo />
        <CapabilitySections />
        <WorkflowStrip />
        <MacSection />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
