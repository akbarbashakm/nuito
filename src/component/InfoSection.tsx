"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface InfoSectionProps {
    title: string;
    content: string;
    span?: string;
    image: string;
    reverse?: boolean;
    icon?: string | StaticImport;
    id?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
    title,
    content,
    image,
    reverse = false,
    icon,
    id
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section
            id={id}
            className={`
                w-full flex flex-col md:flex-row items-end justify-between
                gap-10 md:gap-0 py-10 transition-all duration-700 bg-lightbeige
                ${reverse ? "md:flex-row-reverse" : ""}
                overflow-hidden
            `}
            data-aos="fade-up"
        >
            <div
                className={`
                    w-full md:w-1/2 md:px-0
                `}
                data-aos={isMobile ? "fade-up" : (reverse ? "zoom-in-left" : "zoom-in-right")}
                >
                <h2 className="text-3xl text-black/64 md:text-[31px] font-metrophobic mb-4 uppercase flex items-center">
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
                <p className="text-[18px] font-m font-metrophobic md:text-[18px] text-black/64">
                    {content.split('[*').map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                            {lineIndex > 0 && <br />}
                            {line.split(/(\[.*?\])/g).map((part, index) => {
                                if (part.startsWith('[') && part.endsWith(']')) {
                                    const text = part.slice(1, -1);
                                    return (
                                        <span key={index} className="font-medium text-[#212121]">
                                            {text}
                                        </span>
                                    );
                                } else {
                                    return <span key={index} className="font-medium text-[#212121]/60">{part}</span>;
                                }
                            })}
                            {lineIndex < content.split('[*').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </p>
            </div>
            <div
                className={`
                    w-full md:w-1/2 flex justify-center items-center md:px-12
                    opacity-0 translate-y-8
                `}
                data-aos={isMobile ? "fade-up" : (reverse ? "zoom-in-right" : "zoom-in-left")}
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
