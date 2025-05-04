"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface VideoSectionProps {
  src: string;
  heightClass?: string;
  showArrow?: boolean;
}

const VideoSection = ({ src, showArrow = true, heightClass }: VideoSectionProps) => {
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
        // Check if page is not scrolled at all
        if (window.scrollY === 0) {
          const productSection = document.getElementById('product-section');
          if (productSection) {
            productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setHasScrolled(true);
          }
        }
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
  }, [hasScrolled]);

  return (
    <section
      className="w-full relative overflow-hidden"
      style={heightClass ? { height: heightClass } : { height: '100vh' }}
    >
      <div className="absolute inset-0 bg-black/30 z-10" />
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        loop
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        {showArrow && isArrowVisible && (
          <div className="absolute bottom-10 animate-bounce">
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
