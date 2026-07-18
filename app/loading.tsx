'use client';

import {useEffect, useRef} from 'react';
import gsap from 'gsap';

export default function MasterpieceLoader() {
  const words = ['shipments', 'drivers', 'customers', 'tracking', 'reports'];

  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const masterTl = gsap.timeline({repeat: -1});

    words.forEach((_, i) => {
      const chars = document.querySelectorAll(`.word-${i} .char-inner`);
      const bgNum = document.querySelector(`.bg-num-${i}`);

      const tl = gsap.timeline();

      tl.fromTo(bgNum, {opacity: 0, scale: 0.7, y: 50}, {opacity: 0.05, scale: 1, y: 0, duration: 1.5, ease: 'expo.out'}, 0);

      tl.fromTo(
        chars,
        {yPercent: 120, rotationZ: 15, opacity: 0},
        {
          yPercent: 0,
          rotationZ: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 1.2,
          ease: 'power4.out'
        },
        0.1
      );

      tl.to({}, {duration: 0.8});

      tl.to(
        chars,
        {
          yPercent: -120,
          rotationZ: -10,
          opacity: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: 'power3.in'
        },
        '+=0'
      );

      tl.to(bgNum, {opacity: 0, scale: 1.1, filter: 'blur(10px)', duration: 0.8}, '<');

      masterTl.add(tl);
    });

    masterTl.eventCallback('onUpdate', () => {
      if (counterRef.current) {
        const progress = Math.round(masterTl.progress() * 100);
        counterRef.current.innerText = progress.toString().padStart(2, '0');
      }
    });

    return () => {
      masterTl.kill();
    };
  }, [words.length]);

  return (
    <div dir='ltr' ref={containerRef} className='relative flex h-screen w-full items-center justify-center bg-[#030305] text-white font-sans overflow-hidden'>
      <div className='absolute inset-0 opacity-[0.15]' style={{backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)', backgroundSize: '4rem 4rem'}} />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen' />
      <div className='absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-emerald-500/50' />
      <div className='absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-emerald-500/50' />
      <div className='absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-emerald-500/50' />
      <div className='absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-emerald-500/50' />
      <div className='relative z-10 w-full max-w-5xl px-6'>
        {/* الحاوية التي تحمل الكلمات والأرقام (Absolute Stacking) */}
        <div className='relative h-[200px] sm:h-[250px] w-full flex items-center justify-center'>
          {words.map((word, i) => (
            <div key={word} className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <span
                className={`bg-num-${i} absolute text-[15rem] sm:text-[25rem] font-black tracking-tighter text-transparent select-none opacity-0`}
                style={{WebkitTextStroke: '2px rgba(16, 185, 129, 0.8)'}} // Emerald stroke
              >
                0{i + 1}
              </span>

              <div className={`word-${i} relative z-10 flex text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]`}>
                {word.split('').map((char, charIdx) => (
                  <div key={charIdx} className='overflow-hidden inline-flex pt-2 px-[1px]'>
                    <span className='char-inner inline-block will-change-transform origin-bottom-left'>{char}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='absolute bottom-12 left-12 md:bottom-16 md:left-16 flex items-baseline space-x-2'>
          <div className='text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase mb-1'>System Load</div>
          <div className='text-4xl md:text-6xl font-light text-white flex items-start'>
            <span ref={counterRef}>00</span>
            <span className='text-emerald-500 text-2xl ml-1'>%</span>
          </div>
        </div>

        <div className='absolute bottom-12 right-12 md:bottom-16 md:right-16 w-32 h-[1px] bg-white/20 overflow-hidden'>
          <div className='w-full h-full bg-emerald-400 animate-[scan_2s_ease-in-out_infinite]' />
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
