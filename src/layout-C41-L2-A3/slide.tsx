"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import "swiper/css";
import MyImage from "@/components/myImage";

import Slide2Data from "@/layout-C41-L2-A3/slide2.json";
import Slide3Data from "@/layout-C41-L2-A3/slide3.json";

import DigitalFootprintActivity from "./pdfForm";
import jsPDF from "jspdf";

const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const [visibleCount2, setVisibleCount2] = useState(1);
  const [visibleCount3, setVisibleCount3] = useState(0); // starts after Slide2Data
const [scenes, setScenes] = useState(
    Array(6).fill({
      number: "",
      title: "",
      summary: "",
      objective: "",
    })
  );


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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide, visibleCount2, visibleCount3]);

  // autoHeight update
  useEffect(() => {
    swiperRef.current?.updateAutoHeight();
  }, [activeSlide, visibleCount2, visibleCount3]);

 const handleInputChange = (index: number, key: string, value: string, limit: number = 30) => {
    if (key === "summary" || key === "objective") {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount > limit) return; // enforce word limit
    }
    const updated = [...scenes];
    updated[index] = { ...updated[index], [key]: value };
    setScenes(updated);
  };


  
  // Generate PDF
  const generatePDF = () => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 25;

  doc.setFontSize(18);
  const title = "Scene Creation Activity";
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, 15);

  doc.setFontSize(12);

  scenes.forEach((scene, i) => {
    const sceneTitle = `Scene ${i + 1}`;
    const lines = [
      `Title: ${scene.title || ""}`,
      `Summary: ${scene.summary || ""}`,
      `Objective: ${scene.objective || ""}`,
    ];

    const textLines = doc.splitTextToSize(lines.join("\n"), 170);
    const blockHeight = textLines.length * 7;

    if (y + blockHeight > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(sceneTitle, 20, y);
    y += 8;
    doc.text(textLines, 25, y);
    y += blockHeight + 8;
  });

  doc.save("Scene_Creation_Activity.pdf");
};

  return (
    <div className="min-h-screen bg-[#F8FCFA] flex justify-center items-center flex-col p-5">
      <div className="w-[80%] text-center mb-5">
        <h1 className="text-3xl font-bold text-black">Building Scene</h1>

        <p className="text-black text-lg font-medium">
          {activeSlide === 0
            ? "Here are some important things to keep in mind while creating scenes:"
            : activeSlide === 1
            ? "Here is an example of a scene from “Barbie”"
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
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-6 w-full flex justify-center items-center">
                  <MyImage path="/C41Images/film.png" />
                </div>
                <div className="col-span-6 w-full flex justify-center items-center flex-col">
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
                  <MyImage path="/C41Images/Barbies.jpeg" />
                </div>
                <div className="col-span-6 w-full flex justify-center items-start flex-col">
                  <h4 className="text-xl  text-left   text-black">
                    <span className="font-bold">EXTERIOR : </span>ROOF OF WEIRD
                  </h4>

                  <h4 className="text-xl  text-left   text-black">
                    <span className="font-bold">BARBIE’S : </span>MORNING
                  </h4>

                  <h4 className="text-xl mb-3 text-center text-black">
                    (establishes time and place)
                  </h4>

                  <p className="text-lg  my-3   text-black">
                    All the Barbies, Barbie Margot, Weird Barbie, Gloria, Sasha,
                    and the rejected Barbies and Kens look over Barbie Land.
                    (establishes characters in the scene and what they are
                    doing)
                  </p>

                  {Slide3Data.slice(0, visibleCount3).map((point, i) => (
                    <h4 className="text-lg text-left   text-black">
                      <span className="font-bold">{point.title} : </span>
                      {point.content}
                    </h4>
                  ))}

                  {visibleCount3 > Slide3Data.length - 1 && (
                    <p className="text-center text-black text-sm mt-3">
                      The writer knows what the scene is about. It doesn’t have
                      to be evident.
                    </p>
                  )}

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
                <div className="col-span-6 w-full flex justify-center items-center">
                  <MyImage path="/C41Images/Barbie.jpg" />
                </div>
                <div className="col-span-6 w-full flex justify-center items-center flex-col">
                  <h4 className="text-xl  text-left font-bold   text-black">
                    What do you think this scene is about?
                  </h4>
                </div>
              </div>
            </SwiperSlide>





            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-6 w-full flex justify-center items-center">
                     <MyImage path="/C41Images/Barbie.jpg" />
                </div>
                <div className="col-span-6 w-full flex justify-center items-center flex-col">
                  <h4 className="text-2xl  text-left font-bold   text-black">
                    What do you think this scene is about?
                  </h4>

                  <p className="text-lg font-medium text-black text-center mt-3">
                    Exactly. It’s about the barbies reclaiming their rights
                    while accepting the state of their surroundings.
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-12 w-full flex justify-center items-center flex-col">
                  <ul className=" list-disc space-y-4 p-2 w-[60%]">
                    <li className="text-xl text-black font-medium animate-fadeIn ">
                      Give the story about the dogs and the squirrel a title
                    </li>

                    <li className="text-xl text-black font-medium animate-fadeIn ">
                      Write six scenes based on the following prompts. Keep each
                      scene description up to 30 words.
                    </li>

                    <li className="text-xl text-black font-medium animate-fadeIn ">
                      For each scene make a note of response to the questions
                      listed
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 min-h-[200px] gap-5 place-items-center">
                <div className="col-span-6 w-full flex justify-center items-center">
                  <MyImage path="/C41Images/Framework_Example.png" />
                </div>
                <div className="col-span-6 w-full flex justify-center items-center flex-col gap-3">
                  <h4 className="text-2xl  text-left font-bold   text-black">
                    TITLE
                  </h4>
                  <h4 className="text-xl  text-left font-normal   text-black">
                    Example: Two Dogs and A Ball
                  </h4>
                  <textarea
                    placeholder="Enter title"
                    className="text-center text-black p-1 rounded-lg border border-black/20 w-[60%] focus:outline-none focus:ring-2 focus:ring-black"
                    rows={1}
                  />
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="grid grid-cols-12 gap-4 w-full place-items-center ">
                <div className="col-span-12 w-full  flex justify-center items-center flex-col">
                  <h3 className="font-bold text-black  text-xl text-left w-[60%]">
                    Establish{" "}
                  </h3>
                  <ul className=" list-disc space-y-4 p-2 w-[60%]">
                    <li className="text-xl text-black font-medium animate-fadeIn ">
                      Time & Place
                    </li>

                    <li className="text-xl text-black font-medium animate-fadeIn ">
                      Characters in the scene and what they are doing
                    </li>

                    <li className="text-xl text-black font-medium animate-fadeIn ">
                      What’s happening and what will happen next
                    </li>
                  </ul>
                </div>

                <div className="col-span-12 w-full flex justify-center items-center">
                  <DigitalFootprintActivity />
                </div>
              </div>
            </SwiperSlide> 
            
          {scenes.map((scene, i) => {
  const summaryCount = scene.summary.trim().split(/\s+/).filter(Boolean).length;
  const objectiveCount = scene.objective.trim().split(/\s+/).filter(Boolean).length;

  const isLast = i === scenes.length - 1; // check if it's the last scene

  return (
    <SwiperSlide key={i}>
      <div className="grid grid-cols-12 gap-5 place-items-center">
        <div className="col-span-12 flex justify-center items-center">
         <h4 className="font-bold text-2xl text-center text-black">Let's create the 6 Scene  as per the template</h4>
        </div>
        <div className="col-span-12 flex flex-col gap-4 text-black w-[60%]">
          <h2 className="text-2xl font-bold text-center mb-2">
            Scene {i + 1}
          </h2>

          <label className="font-semibold">Scene Number</label>
          <input
            type="text"
            value={scene.number}
            onChange={(e) => handleInputChange(i, "number", e.target.value)}
            placeholder={`Enter scene number`}
            className="border border-gray-300 rounded-lg p-2 text-black focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <label className="font-semibold">Scene Title</label>
          <input
            type="text"
            value={scene.title}
            onChange={(e) => handleInputChange(i, "title", e.target.value)}
            placeholder="Enter scene title"
            className="border border-gray-300 rounded-lg p-2 text-black focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <label className="font-semibold">Summary (max 30 words)</label>
          <textarea
            rows={3}
            value={scene.summary}
            onChange={(e) =>
              handleInputChange(i, "summary", e.target.value, 30)
            }
            placeholder="Write summary here..."
            className="border border-gray-300 rounded-lg p-2 text-black focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
          <p
            className={`text-sm text-right ${
              summaryCount > 30 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {summaryCount}/30 words
          </p>

          <label className="font-semibold">Objective (max 30 words)</label>
          <textarea
            rows={3}
            value={scene.objective}
            onChange={(e) =>
              handleInputChange(i, "objective", e.target.value, 30)
            }
            placeholder="Write objective here..."
            className="border border-gray-300 rounded-lg p-2 text-black focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
          <p
            className={`text-sm text-right ${
              objectiveCount > 30 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {objectiveCount}/30 words
          </p>

          {/* 👉 Add PDF button only on last scene */}
          {isLast && (
            <button
              onClick={generatePDF}
              className="mt-5 bg-violet-900 hover:bg-violet-800 text-white cursor-pointer font-bold py-2 px-5 rounded-lg self-center transition-all"
            >
              Download PDF
            </button>
          )}
        </div>
      </div>
    </SwiperSlide>
  );
})}


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
              activeSlide < 12 ? "visible" : "invisible"
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
