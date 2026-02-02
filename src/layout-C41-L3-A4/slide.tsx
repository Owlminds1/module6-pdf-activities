"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import "swiper/css";
import MyImage from "@/components/myImage";

import Slide2Data from "@/layout-C41-L3-A4/slide2.json";
import Slide3Data from "@/layout-C41-L3-A4/slide3.json";
import Slide4Data from "@/layout-C41-L3-A4/slide4.json";
import slide3Sub from "@/layout-C41-L3-A4/slide3Sub.json";
import AlternativeSceneForm from "./pdfForm";
import Link from "next/link";

const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const [visibleCount2, setVisibleCount2] = useState(1);
  const [visibleCount3, setVisibleCount3] = useState(1); // starts after Slide2Data
  const [visibleCount4, setVisibleCount4] = useState(1); // starts after Slide2Data
  const [visibleCountSub3, setVisibleCountSub3] = useState(1); // starts after Slide2Data

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

      // Slide 3 logic
      if (activeSlide === 2) {
        // 👉 First show main list
        if (visibleCount3 < Slide3Data.length) {
          setVisibleCount3((prev) => prev + 1);
        }
        // 👉 Then start sublist after main list done
        else if (visibleCountSub3 < slide3Sub.length) {
          setVisibleCountSub3((prev) => prev + 1);
        }
      }

      if (activeSlide === 4) {
        setVisibleCount4((prev) =>
          prev < Slide4Data.length ? prev + 1 : prev
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeSlide,
    visibleCount2,
    visibleCount3,
    visibleCount4,
    visibleCountSub3,
  ]);

  // autoHeight update
  useEffect(() => {
    swiperRef.current?.updateAutoHeight();
  }, [
    activeSlide,
    visibleCount2,
    visibleCount3,
    visibleCount4,
    visibleCountSub3,
  ]);

  return (
    <div className="min-h-screen bg-[#F8FCFA] flex justify-center items-center flex-col p-5">
      <div className="w-[80%] text-center mb-5">
        <h1 className="text-3xl font-bold text-black">Building a Storyboard</h1>

        <p className="text-black text-lg font-medium">
          {activeSlide === 0
            ? "Review the questions about the upcoming scene to be able to answer afterwards."
            : activeSlide === 1
            ? "Let’s watch another scene from Inside Out. Keep the questions in mind."
            : activeSlide === 2
            ? "It’s time to apply different POVs to the same sequence!"
            : activeSlide === 3
            ? "Let’s read this scene from “Inside Out.”"
            : activeSlide === 4
            ? "Let’s see the visual representation of this scene along with physical proximity on each scene impacting the POV."
            : activeSlide === 5
            ? "What would the alternative scene look and feel like, if sadness were to be boss, instead of joy? How would sadness behave towards her? Would she be more empathetic when compared?"
            : activeSlide === 6
            ? "Let’s make a storyboard for your alternative scene!"
            : ""}
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
                <div className="col-span-6">
                  <MyImage path="/C41Images/IO_Scene.png" />
                </div>

                <div className="col-span-6">
                  <ul className=" list-disc space-y-4 p-2">
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

            {/* SLIDE 2 */}
            <SwiperSlide>
              <div className="grid grid-cols-12 gap-5 place-items-center">
                <div className="col-span-12 w-full flex justify-center items-center flex-col">
                  <iframe
                    width="600"
                    height="400"
                    src="https://www.youtube.com/embed/yXYRFY5GSO8?si=94sWvl723NbBK2jv"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 gap-5 place-items-center">
               
                <div className="col-span-12 flex justify-center items-center flex-col ">
                  <ul className=" list-disc space-y-4 p-2 w-[50%]">
                    {Slide3Data.slice(0, visibleCount3).map((point, i) => (
                      <li
                        key={i}
                        className="text-xl text-black font-bold animate-fadeIn "
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Sub List */}
                  {visibleCount3 >= Slide3Data.length && (
                    <ul className="list-decimal list-inside px-5 space-y-4 p-2 mt-4">
                      {slide3Sub.slice(0, visibleCountSub3).map((point, i) => (
                        <li
                          key={i}
                          className="text-lg text-black font-medium animate-fadeIn"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {visibleCountSub3 >= slide3Sub.length && (
                    <ul className="list-disc space-y-4 p-2 mt-4 w-[50%]">
                      <li className="text-lg text-black font-medium animate-fadeIn">
                        Keep your scene description as short as the example with
                        dialogue. You can use other elements besides the circle
                        to determine the dynamics between the characters. What
                        would the storyboard for the last scene look like?
                      </li>
                    </ul>
                  )}

                  {(visibleCount3 < Slide3Data.length ||
                    (visibleCount3 >= Slide3Data.length &&
                      visibleCountSub3 < slide3Sub.length)) && (
                    <p className="text-center text-gray-500 text-sm mt-3">
                      (Press Enter to show next point)
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 gap-5 place-items-center">
                <div className="col-span-6">
                  <MyImage path="/C41Images/IO_Scene.png" />
                </div>

                <div className="col-span-6 w-full flex justify-start items-start flex-col gap-4">
                  <div>
                    <h3 className="text-xl text-black font-bold ">
                      THE BACK OF THE ROOM
                    </h3>
                    <p className="text-lg text-black font-medium">
                      Joy draws a chalk circle on the floor around Sadness’s
                      feet.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-black ">
                      <span className="font-extrabold ">SADNESS</span>: What are
                      you doing?
                    </h3>
                    <p className="text-lg font-medium mt-2 text-black">
                      <span className="font-bold">
                        JOY (finishing the circle):{" "}
                      </span>
                      And... there. Perfect. This is the circle of Sadness. Your
                      job is to make sure that all the Sadness stays inside of
                      it.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-black ">
                      <span className="font-extrabold ">SADNESS</span>: So...
                      you want me to just stand here?
                    </h3>
                    <p className="text-lg font-medium mt-2 text-black">
                      <span className="font-bold">JOY : </span>Hey, it’s not MY
                      place to tell you how to do your job. Just make sure--
                      (nudging Sadness’ foot back over the line)
                    </p>
                  </div>

                  <p className="text-center text-black text-lg font-medium">
                    ALL the Sadness stays in the circle. Sadness stands there
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 gap-5 place-items-center">
              

                <div className="col-span-12 flex justify-center items-center flex-col">
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
                  {/* Sub List */}\
                  {visibleCount4 < Slide4Data.length && (
                    <p className="text-center text-gray-500 text-sm mt-3">
                      (Press Enter to show next point)
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 gap-5 place-items-center">
                <div className="col-span-12">
                  <MyImage path="/C41Images/IO_Scene.png" />
                </div>

                <div className="col-span-12 w-full">
                  <AlternativeSceneForm />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 gap-5 place-items-center">
                <div className="col-span-6">
                  <MyImage path="/C41Images/L3C41A4.png"/>
                </div>
                <div className="col-span-6 w-full">
                  <ul className=" list-disc space-y-4 p-2">
                    <li className="text-xl text-black font-bold animate-fadeIn ">
                      Sign in Canva to open the{" "}
                      <Link
                        href="https://www.canva.com/design/DAGr0YoricA/x-9387Oom-RVMsrBiIgl3g/view?utm_content=DAGr0YoricA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h361f4ce83d"
                        target="blank"
                        className="text-blue-600"
                      >
                        the template
                      </Link>
                    </li>

                    <li className="text-xl text-black font-bold animate-fadeIn ">
                      Make a copy of the template
                    </li>

                    <li className="text-xl text-black font-bold animate-fadeIn ">
                      You will see an placeholder for an image along with scene
                      number and a description
                    </li>

                    <li className="text-xl text-black font-bold animate-fadeIn ">
                      Use these sets of images for inspiration. You can use
                      other images that are on creative commons.
                    </li>

                    <li className="text-xl text-black font-bold animate-fadeIn ">
                      You can use magic media on canva to get images. Type the
                      scene description to get the image that best fits the
                      description. Be open to refining the description to get
                      the exact image.
                    </li>

                    <li className="text-xl text-black font-bold animate-fadeIn ">
                      Write the scene description under each image
                    </li>

                    <li className="text-xl text-black font-bold animate-fadeIn ">
                      You can animate the presentation by selecting a number of
                      options
                    </li>

                    <li className="text-xl text-black font-bold animate-fadeIn ">
                      You can also add sound effects
                    </li>
                  </ul>
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
              activeSlide < 6 ? "visible" : "invisible"
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
