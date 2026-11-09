# Alen Faer – personal website

React + TypeScript + Tailwind CSS (v4) + shadcn-style structure, built with Vite.

## Develop

    npm install
    npm run dev

## Deploy to GitHub Pages

1. Push this folder to the `main` branch of https://github.com/Alen60843/Personal_Website
2. In the repo: Settings → Pages → Source: **GitHub Actions**
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/`.

The site will be at https://alen60843.github.io/Personal_Website/

## Notes

- Hero: `src/components/ui/scroll-locked-video-hero.tsx`. Its default video is hotlinked from a third-party CDN.
  Put your own MP4 in `public/` and pass `videoSrc="./hero.mp4"` to remove that dependency.
