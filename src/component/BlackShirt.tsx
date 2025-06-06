"use client";

import React, { useEffect, useState, useRef } from "react";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import ImageMarqueeSection from "@/component/ImageMarquee";
import InfoSection from "@/component/InfoSection";
import VideoSection from "@/component/VideoSection";
import Button from "@/component/Button";
import { useModal } from "@/context/ModalContext";
import { SHOP_CONTENT_HIM } from "@/constants/content";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function BlackShirt() {
  const { open } = useModal();
  const router = useRouter();
  const [buttonPosition, setButtonPosition] = useState("bottom-48");
  const mainRef = useRef<HTMLElement>(null);
  const currentIndex = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isScrolling = useRef(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 767);
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const handleHomeNavigation = () => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setButtonPosition(scrollTop > 20 ? "bottom-4" : "bottom-48");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isDesktop = window.innerWidth >= 1024;
    const panels = gsap.utils.toArray<HTMLElement>(".panel");
    if (!panels.length) return;

    let scrollTween: gsap.core.Tween | null = null;
    const observer = ScrollTrigger.normalizeScroll(true);

    const cancelTouch = (e: TouchEvent) => {
      if (scrollTween) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    document.addEventListener("touchstart", cancelTouch, {
      capture: true,
      passive: false,
    });

    const goToSection = (index: number) => {
      if (index < 0 || index >= panels.length || scrollTween) return;

      isScrolling.current = true;
      scrollTween = gsap.to(window, {
        scrollTo: { y: panels[index].offsetTop, autoKill: false },
        duration: isMobile ? 0.5 : 1.2,
        ease: "power2.inOut",
        overwrite: "auto",
        onStart: () => {
          observer?.disable();
          observer?.enable();
        },
        onComplete: () => {
          currentIndex.current = index;
          scrollTween = null;
          isScrolling.current = false;
        },
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isDesktop || scrollTween || isScrolling.current) return;
      e.preventDefault();

      let nextIndex = currentIndex.current;
      nextIndex += e.deltaY > 0 ? 1 : -1;
      nextIndex = Math.max(0, Math.min(nextIndex, panels.length - 1));

      if (nextIndex !== currentIndex.current) {
        goToSection(nextIndex);
      }
    };

    let startY: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      if (isDesktop || scrollTween) return;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isDesktop || scrollTween || startY === null || isScrolling.current)
        return;

      const deltaY = startY - e.changedTouches[0].clientY;
      const threshold = 20;

      let nextIndex = currentIndex.current;
      if (deltaY > threshold) nextIndex += 1;
      else if (deltaY < -threshold) nextIndex -= 1;

      nextIndex = Math.max(0, Math.min(nextIndex, panels.length - 1));
      if (nextIndex !== currentIndex.current) {
        goToSection(nextIndex);
      }

      startY = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollTween) e.preventDefault();
    };

    const handleScroll = () => {
      if (isScrolling.current) return;
      const currentPanel = panels.findIndex((panel) => {
        const rect = panel.getBoundingClientRect();
        return (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        );
      });
      if (currentPanel !== -1 && currentPanel !== currentIndex.current) {
        currentIndex.current = currentPanel;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", handleScroll);

    gsap.set(panels, { opacity: 1 });

    panels.forEach((panel) => {
      const children = panel.children;
      gsap.set(children, { y: 50 });

      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        onEnter: () => gsap.to(children, { y: 0, opacity: 1, duration: 0.2 }),
        onEnterBack: () =>
          gsap.to(children, { y: 0, opacity: 1, duration: 0.2 }),
        onLeave: () => gsap.to(children, { y: 50, opacity: 0, duration: 0.2 }),
        onLeaveBack: () =>
          gsap.to(children, { y: 50, opacity: 0, duration: 0.2 }),
      });
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("touchstart", cancelTouch);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mounted, isMobile]);

  return (
    <main
      ref={mainRef}
      className="w-full dark:bg-background-dark min-h-screen flex flex-col"
    >
      <Header
        maxWidthClass="lg:max-w-[806px]"
        onHomeClick={handleHomeNavigation}
      />

      <div className="flex-1">
        {/* HERO SECTION */}
        <section className="panel min-h-[100dvh] relative flex items-center justify-center">
          <div className="absolute inset-0 h-full">
            <VideoSection src="/dress-shop-ad.mov" showArrow={false} />
          </div>
          <div className="absolute bottom-[2.5rem] sm:bottom-[1.5rem] left-1/2 -translate-x-1/2 z-10 text-center px-4 w-full max-w-[806px]">
            <h1 className="text-foreground dark:text-foreground font-metrophobic tracking-wide text-[30px] font-normal leading-[39.5px] pb-2 whitespace-nowrap">
              {SHOP_CONTENT_HIM.product.title}
            </h1>
            <div className="text-foreground dark:text-foreground tracking-wide text-[18px] font-normal leading-[23.2px] font-metrophobic">
              {SHOP_CONTENT_HIM.product.price}
            </div>
          </div>
        </section>

        {/* INTEREST BUTTON */}
        <Button
          position="fixed"
          className={`${buttonPosition} left-1/2 -translate-x-1/2 z-50 transition-[bottom] duration-1000 ease-in-out`}
          onClick={open}
        >
          I am Interested
        </Button>

        {/* INFO SECTIONS */}
        {SHOP_CONTENT_HIM.infoSections.map((section, i) => (
          <section
            key={section.id}
            className={`panel min-h-[100vh] lg:min-h-[100dvh] flex justify-start md:justify-center mx-auto lg:max-w-[806px] px-0 md:px-4 ${i === 0 ? "items-center md:items-center" : "items-start"
              }`}
          >
            <div className="w-full flex flex-col items-start">
              <InfoSection
                id={section.id}
                title={section.title}
                content={section.content}
                image={section.image}
                icon={section.icon}
                reverse={section.reverse}
                className={section.id === "style-section" ? "pb-10" : ""}
              />
              {section.id === "style-section" && (
                <ImageMarqueeSection
                  id="styled-section"
                  images={SHOP_CONTENT_HIM.stylingImages}
                  speed={100}
                />
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="w-full bg-[var(--background)]">
        <div className="max-w-2xl mx-auto lg:max-w-[806px] dark:bg-background-dark">
          <Footer />
        </div>
      </div>
    </main>
  );
}
