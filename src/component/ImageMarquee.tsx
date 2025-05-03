import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ImageMarqueeSectionProps {
  images: string[];
  speed?: number;
}

const ImageMarqueeSection: React.FC<ImageMarqueeSectionProps> = ({ images, speed = 20 }) => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const autoScrollTween = useRef<gsap.core.Tween | null>(null);
  const mouseTween = useRef<gsap.core.Tween | null>(null);
  const autoScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll logic
  useEffect(() => {
    const marquee = marqueeRef.current;
    const section = sectionRef.current;
    if (!marquee || !section) return;

    // Reset position
    gsap.set(marquee, { x: 0 });

    // Auto-scroll function
    const startAutoScroll = () => {
      const maxScroll = -(marquee.scrollWidth - section.offsetWidth);
      autoScrollTween.current = gsap.to(marquee, {
        x: maxScroll,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => {
            // Looping effect
            const max = Math.abs(maxScroll);
            let val = parseFloat(x);
            if (val < -max) val = 0;
            return val;
          })
        }
      });
    };

    startAutoScroll();

    // Mouse move logic
    const handleMouseMove = (e: MouseEvent) => {
      if (autoScrollTween.current) autoScrollTween.current.pause();
      if (autoScrollTimeout.current) clearTimeout(autoScrollTimeout.current);

      const rect = section.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const maxScroll = -(marquee.scrollWidth - rect.width);
      const targetX = maxScroll * percent;

      if (mouseTween.current) mouseTween.current.kill();
      mouseTween.current = gsap.to(marquee, {
        x: targetX,
        duration: 1.2,
        ease: "power3.out"
      });

      // Resume auto-scroll after 2s of no mouse move
      autoScrollTimeout.current = setTimeout(() => {
        if (autoScrollTween.current) autoScrollTween.current.resume();
      }, 2000);
    };

    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      if (autoScrollTween.current) autoScrollTween.current.kill();
      if (mouseTween.current) mouseTween.current.kill();
      if (autoScrollTimeout.current) clearTimeout(autoScrollTimeout.current);
    };
  }, [images, speed]);

  return (
    <section ref={sectionRef} className="w-full py-8 bg-lightbeige overflow-hidden cursor-pointer">
      <div className="w-full">
        <div
          ref={marqueeRef}
          className="flex gap-4 min-w-max"
        >
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
    </section>
  );
};

export default ImageMarqueeSection;