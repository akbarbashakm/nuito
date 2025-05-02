"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full py-2 flex items-center z-50 transition-all duration-500 ease-in-out ${scrolled
                ? "h-[48px] shadow-md justify-between px-8 backdrop-blur-sm"
                : "h-[108px] justify-center"
                }`}
            style={{
                background: scrolled ? "#F0F1E2" : "transparent", // Adding !important inline
            }}
        >
            {/* Logo */}
            <div className="lg:max-w-[654px] flex w-full justify-between items-center mx-auto">

                <div
                    className={`transition-all duration-500 ${scrolled ? "transform translate-x-0" : "mx-auto"
                        }`}
                >
                    <Image
                        src={scrolled ? "/logo-black.svg" : "/logo-white.svg"}
                        alt="Logo"
                        width={scrolled ? 76 : 104}  // Dynamically changing width based on scroll state
                        height={scrolled ? 26 : 74}  // Dynamically changing height based on scroll state
                        layout="intrinsic"  // Ensures the image scales properly
                        className={`transition-all duration-500 
                        ${scrolled ? 'w-[76px] h-[26px]' : 'w-[104px] h-[74px]'} 
                        sm:w-[104px] sm:h-[74px]`}  // Adjust for responsive sizes
                    />
                </div>
                {/* Menu */}
                <nav
                    className={`flex gap-4 text-gray-800 font-medium transition-all duration-500 ${scrolled ? "block visible" : "hidden"
                        }`}
                >
                    <a href="#" className="text-[14px] sm:text-[16px] md:text-[18px] hover:text-blue-600 transition font-nuito">Our Story</a>
                    <a href="#" className="text-[14px] sm:text-[16px] md:text-[18px] hover:text-blue-600 transition font-nuito">Chapter 1</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
