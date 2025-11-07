"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import "swiper/css";
import MyImage from "@/components/myImage";

import Slide2Data from "@/layout-C44-L3-A3/slide2.json";
import Slide3Data from "@/layout-C44-L3-A3/slide3.json";
import Slide4Data from "@/layout-C44-L3-A3/slide4.json";

import DigitalFootprintActivity from "./pdfForm";

const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const [visibleCount2, setVisibleCount2] = useState(1);
  const [visibleCount3, setVisibleCount3] = useState(0); // starts after Slide2Data
  const [visibleCount4, setVisibleCount4] = useState(1); // starts after Slide2Data

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
      if (activeSlide === 0) {
        setVisibleCount2((prev) =>
          prev < Slide2Data.length ? prev + 1 : prev
        );
      }

      if (activeSlide === 1) {
        setVisibleCount3((prev) =>
          prev < Slide3Data.length ? prev + 1 : prev
        );
      }

      if (activeSlide === 3) {
        setVisibleCount4((prev) =>
          prev < Slide4Data.length ? prev + 1 : prev
        );
      }

      
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide, visibleCount2, visibleCount3, visibleCount4]);

  // autoHeight update
  useEffect(() => {
    swiperRef.current?.updateAutoHeight();
  }, [activeSlide, visibleCount2, visibleCount3, visibleCount4]);

  return (
    <div className="min-h-screen bg-[#F8FCFA] flex justify-center items-center flex-col p-5">
      <div className="w-[80%] text-center mb-5">
        <h1 className="text-3xl font-bold text-black">SMART Guidelines</h1>

        <p className="text-black text-lg font-medium">

          {activeSlide === 7 ? "Write against each category what the cyberquad would do to ensure internet safety by using the SMART guidelines.":""}
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
                <div className="col-span-6 w-full flex justify-center items-center">
                  <MyImage path="/C44Images/DP_Impact.jpg" />
                </div>
                <div className="col-span-6 w-full flex justify-center items-center flex-col">
                  <h4 className="text-xl font-bold text-center text-black">
                   What is a digital footprint?
                  </h4>

                  

                  <ul className=" list-disc space-y-4 p-2 w-[100%]">
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
                <div className="col-span-6 w-full flex justify-center items-center">
                  <MyImage path="/C44Images/DP_AP.jpg" />
                </div>
                <div className="col-span-6 w-full flex justify-center items-center flex-col">
                  <h4 className="text-xl font-bold text-center text-black">
                  Active v/s Passive data
                  </h4>

                  

                  <ul className=" list-disc space-y-4 p-2 w-[100%]">
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
  
  <DigitalFootprintActivity/>
</SwiperSlide>
            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                
                <div className="col-span-12 w-full flex justify-center items-center flex-col">
                  <h4 className="text-xl font-bold text-center text-black">
                   Digital footprint and Carbon footprint
                  </h4>


                   <h4 className="text-xl  text-center my-3 text-black">
                  Did you know?
                  </h4>

                  

                  <ul className=" list-disc space-y-4 p-2 w-[50%]">
                    {Slide4Data.slice(0, visibleCount4).map((point, i) => (
                      <li
                        key={i}
                        className="text-xl text-black font-bold animate-fadeIn "
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {visibleCount4 < Slide4Data.length && (
                    <p className="text-center text-gray-500 text-sm mt-3">
                      (Press Enter to show next point)
                    </p>
                  )}
                </div>
              </div>
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
              activeSlide < 3 ? "visible" : "invisible"
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
