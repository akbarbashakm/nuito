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
  const storySectionRef = useRef<HTMLDivElement>(null);
  const typingTextRef = useRef<HTMLDivElement>(null);
  const shopSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !storySectionRef.current || !shopSectionRef.current || !typingTextRef.current) return;

    const storySection = storySectionRef.current;
    const shopSection = shopSectionRef.current;
    const typingText = typingTextRef.current;

    let typingTimeline: gsap.core.Timeline | null = null;
    let typingTimeout: ReturnType<typeof setTimeout> | null = null;

    // Sticky ScrollTrigger
    ScrollTrigger.create({
      trigger: storySection,
      start: "top top",
      end: () => shopSection.offsetTop - storySection.offsetTop,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      pinType: "fixed",
      onEnter: () => {
        // 1 sec delay, then start TypingText animation
        typingTimeout = setTimeout(() => {
          if (typingTimeline) typingTimeline.kill();

          // Convert NodeList to Array
          const typingElements = Array.from(typingText.querySelectorAll(".typing-text-animate"));
          if (typingElements.length === 0) return;

          typingTimeline = gsap.timeline();
          typingTimeline.fromTo(
            typingElements,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }
          );
        }, 1000);
      },
      onLeaveBack: () => {
        // Reset animation if needed
        if (typingTimeline) typingTimeline.kill();

        // Convert NodeList to Array
        const typingElements = Array.from(typingText.querySelectorAll(".typing-text-animate"));
        if (typingElements.length === 0) return;

        gsap.set(typingElements, { opacity: 0, y: 30 });
        if (typingTimeout) clearTimeout(typingTimeout);
      }
    });

    // Video section scroll behavior
    const videoSection = document.querySelector(".video-section");
    if (videoSection) {
      ScrollTrigger.create({
        trigger: videoSection,
        start: "top top",
        end: "bottom bottom",
        onLeave: () => {
          if (contentRef.current) {
            contentRef.current.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }
        }
      });
    }

    // Refresh on resize & orientationchange for mobile
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
      if (typingTimeline) typingTimeline.kill();
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, []);

  return (
    <main>
      <Header />
      <VideoSection
        src="/dress-shop-ad.mov"
        showArrow={true}
        heightClass=''
        nextSectionId="story-container"
      />
      <div
        ref={contentRef}
        className="max-w-[654px] pos mx-auto"
        style={{ background: '#eaeadb' }}
        id="story-container"
      >
        <div
          ref={storySectionRef}
          className="snap-center sticky top-0 z-10 bg-[#eaeadb] py-8 pb-0"
        >
          <div ref={typingTextRef} className="py-4">
            <TypingText
              content={[
                // { type: "divider" },
                { type: "h2", text: "The STATUS QUO" },
                { type: "p", text: "We wear our essentials the most—yet they’re the most overlooked. *The world offers a false choice:* cheap basics or luxury pieces that offer little beyond their label." },
                { type: "h3", text: "Nu ITO exists to challenge that." },
                { type: "h2", text: "A NEW STANDARD" },
                { type: "p", text: "*We're crafting a capsule wardrobe* that grows with intention—one essential at a time. No seasonal cycles. No fleeting trends." },
                { type: "h3", text: "Only pieces designed to remain relevant forever." },
                { type: "h2", text: "The NU ITO WAY" },
                { type: "h2", text: "*nu ito •* [nwi.toʊ] *•* (noun)" },
                { type: "p", text: "formed out of" },
                { type: "p", text: 'nu ie. *"New"* and *ito* ie. *"Thread."*' },
                { type: "p", text: "*Every Nu ITO piece begins with intent — *fabric that feels like second skin, fits that honour real bodies, and design stripped of noise. Quiet, deliberate, and made to stay" },
                { type: "h3", text: "— season after season, wear after wear." },
                { type: "divider" },
              ]}
            />
          </div>
        </div>
        <div ref={shopSectionRef} className="min-h-screen pt-0">
          <ShopSection id="chapter-1" />
          <Footer className="pt-10" />
        </div>
      </div>
    </main>
  );
}
