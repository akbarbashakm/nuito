"use client";

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

gsap.registerPlugin(ScrollTrigger);

const ShopSection = ({ id }: { id: string }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
            offset: 100
        });

        const section = sectionRef.current;
        if (!section) return;

        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.trigger === section) {
                trigger.kill();
            }
        });

        const isMobile = window.innerWidth <= 768;

        // Create scroll trigger
        ScrollTrigger.create({
            trigger: section,
            start: "top 95%",
            end: "top 60%",
            toggleActions: "play reverse play reverse",
            markers: false,
            once: false,
            onEnter: () => {
                // Title animation
                gsap.to(titleRef.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    visibility: "visible",
                    duration: isMobile ? 0.7 : 0.9,
                    ease: "power3.out"
                });

                // Subtitle animation
                gsap.to(subtitleRef.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    visibility: "visible",
                    duration: isMobile ? 0.6 : 0.8,
                    delay: isMobile ? 0.05 : 0.1,
                    ease: "power2.out"
                });

                // Image animation
                gsap.to(imageRef.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    visibility: "visible",
                    duration: isMobile ? 0.8 : 1,
                    delay: isMobile ? 0.1 : 0.2,
                    ease: "power2.out"
                });

                // Content animation
                const contentElements = contentRef.current?.querySelectorAll('div');
                if (contentElements) {
                    gsap.to(contentElements, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        visibility: "visible",
                        duration: isMobile ? 0.6 : 0.8,
                        delay: isMobile ? 0.15 : 0.3,
                        stagger: isMobile ? 0.05 : 0.08,
                        ease: "power2.out"
                    });
                }
            },
            onLeaveBack: () => {
                // Reset animations
                gsap.to([titleRef.current, subtitleRef.current, imageRef.current], {
                    opacity: 0,
                    y: isMobile ? 100 : 0,
                    x: isMobile ? 0 : 10,
                    scale: isMobile ? 0.85 : 0.8,
                    visibility: "hidden",
                    duration: isMobile ? 0.4 : 0.6,
                    ease: "power3.out"
                });

                const contentElements = contentRef.current?.querySelectorAll('div');
                if (contentElements) {
                    gsap.to(contentElements, {
                        opacity: 0,
                        y: isMobile ? 20 : 10,
                        scale: isMobile ? 0.85 : 0.95,
                        visibility: "hidden",
                        duration: isMobile ? 0.4 : 0.6,
                        stagger: isMobile ? 0.03 : 0.05,
                        ease: "power3.out"
                    });
                }
            }
        });

        // Set initial states
        gsap.set([titleRef.current, subtitleRef.current, imageRef.current], {
            opacity: 0,
            y: isMobile ? 20 : 10,
            scale: isMobile ? 0.8 : 0.9,
            visibility: "hidden"
        });

        const contentElements = contentRef.current?.querySelectorAll('div');
        if (contentElements) {
            gsap.set(contentElements, {
                opacity: 0,
                y: isMobile ? 20 : 10,
                scale: isMobile ? 0.85 : 0.95,
                visibility: "hidden"
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === section) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <main className="w-full" id={id}>
            <div
                ref={sectionRef}
                className="space-y-10 max-w-2xl mx-auto lg:max-w-[806px]"
                style={{ background: '#eaeadb' }}
            >
                <h2
                    ref={titleRef}
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="text-[32px] uppercase text-center font-metrophobic text-black/64"
                >
                    Drop 01
                </h2>
                <h4
                    ref={subtitleRef}
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="text-[24px] leading-[39px] text-black text-center font-metrophobic"
                >
                    &ldquo;MONOCHROME MAGIC <br />
                    – 50 pieces. <br /> Black, white, and gone&rdquo; .
                </h4>
                <div
                    ref={imageRef}
                    className="w-full"
                    data-aos="zoom-in"
                    data-aos-delay="300"
                >
                    <Image
                        src={`/teespics.svg`}
                        layout="intrinsic"
                        width={348}
                        height={274}
                        alt="t-shirt"
                        className="w-full px-4 sm:w-[500px] max-w-full h-auto mx-auto"
                    />
                </div>
                <div
                    ref={contentRef}
                    className="grid grid-cols-2 px-2 text-center sm:px-2 md:px-12"
                >
                    {/* Left Tee */}
                    <div>
                        <p className="text-sm leading-[20px] font-normal font-avenir text-[#060606]">Black Crew Tee</p>
                        <Button onClick={() => router.push('/shop')}>
                            Shop for HIM
                        </Button>
                        <p className="text-sm pt-2 leading-[20px] font-normal font-avenir text-[#060606]">Structured. Refined. Essential.</p>
                    </div>
                    <div>
                        <p className="text-sm leading-[20px] font-normal font-avenir text-[#060606]">White Drape Tee</p>
                        <Button onClick={() => router.push('/shop')}>
                            Shop for HER
                        </Button>
                        <p className="text-sm pt-2 leading-[20px] font-normal font-avenir text-[#060606]">Fluid. Feminine. Essential.</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ShopSection;
