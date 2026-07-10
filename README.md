# SAAS Smart Shipment — Client Side

A localized Next.js 16 web dashboard and landing application for the SAAS Smart Shipment Tracking platform.

## Overview

This project is the client-side web frontend for the multi-application SAAS platform. It includes:

- a localized landing page under `app/[locale]`
- dashboard sections for admin, manager, and client users
- shipment tracking, subscription management, clients, users, and settings
- React Query, Tailwind CSS, and Next.js App Router
- `next-intl` localization with 10 supported locales

## Key Features

- Language-aware routing with `next-intl` and `app/[locale]`
- RTL support for Arabic and Urdu
- Dynamic dashboard routes for admin, manager, and client flows
- Real-time socket support via `socket.io-client`
- Map and shipment visualization with `leaflet` and `maplibre-gl`
- Forms using `react-hook-form` and schema validation with `zod`
- Theme switching using `next-themes`
- Toasts with `sonner`

## Run locally

Install dependencies and start the dev server from `client-side`:

```bash
cd "d:/pro/Full Stack Website/SAAS SMART SHIPMENT TRACKING/client-side"
npm install
npm run dev
```

Open the app in the browser at:

```bash
http://localhost:3000/en
```

## Scripts

- `npm run dev` - start development server
- `npm run build` - build production-ready app
- `npm run start` - start production server after build
- `npm run lint` - run ESLint

## Localization

This app uses `next-intl` for internationalization.

- Supported locales: `en`, `ar`, `zh`, `hi`, `es`, `fr`, `bn`, `pt`, `ru`, `ur`
- Locale routes are generated in `app/[locale]/layout.tsx`
- Default locale is `en`
- RTL direction is enabled for `ar` and `ur`
- Translations are loaded through the `next-intl` plugin in `next.config.ts`

## Project structure

- `app/` - Next.js App Router pages and route groups
  - `[locale]` - locale-aware app root and pages
  - `(auth)` - authentication pages
  - `(client)`, `(dashboard)` - client-facing and dashboard routes
- `components/` - shared UI and layout components
- `lib/` - app utilities, theme provider, socket provider, React Query setup
- `i18n/` - locale routing and request utilities
- `public/` - static assets and fonts

## Dependencies

Important runtime dependencies include:

- `next` 16
- `react` 19
- `next-intl`
- `@tanstack/react-query`
- `axios`
- `react-hook-form`
- `zod`
- `socket.io-client`
- `leaflet`, `react-leaflet`, `maplibre-gl`
- `next-themes`
- `sonner`

## Configuration notes

- The app uses `next-intl/plugin` in `next.config.ts`
- `app/[locale]/layout.tsx` sets the HTML `lang` and `dir` attributes for locale-aware rendering
- The routing config is defined in `i18n/routing.ts`
- Landing page translations are loaded via `useTranslations` in `app/[locale]/page.tsx`

## Deployment

This app is ready to deploy to any platform that supports Next.js 16, including Vercel and Netlify.

For Netlify, the project already includes `@netlify/next` and `@netlify/plugin-nextjs` dependencies.

## Notes

- The landing page currently renders the register company form from `components/landing/register-company-form.tsx`
- Unused commented sections in `app/[locale]/page.tsx` indicate additional landing components that can be enabled later
- Make sure backend API base URLs and authentication settings match the server-side environment

## Useful files

- `next.config.ts` - Next.js configuration with `next-intl`
- `app/[locale]/layout.tsx` - root layout, locale validation, theme provider, and global providers
- `i18n/routing.ts` - supported locales and locale routing config
- `lib/config.tsx` - client-side configuration helpers
- `components/sideBar/side-bar.tsx` - dashboard sidebar and route navigation
