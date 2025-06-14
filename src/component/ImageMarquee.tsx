import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

interface ImageMarqueeSectionProps {
  id: string;
  images: string[];
  speed?: number;
  className?: string;
}

const ImageMarqueeSection: React.FC<ImageMarqueeSectionProps> = ({ id, className, images, speed = 20 }) => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDragging, setIsDragging] = useState(false);
  const autoScrollTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const section = sectionRef.current;
    if (!marquee || !section) return;

    // Reset position
    gsap.set(marquee, { x: 0 });

    // Auto scroll function
    const startAutoScroll = () => {
      const maxScroll = -(marquee.scrollWidth / 2);
      
      if (autoScrollTween.current) {
        autoScrollTween.current.kill();
      }

      autoScrollTween.current = gsap.to(marquee, {
        x: maxScroll,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => {
            const max = Math.abs(maxScroll);
            let val = parseFloat(x);
            if (val < -max) val = 0;
            return val;
          })
        }
      });
    };

    // Create draggable instance
    const draggable = Draggable.create(marquee, {
      type: "x",
      bounds: {
        minX: -(marquee.scrollWidth / 2),
        maxX: 0
      },
      inertia: true,
      onDragStart: () => {
        setIsDragging(true);
        if (autoScrollTween.current) {
          autoScrollTween.current.pause();
        }
      },
      onDragEnd: () => {
        setIsDragging(false);
        // Restart auto scroll from current position
        if (autoScrollTween.current) {
          autoScrollTween.current.kill();
          startAutoScroll();
        }
      }
    });

    // Start auto scroll
    startAutoScroll();

    // Handle window resize
    const handleResize = () => {
      if (autoScrollTween.current) {
        autoScrollTween.current.kill();
        startAutoScroll();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      draggable[0].kill();
      if (autoScrollTween.current) {
        autoScrollTween.current.kill();
      }
    };
  }, [images, speed]);

  return (
    <section ref={sectionRef} id={id} className={`${className} w-full bg-lightbeige overflow-hidden`}>
      <div className="w-full">
        <div
          ref={marqueeRef}
          className="flex gap-4 min-w-max cursor-grab active:cursor-grabbing"
        >
          {[...images, ...images, ...images].map((img, idx) => (
            <div 
              key={idx} 
              className="custom-height
w-[274px] h-[342px] relative rounded-[24px] overflow-hidden"
            >
              <Image
                src={img}
                alt={`marquee-img-${idx}`}
                width={274}
                height={342}
                className="            aspect-ratio-mobile
 rounded-lg aspect-[16/4] max-xs:aspect-[4/3] shadow-md object-cover w-full h-full"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageMarqueeSection;