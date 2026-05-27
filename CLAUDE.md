# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Boreal Clim - Static website for an HVAC/climate control company based in Île-de-France. The site combines content from borealclim.fr with the modern design aesthetic from climconcept77.fr.

## Project Structure

```
borealclim/
├── index.html      # Main page with all sections (hero, services, about, contact)
├── styles.css      # Complete styling with climconcept77 design system
├── script.js       # Interactive features (mobile nav, scroll effects, form handling)
└── README.md       # User-facing documentation
```

## Design System

The site follows the climconcept77 design language:

- **Colors**: Primary blue (#4C6FFC), accent yellow (#FFCD57), secondary red (#F05C2B)
- **Typography**: Lexend (primary), Oswald (headings), Poppins (body)
- **Patterns**: Rounded buttons (100px radius), gradient backgrounds, card-based layouts
- **Responsive**: Mobile-first approach with breakpoints at 480px, 768px, 968px

## Key Features

1. **Responsive Navigation**: Fixed header with mobile hamburger menu
2. **Smooth Scrolling**: Anchor links with offset for fixed header
3. **Scroll Animations**: Intersection Observer for fade-in effects on cards
4. **Contact Form**: Client-side validation (needs backend integration for submission)
5. **Active Nav Highlighting**: Automatically highlights nav item based on scroll position

## Common Modifications

### Updating Content
All content is in `index.html`. Sections are clearly marked with HTML comments.

### Changing Colors
Edit CSS variables in `styles.css` under `:root` (lines 9-17).

### Adding Images
Replace placeholder elements (`.about-image-placeholder`, hero background) with actual images.

### Form Backend
The form submission handler is in `script.js` (lines 45-67). Integrate with a backend service or form handler.

## Notes

- Pure HTML/CSS/JS - no build process required
- No external dependencies (except Google Fonts)
- IntelliJ IDEA project files are present (.idea/, borealclim.iml)
