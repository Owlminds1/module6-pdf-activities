"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import "swiper/css";
import MyImage from "@/components/myImage";

import Slide2Data from "@/layout-C44-L2-A1/slide2.json";
import Slide3Data from "@/layout-C44-L2-A1/slide3.json";
import Slide4Data from "@/layout-C44-L2-A1/slide4.json";
import Slide5Data from "@/layout-C44-L2-A1/slide5.json";
import AlternativeSceneForm from "./pdfForm";
import SuggestionSlide from "./suggestionSlide";

const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const [visibleCount2, setVisibleCount2] = useState(1);
  const [visibleCount3, setVisibleCount3] = useState(0); // starts after Slide2Data
  const [visibleCount4, setVisibleCount4] = useState(1); // starts after Slide2Data
  const [visibleCount5, setVisibleCount5] = useState(1); // starts after Slide2Data

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
      if (activeSlide === 2) {
        setVisibleCount2((prev) =>
          prev < Slide2Data.length ? prev + 1 : prev
        );
      }

      if (activeSlide === 3) {
        setVisibleCount3((prev) =>
          prev < Slide3Data.length ? prev + 1 : prev
        );
      }

      if (activeSlide === 5) {
        setVisibleCount4((prev) =>
          prev < Slide4Data.length ? prev + 1 : prev
        );
      }

       if (activeSlide === 6) {
        setVisibleCount5((prev) =>
          prev < Slide5Data.length ? prev + 1 : prev
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide, visibleCount2, visibleCount3, visibleCount4,visibleCount5]);

  // autoHeight update
  useEffect(() => {
    swiperRef.current?.updateAutoHeight();
  }, [activeSlide, visibleCount2, visibleCount3, visibleCount4,visibleCount5]);

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
              <div className="grid grid-cols-12 gap-5 place-items-center">
                <div className="col-span-12">
                  <h4 className="text-xl font-bold text-center text-black">
                    5 Internet Safety Tips for Kids
                  </h4>
                </div>
                <div className="col-span-12">
                  <iframe
                    width="600"
                    height="400"
                    src="https://www.youtube.com/embed/X9Htg8V3eik?si=Hmypi5YKbaDES1nl"
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
                <div className="col-span-12">
                  <h4 className="text-xl font-bold text-center text-black">
                    Can you guess what SMART guidelines stand for?
                  </h4>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-12 w-full flex justify-center items-center flex-col">
                  <h4 className="text-xl font-bold text-center text-black">
                    What is a SMART framework?
                  </h4>

                  <p className="text-lg text-black text-center font-medium">
                    A SMART framework allows us to stay safe during digital
                    interactions:
                  </p>

                  <ul className=" list-disc space-y-4 p-2 w-[30%]">
                    {Slide2Data.slice(0, visibleCount2).map((point, i) => (
                      <li
                        key={i}
                        className="text-xl text-black font-bold animate-fadeIn "
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
                  <MyImage path="/C44Images/guidline_image.jpg" />
                </div>
                <div className="col-span-6 w-full flex justify-center items-center flex-col">
                  <h4 className="text-xl font-bold text-center text-black">
                    How do you think we can use the SMART guidelines to be safe
                    in our virtual environments?
                  </h4>

                  <ul className=" list-disc space-y-4 p-2 w-[100%]">
                    {Slide3Data.slice(0, visibleCount3).map((point, i) => (
                      <li
                        key={i}
                        className="text-xl text-black font-bold animate-fadeIn "
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {visibleCount3 < Slide3Data.length && (
                    <p className="text-center text-gray-500 text-sm mt-3">
                      (Press Enter to show Answers)
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-12">
                  <h4 className="text-xl font-bold text-center text-black">
                    What do you know about cyberbullying and cyberbullies?
                  </h4>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-6 w-full flex justify-center items-center">
                  <MyImage path="/C44Images/Stop_CB.jpg" />
                </div>
                <div className="col-span-6 w-full flex justify-center items-center flex-col">
                  <h4 className="text-2xl font-bold text-center text-black">
                    What is cyberbullying?
                  </h4>
                  <h4 className="text-xl font-medium w-full text-left text-black my-3">
                    According to UNICEF,
                  </h4>

                  <ul className=" list-disc space-y-4 p-2 w-[100%]">
                    {Slide4Data.slice(0, visibleCount4).map((point, i) => (
                      <li
                        key={i}
                        className="text-xl text-black font-bold animate-fadeIn "
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {visibleCount4 > Slide4Data.length-1 && (
                    <p className="text-lg text-black mt-5">
                      <span className="font-bold">Examples</span> : spreading misinformation about an individual/misusing portals of communication with foul language/ miming in a hurtful way/teasing or bullying using tech tools.
                    </p>
                  )}

                  {visibleCount4 < Slide4Data.length && (
                    <p className="text-center text-gray-500 text-sm mt-3">
                      (Press Enter to show Answers)
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>


<SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-6 w-full flex justify-center items-center">
                  <MyImage path="/C44Images/CB.png" />
                </div>
                <div className="col-span-6 w-full flex justify-center items-center flex-col">
                  <h4 className="text-2xl font-bold text-center text-black">
                   Who is a cyberbully?
                  </h4>
                 

                  <ul className=" list-disc space-y-4 p-2 w-[100%]">
                    {Slide5Data.slice(0, visibleCount5).map((point, i) => (
                      <li
                        key={i}
                        className="text-xl text-black font-bold animate-fadeIn "
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {visibleCount5 > Slide5Data.length-1 && (
                    <p className="text-lg text-black mt-5">
                      <span className="font-bold">Examples</span> : spreading misinformation about an individual/misusing portals of communication with foul language/ miming in a hurtful way/teasing or bullying using tech tools.
                    </p>
                  )}

                  {visibleCount4 < Slide4Data.length && (
                    <p className="text-center text-gray-500 text-sm mt-3">
                      (Press Enter to show Answers)
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>


            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-12 w-full flex justify-center items-center">
               <MyImage path="/C44Images/Squad.jpg" />
                </div>
                <div className="col-span-12 w-full ">
                
                 <AlternativeSceneForm/>

                </div>
              </div>
            </SwiperSlide>
            
             <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-12 w-full flex justify-center items-center">
                  <MyImage path="/C44Images/Squad.jpg" />
                </div>
                <div className="col-span-12 w-full ">
                
                 <SuggestionSlide/>

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
              activeSlide < 8 ? "visible" : "invisible"
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
