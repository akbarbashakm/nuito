"use client";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

export default function ThankYouPage() {
  const tickRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Tick animation
    const path = tickRef.current?.querySelector("path");
    if (path) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = len.toString();
      path.style.strokeDashoffset = len.toString();
      setTimeout(() => {
        path.style.transition = "stroke-dashoffset 0.7s cubic-bezier(.4,2,.6,1)";
        path.style.strokeDashoffset = "0";
      }, 200);
    }

    // Fade animations
    const tl = gsap.timeline();
    
    // Container fade in
    if (contentRef.current) {
      tl.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
      });
    }
    
    // Title fade in
    if (titleRef.current) {
      tl.from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");
    }
    
    // Product fade in
    if (productRef.current) {
      tl.from(productRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");
    }
    
    // Description fade in
    if (descriptionRef.current) {
      tl.from(descriptionRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");
    }

    // Hide confetti after 5 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      tl.kill();
      clearTimeout(confettiTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f6]">
      <Header scrolledEffect={false} />
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={600}
          gravity={0.3}
          wind={0.05}
          colors={['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA']}
        />
      )}
      <main ref={contentRef} className="lg:max-w-[726px] mx-auto flex-1 flex flex-col items-center justify-center pt-30">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-3xl mb-8">
          <div className="py-28 flex-1 flex flex-col items-center justify-center">
            <div className="relative md:right-[60px] md:translate-x-1 md:transform bg-green-400 rounded-full w-24 h-24 flex items-center justify-center mb-6">
              <svg
                ref={tickRef}
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 13l4 4 8-8"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: 100,
                  }}
                />
              </svg>
              <div ref={flowerRef} className="absolute top-0 left-0 w-full h-full"></div>
            </div>
          </div>

          <div className="relative 
            md:w-1/2 flex flex-col items-center justify-center text-center
            before:hidden md:before:block
            before:absolute before:-left-10 before:top-0 
            before:h-full before:w-px before:bg-[#868686]
            before:content-['']"
          >
            <h2 ref={titleRef} className="text-[32px] px-6 font-normal font-metrophobic tracking-[1px] pt-4 pb-6 text-black mb-2">
              Thank you for your interest in
            </h2>

            <div ref={productRef} className="flex items-center gap-4 mb-2">
              <Image src="/t-black.png" alt="Black Tee" width={116} height={167} className="rounded" />
              <div>
                <p className="font-normal font-avenir text-left text-black text-[18px]">Black Crew Tee  |  Him</p>
                <p className="font-normal font-avenir text-left text-black text-[14px] pt-2">₹ 1999</p>
              </div>
            </div>

            <p ref={descriptionRef} className="font-normal font-metrophobic text-black text-[18px] mt-2 pt-8 p-4">
              We will be in touch with you shortly.<br />
              Our fit consultant will call you and explain to you about our fit and then we will ship the product within 2 working days.
            </p>
          </div>
        </div>
        {/* Logo/Footer Section */}
        <Footer />
      </main>
    </div>
  );
}