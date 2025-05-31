"use client";

import React, { useEffect, useState } from 'react';

const ContentSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const sections = [
    {
      title: "Our Story",
      content: "Welcome to our fashion journey. We started with a simple idea: to create beautiful, sustainable clothing that makes you feel confident and comfortable. Our collections are designed with care, using eco-friendly materials and ethical production methods."
    },
    {
      title: "Our Mission",
      content: "We believe in fashion that doesn't compromise on style or sustainability. Our mission is to create timeless pieces that you'll love for years to come, while minimizing our environmental impact and supporting fair labor practices."
    },
    {
      title: "Our Collections",
      content: "Explore our carefully curated collections, each designed with a unique story and purpose. From casual everyday wear to elegant evening pieces, we have something for every occasion and style preference."
    }
  ];

  useEffect(() => {
    if (isTyping) {
      const currentContent = sections[currentSection]?.content;
      if (displayText.length < currentContent?.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentContent.slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayText, isTyping, currentSection]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const scrollPosition = scrollTop + clientHeight;
    const sectionHeight = scrollHeight / sections.length;
    const newSection = Math.floor(scrollPosition / sectionHeight);
    
    if (newSection !== currentSection) {
      setCurrentSection(newSection);
      setDisplayText('');
      setIsTyping(true);
    }
  };

  return (
    <div 
      className="h-screen overflow-y-auto snap-y snap-mandatory"
      onScroll={handleScroll}
    >
      {sections.map((section, index) => (
        <div 
          key={index}
          className="h-screen snap-start flex items-center justify-center bg-lightbeige"
        >
          <div className="max-w-4xl px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-maven mb-8">{section.title}</h2>
            <p className="text-lg md:text-xl font-maven">
              {index === currentSection ? displayText : ''}
              {index === currentSection && isTyping && <span className="animate-pulse">|</span>}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentSection; 