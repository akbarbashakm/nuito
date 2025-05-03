"use client";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ThankYouPage() {
  const tickRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = tickRef.current?.querySelector("path");
    if (path) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = len.toString();
      path.style.strokeDashoffset = len.toString();
      setTimeout(() => {
        path.style.transition = "stroke-dashoffset 0.7s cubic-bezier(.4,2,.6,1)";
        path.style.strokeDashoffset = "0";
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f6]">
      <Header scrolledEffect={false} />
      <main className="lg:max-w-[726px] mx-auto flex-1 flex flex-col items-center justify-center pt-30">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-3xl mb-8">
          <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative md:right-[60px] md:translate-x-1 md:transform bg-green-400 rounded-full w-24 h-24 flex items-center justify-center mb-6">
              <svg
                ref={tickRef}
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 13l4 4 8-8"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: 100,
                  }}
                />
              </svg>
            </div>
          </div>

          <div className="relative 
  md:w-1/2 flex flex-col items-center justify-center text-center
  before:hidden md:before:block
  before:absolute before:-left-10 before:top-0 
  before:h-full before:w-px before:bg-[#868686]
  before:content-['']"
>
  <div className="text-2xl pt-4 pb-6 font-nuito font-normal text-black mb-2">
    Thank you for your interest in
  </div>

  <div className="flex items-center gap-4 mb-2">
    <Image src="/t-black.png" alt="Black Tee" width={116} height={167} className="rounded" />
    <div>
      <div className="font-medium text-left text-black text-[18px]">The perfect black tee</div>
      <div className="text-black text-left text-[18px] pt-2">₹ 1999</div>
    </div>
  </div>

  <div className="text-gray-700 text-sm mt-2 pt-8 p-4">
    We will be in touch with you shortly.<br />
    Our fit consultant will call you and explain to you about our fit and then we will ship the product within 2 working days.
  </div>
</div>

        </div>
        {/* Logo/Footer Section */}
      <Footer />
      </main>
    </div>
  );
}