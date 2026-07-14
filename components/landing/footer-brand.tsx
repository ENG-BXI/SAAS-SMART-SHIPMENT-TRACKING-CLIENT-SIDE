'use client';

import {useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterBrand() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const text = textRef.current;

      if (!wrapper || !text) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          text,
          {y: 250, scale: 0.75, opacity: 0, filter: 'blur(25px)'},
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 80%',
              end: 'center center',
              scrub: 1.5
            }
          }
        );

        gsap.fromTo(
          glowRef.current,
          {scale: 0.5, opacity: 0},
          {
            scale: 1.3,
            opacity: 1,
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 80%',
              end: 'center center',
              scrub: 1
            }
          }
        );

        gsap.fromTo(
          wrapper,
          {clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'},
          {
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 90%',
              end: 'top 30%',
              scrub: 1.2
            }
          }
        );
      }, wrapper);

      return () => ctx.revert();
    },
    {scope: wrapperRef}
  );

  return (
    <div ref={wrapperRef} className='relative flex h-90 items-end justify-center overflow-hidden border-t border-zinc-900'>
      <div ref={glowRef} className='absolute left-1/2 top-1/2 min-h-75 min-w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0B0B0B] blur-[120px]' />

      <h2 ref={textRef} className='relative z-10 select-none whitespace-nowrap text-center text-[clamp(4rem,15vw,13rem)] font-black leading-none tracking-[-0.08em] bg-linear-to-b from-zinc-200 via-zinc-500 to-zinc-900 bg-clip-text text-transparent'>
        S3 Tracking System
      </h2>
    </div>
  );
}
