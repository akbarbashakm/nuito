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
        });
    }, []);
    return (
        <main className="w-full" id={id}>
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

                <div className="relative z-10">
                    <h2
                        className="text-[40px] uppercase text-center font-metrophobic text-black/64 dark:text-white/64"
                        data-aos="fade-up"
                    >
                        Drop 01
                    </h2>
                    <h4
                        className="text-[24px] leading-[39px] text-black dark:text-white text-center font-metrophobic"
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
                            src="/teepic.png"
                            width={348}
                            height={274}
                            alt="t-shirt"
                            className="w-full py-8 sm:w-[500px] md:w-[415px] max-w-full h-auto mx-auto"
                        />
                    </div>
                    <div
                        className="flex justify-center gap-0 items-center"
                        data-aos="fade-up"
                    >
                        {/* Left Tee */}
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-sm leading-[20px] font-normal font-avenir text-black dark:text-white">Black Crew Tee</p>
                            <Button onClick={() => router.push('/shop')}>
                                Shop for HIM
                            </Button>
                            <p className="text-sm p-4 text-center leading-[20px] font-normal font-avenir text-black dark:text-white">Structured. Refined. Essential.</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-sm leading-[20px] font-normal font-avenir text-black dark:text-white">White Drape Tee</p>
                            <Button onClick={() => router.push('/shop')}>
                                Shop for HER
                            </Button>
                            <p className="text-sm p-4 leading-[20px] text-center font-normal font-avenir text-black dark:text-white">Fluid. Feminine. Essential.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ShopSection;
