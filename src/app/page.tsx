'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import TypingText from '@/component/TypingText';
import VideoSection from '@/component/VideoSection';
import ShopSection from '@/component/Shop';
import Footer from '@/component/Footer';
import Header from '@/component/Header';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const currentIndex = useRef(0);
  const [isClient, setIsClient] = useState(false);

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle scroll animations and scroll logic
  useEffect(() => {
    if (!isClient) return; // Skip if not client-side rendering

    const isMobile = window.innerWidth < 767; // Detect mobile screen size
    const panels = gsap.utils.toArray<HTMLElement>('.panel');
    if (!panels.length) return;

    let scrollTween: gsap.core.Tween | null = null;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const observer = ScrollTrigger.normalizeScroll(true);

    const cancelTouch = (e: TouchEvent) => {
      if (scrollTween) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    document.addEventListener('touchstart', cancelTouch, { capture: true, passive: false });

    // Go to the specified section
    const goToSection = (index: number) => {
      if (index < 0 || index >= panels.length || scrollTween) return;

      scrollTween = gsap.to(window, {
        scrollTo: { y: panels[index].offsetTop, autoKill: false },
        duration: isMobile ? 0.5 : 1, // Adjust duration based on mobile/desktop
        ease: 'power2.inOut',
        overwrite: true,
        onStart: () => {
          observer?.disable();
          observer?.enable();
        },
        onComplete: () => {
          scrollTween = null;
          currentIndex.current = index;
        },
      });
    };

    // Wheel scroll event for desktop
    const handleWheel = (e: WheelEvent) => {
      if (scrollTween || scrollTimeout) return;

      if (e.deltaY > 0) {
        goToSection(currentIndex.current + 1);
      } else if (e.deltaY < 0) {
        goToSection(currentIndex.current - 1);
      }

      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 1000);
    };

    let startY: number | null = null;

    // Touch start event for mobile
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    // Touch end event for mobile
    const handleTouchEnd = (e: TouchEvent) => {
      if (scrollTween || startY === null) return;

      const deltaY = startY - e.changedTouches[0].clientY;
      const threshold = 10;

      if (deltaY > threshold) {
        goToSection(currentIndex.current + 1);
      } else if (deltaY < -threshold) {
        goToSection(currentIndex.current - 1);
      }

      startY = null;
    };

    // Prevent scroll move
    const handleTouchMove = (e: TouchEvent) => {
      if (scrollTween) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // GSAP scroll animations for the panels
    panels.forEach((panel) => {
      gsap.from(panel.children, {
        opacity: 0,
        y: isMobile ? 0 : 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: panel,
          start: 'top center',
          toggleActions: 'play none none none',
        },
      });
    });

    // Update the scroll position
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        currentIndex.current = Math.round(self.scroll() / window.innerHeight);
      },
    });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', cancelTouch);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isClient]); // Run this useEffect only when isClient changes

  // Prevent rendering on SSR
  if (!isClient) return null;

  return (
    <main>
      <section className="panel h-screen flex items-center justify-center">
        <Header />
        <VideoSection
          src="/dress-shop-ad.mov"
          showArrow
          heightClass=""
          nextSectionId="story-container"
        />
      </section>

      <section id="story-section" className="panel h-screen flex items-center justify-center max-w-[654px] mx-auto">
        <TypingText
          content={[
            { type: 'h2', text: 'THE /n STATUS QUO' },
            {
              type: 'p',
              text: 'We wear our essentials the most—yet they’re the most overlooked. *The world offers a false choice:* cheap basics or luxury pieces that offer little beyond their label.',
            },
            { type: 'h3', text: 'Nu ITO exists to challenge that.' },
          ]}
        />
      </section>

      <section className="panel h-screen flex items-center justify-center max-w-[654px] mx-auto">
        <TypingText
          content={[
            { type: 'h2', text: 'A /n NEW STANDARD' },
            {
              type: 'p',
              text: "*We're crafting a capsule wardrobe* that grows with intention—one essential at a time. No seasonal cycles. No fleeting trends.",
            },
            { type: 'h3', text: 'Only pieces designed to remain relevant forever.' },
          ]}
        />
      </section>

      <section className="panel h-screen flex items-center justify-center max-w-[654px] mx-auto">
        <TypingText
          content={[
            { type: 'h2', text: 'THE /n NU ITO WAY' },
            { type: 'h2', text: '*nu ito •* [nwi.toʊ] *•* (noun)' },
            { type: 'p', text: 'formed out of' },
            { type: 'h3', text: 'nu ie. *"New"* and *ito* ie. *"Thread."' },
            {
              type: 'p',
              text: '*Every Nu ITO piece begins with intent — *fabric that feels like second skin, fits that honour real bodies, and design stripped of noise. Quiet, deliberate, and made to stay',
            },
            { type: 'h3', text: '— season after season, wear after wear.' },
          ]}
          className="mt-8"
        />
      </section>

      <section className="panel h-screen flex items-center justify-center mx-auto">
        <ShopSection id="chapter-1" />
      </section>

      <section className="max-w-[654px] mx-auto">
        <Footer className="pt-10" />
      </section>
    </main>
  );
}
