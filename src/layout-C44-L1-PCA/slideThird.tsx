"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";

const Slide3: React.FC = () => {
  const [responses, setResponses] = useState<{ [key: string]: string | string[] }>({});

  const handleChange = (q: string, val: string, multi = false) => {
    setResponses((prev) => {
      if (multi) {
        const prevValues = (prev[q] as string[]) || [];
        return {
          ...prev,
          [q]: prevValues.includes(val)
            ? prevValues.filter((v) => v !== val)
            : [...prevValues, val],
        };
      } else {
        return { ...prev, [q]: val };
      }
    });
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Upstander or Bystander", 20, y);
    y += 10;

    const content = [
      ["What did the four kids do?", (responses["kidsAction"] as string[])?.join(", ")],
      ["Did the kid’s dog politely speak to the bullies at first?", responses["Q2"]],
      ["Did the kid fight the bullies?", responses["Q3"]],
      ["According to you, was it right for the dog to jump on the bullies?", responses["Q4"]],
      ["Why did the dog jump at the bullies?", responses["dogReason"]],
      ["What would you have done if you were the kid’s friend to combat bullying?", (responses["friendAction"] as string[])?.join(", ")],
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    content.forEach(([q, a]) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(`Q: ${q}`, 20, y);
      y += 8;
      doc.text(`A: ${a ? a : "No answer selected"}`, 25, y);
      y += 10;
    });

    doc.save("Slide3_Responses.pdf");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 text-black">
      <div>
        <p className="font-bold text-xl mb-2">What did the four kids do?</p>
        {[
          "Pushed the kid with the phone",
          "Called the kid names like kyle kyle dog poop pile",
          "Taunted and mocked the kid and his dog",
          "Beat up the kid and his dog",
          "Slapped the kid",
        ].map((opt) => (
          <label key={opt} className="block">
            <input
              type="checkbox"
              checked={(responses["kidsAction"] as string[])?.includes(opt)}
              onChange={() => handleChange("kidsAction", opt, true)}
              className="mr-2 accent-violet-600"
            />
            {opt}
          </label>
        ))}
      </div>

      {[
        ["Did the kid’s dog politely speak to the bullies at first?", "Q2"],
        ["Did the kid fight the bullies?", "Q3"],
        ["According to you, was it right for the dog to jump on the bullies?", "Q4"],
      ].map(([q, key]) => (
        <div key={key}>
          <p className="font-bold mb-2">{q}</p>
          {["Yes", "No"].map((opt) => (
            <label key={opt} className="mr-4">
              <input
                type="radio"
                name={key}
                checked={responses[key] === opt}
                onChange={() => handleChange(key, opt)}
                className="mr-1 accent-violet-600"
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <div>
        <p className="font-bold text-xl mb-2">Why did the dog jump at the bullies?</p>
        {[
          "Because they didn’t respond to polite warning and further bullied the kid",
          "Because the dog is violent",
          "Because the dog wanted revenge",
        ].map((opt) => (
          <label key={opt} className="block">
            <input
              type="radio"
              name="dogReason"
              checked={responses["dogReason"] === opt}
              onChange={() => handleChange("dogReason", opt)}
              className="mr-2 accent-violet-600"
            />
            {opt}
          </label>
        ))}
      </div>

      <div>
        <p className="font-bold text-xl mb-2">
          What would you have done if you were the kid’s friend to combat bullying?
        </p>
        {[
          "Politely ask the bullies to stop",
          "Ask an adult [parents/teachers/siblings/neighbours] in the vicinity to help",
          "Get into a fight with the bullies",
          "Run away from the kid to protect yourself",
        ].map((opt) => (
          <label key={opt} className="block">
            <input
              type="checkbox"
              checked={(responses["friendAction"] as string[])?.includes(opt)}
              onChange={() => handleChange("friendAction", opt, true)}
              className="mr-2 accent-violet-600"
            />
            {opt}
          </label>
        ))}
      </div>

      <div className="text-center mt-6">
        <button onClick={handleGeneratePDF} className="bg-violet-900 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-violet-800">
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default Slide3;
