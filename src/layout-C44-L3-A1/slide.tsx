"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import "swiper/css";
import MyImage from "@/components/myImage";

import Slide2Data from "@/layout-C44-L3-A1/slide2.json";
import Slide3Data from "@/layout-C44-L3-A1/slide3.json";

import Image from "next/image";
import Table from "./table";

const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const [visibleCount2, setVisibleCount2] = useState(1);
  const [visibleCount3, setVisibleCount3] = useState(0); // starts after Slide2Data

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
    window.scrollTo(0, 0);
  };

  // 👉 Enter key logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;

      // Slide 1 logic
      if (activeSlide === 1) {
        setVisibleCount2((prev) =>
          prev < Slide2Data.length ? prev + 1 : prev
        );
      }

      if (activeSlide === 2) {
        setVisibleCount3((prev) =>
          prev < Slide3Data.length ? prev + 1 : prev
        );
      }

     
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide, visibleCount2, visibleCount3]);

  // autoHeight update
  useEffect(() => {
    swiperRef.current?.updateAutoHeight();
  }, [activeSlide, visibleCount2, visibleCount3]);

  return (
    <div className="min-h-screen bg-[#F8FCFA] flex justify-center items-center flex-col p-5">
      <div className="w-[80%] text-center mb-5">
        <h1 className="text-3xl font-bold text-black">
          {activeSlide === 0
            ? "Internet Safety"
            : activeSlide === 1
            ? "Internet Safety Q&A"
            : activeSlide === 2
            ? "What is a SMART framework?"
            : activeSlide === 3
            ? "Drag and Place activity"
            : activeSlide === 4
            ? "Drag and Place activity" :""}
        </h1>

        <p className="text-black text-lg font-medium">
          {activeSlide === 1
            ? "Do you recall the rules of internet safety? What are they?"
            : activeSlide === 4 ?"Drag and place the definition from the LHS against each blank on the RHS.":""}
        </p>
      </div>

      <div className="w-[90%]">
        <div className="w-full shadow-lg p-5 rounded-lg bg-white">
          <Swiper
            loop={false}
            autoHeight
            allowTouchMove={false}
            modules={[Navigation]}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
          >
            {/* SLIDE 1 */}

            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-12 w-full flex justify-center items-center">
                  <iframe
                    width="60%"
                    height="400"
                    src="https://www.youtube.com/embed/boFW0dCJMpI?si=zD_rmT_1jH5onULS"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-12 w-full flex justify-center items-center flex-col">
                  <ul className=" list-disc space-y-4 p-2 w-[40%]">
                    {Slide2Data.slice(0, visibleCount2).map((point, i) => (
                      <li
                        key={i}
                        className="text-xl text-black font-medium animate-fadeIn "
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {visibleCount2 < Slide2Data.length && (
                    <p className="text-center text-gray-500 text-sm mt-3">
                      (Press Enter to show next point)
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-6 w-full flex justify-center items-center ">
                  <Image
                    width={400}
                    className="blur-[2px]"
                    alt="Guideline Image"
                    height={100}
                    src="/C44Images/guidline_image.jpg"
                  />
                </div>
                <div className="col-span-6 w-full flex justify-center items-center flex-col">
                  <h4 className="text-lg font-bold text-left text-black">
                    A SMART framework allows us to stay safe during digital
                    interactions:
                  </h4>

                  <ul className=" list-disc space-y-4 p-2 w-[40%]">
                    {Slide3Data.slice(0, visibleCount3).map((point, i) => (
                      <li
                        key={i}
                        className="text-xl text-black font-medium animate-fadeIn "
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {visibleCount3 < Slide3Data.length && (
                    <p className="text-center text-gray-500 text-sm mt-3">
                      (Press Enter to show next point)
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-12 w-full flex justify-center items-center flex-col">
                  <ul className=" list-disc space-y-4 p-2 w-[40%]">
                    <li className="text-xl text-black font-medium animate-fadeIn ">
                      On the poster, you will see each letter of the acronym
                      SMART on the RHS.
                    </li>

                    <li className="text-xl text-black font-medium animate-fadeIn ">
                      On the same poster, you will blanks against each letter.
                    </li>

                    <li className="text-xl text-black font-medium animate-fadeIn ">
                      On the LHS, you will see possible full interpretations of
                      the five full forms: safe, meeting, accepting, reliable,
                      and tell.
                    </li>

                    <li className="text-xl text-black font-medium animate-fadeIn ">
                      Drag and place the definition from the LHS against each
                      blank on the RHS.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <Table />
</SwiperSlide>

            
           

            {/* pdf form  */}
          </Swiper>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center w-full mt-8">
          <span
            onClick={handlePrev}
            className={`${
              activeSlide === 0 ? "invisible" : "visible"
            } cursor-pointer text-4xl text-black border rounded-full p-3 bg-yellow-400`}
          >
            <FaArrowLeft />
          </span>

          <span
            onClick={handleNext}
            className={`${
              activeSlide < 4 ? "visible" : "invisible"
            } cursor-pointer text-4xl text-black border rounded-full p-3 bg-yellow-400`}
          >
            <FaArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slide;
