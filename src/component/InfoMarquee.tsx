"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface InfoMarqueeProps {
    title: string;
    content: string;
    image: string;
    icon?: string;
}

const InfoMarquee: React.FC<InfoMarqueeProps> = ({ title, content, image, icon }) => {
    return (
        <section className="w-full py-8 bg-lightbeige">
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
                className="mySwiper"
            >
                {[...Array(3)].map((_, idx) => (
                    <SwiperSlide key={idx} className="!w-[80%] md:!w-[60%]">
                        <div className="flex flex-col md:flex-row items-center gap-8 p-4">
                            <div className="w-full md:w-1/2">
                                <Image
                                    src={image}
                                    alt={title}
                                    width={412}
                                    height={731}
                                    className="rounded-lg shadow-lg object-cover w-full"
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <h2 className="text-3xl text-black/64 md:text-[32px] font-metrophobic mb-4 uppercase flex items-center">
                                    {icon && (
                                        <Image
                                            src={icon}
                                            alt="icon"
                                            width={32}
                                            height={32}
                                            className="mr-2 inline-block"
                                        />
                                    )}
                                    {title}
                                </h2>
                                <p className="text-[18px] font-m font-metrophobic md:text-[18px] text-black/64">
                                    {content.split('[*').map((line, lineIndex) => (
                                        <React.Fragment key={lineIndex}>
                                            {lineIndex > 0 && <br />}
                                            {line.split(/(\[.*?\])/g).map((part, index) => {
                                                if (part.startsWith('[') && part.endsWith(']')) {
                                                    const text = part.slice(1, -1);
                                                    return (
                                                        <span key={index} className="font-medium text-[#212121]">
                                                            {text}
                                                        </span>
                                                    );
                                                } else {
                                                    return <span key={index} className="font-medium text-[#212121]/60">{part}</span>;
                                                }
                                            })}
                                            {lineIndex < content.split('[*').length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <style jsx global>{`
                .swiper {
                    width: 100%;
                    padding-top: 50px;
                    padding-bottom: 50px;
                }
                .swiper-slide {
                    background-position: center;
                    background-size: cover;
                    width: 300px;
                    height: auto;
                }
                .swiper-slide img {
                    display: block;
                    width: 100%;
                }
                .swiper-button-next,
                .swiper-button-prev {
                    color: #000;
                }
                .swiper-pagination-bullet {
                    background: #000;
                }
                .swiper-pagination-bullet-active {
                    background: #000;
                }
            `}</style>
        </section>
    );
};

export default InfoMarquee; 