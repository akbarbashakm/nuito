"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface HeaderProps {
    maxWidthClass?: string;
    scrolledEffect?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    maxWidthClass = "lg:max-w-[654px]",
    scrolledEffect = true,
}) => {
    const [scrolled, setScrolled] = useState(false);
    const [logoLoaded, setLogoLoaded] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!scrolledEffect) return;
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolledEffect]);

    useEffect(() => {
        setLogoLoaded(false);
        const timer = setTimeout(() => {
            setLogoLoaded(true);
        }, 300);
        return () => clearTimeout(timer);
    }, [scrolled]);

    const handleSectionClick = async (sectionId: string) => {
        const isHomeOrThankYou = pathname === '/' || pathname === '/thank-you';
        const headerHeight =  20;
        const targetPath = isHomeOrThankYou ? `/#${sectionId}` : `/shop#${sectionId}`;
        
        // If we're already on the correct page, just scroll
        if (pathname === targetPath.split('#')[0]) {
            const element = document.getElementById(sectionId);
            if (element) {
                const elementPosition = element.offsetTop;
                window.scrollTo({ 
                    top: elementPosition - headerHeight, 
                    behavior: 'smooth' 
                });
            }
        } else {
            // Navigate to new page and scroll after navigation
            await router.push(targetPath);
            // Wait for the page to load and element to be available
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const elementPosition = element.offsetTop;
                    window.scrollTo({ 
                        top: elementPosition - headerHeight, 
                        behavior: 'smooth' 
                    });
                }
            }, 100);
        }
    };
      

    const effectiveScrolled = scrolledEffect ? scrolled : true;

    return (
        <header
            className={`fixed top-0 w-full py-2 flex items-center z-50 transition-all duration-500 ease-in-out ${effectiveScrolled
                ? "h-[48px] shadow-md justify-between px-8 backdrop-blur-sm"
                : "h-[108px] justify-center"
                }`}
            style={{
                background: effectiveScrolled ? "rgba(240, 241, 226, 0.8)" : "transparent",
            }}
        >
            <div className={`${maxWidthClass} flex w-full justify-between items-center mx-auto`}>
                <div
                    className={`transition-all duration-500 ${effectiveScrolled ? "transform translate-x-0" : "mx-auto"
                        }`}
                >
                    <Link href="/">
                            <Image
                                src={effectiveScrolled ? "/logo-black.svg" : "/logo-white.svg"}
                                alt="Logo"
                                width={effectiveScrolled ? 76 : 104}
                                height={effectiveScrolled ? 26 : 74}
                                layout="intrinsic"
                                className={`transition-all duration-500 cursor-pointer
                                ${effectiveScrolled ? 'w-[76px] h-[26px]' : 'w-[104px] h-[74px]'} 
                                sm:w-[104px] sm:h-[74px] ${!effectiveScrolled ? `transform ${logoLoaded ? 'scale-100' : 'scale-0'} transition-transform duration-1000` : ''}`}
                            />
                    </Link>
                </div>
                <nav
                    className={`flex gap-[12px] transition-all duration-500 ${effectiveScrolled ? "block visible" : "hidden"
                        }`}
                >
                    {pathname === '/shop' ? (
                        <>
                            <button
                                onClick={() => handleSectionClick('story-section')}
                                className="relative text-black/64 font-avenir text-[14px] sm:text-[16px] md:text-[18px]
                                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black
                                    after:w-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Story
                            </button>
                            <button
                                onClick={() => handleSectionClick('fabric-section')}
                                className="relative text-black/64 font-avenir text-[14px] sm:text-[16px] md:text-[18px]
                                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black
                                    after:w-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Fabric
                            </button>
                            <button
                                onClick={() => handleSectionClick('fit-section')}
                                className="relative text-black/64 font-avenir text-[14px] sm:text-[16px] md:text-[18px]
                                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black
                                    after:w-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Fit
                            </button>
                            <button
                                onClick={() => handleSectionClick('design-section')}
                                className="relative text-black/64 font-avenir text-[14px] sm:text-[16px] md:text-[18px]
                                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black
                                    after:w-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Design
                            </button>
                            <button
                                onClick={() => handleSectionClick('style-section')}
                                className="relative text-black/64 font-avenir text-[14px] sm:text-[16px] md:text-[18px]
                                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black
                                    after:w-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Style
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleSectionClick('story-section')}
                                className="relative text-black/64 font-avenir text-[14px] sm:text-[16px] md:text-[18px]
                                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black
                                    after:w-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Our Story
                            </button>
                            <button
                                onClick={() => handleSectionClick('chapter-1')}
                                className="relative text-black/64 font-avenir text-[14px] sm:text-[16px] md:text-[18px]
                                    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black
                                    after:w-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                            >
                                Drop 1
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
