"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContentItem } from "@/constants/content";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

interface TypingTextProps {
  content: ContentItem[];
  className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({ content, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mounted) return;

    const updateHeight = () => {
      const container = containerRef.current;
      if (container) {
        const headerHeight = 96; // Header height in pixels
        const viewportHeight = window.innerHeight;
        const newHeight = viewportHeight - headerHeight;
        setContainerHeight(newHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [mounted]);

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
    if (!containerRef.current || !mounted) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        toggleActions: "play reverse play reverse",
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
                strong.className = "font-bold text-black dark:text-white";
                strong.setAttribute(
                  "data-key",
                  `html-strong-${lineIdx}-${partIdx}`
                );
                pElement.appendChild(strong);
              } else {
                const textNode = document.createTextNode(part);
                pElement.appendChild(textNode);
              }
            });

            pElement.style.fontSize = "24px";
            pElement.style.display = "inline-block";
            pElement.style.margin = "0 0.25em";
            pElement.style.color = "var(--foreground)";
            lineDiv.appendChild(pElement);
          }
        } else {
          line.parts?.forEach((part, partIdx) => {
            const words = part.content.split(" ");
            words.forEach((word, wordIdx) => {
              const span = document.createElement("span");
              span.textContent = word + " ";
              span.style.opacity = "0.3";
              span.style.display = "inline-block";
              span.style.marginRight = "0.25em";
              span.style.color = "var(--foreground)";
              span.setAttribute(
                "data-key",
                `span-${lineIdx}-${partIdx}-${wordIdx}`
              );

              if (part.type === "strong") {
                span.style.fontWeight = "700";
                span.style.color = "var(--foreground)";
              }

              lineDiv.appendChild(span);
            });
          });
        }

        element.appendChild(lineDiv);
      });

      const spans = Array.from(element.querySelectorAll("span, p, h2, h3"));
      spans.forEach((span) => {
        tl.to(
          span,
          {
            opacity: 1,
            duration: 0.05,
            ease: "power3.out",
          },
          "+=0.05"
        );
      });
    });

    return () => {
      tl.kill();
    };
  }, [content, mounted]);

  useEffect(() => {
    if (!containerRef.current || !mounted) return;

    const updateHeight = () => {
      const container = containerRef.current;
      if (container) {
        const height = container.scrollHeight;
        container.style.height = `${height}px`;
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [content, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight }}
      className={`w-full border-[#868686] dark:border-gray-700 max-w-[654px] mx-auto bg-lightbeige dark:bg-background-dark pb-8 px-4 sm:px-4 flex flex-col items-center justify-center ${
        className ?? ""
      }`}
    >
      {content.map((item, idx) => {
        if (item.type === "divider") {
          return (
            <div
              key={`divider-${idx}`}
              className="w-full flex justify-center my-4"
            >
              <div className="w-full h-[1px] bg-[#868686] dark:bg-gray-700" />
            </div>
          );
        }

        const refCallback = (el: HTMLElement | null) => {
          lineRefs.current[idx] = el;
        };

        const isFirstSpecialText =
          item.text === "*nu ito •* [nwi.toʊ] *•* (noun)";
        if (isFirstSpecialText) {
          return (
            <div
              key={idx}
              className="boxy mb-2 px-2 sm:px-6 md:mb-8 dark:bg-[var(--typing-bg-dark)] rounded-[24px] mb-2 relative bottom-4 mt-0"
            >
              <h2 className="text-[40px] sm:text-[40px] font-metrophobic font-normal text-center mb-2 typing_text-heading text-[var(--foreground)]/64">
                <span className="text-[40px] font-metrophobic text-[var(--foreground)]">
                  nu ito
                </span>
                <span className="text-[22px] text-[var(--foreground)]">
                  {" "}
                  •{" "}
                </span>
                <span className="text-[18px] font-avenir text-[var(--foreground)]/64">
                  [nwi.toʊ]{" "}
                </span>
                <span className="text-[22px] text-[var(--foreground)]">
                  {" "}
                  •{" "}
                </span>
                <span className="text-[18px] font-avenir text-[var(--foreground)]">
                  (noun)
                </span>
              </h2>
              {content.slice(idx + 1, idx + 3).map((nextItem, nextIdx) => {
                const nextRefCallback = (el: HTMLParagraphElement | null) => {
                  lineRefs.current[idx + nextIdx + 1] = el;
                };
                return (
                  <p
                    key={idx + nextIdx + 1}
                    ref={nextRefCallback}
                    className="text-[24px] font-maven font-medium leading-[1.5] tracking-[0.252px] text-center mb-2 text-black/64 dark:text-white/64"
                  >
                    {/* content gets injected by processText */}
                  </p>
                );
              })}
            </div>
          );
        }

        if (
          idx > 0 &&
          (content[idx - 1].text === "*nu ito •* [nwi.toʊ] *•* (noun)" ||
            content[idx - 1].text === "formed out of")
        ) {
          return null;
        }

        if (item.type === "h2") {
          const parts = item.text?.split("/n") ?? [];
          return (
            <h2
              key={idx}
              ref={refCallback}
              className="text-[40px] sm:text-[40px] px-6 sm:px-6 md:mb-0 py-8 pt-0 sm:mb-8 font-metrophobic font-normal text-center mb-0 text-black/64 dark:text-white/64"
            >
              {parts.map((part, i) => (
                <React.Fragment key={i}>
                  {part.trim()}
                  {i < parts.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
          );
        }

        if (item.type === "h3") {
          return (
            <h3
              key={idx}
              ref={refCallback}
              className="text-[24px] sm:text-[24px] font-maven px-2 pt-6 pb-8 font-medium leading-[1.3] tracking-[0.252px] text-center mb-0 text-black dark:text-white"
            />
          );
        }

        if (item.type === "p") {
          return (
            <p
              key={idx}
              ref={refCallback}
              className="text-[24px] sm:text-[24px] px-2 font-maven font-medium leading-[1.5] tracking-[0.252px] text-center my-0 text-black/64 dark:text-white/64"
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default TypingText;
