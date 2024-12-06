"use client";

import React, { useState, useEffect } from 'react';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import { HiOutlineArrowSmallRight } from 'react-icons/hi2';
import { BsDot } from 'react-icons/bs';
import { motion } from 'framer-motion';

interface ImageCarouselProps {
    images: string[];
    delay?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, delay = 5000 }) => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const [carouselDelay, setCarouselDelay] = useState(delay);

    // PANEL CONSTANTS
    const numImages = images.length;

    const goToNextSlide = () => {
        if (current === numImages - 1) { setCurrent(0); }
        else { setCurrent(current + 1); }
    };

    const goToPreviousSlide = () => {
        if (current == 0) { setCurrent(numImages - 1); }
        else { setCurrent(current - 1); }
    };

    useEffect(() => {
        if (!paused) {
            const timer = setTimeout(() => {
                goToNextSlide();
                setCarouselDelay(delay);
            }, carouselDelay);
            return () => clearTimeout(timer);
        }
    }, [current, paused, carouselDelay, delay]);

    return (
        <main className="px-14">
            <div className="relative flex flex-col items-center py-5">
                <div className="overflow-hidden w-full h-full">
                    <motion.div
                        className="flex snap-start snap-always"
                        initial={{ x: 0}}
                        animate={{ x: -current * 748}}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {images.map((src, index) => (
                            <motion.div className="flex items-center justify-center p-2 min-w-[50rem] h-[60vh]" key={index}>
                                <img
                                    src={src}
                                    className="w-full h-full object-cover rounded"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
            <div className="flex flex-row w-full justify-between">
                <button
                    className="bg-gray-100 p-3 rounded-full shadow transition-all hover-opacity-70"
                    onClick={goToPreviousSlide}
                >
                    <HiOutlineArrowSmallLeft />
                </button>
                <div className="flex flex-row gap-1">
                    {images.map((_, index) => (
                        <BsDot
                            onClick={() => setCurrent(index)}
                            key={index}
                            className={`cursor-pointer text-2x1 ${
                                index === current ? "text-gray-800" : "text-gray-400"
                            }`}
                        />
                    ))}
                </div>
                <button
                    className="bg-gray-100 p-3 rounded-full shadow transition-all hover-opacity-70"
                    onClick={goToNextSlide}
                >
                    <HiOutlineArrowSmallRight />
                </button>
            </div>
        </main>
    );
}

export default ImageCarousel;