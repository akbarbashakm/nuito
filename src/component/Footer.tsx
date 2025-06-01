"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
    className?: string;
    paddingY?: string;
    paddingX?: string;
}

const Footer = ({ className = '', paddingY = 'py-14', paddingX = 'px-0' }: FooterProps) => {
    return (
        <div className={`${className} flex flex-wrap justify-center md:justify-between items-center ${paddingX} ${paddingY} w-full bg-[var(--background)]`}>
            {/* Logo */}
            <div className="flex justify-center w-full md:w-auto md:mb-0">
                <Link href="/">
                    <Image src="/logo-black.svg" width={200} height={200} alt="footer-logo" className="header-logo max-w-fit h-auto" />
                </Link>
            </div>

            {/* Footer content */}
            <div className="flex flex-col items-center w-full md:w-auto px-6 mt-6 md:mt-0 space-y-4 flex-shrink-0">
                <p className="text-[var(--foreground)]/64 text-[16px] font-medium font-maven text-center my-6">
                    Your Everyday Capsule Wardrobe Collection
                </p>

                {/* Links */}
                <div className="flex items-center gap-8 px-6 flex-wrap justify-center mb-4">
                    <Link href="/about">
                        <Image src="/instagram.svg" width={20} height={20} alt="instagram" className="header-logo" />
                    </Link>
                    <Link href="/about" className="text-[var(--foreground)]/64 text-[16px] font-medium font-maven hover:underline">
                        About Us
                    </Link>
                    <Link href="/help" className="text-[var(--foreground)]/64 text-[16px] font-medium font-maven hover:underline">
                        Help
                    </Link>
                </div>

                {/* Copyright */}
                <p className="text-[var(--foreground)]/64 text-[14px] font-medium font-maven text-center w-full pt-4 md:pt-0">
                    &copy; NU ITO. All rights reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
