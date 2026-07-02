'use client'

import { siteData } from '@/lib/site-data'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="section section-hero bg-white">
      <div className="container min-h-[100vh] flex items-center">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${isVisible ? 'fade-in' : ''}`}>
          <div className="relative">
            {/* Decorative element */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="mb-6">
                <span className="tagline text-primary mb-2 inline-block">Premier Legal Services</span>
              </div>

              <h1 className="display-lg mb-8 leading-tight">
                Expert Legal Counsel
                <br />
                <span className="text-primary">When It Matters Most</span>
              </h1>

              <p className="lead mb-12 max-w-lg text-muted leading-relaxed">
                Delivering exceptional legal solutions with integrity and excellence. Trusted by businesses and individuals nationwide.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button className="btn btn-primary">
                  Schedule Consultation
                </button>
                <button className="btn btn-secondary-pill">
                  Learn More
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="body-strong">28 Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="body-strong">5000+ Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="body-strong">98% Success Rate</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Hero image with parallax effect */}
            <div
              className="relative w-full h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-[3rem] overflow-hidden"
              style={{
                transform: `translateX(${typeof window !== 'undefined' ? (mousePosition.x - window.innerWidth / 2) * 0.01 : 0}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* Abstract background pattern */}
              <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Central focal point */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                        <path d="M2 17L12 22L22 17"></path>
                        <path d="M2 12L12 17L22 12"></path>
                      </svg>
                    </div>
                  </div>
                  <h2 className="display-md mb-4 text-gray-800">Justice Delivered</h2>
                  <p className="lead text-gray-600 max-w-md mx-auto">
                    Professional legal representation with uncompromising excellence
                  </p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-10 right-10 w-12 h-12 bg-primary/5 rounded-xl blur-xl"></div>
              <div className="absolute bottom-20 left-10 w-16 h-16 bg-primary/5 rounded-2xl blur-2xl"></div>
            </div>

            {/* Shadow for depth */}
            <div className="absolute -bottom-8 left-8 right-8 h-32 bg-gradient-to-t from-black/10 to-transparent blur-3xl rounded-[2rem]"></div>
          </div>
        </div>
      </div>
    </section>
  )
}