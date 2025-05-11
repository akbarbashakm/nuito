import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

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

    // Initialize GSAP timeline
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
        lineDiv.className = "mb-4";

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

      const spansAndHeadings = Array.from(element.querySelectorAll("span, p, h2"));
      spansAndHeadings.forEach((el) => {
        tl.to(
          el,
          {
            opacity: 1,
            duration: 0.195,
            ease: "power3.out",
          },
          "+=0.05"
        );
      });

      // Add animation for h2 with opacity and typing effect
      const h2Elements = element.querySelectorAll("h2");
      h2Elements.forEach((h2) => {
        const textContent = h2.innerHTML;

        // Remove <br> tags and split the text into words
        const words = textContent.replace(/<br>/g, " ").split(" ");
        h2.innerHTML = ""; // Clear the h2 content

        // Create a span for each word
        words.forEach((word, wordIdx) => {
          const span = document.createElement("span");
          span.textContent = word + " "; // Preserve spaces between words
          span.style.opacity = "0.5"; // Start with zero opacity
          span.style.whiteSpace = "nowrap"; // Prevent line breaks
          span.setAttribute("data-key", `span-h2-${wordIdx}`);
          h2.appendChild(span);

          // Typing animation: gradually increase opacity and simulate typing
          tl.to(
            span,
            {
              opacity: 1, // Typing effect with opacity change
              duration: 0.05, // Short duration for quick typing
              ease: "none", // No easing for smooth typing
            },
            `+=0.05` // Delay for each word in sequence
          );
        });
      });
    });

    return () => {
      tl.kill();
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
            <div key={idx} className="boxy w-full bg-[rgba(164,164,164,0.16)] rounded-[24px] mb-2 relative bottom-4 mt-0 px-4 py-4">
              <h2 className="text-[40px] font-metrophobic font-normal text-center mb-2 typing_text-heading text-black/64">
                <span className="text-[40px] text-[#060606]">nu ito</span>
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
                    className="text-[18px] font-maven font-medium leading-[1.5] tracking-[0.252px] text-center mb-2 typing_text-heading text-black/64"
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
                className="text-[40px] pt-0 py-8 font-metrophobic font-normal text-center mb-0 typing_text-heading text-black/64"
              >
                {parts.map((part, i) => (
                  <React.Fragment key={i}>
                    <span>{part.trim()}</span>
                    {i < parts.length - 1 && (
                      <>
                        <span className="hidden md:inline">&nbsp;</span>
                        <br className="md:hidden" />
                      </>
                    )}
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
              className="text-[24px] font-maven py-8 font-medium leading-[1.3] tracking-[0.252px] text-center mb-0 typing_text-heading text-black"
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
