"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";

const questions = [
  {
    title: "LEAD",
    question: "Who is the protagonist?",
    suggestion: "The Stork",
  },
  {
    title: "OBJECTIVE",
    question: "What is the purpose of the story?",
    suggestion: "Teach a lesson about sharing and respect.",
  },
  {
    title: "CONFRONTATION",
    question: "What is the conflict between whom for what reason?",
    suggestion:
      "The fox is shown as the antagonist. He invites the stork to share a meal only to disappoint by designing the utensils in his favor and not according to the stork’s build.",
  },
  {
    title: "KNOCKOUT",
    question: "How does the conflict get resolved in whose favor?",
    suggestion:
      "The stork teaches the fox a lesson by offering the meal in a similar manner. The fox becomes angry, and the stork remarks, 'Do not play tricks on your neighbors unless you can stand the same treatment yourself.'",
  },
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
  let y = 30;

  // 🧾 Title
  doc.setFontSize(18);
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleText = "LOCK Framework - The Fox and The Stork";
  const textWidth = doc.getTextWidth(titleText);
  doc.text(titleText, (pageWidth - textWidth) / 2, 20);

  doc.setFontSize(12);

  questions.forEach((q, i) => {
    // Question Title
    doc.setFont("helvetica", "bold");
    doc.text(`${i + 1}. ${q.title}`, 20, y);
    y += 8;

    // Question
    doc.setFont("helvetica", "normal");
    const questionLines = doc.splitTextToSize(q.question, 170);
    doc.text(questionLines, 25, y);
    y += questionLines.length * 6;

    // Student Answer
    const answerText = answers[i]
      ? `Student Answer :  ${answers[i]}`
      : "Student Answer :  __________________________";
    const answerLines = doc.splitTextToSize(answerText, 170);

    // Suggestion
    const suggestionText = `Suggestion: ${q.suggestion}`;
    const suggestionLines = doc.splitTextToSize(suggestionText, 170);

    // Handle overflow
    const blockHeight =
      (questionLines.length + answerLines.length + suggestionLines.length) * 6;
    if (y + blockHeight > 270) {
      doc.addPage();
      y = 20;
    }

    // Write both (tight gap between answer and suggestion)
    doc.setFont("helvetica", "normal");
    doc.text(answerLines, 25, y);
    y += answerLines.length * 6;

    doc.setTextColor(100);
    doc.text(suggestionLines, 25, y + 2);
    doc.setTextColor(0);

    // ✅ Extra gap before next question (main change)
    y += suggestionLines.length * 6 + 12;
  });

  doc.save("LOCK_Framework_Responses.pdf");
};



  return (
    <div className="w-full p-1 space-y-6">
      <form className="space-y-3">
        {questions.map((q, i) => (
          <div key={i}>
            <h4 className="font-bold text-lg text-black mb-2">{q.title}</h4>
            <label className="block text-black text-md font-semibold mb-2">
              {q.question}
            </label>
            <textarea
              placeholder="Write your answer..."
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-full border text-black/70 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
              rows={2}
            />

          </div>
        ))}
      </form>

      <button
        type="button"
        onClick={generatePDF}
        className="w-full bg-violet-900 cursor-pointer text-white py-3 rounded-lg text-lg font-medium hover:bg-violet-700 transition-all"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default AlternativeSceneForm;
