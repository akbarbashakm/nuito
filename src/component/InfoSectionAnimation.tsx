"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface InfoSectionProps {
  title: string;
  content: string;
  span?: string;
  image?: string;
  reverse?: boolean;
  icon?: string | StaticImport;
  id?: string;
}

const InfoSectionAnimation: React.FC<InfoSectionProps> = ({
  title,
  content,
  image,
  reverse = false,
  icon,
  id,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === section) {
        trigger.kill();
      }
    });

    const isMobile = window.innerWidth <= 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: isMobile ? "top 95%" : "top 90%",
        end: isMobile ? "top 60%" : "top 40%",
        toggleActions: "play none none reverse",
        markers: false,
        once: false,
      },
    });

    // Title and content animation
    tl.fromTo(
      [titleRef.current, contentRef.current],
      {
        opacity: 0,
        y: isMobile ? 50 : 0,
        x: (index) => {
          if (isMobile) return 0;
          if (index === 0) return reverse ? 120 : -120; // title
          return reverse ? 100 : -100; // content
        },
        scale: isMobile ? 0.8 : 0.85,
        visibility: "hidden",
        rotation: (index) => {
          if (isMobile) return 0;
          if (index === 0) return reverse ? 5 : -5; // title
          return 0; // content
        },
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotation: 0,
        visibility: "visible",
        duration: isMobile ? 0.7 : 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }
    );

    // Separate image animation with enhanced effects
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: isMobile ? 0.9 : 0.8,
          y: isMobile ? 100 : 0,
          x: isMobile ? 0 : (reverse ? 100 : -100),
          rotation: isMobile ? 0 : (reverse ? 15 : -15),
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          x: 0,
          rotation: 0,
          filter: "blur(0px)",
          duration: isMobile ? 0.8 : 1,
          ease: isMobile ? "power2.out" : "power3.out",
        },
        "<0.2" // Start slightly after the content animation
      );
    }

    // Content elements stagger animation
    const contentElements =
      contentRef.current?.querySelectorAll("p, span, strong");
    if (contentElements) {
      tl.fromTo(
        contentElements,
        {
          opacity: 0,
          y: 20,
          scale: 0.85,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        },
        "<"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [id, reverse]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`
                w-full flex flex-col md:flex-row items-end justify-between
                gap-10 md:gap-0 py-12 px-4 md:px-8 lg:px-12 transition-all duration-700 dark:bg-background-dark
                ${reverse ? "md:flex-row-reverse" : ""}
            `}
    >
      <div
        ref={contentRef}
        className={`
                    w-full md:w-${image ? "1/2" : "full"} px-4 md:px-0
                    ${reverse ? "md:pl-8" : "md:pr-8"}
                `}
      >
        <h2
          ref={titleRef}
          className="text-3xl md:text-[31px] font-metrophobic mb-4 uppercase flex items-center text-secondary-textColor dark:text-secondary-textColor"
        >
          {icon && (
            <Image
              src={icon}
              alt="icon"
              width={32}
              height={32}
              className="mr-2 inline-block"
            />
          )}
          {title}
        </h2>
        <p className="text-[18px] font-metrophobic md:text-[18px] text-secondary-textColor dark:text-secondary-textColor">
          {content.split("\n").map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {lineIndex > 0 && <br />}
              {line.split(/(\*.*?\*|\[.*?\])/g).map((part, index) => {
                if (part.startsWith("*") && part.endsWith("*")) {
                  const text = part.slice(1, -1);
                  return (
                    <strong key={index} className="font-semibold text-foreground dark:text-foreground">
                      {text}
                    </strong>
                  );
                } else if (part.startsWith("[") && part.endsWith("]")) {
                  const text = part.slice(1, -1);
                  return (
                    <span key={index} className="font-normal text-foreground dark:text-foreground">
                      {text}
                    </span>
                  );
                } else {
                  return (
                    <span key={index} className="font-normal text-secondary-textColor dark:text-secondary-textColor">
                      {part}
                    </span>
                  );
                }
              })}
            </React.Fragment>
          ))}
        </p>
      </div>
      {image && (
        <div
          ref={imageRef}
          className={`
                        w-full md:w-1/2 flex justify-center items-center px-4 md:px-8
                        ${reverse ? "md:pr-8" : "md:pl-8"}  
                    `}
        >
          <Image
            src={image}
            alt={title}
            width={412}
            height={431}
            className="rounded-lg shadow-lg object-cover w-full max-w-[412px]"
          />
        </div>
      )}
    </section>
  );
};

export default InfoSectionAnimation;
