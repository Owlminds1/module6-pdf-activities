"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";

const questions = [
  "What is the scene about?",
  "Who is the scene about?",
  "Who does the scene start with?",
  "How does the scene start?",
  "How does the character feel in the beginning?",
  "What happens to change the character’s emotions?",
  "What emotion does the character feel now?",
  "How does the scene end?",
  "What does the character learn at the end?",
];

const AlternativeSceneForm = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 30; // starting Y position

    // 🧾 Title Centered
    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = "Alternative Scene Activity";
    const textWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - textWidth) / 2, 20); // Center title at top

    doc.setFontSize(12);

    questions.forEach((q, i) => {
      const questionLines = doc.splitTextToSize(`${i + 1}. ${q}`, 170);
      const answerLines = doc.splitTextToSize(
        `Answer: ${answers[i] || " "}`,
        170
      );

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

    doc.save("Alternative_Scene.pdf");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow-lg">
      <form className="space-y-6">
        {questions.map((q, i) => (
          <div key={i}>
            <label className="block text-black text-lg font-semibold mb-2">
              {q}
            </label>
            <textarea
              title="write here..."
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-full border text-black/60 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        ))}
      </form>

      <button
        type="button"
        onClick={generatePDF}
        className="w-full bg-violet-900 text-white py-3 rounded-lg text-lg font-medium hover:bg-violet-700 transition-all"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default AlternativeSceneForm;
