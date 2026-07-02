export const siteData = {
  // Navigation
  navigation: {
    primary: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Contact', href: '/contact' }
    ],
    secondary: [
      { label: 'Resources', href: '/resources' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' }
    ]
  },

  // Hero Section
  hero: {
    headline: 'Expert Legal Counsel',
    tagline: 'Delivering exceptional legal solutions with integrity and excellence',
    primaryCTA: 'Schedule Consultation',
    secondaryCTA: 'Learn More',
    heroImage: '/images/law-hero.jpg'
  },

  // Services Section
  services: {
    headline: 'Our Practice Areas',
    tagline: 'Comprehensive legal services tailored to your specific needs',
    services: [
      {
        title: 'Corporate Law',
        description: 'Business formation, contracts, mergers & acquisitions, and corporate governance',
        icon: '🏢',
        features: ['Business Formation', 'Contract Drafting', 'M&A', 'Corporate Compliance']
      },
      {
        title: 'Litigation',
        description: 'Civil litigation, commercial disputes, and trial representation',
        icon: '⚖️',
        features: ['Civil Litigation', 'Commercial Disputes', 'Trial Representation', 'Appeals']
      },
      {
        title: 'Real Estate',
        description: 'Property transactions, zoning law, and real estate development',
        icon: '🏠',
        features: ['Property Transactions', 'Zoning Law', 'Real Estate Development', 'Leases']
      },
      {
        title: 'Estate Planning',
        description: 'Wills, trusts, probate, and asset protection',
        icon: '📝',
        features: ['Wills & Trusts', 'Probate', 'Asset Protection', 'Tax Planning']
      },
      {
        title: 'Family Law',
        description: 'Divorce, custody, adoption, and family mediation',
        icon: '👨‍👩‍👧‍👦',
        features: ['Divorce', 'Custody', 'Adoption', 'Mediation']
      },
      {
        title: 'Immigration',
        description: 'Visas, citizenship, and immigration compliance',
        icon: '🛂',
        features: ['Visas', 'Citizenship', 'Immigration Compliance', 'Deportation Defense']
      }
    ]
  },

  // About Section
  about: {
    headline: 'Our Firm',
    tagline: 'Experienced legal professionals dedicated to your success',
    description: 'Founded in 1995, our firm has built a reputation for excellence in legal representation. Our team of experienced attorneys specializes in various practice areas and is committed to providing personalized service to each client.',
    values: [
      { title: 'Integrity', description: 'We uphold the highest ethical standards in all our dealings' },
      { title: 'Excellence', description: 'We strive for excellence in every case we handle' },
      { title: 'Compassion', description: 'We understand the challenges our clients face' },
      { title: 'Results', description: 'We deliver results that matter to our clients' }
    ]
  },

  // Testimonials Section
  testimonials: {
    headline: 'Client Testimonials',
    tagline: 'Hear what our clients have to say about their experience',
    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'CEO, TechCorp',
        content: 'Exceptional legal counsel that guided us through a complex merger process. Their expertise and attention to detail were instrumental in our success.',
        avatar: '/images/avatar-sarah.jpg'
      },
      {
        name: 'Michael Chen',
        role: 'Real Estate Developer',
        content: 'The team helped us navigate a complex zoning issue that seemed impossible. They were professional, responsive, and got us the results we needed.',
        avatar: '/images/avatar-michael.jpg'
      },
      {
        name: 'Emily Rodriguez',
        role: 'Family Law Client',
        content: 'During a difficult time in my life, their compassion and professionalism made all the difference. They fought for my rights and my children\'s future.',
        avatar: '/images/avatar-emily.jpg'
      },
      {
        name: 'David Thompson',
        role: 'Small Business Owner',
        content: 'Their corporate law expertise saved our business. They helped us structure our contracts and compliance framework properly, preventing future legal issues.',
        avatar: '/images/avatar-david.jpg'
      }
    ]
  },

  // Newsletter Section
  newsletter: {
    headline: 'Stay Updated',
    tagline: 'Get legal insights and firm updates delivered to your inbox',
    description: 'Subscribe to our newsletter for legal tips, firm news, and important updates.',
    placeholder: 'Enter your email address',
    submitText: 'Subscribe'
  },

  // Stats Section
  stats: [
    { label: 'Years Experience', value: '28+' },
    { label: 'Cases Won', value: '10,000+' },
    { label: 'Happy Clients', value: '5,000+' },
    { label: 'Practice Areas', value: '6' }
  ],

  // Team Section
  team: {
    headline: 'Our Attorneys',
    tagline: 'Meet the legal professionals who will handle your case',
    attorneys: [
      {
        name: 'Jessica Martinez',
        role: 'Senior Partner',
        bio: '25 years of experience in corporate law and mergers & acquisitions.',
        image: '/images/jessica-martinez.jpg'
      },
      {
        name: 'Robert Williams',
        role: 'Managing Partner',
        bio: 'Specializes in litigation and has won numerous high-profile cases.',
        image: '/images/robert-williams.jpg'
      },
      {
        name: 'Amanda Davis',
        role: 'Partner',
        bio: 'Expert in real estate law and property development.',
        image: '/images/amanda-davis.jpg'
      },
      {
        name: 'Michael Rodriguez',
        role: 'Senior Associate',
        bio: 'Focuses on family law and estate planning.',
        image: '/images/michael-rodriguez.jpg'
      }
    ]
  },

  // Contact Section
  contact: {
    headline: 'Contact Us',
    tagline: 'Get in touch for a consultation',
    offices: [
      {
        name: 'Main Office',
        address: '123 Legal Plaza, Suite 100',
        city: 'New York, NY 10001',
        phone: '(212) 555-0123',
        email: 'info@lawfirm.com'
      },
      {
        name: 'Branch Office',
        address: '456 Justice Avenue, Floor 3',
        city: 'Los Angeles, CA 90001',
        phone: '(213) 555-0456',
        email: 'la@lawfirm.com'
      }
    ],
    workingHours: {
      monFri: '8:00 AM - 6:00 PM',
      sat: '9:00 AM - 2:00 PM',
      sun: 'Closed'
    }
  },

  // Footer
  footer: {
    description: 'Providing exceptional legal services since 1995 with integrity, excellence, and compassion.',
    quickLinks: [
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Attorneys', href: '/attorneys' },
      { label: 'Contact', href: '/contact' },
      { label: 'Resources', href: '/resources' },
      { label: 'Careers', href: '/careers' }
    ],
    practiceAreas: [
      'Corporate Law',
      'Litigation',
      'Real Estate',
      'Estate Planning',
      'Family Law',
      'Immigration'
    ],
    social: {
      linkedin: '/linkedin',
      twitter: '/twitter',
      facebook: '/facebook'
    },
    copyright: '© 2024 Law Firm. All rights reserved.'
  }
}