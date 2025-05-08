"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface InfoSectionProps {
    title: string;
    content: string;
    span?: string;
    image: string;
    reverse?: boolean;
    icon?: string | StaticImport;
    id?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
    title,
    content,
    image,
    reverse = false,
    icon,
    id
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.trigger === section) {
                trigger.kill();
            }
        });

        const isMobile = window.innerWidth <= 768;

        // Create a timeline for better control
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: isMobile ? "top 95%" : "top 90%",
                end: isMobile ? "top 60%" : "top 40%",
                toggleActions: "play none none reverse",
                markers: false,
                once: false
            }
        });

        // Title animation
        tl.fromTo(titleRef.current,
            { 
                opacity: 0, 
                y: isMobile ? 80 : 0,
                x: isMobile ? 0 : (reverse ? 120 : -120),
                scale: isMobile ? 0.9 : 0.85,
                visibility: "hidden",
                rotation: isMobile ? 0 : (reverse ? 5 : -5)
            },
            {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotation: 0,
                visibility: "visible",
                duration: isMobile ? 0.9 : 1,
                delay: isMobile ? 0.1 : 0.2,
                ease: isMobile ? "power3.out" : "power3.out"
            }
        );

        // Content animation with stagger
        const contentElements = contentRef.current?.querySelectorAll('p, span');
        if (contentElements) {
            tl.fromTo(contentElements,
                { 
                    opacity: 0, 
                    y: isMobile ? 50 : 0,
                    autoAlpha: 0,
                    x: isMobile ? 0 : (reverse ? 100 : -100),
                    scale: isMobile ? 0.95 : 0.9,
                    visibility: "hidden"
                },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: 1,
                    visibility: "visible",
                    autoAlpha: 1,
                    duration: isMobile ? 0.8 : 1,
                    stagger: isMobile ? 0.08 : 0.12,
                    ease: "power2.out"
                },
                isMobile ? "-=0.3" : "-=0.5"
            );
        }

        // Image animation with scale
        tl.fromTo(imageRef.current,
            { 
                opacity: 0, 
                y: isMobile ? 100 : 0,
                x: isMobile ? 0 : (reverse ? -120 : 120),
                scale: isMobile ? 0.85 : 0.8,
                autoAlpha: 0,
                visibility: "hidden",
                rotation: isMobile ? 0 : (reverse ? 10 : -10)
            },
            {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotation: 0,
                autoAlpha: 1,
                visibility: "visible",
                duration: isMobile ? 1 : 1,
                ease: isMobile ? "power2.out" : "power3.out"
            },
            isMobile ? "-=0.6" : "-=0.8"
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
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
                gap-10 md:gap-0 py-8 px-4 md:px-8 lg:px-12 transition-all duration-700 bg-lightbeige
                ${reverse ? "md:flex-row-reverse" : ""}
            `}
        >
            <div
                ref={contentRef}
                className={`
                    w-full md:w-1/2 px-4 md:px-0
                    ${reverse ? "md:pl-8" : "md:pr-8"}
                `}
            >
                <h2 
                    ref={titleRef}
                    className="text-3xl text-black/64 md:text-[31px] font-metrophobic mb-4 uppercase flex items-center"
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
                <p className="text-[18px] font-m font-metrophobic md:text-[18px] text-black/64">
                    {content.split('[*').map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                            {lineIndex > 0 && <br />}
                            {line.split(/(\[.*?\])/g).map((part, index) => {
                                if (part.startsWith('[') && part.endsWith(']')) {
                                    const text = part.slice(1, -1);
                                    return (
                                        <span key={index} className="font-medium text-[#212121]">
                                            {text}
                                        </span>
                                    );
                                } else {
                                    return <span key={index} className="font-medium text-[#212121]/60">{part}</span>;
                                }
                            })}
                            {lineIndex < content.split('[*').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </p>
            </div>
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
        </section>
    );
};

export default InfoSection;
