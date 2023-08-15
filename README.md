# @Dmythro's website: [dmythro.com](https://dmythro.com)

Personal website, mainly to showcase things I do.

![@Dmythro's avatar](https://github.com/dmythro/dmythro.com/assets/1391015/ec3bc8d7-3a44-4365-88f1-c882800b9295)

It aims to answer most of the basic questions, and generate more relevant ones.

## Requirements

- Fast and lightweight: high score in Lighthouse benchmark
- Auto dark / light theme
- Responsive design, should look good on all desktop / tablet / mobile screens
- SEO: Static / SSG for all the content and text, all required meta tags, JSON-LD data, OpenGraph data, robots.txt etc
- i18n, English and Ukrainian translation, auto locale detection and redirect from the root route
- Accessibility is important
- Informative
- Nicely looking
- Open-source
- (some other planned features to add)

## Tech stack

Built with [Next.js](https://nextjs.org/) (App Router, Middleware for i18n and locale detection, Metadata API, SSG, error handling), [NextUI](https://nextui.org/) (based on [Tailwind CSS](https://tailwindcss.com/) now), [Font Awesome](https://fontawesome.com/) SVG icons.
TypeScript for type safety.
A lot of other open-source tools under the hood.
Monorepo build system [Turborepo](https://turbo.build/repo).
Powered by [Vercel](https://vercel.com/).
