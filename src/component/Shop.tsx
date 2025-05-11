"use client";

import Image from 'next/image';
import React from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';

const ShopSection = ({ id }: { id: string }) => {
    const router = useRouter();

    return (
        <main className="w-full" id={id}>
            <div
                className="space-y-6 max-w-2xl mx-auto lg:max-w-[806px]"
                style={{ background: '#eaeadb' }}
            >
                <h2
                    className="text-[32px] uppercase text-center font-metrophobic text-black/64"
                    data-aos="fade-up"
                >
                    Drop 01
                </h2>
                <h4
                    className="text-[24px] leading-[39px] text-black text-center font-metrophobic"
                    data-aos="fade-up"
                >
                    &ldquo;MONOCHROME MAGIC <br />
                    – 50 pieces. <br /> Black, white, and gone&rdquo; .
                </h4>
                <div
                    className="w-full"
                    data-aos="fade-up"
                >
                    <Image
                        src={`/teespics.svg`}
                        layout="intrinsic"
                        width={348}
                        height={274}
                        alt="t-shirt"
                        className="w-full px-4 sm:w-[500px] md:w-[415px] max-w-full h-auto mx-auto"
                    />
                </div>
                <div
                    className="flex justify-center gap-12 items-center"
                    data-aos="fade-up"
                >
                    {/* Left Tee */}
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-sm leading-[20px] font-normal font-avenir text-[#060606]">Black Crew Tee</p>
                        <Button onClick={() => router.push('/shop')}>
                            Shop for HIM
                        </Button>
                        <p className="text-sm pt-2 text-center leading-[20px] font-normal font-avenir text-[#060606]">Structured. Refined. Essential.</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-sm leading-[20px] font-normal font-avenir text-[#060606]">White Drape Tee</p>
                        <Button onClick={() => router.push('/shop')}>
                            Shop for HER
                        </Button>
                        <p className="text-sm pt-2 leading-[20px] text-center font-normal font-avenir text-[#060606]">Fluid. Feminine. Essential.</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ShopSection;
