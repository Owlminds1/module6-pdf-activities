"use client";
import React, { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Slide1 from "./slideOne";
import Slide2 from "./slideTwo";
import Slide3 from "./slideThird";
import Link from "next/link";

const Slide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const handlePrev = () => swiperRef?.current?.slidePrev();
  const handleNext = () => swiperRef?.current?.slideNext();

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlide(swiper.activeIndex);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#F8FCFA] flex justify-center items-center gap-5 flex-col p-5">
      <div>
        <h1 className="text-3xl text-center text-black font-bold">
          Upstander or Bystander
        </h1>

        <h1 className="text-2xl  my-3 text-center text-black font-bold">
          {activeSlide === 4 ? " Suggestive Responses" : ""}
        </h1>
        <p className="text-lg pt-2 text-center text-black"></p>
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
              <div className="w-full flex min-h-[200px] justify-center items-center  gap-5  p-6 text-black">
                <Link className="px-8 py-2 rounded-lg bg-violet-900 text-white cursor-pointer" href="https://www.canva.com/design/DAGtNJXnUSY/l8Mnl1pKobNyIJZg6DZqiQ/watch?utm_content=DAGtNJXnUSY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hc5d0650268" target="blank">Watch Video </Link>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <Slide1 />
            </SwiperSlide>

            <SwiperSlide>
              <Slide2 />
            </SwiperSlide>

            <SwiperSlide>
              <Slide3 />
            </SwiperSlide>

            <SwiperSlide>
              <div className="w-full max-w-4xl flex flex-col gap-5 mx-auto p-6 text-black">
                <h4 className="font-bold text-2xl mb-2">Video A</h4>

                <div>
                  <p className="font-bold text-xl mb-2">
                    What did the four kids do?
                  </p>
                  <ul className="list-disc space-y-2">
                    <li className="font-bold">Dorky</li>
                    <li className="">Stupid</li>
                    <li className="">Idiot</li>
                    <li className="font-bold">Dorker</li>
                    <li className="font-bold">Lamewad</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    Why did the dog jump at the bullies?
                  </p>
                  <ul className="list-disc space-y-2">
                    <li className="">Yes</li>
                    <li className="font-bold">No</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    What would you have done if you were the kid’s friend to
                    combat bullying?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="">Teachers</li>
                    <li className="">Parents</li>
                    <li className="">Friends</li>
                    <li className="">Principal</li>
                    <li className="font-bold">All of the above</li>
                  </ul>
                </div>

                <h4 className="font-bold text-2xl mb-2">Video B</h4>

                <div>
                  <p className="font-bold text-xl mb-2">
                    How did the boy bully the girl?{" "}
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="">Beat the girl</li>
                    <li className="">Called her names</li>
                    <li className="font-bold">
                      Spilled grape juice from the zip lock bag on her face
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    Who intervened to stop the boy from bullying?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="font-bold">An adult</li>
                    <li className="font-bold">Her father</li>
                    <li className="font-bold">The school Principal</li>
                    <li className="">Her peer</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    Was the father right to intervene?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="font-bold">Yes</li>
                    <li className="">No</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    Was the father’s action to combat bullying appropriate?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="">Yes</li>
                    <li className="font-bold">No</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    Did the girl’s classmates help combat bullying?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="">Yes</li>
                    <li className="font-bold">No</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    If you were present in the cafeteria, would you have helped
                    the girl?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="">Yes</li>
                    <li className="">No</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    What can a principal do to combat bullying?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="">
                      Beat up the bully like the bully beat the girl
                    </li>
                    <li className="font-bold">
                      Speak to the bully about his misbehavior
                    </li>
                    <li className="font-bold">
                      Speak to the bully’s parents about his misbehavior
                    </li>
                    <li className="font-bold">
                      Warn the bully about the consequences of repeated
                      misbehavior
                    </li>
                    <li className="font-bold">
                      Ask the students to report misbehavior
                    </li>
                    <li className="font-bold">
                      Suspend the bully from school if misbehavior is repeated
                      more than three times
                    </li>
                  </ul>
                </div>

                <h4 className="font-bold text-2xl mb-2">Video C</h4>

                <div>
                  <p className="font-bold text-xl mb-2">
                    What did the four kids do?{" "}
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="font-bold">Pushed the kid with the phone</li>
                    <li className="font-bold">
                      Called the kid names like kyle kyle dog poop pile
                    </li>
                    <li className="font-bold">
                      Taunted and mocked the kid and his dog
                    </li>
                    <li className="">Beat up the kid and his dog</li>
                    <li className="">Slapped the kid</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    Did the kid’s dog politely speak to the bullies at first?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="font-bold">Yes</li>
                    <li className="">No</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    Why did the dog jump at the bullies?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="font-bold">
                      Because they didn’t respond to polite warning and further
                      bullied the kid
                    </li>
                    <li className="">Because the dog is violent</li>
                    <li className="">Because the dog wanted revenge </li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    Did the kid fight the bullies?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="">Yes</li>
                    <li className="font-bold">No</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    According to you, was it right for the dog to jump on the
                    bullies?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="">Yes</li>
                    <li className="">No</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">
                    What would you have done if you were the kid’s friend to
                    combat bullying?
                  </p>

                  <ul className="list-disc space-y-2">
                    <li className="font-bold">
                      Politely ask the bullies to stop
                    </li>
                    <li className="font-bold">
                      Ask an adult [parents/teachers/siblings/neighbours] in the
                      vicinity to help
                    </li>
                    <li className="">Get into a fight with the bullies</li>
                    <li className="">
                      Run away from the kid to protect yourself
                    </li>
                  </ul>
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
              activeSlide === 4 ? "invisible" : "visible"
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
