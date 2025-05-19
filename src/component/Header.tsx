"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { HOME_NAV_LINKS, SHOP_NAV_LINKS, NavLink } from "@/constants/navigation";

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

    const handleSectionClick = async (link: NavLink) => {
        const headerHeight = 50;
    
        const scrollToElement = (id: string) => {
            const el = document.getElementById(id);
            if (el) {
                const y = el.offsetTop;
                window.scrollTo({
                    top: y - headerHeight,
                    behavior: "smooth",
                });
            }
        };
    
        // If on thank-you page, redirect to home and scroll
        if (pathname === '/thank-you') {
            await router.push('/', { scroll: false });
    
            // Wait a bit for DOM to render
            setTimeout(() => {
                scrollToElement(link.id);
            }, 300);
    
            return;
        }
    
        // Already on home or same page
        if (pathname === link.path.split('#')[0]) {
            scrollToElement(link.id);
        } else {
            // Navigate to another page and scroll
            await router.push(link.path, { scroll: false });
    
            setTimeout(() => {
                scrollToElement(link.id);
            }, 300);
        }
    };
    
    const effectiveScrolled = scrolledEffect ? scrolled : true;
    const navLinks = pathname === '/shop' ? SHOP_NAV_LINKS : HOME_NAV_LINKS;

    return (
        <header
            className={`fixed top-0 w-full py-2 flex items-center z-50 transition-all duration-500 ease-in-out ${
                effectiveScrolled
                    ? "h-[48px] shadow-md justify-between px-8 backdrop-blur-sm"
                    : "h-[108px] justify-center"
            }`}
            style={{
                background: effectiveScrolled 
                    ? "var(--header-bg)" 
                    : "transparent",
            }}
        >
            <div className={`${maxWidthClass} flex w-full justify-between items-center mx-auto`}>
                <div
                    className={`transition-all duration-500 ${
                        effectiveScrolled ? "transform translate-x-0" : "mx-auto"
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
                                sm:w-[104px] sm:h-[74px] ${!effectiveScrolled ? `transform ${logoLoaded ? 'scale-100' : 'scale-0'} transition-transform duration-1000` : ''}
                                ${effectiveScrolled ? 'header-logo' : ''}`}
                        />
                    </Link>
                </div>
                <nav
                    className={`flex gap-[12px] transition-all duration-500 ${
                        effectiveScrolled ? "block visible" : "hidden"
                    }`}
                >
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleSectionClick(link)}
                            className="relative text-foreground/64 dark:text-foreground/64 font-avenir text-[14px] sm:text-[16px] md:text-[18px]
                                after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-foreground dark:after:bg-foreground
                                after:w-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
