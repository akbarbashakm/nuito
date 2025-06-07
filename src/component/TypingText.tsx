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
      const headerHeight = 96;
      const viewportHeight = window.innerHeight;
      const newHeight = viewportHeight - headerHeight;
      setContainerHeight(newHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [mounted]);

  const processText = (text: string | undefined) => {
    if (!text) return [];
    const lines = text.split("[* *]");
    return lines.map((line, lineIndex) => {
      if (line.includes("<p>")) {
        return { lineIndex, isHtml: true, content: line };
      }
      const parts = line.split(/(\*[^*]+\*)/);
      return {
        lineIndex,
        isHtml: false,
        parts: parts.filter(part => part !== "").map((part) => {
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
        toggleActions: "restart none none none",
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
            const parts = text.split(/(\*[^*]+\*)/);
            pElement.innerHTML = "";

            parts.filter(part => part !== "").forEach((part) => {
              if (part.startsWith("*") && part.endsWith("*")) {
                const strong = document.createElement("strong");
                strong.textContent = part.slice(1, -1);
                strong.className = "font-bold text-black dark:text-white";
                strong.style.fontSize = "32px"; // ← Only <strong> inside <p>
                pElement.appendChild(strong);
                pElement.appendChild(document.createTextNode(" "));
              } else {
                pElement.appendChild(document.createTextNode(part));
              }
            });

            pElement.className = "text-[1.5rem] font-maven text-black/80 dark:text-white/80";
            pElement.style.display = "inline-block";
            lineDiv.appendChild(pElement);
          }
        } else {
          line.parts?.forEach((part) => {
            const tokens = part.content.split(/(\s+)/);
            tokens.forEach((token, tokenIdx) => {
              if (token === "") return;

              const span = document.createElement("span");
              span.textContent = token;
              span.style.opacity = "0.1";
              span.style.display = token === " " ? "inline" : "inline-block";
              span.style.color = "var(--foreground)";
              span.setAttribute("data-key", `span-${lineIdx}-${tokenIdx}`);

              if (part.type === "strong") {
                span.style.fontWeight = "700";
                if (item.type === "p") {
                  span.style.fontSize = "32px"; // ← Only <strong> in <p>
                }
              }

              lineDiv.appendChild(span);
            });
          });
        }

        element.appendChild(lineDiv);
      });

      const allSpans = Array.from(element.querySelectorAll("span"));
      const spansToAnimate = allSpans.filter(span => {
        const parent = span.parentElement;
        return !(parent?.tagName === "H2" && parent.parentElement?.classList.contains("boxy"));
      });

      spansToAnimate.forEach((span) => {
        tl.to(
          span,
          {
            opacity: 1,
            duration: 0.025,
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
      const height = containerRef.current?.scrollHeight || 0;
      if (containerRef.current) containerRef.current.style.height = `${height}px`;
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [content, mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight }}
      className={`w-full border-[#868686] dark:border-gray-500 max-w-[654px] mx-auto bg-lightbeige dark:bg-background-dark pb-8 px-4 sm:px-0 flex flex-col items-center justify-center ${className ?? ""}`}
    >
      {content.map((item, idx) => {
        if (item.type === "divider") {
          return (
            <div
              key={`divider-${idx}`}
              className="w-full flex justify-center my-4"
              data-aos="fade-up"
            >
              <div className="w-full h-[1px] bg-[#868686] dark:bg-gray-500" />
            </div>
          );
        }

        const refCallback = (el: HTMLElement | null) => {
          lineRefs.current[idx] = el;
        };

        const isFirstSpecialText = item.text === "*nu ito •* [nwi.toʊ] *•* (noun)";
        if (isFirstSpecialText) {
          return (
            <div
              key={idx}
              className="boxy mb-2 w-full sm:w-fit p-4 sm:p-6 pt-0 pr-0 sm:px-6 md:mb-8 bg-[rgba(var(--typing-background),0.16)] rounded-[24px] relative bottom-4 mt-0 text-center sm:text-left sm:mr-auto"
              data-aos="fade-up"
            >
              <h2 className="font-metrophobic font-normal text-left mb-2 text-black dark:text-white">
                <span className="text-[2rem] text-[var(--foreground)]">nu ito</span>
                <span className="text-[1.25rem] text-[var(--foreground)]"> • </span>
                <span className="text-[1.5rem] text-[var(--foreground)]">[nwi.toʊ]</span>
                <span className="text-[1.25rem] text-[var(--foreground)]"> • </span>
                <span className="text-[1.5rem] text-[var(--foreground)]">(noun)</span>
              </h2>
              {content.slice(idx + 1, idx + 3).map((nextItem, nextIdx) => {
                const nextRefCallback = (el: HTMLParagraphElement | null) => {
                  lineRefs.current[idx + nextIdx + 1] = el;
                };
                return (
                  <p
                    key={idx + nextIdx + 1}
                    ref={nextRefCallback}
                    className="text-[1.25rem] font-maven text-black/80 dark:text-white/80 leading-[1] tracking-[0.252px] text-left mb-2"
                  />
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
              className="text-[3rem] md:text-[3rem] line-height-mobile block w-full py-8 pt-0 font-metrophobic font-normal text-left text-black/64 dark:text-white/64"
              data-aos="fade-up"
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
              className="text-[2rem] md:text-[2rem] block w-full font-maven px-2 pt-2 pb-0 font-bold tracking-[0.252px] text-left mb-0 text-black dark:text-white"
              data-aos="fade-up"
            />
          );
        }

        if (item.type === "p") {
          return (
            <p
              key={idx}
              ref={refCallback}
              className="text-[1.625rem] md:text-[1.75rem] px-2 font-maven font-normal leading-snug	tracking-[0.252px] text-left my-0 text-black/64 dark:text-white/64"
              data-aos="fade-up"
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default TypingText;