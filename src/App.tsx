import { Faq } from './components/Faq'
import { FeatureSections } from './components/FeatureSections'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navigation } from './components/Navigation'
import { ProductDemo } from './components/ProductDemo'
import './styles.css'

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProductDemo />
        <FeatureSections />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
