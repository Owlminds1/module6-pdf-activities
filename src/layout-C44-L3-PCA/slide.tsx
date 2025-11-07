"use client";
import React, { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MyImage from "@/components/myImage";
import jsPDF from "jspdf";
import Link from "next/link";

const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handlePrev = () => swiperRef?.current?.slidePrev();
  const handleNext = () => swiperRef?.current?.slideNext();

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
    window.scrollTo(0, 0);
  };

  const questions = [
    {
      key: "q1",
      text: "What kind of bullying behavior did Nelson show at the school?",
      suggestion: [
        "Nelson’s behavior was violent to say the least. He hung the kids up in the air, beat up the kids, and showed much disrespect even towards the principal by pushing him!",
      ],
    },
    {
      key: "q2",
      text: "Was Nelson’s behavior different in the metro when compared to the school?",
      suggestion: [
        "Not really. He got upset when questioned so hung the gentleman up against the handles.",
      ],
    },
    {
      key: "q3",
      text: "How does Nelson show signs of bullying?",
      suggestion: [
        "Easily aggravated",
        "Uses violence as a means of coping",
        "Is disrespectful",
        "Doesn’t change after repeated warnings",
      ],
    },
    {
      key: "q4",
      text: "What is Nelson’s target group? Why do you think that is?",
      suggestion: [
        "He seems to dislike smart people",
        "It probably causes an inferiority complex which he compensates by bullying using physical force",
      ],
    },
    {
      key: "q5",
      text: "What can be done to stop Nelson from bullying?",
      suggestion: [
        "Let Nelson be guided to see a counsellor to change behavior",
        "Suspend Nelson from school",
        "Keep Nelson in a calm environment to work on anger management",
      ],
    },
  ];

  const handleChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Updated PDF Generator with Suggestive Responses
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Title
    doc.setFontSize(18);
    const title = "Reflect and Decode Video";
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 20);

    let y = 35;
    doc.setFont("helvetica", "normal");

    questions.forEach((q, index) => {
      // Question
      doc.setFontSize(13);
      const questionLines = doc.splitTextToSize(`${index + 1}. ${q.text}`, 170);
      doc.text(questionLines, 20, y);
      y += questionLines.length * 7 + 3;

      // Student Answer
      doc.setFontSize(11);
      const studentAnswer = answers[q.key] || "No response provided.";
      const answerLines = doc.splitTextToSize(`Student Response: ${studentAnswer}`, 170);
      doc.text(answerLines, 25, y);
      y += answerLines.length * 6 + 3;

      // Suggestive Answer
      doc.setFontSize(11);
      doc.text("Suggestive Response:", 25, y);
      y += 7;
      q.suggestion.forEach((sug) => {
        const sugLines = doc.splitTextToSize(`- ${sug}`, 160);
        doc.text(sugLines, 30, y);
        y += sugLines.length * 6;
      });

      // Add space before next question
      y += 10;

      // Page Break (auto)
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("bullying-analysis.pdf");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <div className="min-h-screen bg-[#F8FCFA] flex justify-center items-center gap-5 flex-col p-5">
      <div>
        <h1 className="text-3xl text-center text-black font-bold">
          Reflect and Decode Video
        </h1>
        <p className="text-lg pt-2 text-center text-black">
          {activeSlide < 2
            ? "Watch the two videos to answer some questions about bullying."
            : "Answer the Questions"}
        </p>
      </div>

      <div className="w-[80%]">
        <div className="w-full shadow-lg p-2 rounded-lg">
          <Swiper
            loop={false}
            autoHeight
            allowTouchMove={false}
            modules={[Navigation]}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
          >
            {/* Video A */}
            <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center w-full p-5">
                <div className="col-span-12 w-full flex justify-center items-center">
                  <Link target="blank" className="bg-violet-900 text-white px-8 py-2 cursor-pointer rounded-lg " href="https://www.canva.com/design/DAGtO3l8aVE/ZLuvoH9KLXQ0CNxe-OnGWg/watch?utm_content=DAGtO3l8aVE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc12260c653" >Watch Video </Link>
                </div>
              </div>
            </SwiperSlide>

          

            {/* Question Form */}
            <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center w-full p-5">
                <div className="col-span-12 w-full">
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-4 max-w-2xl mx-auto mt-5 bg-white p-5 rounded-2xl shadow"
                  >
                    {questions.map((q, index) => (
                      <div key={q.key}>
                        <label className="font-semibold block mb-2 text-black">
                          {index + 1}. {q.text}
                        </label>
                        <textarea
                        placeholder="write here your response"
                          rows={3}
                          className="w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={answers[q.key] || ""}
                          onChange={(e) => handleChange(q.key, e.target.value)}
                        />
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="bg-violet-900 text-white py-2 px-4 rounded-md hover:bg-violet-600 cursor-pointer transition duration-300"
                    >
                      Submit 
                    </button>
                  </form>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Slide Buttons */}
        <div className="flex justify-between items-center gap-5 w-full mt-8">
          <span
            onClick={handlePrev}
            className={`${
              activeSlide === 0 ? "invisible" : "visible"
            } cursor-pointer text-4xl text-black border border-black rounded-full p-3 bg-yellow-400`}
          >
            <FaArrowLeft />
          </span>
          <span
            onClick={handleNext}
            className={`${
              activeSlide === 1 ? "invisible" : "visible"
            } cursor-pointer text-4xl text-black border border-black rounded-full p-3 bg-yellow-400`}
          >
            <FaArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slide;
