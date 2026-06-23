# Deploy safalgupta.tech to Vercel

## 1. Push to GitHub

```bash
git add .
git commit -m "Deploy-ready portfolio"
git push -u origin main
```

## 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Root directory: this project folder
5. Deploy

## 3. Environment variables (required for contact form)

In Vercel → **Settings** → **Environment Variables**, add:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | **Yes** | API key from [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | No | Defaults to `safallovetocode@gmail.com` |
| `CONTACT_FROM_EMAIL` | No | Verified sender, e.g. `Safal Gupta <hello@safalgupta.tech>` |
| `BUTTONDOWN_API_KEY` | No | Newsletter in footer (optional) |
| `NEXT_PUBLIC_CAL_LINK` | No | Calendly URL — shows "Book a call" button |

Copy from [`.env.example`](.env.example) for local development:

```bash
cp .env.example .env.local
# Fill in RESEND_API_KEY, then:
npm run dev
```

### Resend setup (5 minutes)

1. Create account at [resend.com](https://resend.com)
2. Add domain `safalgupta.tech` and verify DNS records
3. Create API key → paste as `RESEND_API_KEY` in Vercel
4. Set `CONTACT_FROM_EMAIL=Safal Gupta <hello@safalgupta.tech>`
5. Redeploy after adding env vars

Until Resend is configured, the contact form returns an error in production (dev mode logs to console).

## 4. Custom domain

1. Vercel Project → **Settings** → **Domains**
2. Add `safalgupta.tech` and `www.safalgupta.tech`
3. At your registrar:

| Type  | Name | Value                |
|-------|------|----------------------|
| A     | `@`  | `76.76.21.21`        |
| CNAME | `www`| `cname.vercel-dns.com`|

HTTPS is automatic after DNS propagates.

## 5. Post-deploy checklist

- [ ] https://safalgupta.tech loads
- [ ] Contact form sends email to your inbox
- [ ] `/resume-safal-gupta.pdf` downloads
- [ ] `/projects/jcb-digitalization` case study loads
- [ ] Terminal commands work (`whois safal`, `jcb`, `projects`)
- [ ] UFO scroll companion + contact popup on hover/click
- [ ] `/sitemap.xml` and `/robots.txt` accessible
- [ ] `/writing/*` essay pages load
- [ ] Newsletter signup in footer works (or remove if unused)
- [ ] Vercel Analytics shows traffic (auto-enabled on Vercel)

## 6. Replace placeholder assets (recommended)

| Asset | Path | Action |
|-------|------|--------|
| Project covers | `public/projects/*.svg` | Swap for real screenshots when available |
| Hero portrait | `public/safal-portrait.jpg` | Professional headshot |
| Hero cutout | `public/safal-hero-nobg.png` | Used in metadata |

## 7. Build locally before deploy

```bash
npm run build
npm run start
```
