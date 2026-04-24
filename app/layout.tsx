import type {Metadata} from 'next';
import './globals.css';
import localFont from 'next/font/local';
import ProviderQueryClient from '@/lib/react-query';
import {Toaster} from '@/components/ui/sonner';
import AuthContextProvider from '@/context/auth-context';
import {getUser} from '@/lib/utils';
import {cookies} from 'next/headers';
import React, {Suspense} from 'react';

const myFont = localFont({
  src: './../public/Fonts/IBMPlexSansArabic-Medium.ttf'
});

export const metadata: Metadata = {
  title: 'SAAS Smart Shipment',
  description: 'Smart Shipment Tracking Platform'
};

async function AuthWrapper({children}: {children: React.ReactNode}) {
  const cookie = await cookies();
  const token = cookie.get('token')?.value;
  const user = token ? getUser(token) : null;
  const value = {user, isAuthenticated: !!user?.id};

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ar' dir='rtl'>
      <body className={`${myFont.className} antialiased`}>
        <ProviderQueryClient>
          <Suspense fallback={null}>
            <AuthWrapper>
              {children}
              <Toaster richColors position='top-right' />
            </AuthWrapper>
          </Suspense>
        </ProviderQueryClient>
      </body>
    </html>
  );
}
