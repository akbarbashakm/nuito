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
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`
        w-full flex flex-col md:flex-row items-end justify-end
        gap-10 md:gap-0 py-17 px-2 md:px-0 lg:px-0 transition-all duration-700 dark:bg-background-dark
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
                <strong key={index} className="font-semibold text-foreground dark:text-foreground">
                  {text}
                </strong>
              );
            } else if (part.startsWith("[") && part.endsWith("]")) {
              const text = part.slice(1, -1);
              return (
                <span key={index} className="font-normal text-foreground dark:text-foreground">
                  {text}
                </span>
              );
            } else {
              // Process the text to handle line breaks properly
              const processedText = part
                .replace(/\\n\\n/g, '\n\n') // Replace literal \n\n with actual newlines
                .replace(/\\n/g, '\n');     // Replace literal \n with actual newlines
              
              return (
                <span key={index} className="font-normal text-secondary-textColor dark:text-secondary-textColor whitespace-pre-line">
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
            height={431}
            className="rounded-lg shadow-lg object-cover w-full max-w-[412px]"
          />
        </div>
      )}
    </section>
  );
};

export default InfoSection;
