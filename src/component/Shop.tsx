"use client";

import Image from 'next/image';
import React, { useRef } from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+ App Router

const ShopSection = () => {
    const infoSectionRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    return (
        <main className="w-full overflow-x-hidden">
            <div
                ref={infoSectionRef}
                className="space-y-10 max-w-2xl mx-auto lg:max-w-[806px]"
                style={{ background: '#eaeadb' }}
            >
                <h2 className="text-[32px] uppercase text-center font-metrophobic text-black/64">Drop 01</h2>
                <h4 className="text-[24px] leading-[39px] text-black text-center font-metrophobic">“MONOCHROME MAGIC <br />
                    – 50 pieces. <br /> Black, white, and gone” .</h4>
                <Image src={`/teespics.svg`}
                    layout="intrinsic" // Automatically sizes the image based on its natural size
                    width={348} // Provide the width
                    height={274} // Provide the height to maintain aspect ratio            
                    alt="t-shirt"
                    className="w-full px-4 sm:w-[500px] max-w-full h-auto mx-auto"
                />
                <div className="grid grid-cols-2 text-center md:px-12 sm:px-2">
                    {/* Left Tee */}
                    <div>
                    <p className="text-sm leading-[20px] font-normal font-avenir text-[#060606]">Black Crew Tee</p>

                        <Button onClick={() => router.push('/shop')}>
                            Shop for HIM
                        </Button>
                        <p className="text-sm pt-2 leading-[20px] font-normal font-avenir text-[#060606]">Structured. Refined. Essential.</p>
                    </div>
                    {/* Right Tee */}
                    <div>
                    <p className="text-sm leading-[20px] font-normal font-avenir text-[#060606]">White Drape Tee</p>
                        <Button>
                            Shop for HER
                        </Button>
                        <p className="text-sm pt-2 leading-[20px] font-normal font-avenir text-[#060606]">Fluid. Feminine. Essential.</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ShopSection; 