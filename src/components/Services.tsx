'use client'

import { siteData } from '@/lib/site-data'
import { useEffect, useState } from 'react'

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="display-lg mb-6">Our Practice Areas</h2>
          <p className="lead max-w-3xl mx-auto text-muted">
            Comprehensive legal services tailored to your specific needs with precision and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.services.services.map((service, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer transition-all duration-500 ${
                hoveredIndex === index ? 'z-10' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Premium service card with Apple-like elevation */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                hoveredIndex === index ? 'opacity-100' : ''
              }`}></div>

              <div className={`relative bg-white border border-gray-100 rounded-3xl p-8 h-full transition-all duration-500 ${
                hoveredIndex === index
                  ? 'transform -translate-y-2 shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-primary/20'
                  : 'shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
              }`}>
                {/* Icon with hover effect */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 ${
                    hoveredIndex === index
                      ? 'bg-primary text-white transform scale-110'
                      : 'bg-gray-50 text-gray-700'
                  }`}>
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="display-md mb-4 leading-tight">{service.title}</h3>

                {/* Description */}
                <p className="body-strong mb-6 text-muted leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 transition-all duration-300"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        hoveredIndex === index ? 'bg-primary' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-primary transition-all duration-500 transform ${
                  hoveredIndex === index ? 'scale-x-100' : 'scale-x-0'
                }`}></div>
              </div>

              {/* Background decoration */}
              <div className={`absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl transition-opacity duration-500 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}></div>
              <div className={`absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-opacity duration-500 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gray-50 rounded-full">
            <span className="body-strong">Need help choosing the right service?</span>
            <button className="btn btn-primary">
              Consult with an Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}