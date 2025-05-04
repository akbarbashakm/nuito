"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
    maxWidthClass?: string; // optional override
    scrolledEffect?: boolean; // new prop
}

const Header: React.FC<HeaderProps> = ({
    maxWidthClass = "lg:max-w-[654px]",
    scrolledEffect = true, // default true
}) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (!scrolledEffect) return; // scroll effect off na skip
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolledEffect]);

    // If scrolledEffect false na, always compact UI
    const effectiveScrolled = scrolledEffect ? scrolled : true;

    return (
        <header
            className={`fixed top-0 w-full py-2 flex items-center z-50 transition-all duration-500 ease-in-out ${effectiveScrolled
                    ? "h-[48px] shadow-md justify-between px-8 backdrop-blur-sm"
                    : "h-[108px] justify-center"
                }`}
            style={{
                background: effectiveScrolled ? "#F0F1E2" : "transparent",
            }}
        >
            {/* Logo */}
            <div className={`${maxWidthClass} flex w-full justify-between items-center mx-auto`}>

                <div
                    className={`transition-all duration-500 ${effectiveScrolled ? "transform translate-x-0" : "mx-auto"
                        }`}
                >
                    <Link href="/">
                        <Image
                            src={effectiveScrolled ? "/logo-black.svg" : "/logo-white.svg"}
                            alt="Logo"
                            width={effectiveScrolled ? 76 : 104}  // Dynamically changing width based on scroll state
                            height={effectiveScrolled ? 26 : 74}  // Dynamically changing height based on scroll state
                            layout="intrinsic"  // Ensures the image scales properly
                            className={`transition-all duration-500 cursor-pointer
                            ${effectiveScrolled ? 'w-[76px] h-[26px]' : 'w-[104px] h-[74px]'} 
                            sm:w-[104px] sm:h-[74px]`}  // Adjust for responsive sizes
                        />
                    </Link>
                </div>
                {/* Menu */}
                <nav
                    className={`flex gap-[12px] transition-all duration-500 ${effectiveScrolled ? "block visible" : "hidden"
                        }`}
                >
                    <Link
                        href="#"
                        className="relative text-black/64 font-avenir text-[14px] sm:text-[16px] md:text-[18px]
                            after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black
                            after:w-0 hover:after:w-full after:transition-all after:duration-300"
                    >
                        Our Story
                    </Link>
                    <Link
                        href="#"
                        className="relative text-black/64 font-avenir text-[14px] sm:text-[16px] md:text-[18px]
                            after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black
                            after:w-0 hover:after:w-full after:transition-all after:duration-300"
                    >
                        Chapter 1
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
