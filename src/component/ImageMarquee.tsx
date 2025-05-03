"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface ImageMarquee {
  images: string[];
  speed?: number; // seconds for one loop
}

const ImageMarqueeSection: React.FC<ImageMarquee> = ({
  images,
  speed = 20,
}) => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // Pause animation on hover or scroll, resume on mouse leave
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const handleMouseEnter = () => marquee.style.animationPlayState = "paused";
    const handleMouseLeave = () => marquee.style.animationPlayState = "running";
    const handleScroll = () => marquee.style.animationPlayState = "paused";

    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);
    marquee.addEventListener("scroll", handleScroll);

    return () => {
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
      marquee.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Optional: Snap to start if user scrolls to end (for extra smoothness)
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const handleScroll = () => {
      // If user scrolls to end, reset scrollLeft to start (seamless loop)
      if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
        marquee.scrollLeft = 0;
      }
      // If user scrolls to start (negative), jump to middle
      if (marquee.scrollLeft === 0) {
        // (Optional: Uncomment if you want to allow reverse seamless loop)
        // marquee.scrollLeft = marquee.scrollWidth / 2;
      }
    };
    marquee.addEventListener("scroll", handleScroll);
    return () => marquee.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full py-8 bg-lightbeige overflow-hidden">
      <div className="w-full">
        <div
          ref={marqueeRef}
          className="flex gap-4 animate-marquee overflow-x-auto scrollbar-hide min-w-max"
          style={{
            animationDuration: `${speed}s`,
          }}
          tabIndex={0}
        >
          {/* Duplicate images for seamless loop */}
          {[...images, ...images].map((img, idx) => (
            <div key={idx} className="flex-shrink-0">
              <Image
                src={img}
                alt={`marquee-img-${idx}`}
                width={312}
                height={515}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(10%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ImageMarqueeSection;