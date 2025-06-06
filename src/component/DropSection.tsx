"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const DropSection = ({ id }: { id: string }) => {
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      duration: 800, // adjust animation duration if needed
      once: false, // run animation only once
      offset: 100,
    });
  }, []);
  return (
    <main className="w-full flex items-center justify-center" id={id}>
      <div className="w-full mx-4 flex items-center justify-center mt-6 md:mt-16 px-4 py-1 lg:mx-auto rounded-[24px] block lg:max-w-[806px] dark:bg-background-dark relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg-image.png"
            alt="background"
            fill
            className="object-cover rounded-[12px]"
          />
        </div>

        <div className="relative z-10 w-full">
          <h2
            className="text-[2.75rem] md:text-[3rem] pb-[1rem] font-medium uppercase text-center font-metrophobic text-[#000000]/64"
            data-aos="fade-up"
          >
            Drop 01
          </h2>
          <h4
            className="text-[1.75rem] px-0 leading-[1.3] text-[#060606] text-center font-maven font-normal"
            data-aos="fade-up"
          >
            &ldquo;MONOCHROME MAGIC – 50 pieces. Black, white, and gone&rdquo; .
          </h4>
          <div className="w-full h-auto" data-aos="fade-up">
            <Image
              src="/teepic.webp"
              width={348}
              height={274}
              alt="t-shirt"
              className="w-full py-4 max-w-full h-auto md:h-[333px] object-contain mx-auto"
            />
          </div>
          <div className="flex justify-center gap-0 sm:gap-12 items-center w-full max-xs: items-start">
            {/* Left Tee */}
            <div className="flex flex-col justify-center items-center w-full sm:w-auto">
              <p className="text-sm text-[1rem] mobile-sm text-center leading-[20px] font-normal font-maven text-[#060606]">
                White Drape Tee
              </p>
              <Button onClick={() => router.push("/shop/her")}>
                Shop for HER
              </Button>
              <p className="text-sm p-4 text-center leading-[20px] font-normal font-maven text-[#060606]">
                Fluid. Feminine.
                <br /> Essential.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center w-full sm:w-auto sm:mt-0">
              <p className="text-sm text-[1rem] mobile-sm text-center leading-[20px] font-normal font-maven text-[#060606]">
                Black Crew Tee
              </p>
              <Button onClick={() => router.push("/shop/him")}>
                Shop for HIM
              </Button>
              <p className="text-sm p-4 leading-[20px] text-center font-normal font-maven text-[#060606]">
                Structured. <br />
                Refined. Essential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DropSection;
