"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface InfoSectionProps {
    title: string;
    content: string;
    span?: string;
    image: string;
    reverse?: boolean;
    icon?: string | StaticImport;
}

const InfoSection: React.FC<InfoSectionProps> = ({
    title,
    content,
    image,
    reverse = false,
    icon
}) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const [contentVisible, setContentVisible] = useState(false);
    const [imageVisible, setImageVisible] = useState(false);

    useEffect(() => {
        const contentObserver = new window.IntersectionObserver(
            ([entry]) => {
                setContentVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );
        const imageObserver = new window.IntersectionObserver(
            ([entry]) => {
                setImageVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );
        if (contentRef.current) contentObserver.observe(contentRef.current);
        if (imageRef.current) imageObserver.observe(imageRef.current);
        return () => {
            contentObserver.disconnect();
            imageObserver.disconnect();
        };
    }, []);

    // Animation classes
    const contentAnim = contentVisible
        ? "opacity-100 translate-x-0"
        : reverse
        ? "opacity-0 translate-x-16"
        : "opacity-0 -translate-x-16";

    const imageAnim = imageVisible
        ? "opacity-100 translate-x-0"
        : reverse
        ? "opacity-0 -translate-x-16"
        : "opacity-0 translate-x-16";

    return (
        <section
            className={`
                w-full flex flex-col md:flex-row items-end justify-between
                gap-10 py-10 transition-all duration-700 bg-lightbeige
                ${reverse ? "md:flex-row-reverse" : ""}
            `}
        >
            <div
                ref={contentRef}
                className={`
                    flex-1 px-6 md:px-12 transition-all duration-700
                    ${contentAnim}
                `}
            >
                <h2 className="text-3xl text-black md:text-[32px] font-nuito mb-4 uppercase flex items-center">
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
                <p className="text-[18px] md:text-[18px] text-[#212121]">
                    {content.split(/(\[.*?\])/g).map((part, index) => {
                        if (part.startsWith('[') && part.endsWith(']')) {
                            const text = part.slice(1, -1);
                            return (
                                <span key={index} className="font-bold text-black">
                                    {text}
                                </span>
                            );
                        } else {
                            return part;
                        }
                    })}
                </p>
            </div>
            <div
                ref={imageRef}
                className={`
                    flex-1 flex justify-center items-center px-6 md:px-12 transition-all duration-700
                    ${imageAnim}
                `}
            >
                <Image
                    src={image}
                    alt={title}
                    width={412}
                    height={731}
                    className="rounded-lg shadow-lg object-cover"
                />
            </div>
        </section>
    );
};

export default InfoSection;
