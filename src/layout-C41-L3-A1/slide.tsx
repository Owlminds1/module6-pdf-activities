"use client";
import React, { useEffect, useRef, useState } from "react";
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
import AlternativeSceneForm from "./pdfForm";
import Suggestion from "./suggestion";


const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  
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

 

  return (
    <div className="min-h-screen  bg-[#F8FCFA] flex justify-center items-center gap-5 flex-col p-5 ">
      <div>
        <h1 className="text-3xl text-black font-bold text-center">LOCK framework</h1>
        <p className="text-lg pt-2 text-black">
         
          {
            activeSlide < 9 ? " Let’s understand the LOCK framework by answering some questions. Youcan respond orally" :activeSlide ===9? "Read the story out loud while making notes. Answer the questions that follow.":activeSlide ==10 ?"Answer the following questions about the story.": activeSlide ==11 ? "Bravo! Here are the suggestive responses.":""
          }
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
                  <MyImage path="/C41Images/lock.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                  <h4 className="text-xl text-black font-bold text-center">
                    What is the LOCK framework?
                  </h4>
<ul className="list-disc space-y-4 p-3">
  <li className=" text-black text-lg font-medium">The LOCK framework is designed to think about story in an organized way.</li>
  <li className=" text-black text-lg font-medium">It will enable you to tell  a story that has purpose, vision, and a problem to solve.</li>
</ul>
                </div>
              </div>
            </SwiperSlide>


             <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C41Images/lock.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                  <h4 className="text-2xl text-black font-bold text-center">
                    L STANDS FOR LEAD
                  </h4>
                  
                   <h4 className="text-xl text-black font-bold text-center">
                   Can you guess the meaning?
                  </h4>

<button onClick={()=>swiperRef.current?.slideNext()} className="bg-violet-900 text-white py-2 px-8 rounded-lg cursor-pointer">Next</button>
                </div>
              </div>
            </SwiperSlide>


             <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C41Images/lock.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                
<ul className="list-disc space-y-4 p-3">
  <li className=" text-black text-lg font-medium">This is your protagonist a.k.a who the story is about.</li>
  <li className=" text-black text-lg font-medium">The audience feels the story from this character’s point of view.</li>
</ul>
                </div>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C41Images/lock.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                  <h4 className="text-2xl text-black font-bold text-center">
                  O stands for OBJECTIVE
                  </h4>
                  
                   <h4 className="text-xl text-black font-bold text-center">
                  Can you guess the meaning?
                  </h4>

<button onClick={()=>swiperRef.current?.slideNext()} className="bg-violet-900 text-white py-2 px-8 rounded-lg cursor-pointer">Next</button>
                </div>
              </div>
            </SwiperSlide>


             <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C41Images/lock.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                 
<ul className="list-disc space-y-4 p-3">
  <li className=" text-black text-lg font-medium">This is your protagonist’s goal, what they want to accomplish in this story. It can be a statement or even a question you ask.</li>
  <li className=" text-black text-lg font-medium">An effective story is where the audience gets just as excited as the protagonist about reaching the goal.</li>
</ul>
                </div>
              </div>
            </SwiperSlide>



             <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C41Images/lock.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                  <h4 className="text-2xl text-black font-bold text-center">
                 C stands for CONFRONTATION
                  </h4>
                  
                   <h4 className="text-xl text-black font-bold text-center">
                 Can you guess the meaning?
                  </h4>

<button onClick={()=>swiperRef.current?.slideNext()} className="bg-violet-900 text-white py-2 px-8 rounded-lg cursor-pointer">Next</button>
                </div>
              </div>
            </SwiperSlide>


             <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C41Images/lock.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                 
<ul className="list-disc space-y-4 p-3">
  <li className=" text-black text-lg font-medium">This is either caused by man-made challenges or natural challenges. Often we see an antagonist who is in conflict with the protagonist.</li>
  <li className=" text-black text-lg font-medium">An effective story shows how and why the protagonist wants to achieve goals while the antagonist tries to prevent them from achieving their goals.</li>
  
  <li className=" text-black text-lg font-medium">It also conveys what either or both learn or don’t learn from their conflict i.e. confrontation.</li>
</ul>
                </div>
              </div>
            </SwiperSlide>



              <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C41Images/lock.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                  <h4 className="text-2xl text-black font-bold text-center">
               K stands for KNOCKOUT
                  </h4>
                  
                   <h4 className="text-xl text-black font-bold text-center">
                 Can you guess the meaning?
                  </h4>

<button onClick={()=>swiperRef.current?.slideNext()} className="bg-violet-900 text-white py-2 px-8 rounded-lg cursor-pointer">Next</button>
                </div>
              </div>
            </SwiperSlide>


             <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C41Images/lock.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                 
<ul className="list-disc space-y-4 p-3">
  <li className=" text-black text-lg font-medium">This is your biased conclusion; you choose the end thereby conveying your unique perspective and beliefs.</li>
  <li className=" text-black text-lg font-medium">The storyteller is always biased i.e. you choose which side you are on.</li>
  
  <li className=" text-black text-lg font-medium">This shows what you believe in, what you value, how you see others, and what your vision is.</li>
  
  <li className=" text-black text-lg font-medium">Accordingly, you then decide who wins at the end of the story or whether it’s a compromise.</li>
</ul>
                </div>
              </div>
            </SwiperSlide>


             <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C41Images/the_fox_and_the_stork.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                 <h4 className="text-2xl text-black font-bold text-center">The Fox and The Stork by Aesop</h4>
                 <p className="text-lg text-black">
                  The Fox one day thought of a plan to amuse himself at the expense of the Stork, at whose odd appearance he was always laughing. “You must come and dine with me today,” he said to the Stork, smiling to himself at the trick he was going to play. The Stork gladly accepted the invitation and arrived in good time and with a very good appetite. For dinner the Fox served soup. But it was set out in a very shallow dish, and all the Stork could do was to wet the very tip of his bill. Not a drop of soup could he get. But the Fox lapped it up easily, and, to increase the disappointment of the Stork, made a great show of enjoyment. The hungry Stork was much displeased at the trick, but he was a calm, even-tempered fellow and saw no good in flying into a rage. Instead, not long afterward, he invited the Fox to dine with him in turn. 
                 </p>


                  <p className="text-lg text-black">
                 The Fox arrived promptly at the time that had been set, and the Stork served a fish dinner that had a very appetizing smell. But it was served in a tall jar with a very narrow neck. The Stork could easily get at the food with his long bill, but all the Fox could do was to lick the outside of the jar, and sniff at the delicious odor. And when the Fox lost his temper, the Stork said calmly: Do not play tricks on your neighbors unless you can stand the same treatment yourself.
                 </p>
                  
                </div>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                  <MyImage path="/C41Images/the_fox_and_the_stork.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                 <h4 className="text-2xl text-black font-bold text-center">The Fox and The Stork by Aesop</h4>

                  <AlternativeSceneForm/>
                  
                </div>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="min-h-[200px] grid grid-cols-12 gap-2 place-items-center  w-full p-5">
                <div className=" col-span-6 w-full flex justify-center items-center ">
                   <MyImage path="/C41Images/the_fox_and_the_stork.png" />
                </div>
                <div className=" col-span-6 w-full flex justify-center items-center flex-col gap-4 ">
                 <h4 className="text-2xl text-black font-bold text-center">The Fox and The Stork by Aesop</h4>

                  <Suggestion/>
                  
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
              activeSlide === 11 ? "invisible" : "visible"
            }  cursor-pointer text-4xl border text-black border-black rounded-full p-3  bg-yellow-400`}
          >
            <FaArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slide;
