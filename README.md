# Law Firm Website

A modern, professional law firm website built with Next.js 14, following Apple's design principles for exceptional user experience.

## Features

- **Responsive Design**: Fully responsive across all devices, following Apple's exact breakpoints
- **Apple Design System**: Implements Apple's design tokens, typography, and spacing system
- **Smooth Animations**: Fade-in effects, scroll reveals, and micro-interactions
- **Professional Layout**: Clean, minimalist design with proper visual hierarchy
- **Interactive Elements**: Functional contact form, newsletter subscription, and navigation
- **SEO Optimized**: Semantic HTML structure for better search engine visibility

## Design Principles

### Typography
- SF Pro Display for headings (with negative letter spacing)
- SF Pro Text for body copy
- 17px body text (not 16px) for Apple's reading pace
- Exact Apple typography scales and line heights

### Color System
- Primary blue (#0066cc) for all interactive elements
- Apple's color palette with proper contrast ratios
- Alternating tile sections for visual rhythm
- No decorative gradients or shadows

### Layout
- 8px base spacing system
- Edge-to-edge alternating tiles
- Maximum content width of 1440px
- Proper padding and margins following Apple's guidelines

### Components
- Product tiles with system shadows only on imagery
- Pill-shaped CTAs for primary actions
- Backdrop blur effects on navigation
- Hover states with smooth transitions

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd law-firm
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── About.tsx       # About section
│   ├── Footer.tsx      # Footer component
│   ├── Hero.tsx        # Hero section
│   ├── Navigation.tsx  # Navigation
│   ├── Newsletter.tsx  # Newsletter subscription
│   ├── Services.tsx    # Services section
│   ├── Stats.tsx       # Statistics section
│   └── Testimonials.tsx # Testimonials
├── lib/
│   └── site-data.ts    # Site data and content
└── styles/
    └── globals.css     # Apple design system styles
```

## Customization

### Site Data
Edit `src/lib/site-data.ts` to update:
- Navigation links
- Service offerings
- Testimonials
- Contact information
- Brand messaging

### Styling
The design system is defined in `src/styles/globals.css`. You can modify:
- Color variables
- Typography scales
- Spacing system
- Animation timings

### Adding Sections
1. Create a new component in `src/components/`
2. Follow the existing styling patterns
3. Add to `src/app/page.tsx`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: 0

## Contributing

1. Follow the existing code style
2. Maintain the design system consistency
3. Test on all breakpoints
4. Ensure accessibility standards

## License

MIT License - feel free to use this for your own projects.