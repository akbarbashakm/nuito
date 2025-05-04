"use client";

import Header from "@/component/Header";
import VideoSection from "@/component/VideoSection";
import ShopSection from "@/component/Shop";
import Footer from "@/component/Footer";
import TypingText from "@/component/TypingText";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const videoSection = document.querySelector(".video-section");
    if (!videoSection) return;

    ScrollTrigger.create({
      trigger: videoSection,
      start: "top top",
      end: "bottom 70%",
      onLeave: () => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main>
      <Header />
      <VideoSection
        src="/dress-shop-ad.mov"
        showArrow={true}
        heightClass='calc(100vh)'
      />
      <div 
        ref={contentRef}
        className="max-w-[654px] mx-auto snap-y snap-mandatory overflow-y-scroll" 
        style={{ background: '#eaeadb' }}
      >
        <TypingText
          content={[
            { type: "h2", text: "*nu ito •* [nwi.toʊ] *•* (noun)" },
            { type: "p", text: "formed out of" },
            { type: "p", text: 'nu ie. *"New"* and *ito* ie. *"Thread."*' },
            { type: "divider" },
            { type: "h2", text: "The STATUS QUO" },
            { type: "p", text: "We wear our essentials the most—yet they're the most overlooked." },
            { type: "h3", text: "Nu ITO exists to challenge that." },
            { type: "h2", text: "A NEW STANDARD" },
            { type: "p", text: "*We're crafting a capsule wardrobe* that grows with intention—one essential at a time. No seasonal cycles. No fleeting trends." },
            { type: "h3", text: "Only pieces designed to remain relevant forever." },
            { type: "h2", text: "The NU ITO WAY" },
            { type: "p", text: "*Every Nu ITO piece begins with intent — *fabric that feels like second skin, fits that honour real bodies, and design stripped of noise. Quiet, deliberate, and made to stay" },
            { type: "h3", text: "— season after season, wear after wear." },
            { type: "divider" },
          ]}
        />
        <ShopSection />
        <Footer />
      </div>      
    </main>
  );
}
