'use client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {ReactNode} from 'react';
interface IProviderQueryClient {
  children: ReactNode;
}
const ProviderQueryClient = ({children}: IProviderQueryClient) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ProviderQueryClient;
