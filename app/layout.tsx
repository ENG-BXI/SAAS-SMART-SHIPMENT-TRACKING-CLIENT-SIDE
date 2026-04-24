import type {Metadata} from 'next';
import './globals.css';
import localFont from 'next/font/local';
import ProviderQueryClient from '@/lib/react-query';
import {Toaster} from '@/components/ui/sonner';
import React from 'react';

const myFont = localFont({
  src: './../public/Fonts/IBMPlexSansArabic-Medium.ttf'
});

export const metadata: Metadata = {
  title: 'SAAS Smart Shipment',
  description: 'Smart Shipment Tracking Platform'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ar' dir='rtl'>
      <body className={`${myFont.className} antialiased`}>
        <ProviderQueryClient>
          {children}
          <Toaster richColors position='top-right' />
        </ProviderQueryClient>
      </body>
    </html>
  );
}
