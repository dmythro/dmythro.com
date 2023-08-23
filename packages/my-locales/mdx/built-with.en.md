# Details of This Project

Personal website. An unnecessarily complex project to showcase some of the things I do.

## Requirements

- **Fast and lightweight**: high score in Lighthouse benchmark
- Auto dark / light theme
- **Responsive design**, should look good on all desktop / tablet / mobile screens
- **SEO**: Static / SSG for all the content and text, all required meta tags, JSON-LD data, OpenGraph data, robots.txt etc
- **i18n**, English and Ukrainian translation, auto locale detection and redirect from the root route
- Accessibility is important
- Informative
- Nicely looking
- **Open-source**
- **Generate CV in PDF** from local data
- Analytics
- (some other planned features to add)

## Tech stack

Built with [Next.js](https://nextjs.org/) (App Router, Middleware for i18n and locale detection, Metadata API, SSG, error handling), [NextUI](https://nextui.org/) (based on [Tailwind CSS](https://tailwindcss.com/) now), [Font Awesome](https://fontawesome.com/) SVG icons.
TypeScript for type safety.
Monorepo build system [Turborepo](https://turbo.build/repo).
Powered by [Vercel](https://vercel.com/), auto-deploy from GitHub.
Other open-source tools are used under the hood.
