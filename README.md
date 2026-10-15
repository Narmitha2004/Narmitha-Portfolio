# Narmitha V — Developer Portfolio

React + Vite + Tailwind CSS v4 + Framer Motion + Lucide icons.
Soft lavender glassmorphism design with light/dark themes.

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
| `public/profile.jpg` | Hero photo (portrait, ~900×1100). Until added, an "NV" monogram shows. |
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

- 3D shapes are CSS-rendered (gradient-lit spheres, rings, cubes) instead of WebGL,
  which keeps the page fast on phones. React Three Fiber can be added later if wanted.
- Respects `prefers-reduced-motion`; tilt and magnetic effects are off on touch screens.
- Technology icons load from the open-source Devicon CDN, with an icon fallback.
