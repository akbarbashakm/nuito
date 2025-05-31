"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import ImageMarqueeSection from '@/component/ImageMarquee';
import InfoSectionAnimation from '@/component/InfoSectionAnimation';
import VideoSection from '@/component/VideoSection';
import Button from '@/component/Button';
import { useModal } from '@/context/ModalContext';
import { SHOP_CONTENT_HIM } from '@/constants/content';

export default function ShopMen() {
    const { open } = useModal();
    const [buttonPosition, setButtonPosition] = useState('bottom-48');

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
        <main className="w-full overflow-x-hidden dark:bg-background-dark">
            <Header maxWidthClass='lg:max-w-[806px]' />
            {/* Video Section - responsive height */}
            <VideoSection
                src="/dress-shop-ad.mov"
                showArrow={false}
            />
            {/* Product Title - mobile-le first viewport-le visible-a irukkanum */}
            <div className="block text-center pt-5 pb-2 dark:bg-background-dark product-section" id="product-section">
                <h1
                    className="
                        text-foreground dark:text-foreground
                        font-metrophobic
                        tracking-wide
                        text-[32px]
                        font-normal
                        leading-[39.5px]
                        pb-2
                    "
                >
                    {SHOP_CONTENT_HIM.product.title}
                </h1>
                <div className="
                 text-foreground dark:text-foreground
                        tracking-wide
                        text-[18px]
                        font-normal
                        leading-[23.2px]
                        font-metrophobic
                        "
                >{SHOP_CONTENT_HIM.product.price}</div>
            </div>
            <Button
                position='fixed'
                className={`${buttonPosition} left-1/2 -translate-x-1/2 z-50 transition-[bottom] duration-1000 ease-in-out`}
                onClick={open}
            >
                I am Interested
            </Button>
            <div className="max-w-2xl mx-auto lg:max-w-[806px] dark:bg-background-dark">
                {SHOP_CONTENT_HIM.infoSections.map((section) => (
                    <InfoSectionAnimation
                        key={section.id}
                        {...section}
                    />
                ))}
            </div>
            <ImageMarqueeSection
                id="styled-section"
                images={SHOP_CONTENT_HIM.stylingImages}
                speed={100}
            />
            <div className="space-y-10 p-6 max-w-2xl mx-auto lg:max-w-[806px] dark:bg-background-dark">
                <Footer />
            </div>
        </main>
    );
} 