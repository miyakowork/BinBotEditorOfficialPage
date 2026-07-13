import { CapabilitySections } from './components/CapabilitySections'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { MacSection } from './components/MacSection'
import { Navigation } from './components/Navigation'
import { PointerMotion } from './components/PointerMotion'
import { ProductDemo } from './components/ProductDemo'
import { Reveal } from './components/Reveal'
import { WorkflowStrip } from './components/WorkflowStrip'
import './styles.css'

export default function App() {
  return (
    <>
      <PointerMotion />
      <Navigation />
      <main>
        <Reveal><Hero /></Reveal>
        <ProductDemo />
        <Reveal><CapabilitySections /></Reveal>
        <Reveal><WorkflowStrip /></Reveal>
        <Reveal><MacSection /></Reveal>
        <Reveal><Faq /></Reveal>
      </main>
      <Footer />
    </>
  )
}
