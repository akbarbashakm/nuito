"use client";

import React from 'react';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import ImageMarqueeSection from '@/component/ImageMarquee';
import InfoSection from '@/component/InfoSection';
import VideoSection from '@/component/VideoSection';
import Button from '@/component/Button';
import { useModal } from '@/context/ModalContext';

export default function ShopClient() {
    const { open } = useModal();
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
            <div className="block text-center pt-4 pb-2 bg-[#eaeadb]">
                <h1
                    className="
                        text-black
                        tracking-wide
                        text-[32px]
                        font-normal
                        leading-[39.5px]
                        font-[var(--Nuito---Font-01,Metrophobic)]
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
                        font-[var(--Nuito---Font-01,Metrophobic)]
                        ">₹1999</div>
            </div>
            <Button position='fixed' className="bottom-55 left-1/2 -translate-x-1/2 z-50"
                    onClick={open}
>
                I am Interested
            </Button>
            <div className="space-y-10 p-6 max-w-2xl mx-auto lg:max-w-[806px]" style={{ background: '#eaeadb' }}>
                <InfoSection
                    title="STORY"
                    content="[The Black Crew Tee had to come first.] Every man owns black tees  The one piece you'll never outgrow or overthink. No effort. No question. [Always essential.]"
                    image="/story-asset.png"
                />

                <InfoSection
                    title="Fabric"
                    content="[A precise blend of bamboo, charcoal, Supima cotton, and spandex] creates a fabric that's not only breathable and stretchy but also features exceptional moisture-wicking and antibacterial properties. [This ensures you stay fresh and comfortable all day.]"
                    image="/fabric-asset.png"
                    icon={'/thread_1.svg'}
                    reverse
                />
                <InfoSection
                    title="FIT"
                    content="We're creating a size matrix that acknowledges the diversity of male physiques.] This approach respects that a man's height and width don't necessarily scale proportionally, allowing customers to find their precise size rather than settling for the closest approximation. "
                    image="/fit-asset.png"
                    icon={'/ruler.svg'}
                />
                <InfoSection
                    title="TIMELESS DESIGN"
                    content="[A piece of timeless design that you own, that will be ubiquitous anytime,] anywhere on anyone. This helps you effortlessly chose what you were that blends into any occasion no matter when you were it. But still maintaining the comfort that you are always used to."
                    image="/design-asset.png"
                    icon={'/clock.svg'}
                    reverse
                />
            </div>
            <ImageMarqueeSection
                images={[
                    "/styling-asset.png",
                    "/styling-asset-2.png",
                    "/styling-asset-3.png",
                    "/styling-asset-4.png",
                    "/styling-asset-5.png",
                ]}
                speed={10}
            />
            <div className="space-y-10 p-6 max-w-2xl mx-auto lg:max-w-[806px]" style={{ background: '#eaeadb' }}>
                <Footer />
            </div>
        </main>
    );
} 