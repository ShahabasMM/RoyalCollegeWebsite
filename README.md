# Royal College Website

Modern Next.js website for Royal College of Arts & Science.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Pages

- /
- /about
- /academics
- /admissions
- /campus
- /news
- /contact
- /programs/bca
- /programs/bcom
- /programs/ba-english
- /programs/bba

## Notes

- All primary navigation and program links are connected to working pages.
- Admission CTA points to `https://royalcollege.net/apply`; change this to your actual application URL.
- Replace the placeholder campus/contact details with Royal College's verified information.
- Images currently use Unsplash remote URLs. For production, move approved college photos into `public/images` or Supabase Storage.
- The site uses Poppins throughout.
