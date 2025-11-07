"use client";
import React, {  useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MyImage from "@/components/myImage";
import jsPDF from "jspdf";

const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});

  

  const handlePrev = () => {
    swiperRef?.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.current?.slideNext();
  };
  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
    window.scrollTo(0, 0);
    
  };

  const generatePDF = async () => {
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
  });

  // Title
  doc.setFontSize(18);
  doc.text("SMART Rules Practice Responses", 105, 20, { align: "center" });

  doc.setFontSize(12);
  let y = 40; // starting y position

  Object.entries(responses).forEach(([key, value]) => {
    // label
    doc.setFont("helvetica", "bold");
    doc.text(`${key}:`, 20, y);
    y += 8;

    // response text (multi-line)
    doc.setFont("helvetica", "normal");
    const textLines = doc.splitTextToSize(value || "-", 170);
    doc.text(textLines, 20, y);
    y += textLines.length * 8 + 5;

    // auto page-break
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("SMART_Rules_Responses.pdf");
};


  return (
    <div className="min-h-screen bg-[#F8FCFA] flex justify-center items-center gap-5 flex-col p-5 ">
      <div>
        <h1 className="text-3xl text-center text-black font-bold">Practise SMART Rules</h1>
        <p className="text-lg pt-2 text-center text-black">
          {activeSlide === 0
            ? "5-word lines starting wIth DON’T for each SMART guideline against cyberbullying"
            : activeSlide === 1
            ? "Suggestive responses"
            : ""}
          
        </p>
      </div>
      <div className="w-full ">
        <div className=" w-full shadow-lg p-2  rounded-lg ">
          <Swiper
            loop={false}
            autoHeight
            allowTouchMove={false}
            autoplay={false}
            modules={[Navigation]}
            slidesPerView={1}
            // navigation
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
          >
            <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C44Images/guidline_image.jpg" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                  <ul className="list-disc space-y-3 p-3">
                    <li className="text-xl font-medium text-black">
                      Stay <span className="font-bold">safe</span> by not
                      sharing personal information online.
                    </li>
                    <li className="text-xl font-medium text-black">
                      Don’t set up a <span className="font-bold">meeting</span>{" "}
                      with those who you have only interacted with digitally.
                    </li>
                    <li className="text-xl font-medium text-black">
                      Don’t agree to{" "}
                      <span className="font-bold">accepting</span> information
                      from unknown sources.
                    </li>
                    <li className="text-xl font-medium text-black">
                      Understand what is{" "}
                      <span className="font-bold">reliable</span> information
                      and what is not
                    </li>
                    <li className="text-xl font-medium text-black">
                      Decide to <span className="font-bold">tell</span> someone
                      you know if you feel uncomfortable during digital
                      interactions with others.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C44Images/guidline_image.jpg" />
                </div>
                <div className=" col-span-6 w-full grid grid-cols-12  ">
                  <div className="col-span-6 w-full text-center border font-medium text-black p-2 ">
                    SAFE
                  </div>
                  <div className="col-span-6 w-full text-center border font-medium text-black p-2 ">
                    DON’T{" "}
                    <span className="font-bold">share your details online</span>
                  </div>
                  <div className="col-span-6 w-full text-center border font-medium text-black p-2 ">
                    MEETING
                  </div>
                  <div className="col-span-6 w-full text-center border font-medium text-black p-2 ">
                    DON’T{" "}
                    <span className="font-bold">meet digital strangers</span>
                  </div>
                  <div className="col-span-6 w-full text-center border font-medium text-black p-2 ">
                    ACCEPTING
                  </div>
                  <div className="col-span-6 w-full text-center border font-medium text-black p-2 ">
                    DON’T{" "}
                    <span className="font-bold">
                      accept misinformation online
                    </span>
                  </div>
                  <div className="col-span-6 w-full text-center border font-medium text-black p-2 ">
                    RELIABLE
                  </div>
                  <div className="col-span-6 w-full text-center border font-medium text-black p-2 ">
                    DON’T{" "}
                    <span className="font-bold">
                      trust all online information
                    </span>
                  </div>
                  <div className="col-span-6 w-full text-center border font-medium text-black p-2 ">
                    TELL
                  </div>
                  <div className="col-span-6 w-full text-center border font-medium text-black p-2 ">
                    DON’T{" "}
                    <span className="font-bold">fight alone, get help</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>

           <SwiperSlide>
  <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center w-full p-5">
    <div className="col-span-6 w-full flex justify-center items-center ">
       <MyImage path="/C44Images/guidline_image.jpg" />
    </div>

    <div className="col-span-6 w-full grid grid-cols-12 relative">
      {/* controlled textarea fields */}
      {[
        "SAFE",
        "MEETING",
        "ACCEPTING",
        "RELIABLE",
        "TELL",
      ].map((label, index) => (
        <React.Fragment key={index}>
          <div className="col-span-6 w-full text-center border font-medium text-black p-2">
            {label}
          </div>
          <div className="col-span-6 w-full text-center border font-medium text-black p-2">
            <textarea
              value={responses[label] || ""}
              onChange={(e) =>
                setResponses({ ...responses, [label]: e.target.value })
              }
              placeholder="Write here..."
              rows={3}
              className="w-full h-[60px] text-center placeholder:text-gray-500 border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </React.Fragment>
      ))}

      {/* Generate PDF Button */}
      <div className="col-span-12 flex justify-center mt-5">
        <button
          onClick={generatePDF}
          className="bg-violet-900 hover:bg-violet-700 text-white font-medium px-5 py-2 rounded-lg shadow-md"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</SwiperSlide>

          </Swiper>
        </div>

        {/* slide buttons  */}
        <div className="flex justify-between items-center gap-5 w-full mt-8  ">
          <span
            onClick={handlePrev}
            className={`${
              activeSlide === 0 ? "invisible" : "visible"
            }  cursor-pointer text-4xl text-black border border-black rounded-full p-3  bg-yellow-400`}
          >
            <FaArrowLeft />
          </span>
          <span
            onClick={handleNext}
            className={` ${
              activeSlide === 2 ? "invisible" : "visible"
            }  cursor-pointer text-4xl text-black border border-black rounded-full p-3  bg-yellow-400`}
          >
            <FaArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slide;
