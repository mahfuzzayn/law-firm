'use client'

import { siteData } from '@/lib/site-data'
import { useEffect, useState } from 'react'

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="section bg-black text-white">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="display-lg mb-6">Client Success Stories</h2>
          <p className="lead max-w-3xl mx-auto text-gray-300">
            Hear from businesses and individuals who have experienced our exceptional legal services.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="mb-20">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl blur-3xl"></div>

            <div className="relative bg-gray-900 rounded-3xl p-12 border border-gray-800">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Quote */}
                <div>
                  <div className="mb-8">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M4 10h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2z"></path>
                      <path d="M12 15l-4-4 4-4"></path>
                      <path d="M8 15l4-4 4-4"></path>
                    </svg>
                  </div>

                  <blockquote className="display-md mb-8 leading-tight">
                    "{siteData.testimonials.testimonials[activeIndex].content}"
                  </blockquote>

                  {/* Client info */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">👤</span>
                    </div>
                    <div>
                      <h4 className="display-md mb-1">{siteData.testimonials.testimonials[activeIndex].name}</h4>
                      <p className="text-gray-400 text-sm">{siteData.testimonials.testimonials[activeIndex].role}</p>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-primary/10 to-gray-800 rounded-[2rem] flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4 text-primary/20">⭐</div>
                          <p className="text-2xl font-semibold">Trust</p>
                          <p className="text-gray-400">Excellence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteData.testimonials.testimonials.filter((_, index) => index !== activeIndex).map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-primary/20 transition-all duration-300 cursor-pointer"
              onClick={() => setActiveIndex(siteData.testimonials.testimonials.findIndex(t => t.content === testimonial.content))}
            >
              <div className="mb-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed italic">
                  "{testimonial.content.substring(0, 100)}..."
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div>
                  <h4 className="body-strong mb-1">{testimonial.name}</h4>
                  <p className="caption text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-12">
          {siteData.testimonials.testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-primary w-8' : 'bg-gray-600 hover:bg-gray-400'
              }`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  )
}