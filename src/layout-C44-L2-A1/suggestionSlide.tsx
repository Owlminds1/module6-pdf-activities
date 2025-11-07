"use client";
import React, { useState } from "react";

const questions =[
    {
        "title":"SAFE",
        "sugge":"Fight against cyberbullying while keeping students’ personal information safe."
    },

      {
        "title":"MEETING",
        "sugge":"Alert students of potential cyberbullies wanting to meet, ensuring fewer instances of cyberbullying over time."
    },

    {
        "title":"ACCEPTING",
        "sugge":"educate students on using the internet wisely (don’t open unknown sources) and stay protected from unwanted sources of information."
    },


     {
        "title":"RELIABLE",
        "sugge":"The team should practice sharing and promoting reliable information by circulating examples of what’s reliable or not with students."
    },

      {
        "title":"TELL",
        "sugge":"Appoint a team of five people to volunteer for the cybersquad for students’ protection, advice, and reassurance."
    }
]

const SuggestionSlide = () => {
 

 
  return (
    <div className="max-w-3xl grid grid-cols-12 gap-0 mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <div className="col-span-12 text-black text-center text-xl font-bold my-5">Suggestive responses</div>
      {questions.map((q, i) => (
        <React.Fragment key={i}>
          <div className="col-span-6 flex  justify-center items-center text-black font-semibold border border-black h-full">
            {q.title}
          </div>
          <div className="col-span-6 border border-black p-2 text-lg text-black">
            {q.sugge}
          </div>
        </React.Fragment>
      ))}

    
    </div>
  );
};

export default SuggestionSlide;
