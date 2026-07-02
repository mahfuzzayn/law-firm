import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Stats from '@/components/Stats'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Services />
        <About />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}