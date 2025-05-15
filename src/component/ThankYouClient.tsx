"use client";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ThankYouPage() {
  const tickRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Add wave animation styles
    const style = document.createElement("style");
    style.textContent = `
      @keyframes wave {
        0% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-8px) rotate(2deg); }
        50% { transform: translateY(0) rotate(0deg); }
        75% { transform: translateY(8px) rotate(-2deg); }
        100% { transform: translateY(0) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Tick animation
    const path = tickRef.current?.querySelector("path");
    const svg = tickRef.current;

    if (path && svg) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = len.toString();
      path.style.strokeDashoffset = len.toString();

      setTimeout(() => {
        path.style.transition =
          "stroke-dashoffset 0.7s cubic-bezier(.4,2,.6,1)";
        path.style.strokeDashoffset = "0";

        // Zoom in animation using GSAP
        gsap.fromTo(
          svg,
          { scale: 0.2, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          }
        );
      }, 200);
    }

    // Fade animations
    const tl = gsap.timeline();

    if (contentRef.current) {
      tl.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    if (titleRef.current) {
      tl.from(
        titleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }

    if (productRef.current) {
      tl.from(
        productRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    if (descriptionRef.current) {
      tl.from(
        descriptionRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
      <Header scrolledEffect={false} />
      <main
        ref={contentRef}
        className="lg:max-w-[726px] mx-auto flex-1 flex flex-col items-center justify-center pt-30 bg-background dark:bg-background-dark"
      >
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-3xl mb-8">
          <div className="py-28 flex-1 flex flex-col items-center justify-center">
            <div className="relative md:right-[60px] md:translate-x-1 md:transform bg-green-400 rounded-full transition-all duration-500 ease-in-out w-24 h-24 flex items-center justify-center mb-6">
              <svg
                ref={tickRef}
                width="75"
                height="75"
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
              <div
                ref={flowerRef}
                className="absolute top-0 left-0 w-full h-full"
              ></div>
            </div>
          </div>

          <div
            className="relative 
              md:w-1/2 flex flex-col items-center justify-center text-center
              before:hidden md:before:block
              before:absolute before:-left-10 before:top-0 
              before:h-full before:w-px before:bg-[#868686] dark:before:bg-gray-700
              before:content-['']"
          >
            <h2
              ref={titleRef}
              className="text-[32px] px-6 font-normal font-metrophobic tracking-[1px] pt-4 pb-6 text-foreground dark:text-foreground mb-2"
            >
              {"Thank you for your".split("").map((letter, index) => (
                <span
                  key={index}
                  className="inline-block text-foreground dark:text-foreground"
                  style={{
                    animation: `wave 1.2s ease-in-out ${index * 0.08}s forwards`,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
              <br />
              {"interest in".split("").map((letter, index) => (
                <span
                  key={`interest-${index}`}
                  className="inline-block text-foreground dark:text-foreground"
                  style={{
                    animation: `wave 1.2s ease-in-out ${
                      (index + "Thank you for your".length) * 0.08
                    }s forwards`,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h2>
            <div
              ref={productRef}
              className="text-center mb-8"
            >
              <p className="font-normal font-avenir text-left text-foreground dark:text-foreground text-[18px]">
                  Black Crew Tee | Him
                </p>
              <p className="font-normal font-avenir text-left text-foreground dark:text-foreground text-[14px] pt-2">
                ₹1999
                </p>
            </div>
            <p
              ref={descriptionRef}
              className="font-normal font-metrophobic text-foreground dark:text-foreground text-[18px] mt-2 pt-8 p-4"
            >
              We will get back to you shortly with the next steps.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
