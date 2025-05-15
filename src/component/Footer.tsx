"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ className }: { className?: string }) => {
    return (
        <div className={`${className} flex flex-wrap justify-between items-center px-0 py-14 w-full bg-[var(--background)]`}>
            {/* Logo */}
            <div className="flex justify-center w-full md:w-auto md:mb-0">
                <Link href="/">
                    <Image src="/logo-black.svg" width={200} height={200} alt="footer-logo" className="header-logo" />
                </Link>
            </div>

            {/* Footer content */}
            <div className="flex flex-col items-center w-full md:w-auto px-6">
                <p className="text-[var(--foreground)]/64 text-[16px] font-medium font-avenir text-center my-6">
                    Your Everyday Capsule Wardrobe Collection
                </p>

                {/* Links */}
                <div className="flex items-center gap-8 mb-4 px-6">
                    <Link href="/about">
                        <Image src="/instagram.svg" width={20} height={20} alt="instagram" className="header-logo" />
                    </Link>
                    <Link href="/about" className="text-[var(--foreground)]/64 text-[16px] font-medium font-avenir hover:underline">
                        About Us
                    </Link>
                    <Link href="/help" className="text-[var(--foreground)]/64 text-[16px] font-medium font-avenir hover:underline">
                        Help
                    </Link>
                </div>

                {/* Copyright */}
                <p className="text-[var(--foreground)]/64 text-[14px] font-medium font-avenir text-center">
                    &copy; NU ITO. All rights reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
