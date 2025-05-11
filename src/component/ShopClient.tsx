"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import ImageMarqueeSection from '@/component/ImageMarquee';
import InfoSection from '@/component/InfoSection';
import VideoSection from '@/component/VideoSection';
import Button from '@/component/Button';
import { useModal } from '@/context/ModalContext';

const infoSections = [
    {
        id: "story-section",
        title: "OUR STORY",
        content: "*The Black Crew Tee had to come first.* Every man owns black tees  The one piece you’ll never outgrow or overthink. No effort. No question. *Always essential.*",
        image: "/story-asset.png",
        
    },
    {
        id: "fabric-section",
        title: "FABRIC",
        content: "*A precise blend of bamboo, charcoal, Supima cotton, and spandex* creates a fabric that’s not only breathable and stretchy but also features exceptional moisture-wicking and antibacterial properties.\n\n*This ensures you stay fresh and comfortable all day*",
        image: "/fabric-asset.png",
        icon: "/thread_1.svg",
        reverse: true
    },
    {
        id: "fit-section",
        title: "FIT",
        content: "*We’re creating a size matrix that acknowledges the diversity of male physiques.* This approach respects that a man’s height and width don’t necessarily scale proportionally, allowing customers to find their precise size rather than settling for the closest approximation.",
        image: "/fit-asset.png",
        icon: "/ruler.svg"
    },
    {
        id: "design-section",
        title: "TIMELESS DESIGN",
        content: "*A piece of timeless design that you own, that will be ubiquitous anytime, anywhere on anyone.* This helps you effortlessly chose what you were that blends into any occasion no matter when you were it. But still maintaining the comfort that you are always used to.",
        image: "/design-asset.png",
        icon: "/clock.svg",
        reverse: true
    },
    {
        id: "style-section",
        title: "STYLING",
        content: "*A piece of timeless design that you own, that will be ubiquitous anytime, anywhere on anyone.* This helps you effortlessly chose what you were that blends into any occasion no matter when you were it. But still maintaining the comfort that you are always used to.",
    }
];

export default function ShopClient() {
    const { open } = useModal();
    const [buttonPosition, setButtonPosition] = useState('bottom-48');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [buttonOpacity, setButtonOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;

            if (scrollTop > 20) {
                setButtonPosition('bottom-5');
                
            } else {
                setButtonPosition('bottom-48');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="w-full overflow-x-hidden">
            <Header maxWidthClass='lg:max-w-[806px]' />
            {/* Video Section - responsive height */}
            <VideoSection
                src="/dress-shop-ad.mov"
                showArrow={false}
                heightClass='calc(100vh - 175px)'
            />
            {/* Product Title - mobile-le first viewport-le visible-a irukkanum */}
            <div className="block text-center pt-5 pb-2 bg-[#eaeadb] product-section" id="product-section">
                <h1
                    className="
                        text-black
                        font-metrophobic
                        tracking-wide
                        text-[32px]
                        font-normal
                        leading-[39.5px]
                        pb-2
                    "
                >
                    Black Crew Tee | Him
                </h1>
                <div className="
                 text-black
                        tracking-wide
                        text-[18px]
                        font-normal
                        leading-[23.2px]
                        font-metrophobic
                        "
                >₹1999</div>
            </div>
            <Button
                position='fixed'
                className={`${buttonPosition} left-1/2 -translate-x-1/2 z-50 transition-[bottom,opacity] duration-1000 ease-in-out opacity-${buttonOpacity * 100}`}
                onClick={open}
            >
                I am Interested
            </Button>
            <div className="max-w-2xl mx-auto lg:max-w-[806px]">
                {infoSections.map((section) => (
                    <InfoSection
                        key={section.id}
                        {...section}
                    />
                ))}
            </div>
            <ImageMarqueeSection
                id="styled-section"
                images={[
                    "/styling-asset.png",
                    "/styling-asset-2.png",
                    "/styling-asset-3.png",
                    "/styling-asset-4.png",
                    "/styling-asset-5.png",
                    "/styling-asset.png",
                    "/styling-asset-2.png",
                    "/styling-asset-3.png",
                    "/styling-asset-4.png",
                    "/styling-asset-5.png",
                ]}
                speed={100}
            />
            <div className="space-y-10 p-6 max-w-2xl mx-auto lg:max-w-[806px]" style={{ background: '#eaeadb' }}>
                <Footer />
            </div>
        </main>
    );
} 