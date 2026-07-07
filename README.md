# Our Love Story 💗

A cinematic, fully animated love-story website — built with React, Vite, Tailwind CSS, Framer Motion, GSAP, and Swiper. Every piece of content (names, photos, timeline, letters, quotes, music, countdown date) is editable from a built-in `/admin` dashboard — no code required after setup.

## 1. Run it

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

To build a deployable version:

```bash
npm run build
```

This creates a `dist/` folder you can upload to any static host (Vercel, Netlify, GitHub Pages, your own server, etc.). `npm run preview` lets you check the production build locally first.

## 2. Personalize the content

Go to **`/admin`** on the running site (e.g. `http://localhost:5173/admin`).

- Default password: **`ourlovestory`** — change it immediately from the **General** tab.
- From there you can edit: both names, the hero headline and rotating typed messages, the hero photo, the anniversary date/time, the footer message, the entire timeline, the photo gallery, videos, love letters, quotes, and the playlist.
- Photos can be uploaded directly (they're stored as the site's data) or linked via URL. Keep uploaded photos under ~1.5MB each — browser storage has a limited quota (a few MB total), so a handful of large images can fill it up. For videos and songs, paste a hosted URL (e.g. a direct `.mp4`/`.mp3` link) rather than uploading, since those files are usually too large for local storage.
- All of this is saved in the browser's `localStorage`, so it stays after refresh. It is **per-browser** — if you open the site in a different browser or clear site data, edits made in the admin panel will reset to the defaults in `src/data/defaultContent.js`. If you want the content to be permanent and shared across every visitor/device, the next step is to swap the storage layer in `src/context/ContentContext.jsx` for Firebase or Supabase — the data shape is already a plain, flat JSON object, so this is a drop-in change (swap `localStorage.getItem/setItem` for reads/writes to your database of choice).

You can also just edit `src/data/defaultContent.js` directly in code if you prefer — it's the seed data the admin panel starts from.

## 3. What's included

- Cinematic GSAP loading sequence (heartbeat → logo reveal → blooming flower)
- Custom cursor with heart trail, ripple + flower-burst clicks (desktop only; falls back to the normal cursor on touch devices)
- Hero section: animated aurora background, floating petals/hearts/butterflies, mouse-follow glow, parallax on scroll, typing animation
- Scroll-reveal animations throughout (fade, slide, blur, stagger) via Framer Motion `whileInView`
- Vertical animated Love Timeline with hover glow/float and letter-reveal text
- Masonry Memory Gallery with category filters, tilt-on-hover, and a lightbox
- Video Gallery with hover play state and a fullscreen modal
- Love Letters with an opening animation and a live typewriter reveal
- Romantic Quotes carousel (Swiper, fade effect, autoplay)
- Floating music player: play/pause/next/prev/volume/playlist, spinning album art, animated equalizer
- Flip-clock style "time together" countdown
- Future Dreams cards with hover lift/glow
- Animated footer with fireflies and a heartbeat icon
- Day / Night theme toggle (night mode swaps in stars + fireflies and a deeper palette)
- Full `/admin` dashboard backed by `localStorage`, structured so it's easy to move to Firebase/Supabase later
- Responsive from mobile to large desktop; respects `prefers-reduced-motion`

## 4. Notes & honest limitations

This is a large brief, and a few things are intentionally kept simple so the project stays maintainable and fast rather than bloated:

- The optional Three.js layer wasn't added — the CSS/SVG-based particle system (petals, hearts, fireflies, stars, sparkles) covers the same visual ground with much better performance, especially on mobile.
- The admin dashboard covers all content fields; it doesn't yet include a full theme-color picker (colors live in `tailwind.config.js` as a named palette — recommended, since consistent romantic color pairing is fragile if opened up to arbitrary color pickers, but easy to extend if you'd like one).
- Music/video files are referenced by URL rather than stored in the browser, for the size reasons above.

## Project structure

```
src/
  assets/        (place any local images/audio here if you don't want to use URLs)
  components/    LoadingScreen, CustomCursor, ParticlesLayer, Navbar, ThemeToggle, etc.
  context/       ContentContext.jsx — the localStorage-backed data layer
  data/          defaultContent.js — seed content
  hooks/         useTypewriter, useCountdown
  pages/         Home.jsx, Admin.jsx
  sections/      Hero, Timeline, Gallery, VideoGallery, LoveLetters, Quotes, MusicPlayer, Countdown, FutureDreams, Footer
  styles/        index.css
```

Made with care — customize it, break it, make it yours. 💗
