"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { HOME_NAV_LINKS, SHOP_NAV_LINKS, NavLink } from "@/constants/navigation";

interface HeaderProps {
    maxWidthClass?: string;
    scrolledEffect?: boolean;
    onHomeClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
    maxWidthClass = "lg:max-w-[654px]",
    scrolledEffect = true,
    onHomeClick,
}) => {
    const [scrolled, setScrolled] = useState(false);
    const [logoLoaded, setLogoLoaded] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Scroll effect on header
    useEffect(() => {
        if (!scrolledEffect) return;
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolledEffect]);

    // Logo animation timing
    useEffect(() => {
        setLogoLoaded(false);
        const timer = setTimeout(() => {
            setLogoLoaded(true);
        }, 300);
        return () => clearTimeout(timer);
    }, [scrolled]);

    // Smooth scroll behavior
    const handleSectionClick = async (link: NavLink) => {
        const headerHeight = 50;

        const scrollToElement = (id: string) => {
            const el = document.getElementById(id);
            if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: y - headerHeight,
                    behavior: "smooth",
                });
            }
        };

        // If on thank-you page, go to home then scroll
        if (pathname === '/thank-you') {
            await router.push('/', { scroll: false });
            setTimeout(() => {
                scrollToElement(link.id);
            }, 300);
            return;
        }

        // If already on the same page
        const currentBasePath = pathname.split('#')[0];
        const linkBasePath = link.path.split('#')[0];

        if (currentBasePath === linkBasePath) {
            scrollToElement(link.id);
        } else {
            await router.push(linkBasePath, { scroll: false });
            setTimeout(() => {
                scrollToElement(link.id);
            }, 300);
        }
    };

    // Determine base path
    const basePath =
        pathname === '/shop/her' ? '/shop/her' :
        pathname === '/shop/him' ? '/shop/him' :
        '';

    // Build navLinks with adjusted paths
    const navLinks = (pathname === '/shop/her' || pathname === '/shop/him')
        ? SHOP_NAV_LINKS.map(link => ({
            ...link,
            path: `${basePath}/#${link.id}`,
        }))
        : HOME_NAV_LINKS.map(link => ({
            ...link,
            path: `/#${link.id}`,
        }));

    const effectiveScrolled = scrolledEffect ? scrolled : true;

    return (
        <header
            className={`fixed top-0 w-full flex items-center z-50 transition-all duration-500 ease-in-out ${
                effectiveScrolled
                    ? "h-[48px] shadow-md justify-between px-4 backdrop-blur-sm"
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
                    <Link href="/" onClick={onHomeClick}>
                        <Image
                            src={effectiveScrolled ? "/logo-black.svg" : "/white-logo.svg"}
                            alt="Logo"
                            width={effectiveScrolled ? 76 : 132}
                            height={effectiveScrolled ? 26 : 44}
                            layout="intrinsic"
                            className={`transition-all duration-500 cursor-pointer
                                ${effectiveScrolled ? 'w-[76px] h-[26px]' : 'w-[132px] h-[44px]'} 
                                ${!effectiveScrolled ? `transform ${logoLoaded ? 'scale-100' : 'scale-0'} transition-transform duration-1000` : ''}
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
                            className="relative text-foreground/64 dark:text-foreground/64 font-maven text-[14px] sm:text-[16px] md:text-[18px]
                                after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-foreground dark:after:bg-foreground
                                after:w-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer whitespace-nowrap"
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
