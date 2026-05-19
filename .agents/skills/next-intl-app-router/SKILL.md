---
name: next-intl-app-router
description: Configures and uses next-intl for Next.js App Router with locale-based routing. Use when adding or changing i18n, locale routing, translations, next-intl plugin, middleware/proxy, or message files in Next.js App Router projects.
---

# next-intl (App Router)

Setup and usage of `next-intl` with **prefix-based locale routing** (e.g. `/en/about`, `/ja/about`). Use this skill in any Next.js App Router project.

**Example code:** Copy-paste examples live in this skill's [examples/](examples/) folder. See [examples/README.md](examples/README.md) for where each file goes in your project.

## File layout

Keep this structure:

```
├── messages/
│   ├── en.json
│   ├── ja.json
│   └── ...
├── next.config.ts
└── src/
    ├── i18n/
    │   ├── request.ts
    │   ├── routing.ts
    │   └── navigation.ts
    ├── proxy.ts          # Next.js 16+ (was middleware.ts)
    └── app/
        ├── layout.tsx    # Root layout, no NextIntlClientProvider here
        └── [locale]/
            ├── layout.tsx
            ├── page.tsx
            └── ...
```

Root layout does **not** wrap with `NextIntlClientProvider`; only `app/[locale]/layout.tsx` does.

---

## 1. Next config

Wire the plugin (default path `./i18n/request.ts`):

```ts
// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* ... */
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

Custom path: `createNextIntlPlugin('./src/i18n/request.ts')`.

---

## 2. Routing config

Central config in `src/i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ja", "zh-CN", "zh-TW"],
  defaultLocale: "en",
});
```

---

## 3. Request config

import { setRequestLocale } from "next-intl/server";

export default function IndexPage({
params,
}: {
params: Promise<{ locale: string }>;
}) {
const { locale } = use(params);
setRequestLocale(locale);
return <TokyoPage />;
}

````

```tsx
// app/[locale]/about/page.tsx
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import AboutContainer from "./components/AboutContainer";

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <AboutContainer />;
}
````

Call `setRequestLocale` **before** any `next-intl` APIs in that layout/page.

---

## 8. Using translations

**Client components:** `useTranslations(namespace)`:

```tsx
"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function BackToHomeButton() {
  const t = useTranslations("BackToHomeButton");
  return (
    <Link href="/">
      <span>{t("buttonText")}</span>
    </Link>
  );
}
```

```tsx
"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Nav() {
  const t = useTranslations("Navigation");
  return <Link href="/about">{t("links.about")}</Link>;
}
```

**Server components:** use `getTranslations` from `next-intl/server` (await with locale/namespace as needed).

---

## 9. Messages format

One JSON file per locale under `messages/`. Nested keys map to namespaces and keys:

```json
{
  "HomePage": {
    "title": "Hello world!"
  },
  "LandingPage": {
    "title": "Tokyo Sounds",
    "navbar": {
      "home": "Home",
      "about": "About"
    }
  },
  "BackToHomeButton": {
    "buttonText": "Back to Home",
    "tooltip": "Return to the main page"
  }
}
```

- `useTranslations("LandingPage")` → `t("title")`, `t("navbar.about")`.
- Interpolation: `"selectColor": "Select {color} color"` → `t("selectColor", { color: "Blue" })`.

---

## Checklist

- [ ] `next.config.ts`: `createNextIntlPlugin()` wraps config.
- [ ] `src/i18n/routing.ts`: `defineRouting` with `locales` and `defaultLocale`.
- [ ] `src/i18n/request.ts`: `getRequestConfig` + `hasLocale` + dynamic `messages/${locale}.json`.
- [ ] `src/proxy.ts` (or `middleware.ts`): `createMiddleware(routing)` and matcher.
- [ ] `src/i18n/navigation.ts`: `createNavigation(routing)` and re-export `Link`, etc.
- [ ] `app/[locale]/layout.tsx`: `hasLocale` → `notFound`, `setRequestLocale`, `generateStaticParams`, `NextIntlClientProvider` + `getMessages()`.
- [ ] Each `app/[locale]/**/page.tsx`: `setRequestLocale(locale)` when using static rendering.
- [ ] Client components: `useTranslations("Namespace")`; links use `Link` from `@/i18n/navigation`.

---

## Reference

- **Copy-paste examples:** [examples/](examples/) — standalone files for use in any project.
- Extended config (localePrefix, pathnames, etc.): [reference.md](reference.md)
- Official: [next-intl App Router](https://next-intl.dev/docs/getting-started/app-router), [Routing setup](https://next-intl.dev/docs/routing/setup)
