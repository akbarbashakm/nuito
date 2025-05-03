"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

type ContentItem = {
    type: "h2" | "p" | "divider";
    text?: string;
};

interface TypingTextProps {
    content: ContentItem[];
    className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({ content, className }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;
    
        const isMobile = window.innerWidth <= 768;
        const scrollEnd = isMobile ? "+=800" : "+=500";
    
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                scrub: isMobile ? 2 : 1, // smoother/slower on mobile
                start: "top center",
                end: scrollEnd,
                pinSpacing: false,
            },
        });
    
        content.forEach((item, idx) => {
            if (item.type !== "divider" && lineRefs.current[idx]) {
                tl.to(
                    lineRefs.current[idx],
                    {
                        text: { value: item.text ?? "" },
                        duration: 1,
                        ease: "none",
                    },
                    "+=0.2"
                );
            }
        });
    
        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [content]);
    
    return (
        <div
            ref={containerRef}
            className={`w-full border-b border-[#868686] max-w-[654px] mx-auto bg-lightbeige py-8 px-4 flex flex-col items-center ${className ?? ""}`}
        >
            {content.map((item, idx) => {
                if (item.type === "divider") {
                    return (
                        <div key={idx} className="w-full flex justify-center my-4">
                            <div className="w-full h-[1px] bg-[#868686]" />
                        </div>
                    );
                }
                if (item.type === "h2") {
                    return (
                        <h2
                            key={idx}
                            className="text-2xl py-4 md:text-3xl font-nuito font-normal text-center mb-4 typing_text-heading text-black"
                        >
                            <span ref={el => { lineRefs.current[idx] = el; }} className="typing_text" />
                            <span className="cursor"></span>
                        </h2>
                    );
                }
                return (
                    <p
                        key={idx}
                        className="text-lg py-4 md:text-xl font-nuito text-center mb-4 typing_text-heading text-black"
                    >
                        <span ref={el => { lineRefs.current[idx] = el; }} className="typing_text" />
                        <span className="cursor"></span>
                    </p>
                );
            })}
            <style jsx>{`
        .typing_text-heading {
          margin: 0;
          font-weight: 400;
        }
        .cursor {
        //   animation: cursorBlink 0.5s alternate infinite;
        }
        @keyframes cursorBlink {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default TypingText;