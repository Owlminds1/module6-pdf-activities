"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";
import MyImage from "@/components/myImage";

const LayoutC41L3PCA = () => {
  const questions = [
    { key: "context", text: "Context: Where is this image photographed?" },
    { key: "time", text: "Time: When is this image photographed?" },
    { key: "characters", text: "Characters: Who are the characters in this image?" },
    { key: "place", text: "Place: Where are the characters in this image?" },
    { key: "reason", text: "Reason: Why is this image photographed?" },
    { key: "value", text: "Value: What makes this image worth recording?" },
    { key: "purpose", text: "Purpose: What is the purpose of photographing this image?" },
    { key: "emotion", text: "Emotion: What emotion does this image evoke?" },
    { key: "imagine", text: "Imagine: If this image were at the end of a story, how would you describe the resolution?" },
  ];

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // ✅ Centered Title
    doc.setFontSize(18);
    const title = "Analyse a Photograph";
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 20);

    // 📄 Content Start Position
    let y = 35;

    questions.forEach((q, index) => {
      const questionText = `${index + 1}. ${q.text}`;
      const answerText = answers[q.key] || "No response provided.";

      doc.setFontSize(12);
      const questionLines = doc.splitTextToSize(questionText, 170);
      doc.text(questionLines, 20, y);
      y += questionLines.length * 7;

      const answerLines = doc.splitTextToSize(answerText, 170);
      doc.setFontSize(11);
      doc.text(answerLines, 25, y);
      y += answerLines.length * 7 + 8;

      // ✅ Auto Page Break (if content exceeds page height)
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("photo-analysis.pdf");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <div className="min-h-screen bg-[#F8FCFA] flex flex-col justify-center items-center gap-5 p-5">
      <div>
        <h1 className="text-3xl font-bold text-center text-black">Analyse a Photograph</h1>
        <p className="text-lg pt-2 text-center text-black">
          Every image is a complete story in itself. Tell a story of this image by giving your responses below.
        </p>
      </div>

      <div className="grid grid-cols-12 w-full p-2">
        <div className="col-span-12 w-full flex justify-center">
          <MyImage path="/C41Images/Mahmud_Hams.JPG" />
        </div>

        <div className="col-span-12 w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-2xl mx-auto mt-5 bg-white p-5 rounded-2xl shadow"
          >
            {questions.map((q, index) => (
              <div key={q.key}>
                <label className="font-semibold block mb-2 text-black">
                  {index + 1}. {q.text}
                </label>
                <textarea
                title="write here"
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
               Download PDF
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LayoutC41L3PCA;
