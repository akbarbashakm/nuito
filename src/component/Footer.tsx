"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year dynamically

    return (
        <div className="flex flex-wrap justify-between items-center px-0 py-12 w-full">
            {/* Logo */}
            <div className="flex justify-center w-full md:w-auto mb-6 md:mb-0">
                <Link href="/">
                    <Image src="/logo-black.svg" width={200} height={200} alt="footer-logo" />
                </Link>
            </div>

            {/* Footer content */}
            <div className="flex flex-col items-center w-full md:w-auto">
                <p className="text-black text-[14px] font-medium text-center mb-4">
                    Your Everyday Capsule Wardrobe Collection
                </p>

                {/* Links */}
                <div className="flex items-center gap-2 mb-4">
                    <Link href="/about">
                        <Image src="/instagram.svg" width={20} height={20} alt="instagram" />
                    </Link>
                    <Link href="/about" className="text-black text-sm hover:underline">
                        About Us
                    </Link>
                    <Link href="/help" className="text-black text-sm hover:underline">
                        Help
                    </Link>
                </div>

                {/* Copyright */}
                <p className="text-black text-sm text-center">
                    &copy; {currentYear} NU ITO. All rights reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
