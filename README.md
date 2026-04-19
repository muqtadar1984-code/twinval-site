# TwinVal — Marketing Website

> A sovereign-institutional landing site for **TwinVal**, the digital twin property valuation platform by Aethel Twin Sdn. Bhd.

Single-page static site. No framework. No build step.

---

## Structure

```
twinval-site/
├── index.html              # All sections — single page
├── style.css               # Full design system
├── main.js                 # Scroll reveals, nav state, form handler
├── assets/
│   ├── at-monogram.svg     # Vector reconstruction of the Aethel seal
│   └── logo-full.png       # Original PNG (fallback / social share)
├── README.md               # This file
└── .gitignore
```

---

## Running Locally

Any static server works. Pick one:

```bash
# Option A — Python (one-liner, no install)
python -m http.server 8000
# → http://localhost:8000

# Option B — Node
npx serve .
# → http://localhost:3000
```

No build step. No `npm install`. Edit files and refresh.

---

## TODO Before Launch

**1. Formspree form ID**
Open `index.html`, find:
```html
action="https://formspree.io/f/YOUR_FORMSPREE_ID"
```
Replace `YOUR_FORMSPREE_ID` with your real Formspree form ID.
Sign up free at [formspree.io](https://formspree.io).

**2. Founder sentence**
Open `index.html`, find:
```html
Founded by Muqtadar Quraishi — [ONE_SENTENCE_FOUNDER_BACKGROUND].
```
Replace the bracketed placeholder with one real sentence.

**3. Patent details**
In the Credentials section, replace:
- `[PATENT_APPLICATION_NO]`
- `[FILING_DATE]`
- `[PUBLICATION_DATE]`

---

## Deployment — Vercel (Recommended)

Vercel is free for static sites and integrates natively with custom domains.

### Steps

1. **Create a GitHub repo** (e.g., `twinval-site`) and push this folder.

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import the repo
   - Framework preset: **Other** (static)
   - Build command: *(leave empty)*
   - Output directory: *(leave empty — defaults to root)*
   - Deploy

3. **Connect twinval.com**
   - In Vercel project → Settings → Domains
   - Add `twinval.com` and `www.twinval.com`
   - Update your domain registrar's DNS:
     - `A` record for `@` → Vercel's IP (shown in Vercel UI)
     - `CNAME` for `www` → `cname.vercel-dns.com`
   - Vercel will issue a free SSL certificate automatically

4. **Done.** Every `git push` to `main` auto-redeploys.

### Alternative: Netlify

Equivalent flow at [netlify.com](https://netlify.com). Either platform works.

### Alternative: GitHub Pages

In your GitHub repo → Settings → Pages → Source: `main` branch, root.
Requires CNAME file in repo root containing `twinval.com`.

---

## Customisation Guide

### Colour tokens
All colours are defined as CSS custom properties at the top of `style.css` in `:root { ... }`. Change one value, it cascades everywhere.

### Fonts
Fonts load from Google Fonts. To swap any face, change the `<link>` tag in `index.html` and the corresponding `font-family` declarations in `style.css`.

### Content
All copy is in `index.html`. Search for the section you want (`<!-- HERO -->`, `<!-- PROBLEM -->`, etc.) and edit.

### Live demo & dashboard URLs
The "Open Live Demo" CTA points at the Streamlit exchange app:
- `https://propexchange.streamlit.app/` — full pipeline + exchange view (Demo section)

The Dashboards section links the live REIT portal:
- `https://propexchangev1.vercel.app/` — Islamic REIT / REIT dashboard

Search `index.html` for either URL to change them. The Banks, Insurers, Valuers,
and Proptech dashboards are placeholders until those portals are built; update
their `<article>` tiles to `<a>` elements with real URLs when ready.

---

## Design Principles

The website is intentionally **not a SaaS landing page**. Reference vocabulary:

- **Economist** editorial weight
- **Bloomberg** data density
- **Private bank** letterhead quality
- **Islamic geometric** mathematical elegance

No gradients that glow. No purple. No drop shadows. No parallax. No bouncy animation. Every decision was checked against the question: *"Does this belong in a bank's annual report, or in a pitch deck?"*

---

## Brand

- **Company:** Aethel Twin Sdn. Bhd. (Reg. No. 202601012908 / 1675006-X)
- **Product:** TwinVal
- **Domain:** [twinval.com](https://twinval.com)
- **Etymology:** *Aethel* — Old English *æþele*, meaning noble, of pure origin

---

## Licence

© Aethel Twin Sdn. Bhd. All rights reserved.
