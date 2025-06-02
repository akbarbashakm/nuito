"use client";

import Image from 'next/image';
import React, { useEffect } from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ShopSection = ({ id }: { id: string }) => {
    const router = useRouter();
    useEffect(() => {
        AOS.init({
            duration: 800, // adjust animation duration if needed
            once: false, // run animation only once
            offset: 100,
        });
    }, []);
    return (
        <main className="w-full min-h-[100dvh] flex items-center justify-center" id={id}>
            <div
                className="space-y-6 max-w-2xl flex items-center justify-center py-8 mx-4 sm:mx-4 lg:mx-auto rounded-[24px] block lg:max-w-[806px] dark:bg-background-dark relative"
            >
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
                        className="text-[3rem] pb-[18px] font-normal uppercase text-center font-metrophobic text-[#000000]/64"
                        data-aos="fade-up"
                    >
                        Drop 01
                    </h2>
                    <h4
                        className="text-[1.75rem] px-2 leading-[39px] text-[#060606] text-center font-maven font-normal"
                        data-aos="fade-up"
                    >
                        &ldquo;MONOCHROME MAGIC <br />
                        – 50 pieces. Black, <br /> white, and gone&rdquo; .
                    </h4>
                    <div
                        className="w-full"
                        data-aos="fade-up"
                    >
                        <Image
                            src="/teepic.webp"
                            width={348}
                            height={274}
                            alt="t-shirt"
                            data-aos="fade-up"
                            className="w-full py-4 sm:w-[500px] md:w-[415px] max-w-full h-auto mx-auto"
                        />
                    </div>
                    <div
                        className="flex justify-center sm:justify-evenly gap-0 items-center w-full"
                    >
                        {/* Left Tee */}
                        <div className="flex flex-col justify-center items-center w-full sm:w-auto">
                            <p className="text-sm text-[1rem] leading-[20px] font-normal font-maven text-[#060606]">White Drape Tee</p>
                            <Button onClick={() => router.push('/shop/him')}>
                                Shop for HIM
                            </Button>
                            <p className="text-sm p-4 text-center leading-[20px] font-normal font-maven text-[#060606]">Fluid. Feminine.<br /> Essential.</p>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full sm:w-auto sm:mt-0">
                            <p className="text-sm text-[1rem] leading-[20px] font-normal font-maven text-[#060606]">Black Crew Tee</p>
                            <Button onClick={() => router.push('/shop/her')}>
                                Shop for HER
                            </Button>
                            <p className="text-sm p-4 leading-[20px] text-center font-normal font-maven text-[#060606]">Structured. <br />Refined. Essential.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ShopSection;
