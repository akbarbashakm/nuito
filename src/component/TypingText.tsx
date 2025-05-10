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
    const lines = text.split("[* *]");
    return lines.map((line, lineIndex) => {
      if (line.includes("<p>")) {
        return {
          lineIndex,
          isHtml: true,
          content: line,
        };
      }
      const parts = line.split(/(\*.*?\*)/);
      return {
        lineIndex,
        isHtml: false,
        parts: parts.map((part) => {
          if (part.startsWith("*") && part.endsWith("*")) {
            return { type: "strong", content: part.slice(1, -1) };
          }
          return { type: "normal", content: part };
        }),
      };
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    ScrollTrigger.normalizeScroll(true);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: 2,
        start: "top top",
        end: "bottom+=500 center",
        pinSpacing: false,
        fastScrollEnd: false,
        anticipatePin: 1,
        onUpdate: () => {
          tl.timeScale(0);
        },
      },
    });

    content.forEach((item, idx) => {
      const element = lineRefs.current[idx];
      if (!element || item.type === "divider") return;

      element.innerHTML = "";
      const lines = processText(item.text);

      lines.forEach((line, lineIdx) => {
        const lineDiv = document.createElement("div");
        lineDiv.className = "mb-0";

        if (line.isHtml && line.content) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = line.content;
          const pElement = tempDiv.querySelector("p");
          if (pElement) {
            const text = pElement.innerHTML;
            const parts = text.split(/(\*.*?\*)/);
            pElement.innerHTML = "";

            parts.forEach((part, partIdx) => {
              if (part.startsWith("*") && part.endsWith("*")) {
                const strong = document.createElement("strong");
                strong.textContent = part.slice(1, -1);
                strong.style.fontWeight = "700";
                strong.style.color = "#000000";
                strong.setAttribute("data-key", `html-strong-${lineIdx}-${partIdx}`);
                pElement.appendChild(strong);
              } else {
                const textNode = document.createTextNode(part);
                pElement.appendChild(textNode);
              }
            });

            pElement.style.fontSize = "18px";
            pElement.style.display = "inline-block";
            pElement.style.margin = "0 0.25em";
            lineDiv.appendChild(pElement);
          }
        } else {
          line.parts?.forEach((part, partIdx) => {
            const words = part.content.split(" ");
            words.forEach((word, wordIdx) => {
              const span = document.createElement("span");
              span.textContent = word + " ";
              span.style.opacity = "0.4";
              span.style.display = "inline-block";
              span.style.marginRight = "0.25em";
              span.setAttribute("data-key", `span-${lineIdx}-${partIdx}-${wordIdx}`);

              if (part.type === "strong") {
                span.style.fontWeight = "700";
                span.style.color = "#000000";
              }

              lineDiv.appendChild(span);
            });
          });
        }

        element.appendChild(lineDiv);
      });

      const spans = Array.from(element.querySelectorAll("span, p"));
      spans.forEach((span) => {
        tl.to(
          span,
          {
            opacity: 1,
            duration: 0.15,
            ease: "power1.out",
          },
          "+=0.2"
        );
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
            <div key={`divider-${idx}`} className="w-full flex justify-center my-4">
              <div className="w-full h-[1px] bg-[#868686]" />
            </div>
          );
        }

        const spanRefCallback = (el: HTMLSpanElement | null) => {
          lineRefs.current[idx] = el;
        };

        const spanElement = <span ref={spanRefCallback} className="typing_text" />;
        const cursor = <span className="cursor" />;

        // Check if this is the first of the three texts
        const isFirstSpecialText = item.text === "*nu ito •* [nwi.toʊ] *•* (noun)";
        
        if (isFirstSpecialText) {
          return (
            <div key={idx} className="boxy w-full bg-[rgba(164,164,164,0.16)] rounded-[24px] mb-8">
              <h2 className="text-[32px] py-2 md:text-3xl font-metrophobic font-normal text-center mb-0 typing_text-heading text-black/64">
              <span className="text-[32px] text-[#060606]">nu ito</span>
                <span className="text-[22px] text-[#060606]"> • </span>
                <span className="text-[18px] text-black/64">[nwi.toʊ] </span>
                <span className="text-[22px] text-[#060606]"> • </span>
                <span className="text-[18px] text-[#060606]">(noun)</span>
                {cursor}
              </h2>
              {content.slice(idx + 1, idx + 3).map((nextItem, nextIdx) => {
                const nextSpanRefCallback = (el: HTMLSpanElement | null) => {
                  lineRefs.current[idx + nextIdx + 1] = el;
                };
                const nextSpanElement = <span ref={nextSpanRefCallback} className="typing_text" />;
                const nextCursor = <span className="cursor" />;

                return (
                  <p
                    key={idx + nextIdx + 1}
                    className="text-[18px] font-maven font-medium leading-[1.5] tracking-[0.252px] text-center mb-4 typing_text-heading text-black/64"
                  >
                    {nextSpanElement}
                    {nextCursor}
                  </p>
                );
              })}
            </div>
          );
        }

        // Skip the next two items as they're already rendered in the boxy div
        if (idx > 0 && (content[idx - 1].text === "*nu ito •* [nwi.toʊ] *•* (noun)" || 
            content[idx - 1].text === "formed out of")) {
          return null;
        }

        if (item.type === "h2") {
          if (item.text?.includes("/n")) {
            const parts = item.text.split("/n");
            return (
              <h2
                key={idx}
                className="text-[40px] py-2 md:text-3xl font-metrophobic font-normal text-center mb-0 typing_text-heading text-black/64"
              >
                {parts.map((part, i) => (
                  <React.Fragment key={i}>
                    {part.trim()}
                    {i < parts.length - 1 && <br className="md:hidden" />}
                  </React.Fragment>
                ))}
              </h2>
            );
          }
          return (
            <h2
              key={idx}
              className="text-[40px] py-8 sm:mb-8 font-metrophobic font-normal text-center mb-0 typing_text-heading text-black/64"
            >
              {spanElement}
              {cursor}
            </h2>
          );
        }

        if (item.type === "h3") {
          return (
            <h3
              key={idx}
              className="text-[24px] font-maven pb-8 font-medium leading-[1.3] tracking-[0.252px] text-center mb-0 typing_text-heading text-black"
            >
              {spanElement}
              {cursor}
            </h3>
          );
        }

        if (item.type === "p") {
          return (
            <p
              key={idx}
              className="text-[24px] font-maven font-medium leading-[1.5] tracking-[0.252px] text-center my-0 typing_text-heading text-black/64"
            >
              {spanElement}
              {cursor}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
};

export default TypingText;
