"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

type ContentItem = {
    type: "h2" | "h3" | "p" | "divider";
    text?: string;
};

interface TypingTextProps {
    content: ContentItem[];
    className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({ content, className }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const processText = (text: string | undefined) => {
        if (!text) return [];
        // Split by [* *] to handle line breaks
        const lines = text.split('[* *]');
        return lines.map((line, lineIndex) => {
            // Check for HTML tags
            if (line.includes('<p>')) {
                return {
                    lineIndex,
                    isHtml: true,
                    content: line
                };
            }
            // Then split by * for strong text within each line
            const parts = line.split(/(\*.*?\*)/);
            return {
                lineIndex,
                isHtml: false,
                parts: parts.map((part) => {
                    if (part.startsWith('*') && part.endsWith('*')) {
                        return { type: 'strong', content: part.slice(1, -1) };
                    }
                    return { type: 'normal', content: part };
                })
            };
        });
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const isMobile = window.innerWidth <= 768;
        const scrollEnd = isMobile ? "+=1000" : "+=700";

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                scrub: 0.5,
                start: "top center",
                end: scrollEnd,
                pinSpacing: false,
                fastScrollEnd: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    if (self.direction === 1) {
                        tl.timeScale(1.5);
                    } else {
                        tl.timeScale(1);
                    }
                }
            },
        });

        content.forEach((item, idx) => {
            if (item.type !== "divider" && lineRefs.current[idx]) {
                const element = lineRefs.current[idx];
                const lines = processText(item.text);
                
                // Clear existing content
                element.innerHTML = '';
                
                // Create a container for all lines
                const container = document.createElement('div');
                container.className = 'flex flex-col';
                element.appendChild(container);

                // Process each line
                lines.forEach((line) => {
                    const lineDiv = document.createElement('div');
                    lineDiv.className = 'mb-4'; // Increased margin between lines
                    
                    if (line.isHtml) {
                        // Handle HTML content
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = line.content || '';
                        const pElement = tempDiv.querySelector('p');
                        if (pElement) {
                            // Process strong text within p tag
                            const text = pElement.innerHTML;
                            const parts = text.split(/(\*.*?\*)/);
                            pElement.innerHTML = '';
                            
                            parts.forEach(part => {
                                if (part.startsWith('*') && part.endsWith('*')) {
                                    const strong = document.createElement('strong');
                                    strong.textContent = part.slice(1, -1);
                                    strong.style.fontWeight = '700';
                                    strong.style.color = '#000000';
                                    pElement.appendChild(strong);
                                } else {
                                    pElement.appendChild(document.createTextNode(part));
                                }
                            });

                            pElement.style.fontSize = '18px';
                            pElement.style.display = 'inline-block';
                            pElement.style.margin = '0 0.25em';
                            lineDiv.appendChild(pElement);
                        }
                    } else {
                        // Create and append spans for each character in the line
                        line.parts?.forEach(part => {
                            const chars = part.content.split('');
                            chars.forEach((char) => {
                                const span = document.createElement('span');
                                span.textContent = char;
                                span.style.opacity = '0.4';
                                span.style.display = 'inline-block';
                                
                                // Check if this is phonetic text (contains [])
                                if (part.content.includes('[') && part.content.includes(']') || part.content.includes('(') && part.content.includes(')')) {
                                    span.style.fontSize = '18px';
                                }
                                
                                // Set font size for bullet point
                                if (char === '•') {
                                    span.style.fontSize = '22px';
                                }
                                
                                if (char === ' ') {
                                    span.style.marginRight = '0.25em';
                                }
                                if (part.type === 'strong') {
                                    span.style.fontWeight = '700';
                                    span.style.color = '#000000';
                                }
                                lineDiv.appendChild(span);
                            });
                        });
                    }
                    
                    container.appendChild(lineDiv);
                });

                // Animate each character with staggered timing
                const letterSpans = Array.from(element.querySelectorAll('span, p'));
                letterSpans.forEach((span) => {
                    tl.to(span, {
                        opacity: 1,
                        duration: 0.05,
                        ease: "power1.out",
                    }, `+=${0.01}`);
                });
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
            className={`w-full border-[#868686] max-w-[654px] mx-auto bg-lightbeige pt-0 pb-4 px-4 flex flex-col items-center ${className ?? ""}`}
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
                            className="text-[32px] py-2 md:text-3xl font-metrophobic font-normal text-center mb-0 typing_text-heading text-black/64"
                            style={{ fontFamily: 'Avenir, sans-serif' }}
                        >
                            <span ref={el => { lineRefs.current[idx] = el; }} className="typing_text font-metrophobic" />
                            <span className="cursor"></span>
                        </h2>
                    );
                }
                if (item.type === "h3") {
                    return (
                        <h3
                            key={idx}
                            className="text-[18px] font-avenir pb-8 font-medium leading-[29.6px] tracking-[0.252px] text-center mb-4 typing_text-heading text-black"
                            style={{ fontFamily: 'Avenir, sans-serif' }}
                        >
                            <span ref={el => { lineRefs.current[idx] = el; }} className="typing_text" />
                            <span className="cursor"></span>
                        </h3>
                    );
                }
                return (
                    <p
                        key={idx}
                        className="text-[18px] font-avenir font-medium leading-[29.6px] tracking-[0.252px] text-center mb-4 typing_text-heading text-black/64"
                        style={{ fontFamily: 'Avenir, sans-serif' }}
                    >
                        <span ref={el => { lineRefs.current[idx] = el; }} className="typing_text" />
                        <span className="cursor"></span>
                    </p>
                );
            })}
            <style jsx>{`
                .typing_text-heading {
                    margin: 0;
                    font-weight: 500;
                }
                .cursor {
                    animation: cursorBlink 0.5s alternate infinite;
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