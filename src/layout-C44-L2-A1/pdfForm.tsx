"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";

const questions = ["SAFE", "MEETING", "ACCEPTING", "RELIABLE", "TELL"];

const AlternativeSceneForm = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 30;

    // 🧾 Title centered
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = "SMART ONLINE ACTIVITY (S.M.A.R.T.)";
    const textWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - textWidth) / 2, 20); // center title

    doc.setFontSize(12);

    questions.forEach((q, i) => {
      const question = `${i + 1}. ${q}`;
      const answer = answers[i] ? answers[i] : "";

      const questionLines = doc.splitTextToSize(question, 170);
      const answerLines = doc.splitTextToSize(`Answer: ${answer}`, 170);

      const blockHeight = (questionLines.length + answerLines.length) * 8;

      if (y + blockHeight > 270) {
        doc.addPage();
        y = 20;
      }

      doc.text(questionLines, 20, y);
      y += questionLines.length * 8;
      doc.text(answerLines, 30, y);
      y += answerLines.length * 8 + 5;
    });

    doc.save("SMART_Activity.pdf");
  };

  return (
    <div className="max-w-3xl grid grid-cols-12 gap-0 mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {questions.map((q, i) => (
        <React.Fragment key={i}>
          <div className="col-span-6 flex h-full justify-center items-center text-black font-semibold border border-black ">
            {q}
          </div>
          <div className="col-span-6 border border-black">
            <textarea
              placeholder="Write here..."
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-full h-24 border-none text-black/80 text-center p-2 resize-none focus:outline-none"
            />
          </div>
        </React.Fragment>
      ))}

      <div className="col-span-12 mt-4">
        <button
          onClick={generatePDF}
          className="w-full bg-violet-900 text-white py-3 rounded-lg text-lg font-semibold hover:bg-violet-700 transition-all"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default AlternativeSceneForm;
