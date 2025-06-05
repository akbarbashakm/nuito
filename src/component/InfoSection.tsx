"use client";

import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface InfoSectionProps {
  title: string;
  content: string;
  span?: string;
  image?: string;
  reverse?: boolean;
  icon?: string | StaticImport;
  id?: string;
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  content,
  image,
  reverse = false,
  icon,
  id,
  className = "",
}) => {
  return (
    <section
      id={id}
      className={`
        w-full flex flex-col md:flex-row item-end sm:items-start justify-end sm:justify-start md:items-end md:justify-end
        gap-10 md:gap-0 pt-14 max-sm390: pt-0 pb-10 px-2 md:px-0 lg:px-0 transition-all duration-700 dark:bg-background-dark
        ${reverse ? "md:flex-row-reverse" : ""}
        ${className}
      `}
    >
      <div
        className={`
          w-full md:w-${image ? "1/2" : "full"} px-2 md:px-0
          ${reverse ? "md:pl-8" : "md:pr-8"}
        `}
      >
        <h2 className="text-[3rem] font-metrophobic mb-4 uppercase flex items-center text-secondary-textColor dark:text-secondary-textColor">
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
        <p className="text-[18px] font-maven md:text-[18px] text-secondary-textColor dark:text-secondary-textColor">
          {content.split(/(\*.*?\*|\[.*?\])/g).map((part, index) => {
            if (part.startsWith("*") && part.endsWith("*")) {
              const text = part.slice(1, -1);
              return (
                <strong
                  key={index}
                  className="font-semibold text-foreground dark:text-foreground"
                >
                  {text}
                </strong>
              );
            } else if (part.startsWith("[") && part.endsWith("]")) {
              const text = part.slice(1, -1);
              return (
                <span
                  key={index}
                  className="font-normal text-foreground dark:text-foreground"
                >
                  {text}
                </span>
              );
            } else {
              // Process the text to handle line breaks properly
              const processedText = part
                .replace(/\\n\\n/g, "\n\n") // Replace literal \n\n with actual newlines
                .replace(/\\n/g, "\n"); // Replace literal \n with actual newlines

              return (
                <span
                  key={index}
                  className="font-normal text-secondary-textColor dark:text-secondary-textColor whitespace-pre-line"
                >
                  {processedText}
                </span>
              );
            }
          })}
        </p>
      </div>
      {image && (
        <div
          className={`
            w-full md:w-1/2 flex justify-center items-center px-2 md:px-0
            ${reverse ? "md:pr-8" : "md:pl-8"}
          `}
        >
          <Image
            src={image}
            alt={title}
            width={412}
            height={242}
            className="
            aspect-ratio-mobile
    rounded-lg shadow-md object-cover w-full
          "
            style={{
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      )}
    </section>
  );
};

export default InfoSection;
