'use client'

import { useState, useEffect } from 'react'
import { siteData } from '@/lib/site-data'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleIntersection = () => {
      const sections = ['home', 'services', 'about', 'testimonials']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offset = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= offset && scrollPosition < offset + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleIntersection)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleIntersection)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Main navigation */}
      <nav className={`nav transition-all duration-300 ${
        isScrolled ? 'shadow-lg backdrop-filter backdrop-blur-xl' : ''
      }`}>
        <div className="container nav-container">
          <div className="nav-left">
            <div className="nav-logo text-white">Law Firm</div>

            {/* Desktop navigation */}
            <div className="nav-links hidden md:flex">
              {siteData.navigation.primary.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href.replace('/', ''))}
                  className={`nav-link relative transition-colors ${
                    activeSection === link.href.replace('/', '') ? 'text-primary' : ''
                  }`}
                >
                  {link.label}
                  {activeSection === link.href.replace('/', '') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={() => scrollToSection('contact')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
              </svg>
              Contact
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12"></path>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 md:hidden">
          <div className="container h-full flex flex-col">
            <div className="flex justify-between items-center p-6">
              <div className="nav-logo text-white text-lg">Law Firm</div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {siteData.navigation.primary.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href.replace('/', ''))}
                  className={`text-2xl font-medium transition-colors ${
                    activeSection === link.href.replace('/', '') ? 'text-primary' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              <button
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary hover:bg-primary/90 rounded-full transition-colors"
                onClick={() => {
                  scrollToSection('contact')
                  setIsMenuOpen(false)
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
                </svg>
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-3">
          {siteData.navigation.primary.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href.replace('/', ''))}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === link.href.replace('/', '') ? 'bg-primary scale-125' : 'bg-gray-500'
              }`}
              title={link.label}
            ></button>
          ))}
        </div>
      </div>
    </>
  )
}