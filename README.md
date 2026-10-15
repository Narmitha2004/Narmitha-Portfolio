# Narmitha V — Developer Portfolio

React + Vite + Tailwind CSS v4 + Framer Motion + Lucide icons.
Soft lavender glassmorphism design with light/dark themes and a developer-themed hero (no photo needed).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

Requires Node.js 18+.

## Add your files (in `public/`)

| File | Used for |
|------|----------|
| `public/Narmitha_V_Resume.pdf` | "Download Resume" button |
| `public/projects/*.png` (optional) | Real project screenshots → set `image` in `src/data/portfolio.js` |
| `public/certificates/*.jpg|pdf` (optional) | Certificate files → set `image` to enable the preview modal |

## Edit content

Everything lives in **`src/data/portfolio.js`** — profile, experience, skills,
projects, certifications, education and publication. Fields left as `null`
(GitHub repo, live demo, verify URL, publication link) automatically hide their buttons.

Still to fill in:
- Exact Oracle credential name (`certifications[0].title`)
- Project GitHub repo / demo URLs, if you want to show them
- Certificate verification URLs and images
- Publication URL

Adding a new project (e.g. a Flutter app): copy one project object and set
`category: 'Mobile'` — a "Mobile" filter tab appears automatically.

## Contact form

1. Get a free access key at <https://web3forms.com> using `narmitha2004@gmail.com`.
2. Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY=your-key`.
3. Restart `npm run dev` (and add the same variable on your host, e.g. Vercel/Netlify).

Without a key, the form still validates, then opens the visitor's email app with
the message pre-filled — it never pretends to have sent anything.

## Deploy

Vercel or Netlify: import the repo, build command `npm run build`, output folder `dist`.

## Notes

- The hero's 3D braces, orbs, orbiting tech icons and code window are CSS + Framer Motion
  rather than WebGL, so the page stays fast on phones. React Three Fiber can be added later.
- Background particles and the cursor glow live in `src/components/Ambient.jsx`.
- Respects `prefers-reduced-motion`; tilt and magnetic effects are off on touch screens.
- Technology logos are embedded as SVG in `src/data/techLogos.js` (Simple Icons, Font Awesome Free,
  Material Design Icons), so no image files or outside links are needed.

## No-install version

`standalone/index.html` is the same portfolio as a single HTML file (no build step).
Open it in a browser, or upload it to GitHub Pages / Netlify Drop to host it.
It has no mail service, so its form gives visitors a copy of their message to email you.
