'use client'

import { siteData } from '@/lib/site-data'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusInput, setFocusInput] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="tagline text-primary">Stay Informed</span>
            </div>

            {/* Headline */}
            <h2 className="display-lg mb-6">
              Legal Insights & Updates
            </h2>

            {/* Subtitle */}
            <p className="lead mb-4 text-gray-600">
              {siteData.newsletter.tagline}
            </p>

            {/* Description */}
            <p className="body-strong mb-12 text-gray-700 max-w-2xl mx-auto leading-relaxed">
              {siteData.newsletter.description}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative group">
                  {/* Icon */}
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    focusInput ? 'text-primary' : 'text-gray-400'
                  }`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>

                  {/* Input */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => setFocusInput(false)}
                    placeholder={siteData.newsletter.placeholder}
                    className={`w-full pl-12 pr-6 py-4 rounded-full border-2 transition-all duration-300 ${
                      focusInput
                        ? 'border-primary shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    required
                  />

                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary px-8 whitespace-nowrap hover:bg-primary/90 transition-colors duration-300"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                      </svg>
                      Subscribed!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
                      </svg>
                      {siteData.newsletter.submitText}
                    </div>
                  )}
                </button>
              </div>
            </form>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm">📧</span>
                </div>
                <span className="text-sm text-gray-600">Weekly Digest</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm">🔒</span>
                </div>
                <span className="text-sm text-gray-600">100% Private</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm">📋</span>
                </div>
                <span className="text-sm text-gray-600">Expert Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}