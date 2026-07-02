import { siteData } from '@/lib/site-data'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
      {/* Main content */}
      <div className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Law Firm</h2>
                <p className="text-gray-400 leading-relaxed max-w-md">
                  {siteData.footer.description}
                </p>
              </div>

              {/* Newsletter */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="display-md mb-3">Stay Connected</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Get legal insights and firm updates delivered to your inbox.
                </p>
                <form className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary px-6 text-sm"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="caption-strong mb-6 text-gray-300">Quick Links</h3>
              <ul className="space-y-3">
                {siteData.footer.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="dense-link text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="caption-strong mb-6 text-gray-300">Contact Us</h3>
              <div className="space-y-6">
                {siteData.contact.offices.map((office, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-semibold text-white mb-2">{office.name}</h4>
                    <address className="not-italic text-sm text-gray-400 space-y-1">
                      <p>{office.address}</p>
                      <p>{office.city}</p>
                      <div className="flex gap-4 mt-2">
                        <a
                          href={`tel:${office.phone}`}
                          className="text-primary hover:underline text-sm"
                        >
                          {office.phone}
                        </a>
                        <a
                          href={`mailto:${office.email}`}
                          className="text-primary hover:underline text-sm"
                        >
                          {office.email}
                        </a>
                      </div>
                    </address>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-800 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <p className="fine-print text-gray-500">
                  © {currentYear} Law Firm. All rights reserved.
                </p>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-6">
                <span className="text-sm text-gray-500 hidden sm:block">Follow us</span>
                <div className="flex gap-4">
                  {Object.entries(siteData.footer.social).map(([platform, url], index) => (
                    <a
                      key={platform}
                      href={url}
                      className="w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 group"
                    >
                      {platform === 'linkedin' && (
                        <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">in</span>
                      )}
                      {platform === 'twitter' && (
                        <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">𝕏</span>
                      )}
                      {platform === 'facebook' && (
                        <span className="text-xs text-gray-400 group-hover:text-primary transition-colors">f</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stripe */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
    </footer>
  )
}