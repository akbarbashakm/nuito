"use client";

import React, { useRef } from "react";

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
  const skippedIndexes = new Set<number>(); // Track which indexes are rendered inside "boxy"

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <strong key={idx} className="font-bold text-black">
            {part.slice(1, -1)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`w-full border-[#868686] max-w-[654px] mx-auto bg-lightbeige pt-0 pb-4 px-4 flex flex-col items-center justify-center ${className ?? ""}`}
    >
      {content.map((item, idx) => {
        if (skippedIndexes.has(idx)) return null; // ✅ Skip if already rendered in boxy

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

        const isFirstSpecialText = item.text === "*nu ito •* [nwi.toʊ] *•* (noun)";
        if (isFirstSpecialText) {
          const nextItems = content.slice(idx + 1, idx + 3);
          skippedIndexes.add(idx + 1); // ✅ Mark next lines as skipped
          skippedIndexes.add(idx + 2);

          return (
            <div key={idx} className="boxy w-full bg-[rgba(164,164,164,0.16)] rounded-[24px] mb-8 mt-0 px-4 py-4" data-aos="fade-up">
              <h2 className="text-[40px] font-metrophobic font-normal text-center mb-2 typing_text-heading text-black/64">
                <span className="text-[40px] text-[#060606]">nu ito</span>
                <span className="text-[22px] text-[#060606]"> • </span>
                <span className="text-[18px] text-black/64">[nwi.toʊ] </span>
                <span className="text-[22px] text-[#060606]"> • </span>
                <span className="text-[18px] text-[#060606]">(noun)</span>
                {cursor}
              </h2>

              {nextItems.map((nextItem, nextIdx) => {
                const refIndex = idx + nextIdx + 1;
                const nextSpanRefCallback = (el: HTMLSpanElement | null) => {
                  lineRefs.current[refIndex] = el;
                };

                return (
                  <p
                    key={refIndex}
                    className="text-[18px] font-maven font-medium leading-[1.5] tracking-[0.252px] text-center mb-2 typing_text-heading text-black/64"
                  >
                    <span ref={nextSpanRefCallback} className="typing_text">
                      {nextItem.text ? renderFormattedText(nextItem.text) : ""}
                    </span>
                    <span className="cursor" />
                  </p>
                );
              })}
            </div>
          );
        }

        // The rest of your type rendering logic remains unchanged
        if (item.type === "h2") {
          if (item.text?.includes("/n")) {
            const parts = item.text.split("/n");
            return (
              <h2
                key={idx}
                data-aos="fade-up"
                className="text-[40px] pt-0 py-8 font-metrophobic font-normal text-center mb-0 typing_text-heading text-black/64"
              >
                {parts.map((part, i) => (
                  <React.Fragment key={i}>
                    {part.trim()}
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
              data-aos="fade-up"
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
              data-aos="fade-up"
              className="text-[24px] font-maven py-8 font-medium leading-[1.3] tracking-[0.252px] text-center mb-0 typing_text-heading text-black"
            >
              <span ref={spanRefCallback} className="typing_text">
                {item.text}
              </span>
              <span className="cursor" />
            </h3>
          );
        }

        if (item.type === "p") {
          return (
            <p
              key={idx}
              data-aos="fade-up"
              className="text-[24px] font-maven font-medium leading-[1.5] tracking-[0.252px] text-center my-0 typing_text-heading text-black/64"
            >
              <span ref={spanRefCallback} className="typing_text">
                {item.text ? renderFormattedText(item.text) : ""}
              </span>
              <span className="cursor" />
            </p>
          );
        }

        return null;
      })}
    </div>
  );
};

export default TypingText;
