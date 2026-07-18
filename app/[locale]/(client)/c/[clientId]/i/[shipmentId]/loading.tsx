'use client';

import {useEffect} from 'react';
import gsap from 'gsap';

const Loading = () => {
  useEffect(() => {
    gsap.fromTo(
      '.skeleton-element',
      {y: 40, opacity: 0, scale: 0.98},
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: 'expo.out'
      }
    );
  }, []);

  return (
    <div dir='ltr' className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <div className='space-y-8'>
        <header className='space-y-4 skeleton-element'>
          <div className='h-4 w-32 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative skeleton-shimmer' />
          <div className='space-y-3'>
            <div className='h-8 w-64 rounded-md bg-slate-200 dark:bg-slate-800 overflow-hidden relative skeleton-shimmer' />
            <div className='h-4 w-full max-w-2xl rounded-full bg-slate-100 dark:bg-slate-800/50 overflow-hidden relative skeleton-shimmer' />
            <div className='h-4 w-3/4 max-w-xl rounded-full bg-slate-100 dark:bg-slate-800/50 overflow-hidden relative skeleton-shimmer' />
          </div>
        </header>

        <div className='skeleton-element relative h-28 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm'>
          <div className='absolute inset-0 skeleton-shimmer' />
          <div className='absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 rounded-full bg-slate-100 dark:bg-slate-800'>
            <div className='h-full w-1/3 rounded-full bg-green-500/20' />
          </div>
        </div>

        <div className='grid gap-6 xl:grid-cols-[1.6fr_0.95fr]'>
          <div className='skeleton-element h-[350px] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm relative'>
            <div className='absolute inset-0 skeleton-shimmer' />
          </div>
          <div className='skeleton-element h-[350px] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm relative'>
            <div className='absolute inset-0 skeleton-shimmer' />
          </div>
        </div>

        <div className='skeleton-element h-32 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm relative'>
          <div className='absolute inset-0 skeleton-shimmer' />
        </div>

        <div className='skeleton-element relative h-[450px] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-sm'>
          <div className='absolute inset-0 opacity-20' style={{backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
          <div className='absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-green-500/10 to-green-500/30 animate-[map-scan_3s_ease-in-out_infinite] border-b border-green-500/50' />
        </div>

        <div className='skeleton-element h-48 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm relative'>
          <div className='absolute inset-0 skeleton-shimmer' />
        </div>
      </div>

      <style jsx>{`
        .skeleton-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.4) 20%, rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0) 100%);
          animation: shimmer 2s infinite;
        }

        @media (prefers-color-scheme: dark) {
          .skeleton-shimmer::after {
            background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.05) 20%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 100%);
          }
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes map-scan {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(500px);
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
