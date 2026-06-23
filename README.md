# safalgupta.tech — Personal Brand Portfolio

Cinematic personal brand site for Safal Gupta. Built with Next.js 15, GSAP, Lenis, and WebGL.

## Features

- **Clarity Gate** — WebGL fluid shader + scroll-driven portrait decrypt
- **Command palette** — `⌘K` navigation
- **Terminal easter egg** — `` ` `` to open CLI (`help`, `ls`, `whoami`, etc.)
- **GitHub pulse** — Live repos from [@alphasafal](https://github.com/alphasafal)
- **Architecture diagram** — Animated system map in flagship case study
- **Newsletter** — Join the Signal (Buttondown optional)
- **Resume PDF** — `/api/resume` or `/resume-safal-gupta.pdf`

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment

Copy `.env.example` to `.env.local`:

```
BUTTONDOWN_API_KEY=optional_for_newsletter
```

## Deploy (Vercel + safalgupta.tech)

1. Push to GitHub and import in [Vercel](https://vercel.com)
2. Add domain `safalgupta.tech` in Project → Settings → Domains
3. At your registrar, set DNS:
   - **A record** `@` → `76.76.21.21` (Vercel)
   - **CNAME** `www` → `cname.vercel-dns.com`
4. Enable HTTPS (automatic on Vercel)

## Content

Edit JSON in `content/`:

- `projects.json` — portfolio projects
- `thinking.json` — essays
- `now.json` — current focus strip

## Contact

- Email: safallovetocode@gmail.com
- Site: https://safalgupta.tech
