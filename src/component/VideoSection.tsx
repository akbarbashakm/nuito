"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const VideoSection = () => {
  const [isArrowVisible, setIsArrowVisible] = useState(false);
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

    // Listen for the time update event on the video
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
    }

    // Cleanup listener on component unmount
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  return (
    <section className="w-full h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10" />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/dress-shop-ad.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-nuito mb-6">Summer Collection 2024</h1>
          <p className="text-lg md:text-xl font-nuito mb-8">Discover the latest trends in fashion</p>
        </div>
        {isArrowVisible && (
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
