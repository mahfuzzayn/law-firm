'use client'

import { siteData } from '@/lib/site-data'
import { useEffect, useState } from 'react'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="display-lg mb-6">Our Firm</h2>
          <p className="lead max-w-3xl mx-auto text-muted">
            Founded in excellence, dedicated to your success with unwavering commitment and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className={`space-y-12 ${isVisible ? 'fade-in' : ''}`}>
            {/* Introduction */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-32 h-32 bg-primary/5 rounded-2xl blur-2xl"></div>
              <p className="lead-airy text-lg text-gray-700 leading-relaxed">
                {siteData.about.description}
              </p>
            </div>

            {/* Values */}
            <div>
              <h3 className="display-md mb-8">Our Core Values</h3>
              <div className="space-y-6">
                {siteData.about.values.map((value, index) => (
                  <div
                    key={index}
                    className={`relative group p-6 rounded-3xl transition-all duration-500 ${
                      hoveredValue === index
                        ? 'bg-gray-50 transform translate-x-2 shadow-lg border border-primary/10'
                        : 'bg-white border border-gray-100 hover:border-gray-200'
                    }`}
                    onMouseEnter={() => setHoveredValue(index)}
                    onMouseLeave={() => setHoveredValue(null)}
                  >
                    {/* Icon */}
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        hoveredValue === index
                          ? 'bg-primary text-white transform scale-110'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <span className="text-xl">{index === 0 ? '🎯' : index === 1 ? '💎' : index === 2 ? '❤️' : '🚀'}</span>
                      </div>

                      <div>
                        <h4 className="display-md mb-2">{value.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    </div>

                    {/* Hover accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-primary transition-all duration-500 ${
                      hoveredValue === index ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats sidebar */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200">
              <h3 className="display-md mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Founded</span>
                  <span className="body-strong">1995</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Attorneys</span>
                  <span className="body-strong">25+</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Offices</span>
                  <span className="body-strong">2</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">Awards</span>
                  <span className="body-strong">50+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual side */}
          <div className="relative">
            {/* Main visual */}
            <div className="relative">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-[3rem] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-8">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-[2rem] mb-6">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                          <path d="M2 17L12 22L22 17"></path>
                          <path d="M2 12L12 17L22 12"></path>
                        </svg>
                      </div>
                    </div>
                    <h2 className="display-md mb-4">28 Years of Excellence</h2>
                    <p className="text-gray-600">Building trust, delivering results</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/5 rounded-2xl blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/5 rounded-2xl blur-2xl"></div>

              {/* Quote overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-[3rem]">
                <blockquote className="text-white display-sm">
                  "Excellence is not an act, but a habit. We live by this principle in everything we do."
                </blockquote>
                <cite className="text-gray-300 text-sm mt-2 block">— The Founding Partners</cite>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-12 space-y-6">
              <h3 className="display-md">Milestones</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">95</span>
                  </div>
                  <div>
                    <h4 className="body-strong mb-1">Founded</h4>
                    <p className="text-sm text-gray-600">Established with a vision for exceptional legal services</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">10</span>
                  </div>
                  <div>
                    <h4 className="body-strong mb-1">Expansion</h4>
                    <p className="text-sm text-gray-600">Opened second office to serve more clients</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">5k</span>
                  </div>
                  <div>
                    <h4 className="body-strong mb-1">Clients Served</h4>
                    <p className="text-sm text-gray-600">Continuing to make a difference in the community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}