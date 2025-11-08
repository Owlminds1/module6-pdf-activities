"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";

const Slide1: React.FC = () => {
  // ✅ Q1 (Multiple answers)
  const [names, setNames] = useState<string[]>([]);

  // ✅ Q2 (Yes/No)
  const [appropriate, setAppropriate] = useState<string>("");

  // ✅ Q3 (Single answer)
  const [reportTo, setReportTo] = useState<string>("");

  const handleCheckboxChange = (value: string) => {
    setNames((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Upstander or Bystander", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    let y = 40;

    // ✅ Q1
    doc.text("Q1: What names did the group of boys call the two friends?", 20, y);
    y += 10;
    if (names.length > 0) {
      names.forEach((name) => {
        doc.text(`• ${name}`, 25, y);
        y += 8;
      });
    } else {
      doc.text("No answer selected", 25, y);
      y += 8;
    }

    // ✅ Q2
    y += 10;
    doc.text(
      "Q2: Was it appropriate for the group of boys to call names like dorky and lamewad?",
      20,
      y
    );
    y += 10;
    doc.text(appropriate ? `Answer: ${appropriate}` : "No answer selected", 25, y);

    // ✅ Q3
    y += 15;
    doc.text("Q3: Who can the friends report such behavior to?", 20, y);
    y += 10;
    doc.text(reportTo ? `Answer: ${reportTo}` : "No answer selected", 25, y);

    // ✅ Save PDF
    doc.save("Internet_Safety_Responses.pdf");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl text-black">
      {/* Q1 */}
      <div className="mb-6">
        <p className="font-bold text-xl mb-2">
          What names did the group of boys call the two friends?
        </p>
        <div className="flex flex-col gap-2 ml-3">
          {["Dorky", "Stupid", "Idiot", "Dorker", "Lamewad"].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={item}
                checked={names.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                className="accent-violet-600 w-4 h-4"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Q2 */}
      <div className="mb-6">
        <p className="font-bold text-xl mb-2">
Was it appropriate for the group of boys to call names like dorky and lamewad?        </p>
        <div className="flex gap-4 ml-3">
          {["Yes", "No"].map((opt) => (
            <label key={opt} className="flex items-center gap-2">
              <input
                type="radio"
                name="appropriate"
                value={opt}
                checked={appropriate === opt}
                onChange={() => setAppropriate(opt)}
                className="accent-violet-600 w-4 h-4"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Q3 */}
      <div className="mb-6">
        <p className="font-bold text-xl mb-2">
          Who can the friends report such behavior to?
        </p>
        <div className="flex flex-col gap-2 ml-3">
          {["Teachers", "Parents", "Friends", "Principal", "All of the above"].map(
            (option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reportTo"
                  value={option}
                  checked={reportTo === option}
                  onChange={() => setReportTo(option)}
                  className="accent-violet-600 w-4 h-4"
                />
                {option}
              </label>
            )
          )}
        </div>
      </div>

      {/* ✅ Generate PDF Button */}
     <div className="w-full text-center">
         <button
        onClick={handleGeneratePDF}
        className="bg-violet-900  text-white px-6 cursor-pointer py-2 rounded-lg hover:bg-violet-700 transition"
      >
        Generate PDF
      </button>
     </div>
    </div>
  );
};

export default Slide1;
