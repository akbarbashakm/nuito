"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface VideoSectionProps {
  src: string;
  showArrow?: boolean;
  nextSectionId?: string;
  isHomePage?: boolean;
}

const VideoSection = ({ src, showArrow = true, nextSectionId, isHomePage = false }: VideoSectionProps) => {
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [sectionHeight, setSectionHeight] = useState('100vh');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToNextSection = () => {
    if (window.scrollY === 0) {
      if (nextSectionId) {
        const nextSection = document.getElementById(nextSectionId);
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setHasScrolled(true);
        }
      } else {
        // If no nextSectionId provided, scroll to the next section after video
        const videoSection = videoRef.current?.parentElement;
        if (videoSection) {
          const nextElement = videoSection.nextElementSibling;
          if (nextElement) {
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setHasScrolled(true);
          }
        }
      }
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (isHomePage) {
        setSectionHeight('100vh');
        return;
      }

      const header = document.querySelector('header');
      const headerHeight = header?.offsetHeight || 0;
      const viewportHeight = window.innerHeight;
      const isMobile = window.innerWidth <= 768;
      
      // For mobile devices, ensure the video section takes up the full viewport
      // minus the header height, with a small buffer to prevent content overlap
      const height = isMobile 
        ? `calc(${viewportHeight}px - ${headerHeight}px - 20px)`
        : `calc(${viewportHeight}px - ${headerHeight}px)`;
      
      setSectionHeight(height);
    };
    // Initial calculation
    updateHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, [isHomePage]);
  
  useEffect(() => {
    // We want to show the arrow after 5 seconds of video playback
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        if (videoRef.current.currentTime >= 5) {
          setIsArrowVisible(true);
        }
      }
    };

    // Handle video end
    const handleVideoEnd = () => {
      if (!hasScrolled) {
        scrollToNextSection();
      }
    };

    // Handle scroll back to top
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setHasScrolled(false);
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      }
    };

    // Listen for the time update event on the video
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleVideoEnd);
      window.addEventListener('scroll', handleScroll);
    }

    // Cleanup listener on component unmount
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleVideoEnd);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled, nextSectionId]);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden"
      style={{ height: sectionHeight }}
    >
      <div className="absolute inset-0 bg-black/30 z-10" />
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={() => {
          if (!hasScrolled) {
            scrollToNextSection();
          }
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        {showArrow && isArrowVisible && (
          <div 
            className="absolute bottom-20 animate-bounce cursor-pointer"
            onClick={scrollToNextSection}
          >
            <Image
              src="/down-arrow.svg"
              width={20}
              height={20}
              className="w-8 h-8 text-white"
              alt="Down Arrow"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
