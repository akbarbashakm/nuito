"use client";

import Image from 'next/image';
import React from 'react';

const ShopSection = () => {

    return (
        <div className="space-y-8 p-6 max-w-2xl mx-auto border-t border-[#868686]" style={{ background: '#eaeadb' }}>
            <h2 className="text-[34px] text-black text-center">Drop 01</h2>
            <h4 className="text-[18px] text-black text-center">“MONOCHROME MAGIC <br />
                – 50 pieces. Black, white, and gone” .</h4>
            <Image src={`/teespics.svg`}
                layout="intrinsic" // Automatically sizes the image based on its natural size
                width={348} // Provide the width
                height={274} // Provide the height to maintain aspect ratio            
                alt="t-shirt"
                className="w-[348px] sm:w-[500px] max-w-full h-auto mx-auto"
            />
            <div className="grid grid-cols-2 text-center">
                {/* Left Tee */}
                <div>
                    <p className="font-medium" style={{ color: "#060606" }}>Black Crew Tee</p>
                    <button className="relative inline-block bg-[#e7cd4b] text-black font-semibold py-2 px-4 rounded mt-2 border-2 border-transparent hover:bg-transparent hover:border-[#e7cd4b] hover:text-[#000] cursor-pointer transition-all duration-300">
                        Shop for HIM
                    </button>
                    <p className="mt-2 text-sm text-gray-700" style={{ color: "#060606" }}>Structured. Refined. Essential.</p>
                </div>
                {/* Right Tee */}
                <div>
                    <p className="font-medium" style={{ color: "#060606" }}>White Drape Tee</p>
                    <button className="relative inline-block bg-[#e7cd4b] text-black font-semibold py-2 px-4 rounded mt-2 border-2 border-transparent hover:bg-transparent hover:border-[#e7cd4b] hover:text-[#000] cursor-pointer transition-all duration-300">
                        Shop for HER
                    </button>
                    <p className="mt-2 text-sm text-gray-700" style={{ color: "#060606" }}>Fluid. Feminine. Essential.</p>
                </div>
            </div>

        </div>
    );
};

export default ShopSection; 