"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";

const questions = [
  "What is this scene about?",
  "Whose point of view is it?",
  "Who wants what?",
  "What problem does this scene solve?",
  "What will happen next?",
];

const SceneCreationActivity = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleChange = (index: number, value: string) => {
    // Limit to 25 words
    const words = value.trim().split(/\s+/);
    if (words.length <= 25) {
      const updated = [...answers];
      updated[index] = value;
      setAnswers(updated);
    }
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 30;

    // Title
    doc.setFontSize(18);
    const title = "Scene Creation Activity";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 20);

    doc.setFontSize(12);

    // Add questions + answers
    questions.forEach((q, i) => {
      const qLines = doc.splitTextToSize(`${i + 1}. ${q}`, 170);
      const aLines = doc.splitTextToSize(`Answer: ${answers[i] || ""}`, 170);
      const blockHeight = (qLines.length + aLines.length) * 8;

      if (y + blockHeight > 270) {
        doc.addPage();
        y = 20;
      }

      doc.text(qLines, 20, y);
      y += qLines.length * 8;
      doc.text(aLines, 30, y);
      y += aLines.length * 8 + 5;
    });

    doc.save("Scene_Activity.pdf");
  };

  return (
    <div className="w-[60%]">
     

      <div className="space-y-6">
        {questions.map((q, i) => {
          const wordCount = answers[i].trim() ? answers[i].trim().split(/\s+/).length : 0;
          return (
            <div key={i}>
              <label className="block font-semibold mb-2 text-gray-800">
                {i + 1}. {q}
              </label>
              <textarea
                placeholder="Write your answer "
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
              <p
                className={`text-sm text-right ${
                  wordCount > 25 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {wordCount}/25 words
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={generatePDF}
        className="w-full bg-violet-900 mt-6 text-white py-3 rounded-lg text-lg font-semibold hover:bg-violet-800 transition-all"
      >
        Download PDF
      </button>
    </div>
  );
};

export default SceneCreationActivity;
