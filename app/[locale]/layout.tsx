import type {Metadata} from 'next';
import './globals.css';
import localFont from 'next/font/local';
import ProviderQueryClient from '@/lib/react-query';
import {Toaster} from '@/components/ui/sonner';
import React from 'react';
import NextTopLoader from 'nextjs-toploader';
import VisitCounterProvider from '@/lib/visit-counter-provider';
import SocketProvider from '@/lib/socket-provider';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';

const myFont = localFont({
  src: './../../public/Fonts/IBMPlexSansArabic-Medium.ttf'
});

export const metadata: Metadata = {
  title: 'SAAS Smart Shipment',
  description: 'Smart Shipment Tracking Platform'
};
export function generateStaticParams() {
  return routing.locales.map(locale => ({locale}));
}
export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const isRtl = locale == 'ar' || locale == 'ur';
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className={`${myFont.className} antialiased`}>
        <NextIntlClientProvider>
          <VisitCounterProvider>
            <SocketProvider>
              <ProviderQueryClient>
                {children}
                <Toaster richColors position='top-right' />
                <NextTopLoader color='#1B8354' height={4} />
              </ProviderQueryClient>
            </SocketProvider>
          </VisitCounterProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
