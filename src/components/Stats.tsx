'use client'

import { siteData } from '@/lib/site-data'
import { useEffect, useState } from 'react'

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(siteData.stats.map(() => 0))

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            animateValue(index, 0, parseInt(siteData.stats[index].value.replace('+', '')), 2000)
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('[data-index]').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const animateValue = (index: number, start: number, end: number, duration: number) => {
    const startTime = performance.now()

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const current = Math.floor(progress * (end - start) + start)
      setAnimatedStats(prev => {
        const newStats = [...prev]
        newStats[index] = current
        return newStats
      })

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }

  return (
    <section className="section bg-black text-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="display-lg mb-6">Our Impact</h2>
          <p className="lead text-gray-300 max-w-2xl mx-auto">
            Numbers that speak to our commitment to excellence and client success.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteData.stats.map((stat, index) => (
            <div
              key={index}
              data-index={index}
              className="group relative"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative text-center p-8">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                    {index === 0 && <span className="text-2xl">📅</span>}
                    {index === 1 && <span className="text-2xl">🏆</span>}
                    {index === 2 && <span className="text-2xl">👥</span>}
                    {index === 3 && <span className="text-2xl">⚖️</span>}
                  </div>
                </div>

                {/* Animated number */}
                <div className="display-md mb-4 text-primary font-semibold">
                  {animatedStats[index]}
                  {siteData.stats[index].value.includes('+') && '+'}
                </div>

                {/* Label */}
                <div className="text-gray-400 leading-relaxed">
                  {stat.label}
                </div>

                {/* Progress bar */}
                <div className="mt-6">
                  <div className="w-full bg-gray-800 rounded-full h-1">
                    <div
                      className="bg-primary h-1 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(animatedStats[index] / parseInt(siteData.stats[index].value.replace('+', ''))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="mt-20 flex justify-center gap-8">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}