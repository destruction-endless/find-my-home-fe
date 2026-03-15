# Copilot Instructions

All code generated in this repository must follow the engineering standards defined in:

docs/WEBSITE_ENGINEERING_STANDARDS.md

General rules:

• Use reusable components
• Follow the standard project architecture
• Ensure pages are responsive
• Include SEO metadata for all pages
• Support light and dark themes
• Use TailwindCSS utility classes
• Avoid inline styles
• Lazy load routes when possible
• Follow accessibility best practices

The website uses Google Fonts and the Tailwind v4 CSS theme system for typography.

The following font families must be loaded in index.html:

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;500&display=swap" rel="stylesheet">

Font usage rules:

Poppins → Headings

Open Sans → Body text

Tailwind v4 uses a CSS-first configuration. Fonts must be defined inside the main stylesheet using the @theme directive.

Example implementation in:

src/assets/main.css
@import "tailwindcss";

@theme {
--font-heading: "Poppins", sans-serif;
--font-body: "Open Sans", sans-serif;
}

Typography rules across the application:

Headings:

<h1 class="font-heading">
<h2 class="font-heading">
<h3 class="font-heading">

Body text:

<p class="font-body">

If a component does not explicitly specify a font class, the default body font should apply.

To ensure consistent typography across the entire application, the base body font should be applied globally:

body {
font-family: var(--font-body);
}

Headings should use the heading font by default when appropriate.

Copilot must follow this typography structure and must not introduce alternative font systems or inline font declarations.
