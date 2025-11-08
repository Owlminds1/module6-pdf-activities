"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";

const Slide2: React.FC = () => {
  const [answers, setAnswers] = useState({
    bullyAction: "",
    intervened: [] as string[],
    fatherRight: "",
    fatherAction: "",
    classmatesHelp: "",
    helpGirl: "",
    principalAction: [] as string[],
  });

  const toggleCheckbox = (key: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? (prev[key] as string[]).filter((v) => v !== value)
        : [...(prev[key] as string[]), value],
    }));
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Upstander or Bystander", 20, y);
    y += 10;

    const questions = [
      ["How did the boy bully the girl?", answers.bullyAction],
      ["Who intervened to stop the boy from bullying?", answers.intervened.join(", ")],
      ["Was the father right to intervene?", answers.fatherRight],
      ["Was the father’s action to combat bullying appropriate?", answers.fatherAction],
      ["Did the girl’s classmates help combat bullying?", answers.classmatesHelp],
      ["If you were present in the cafeteria, would you have helped the girl?", answers.helpGirl],
      ["What can a principal do to combat bullying?", answers.principalAction.join(", ")],
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    questions.forEach(([q, a]) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(`Q: ${q}`, 20, y);
      y += 8;
      doc.text(`A: ${a ? a : "No answer selected"}`, 25, y);
      y += 10;
    });

    doc.save("Slide2_Responses.pdf");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 text-black">
      <div className="mb-6">
        <p className="font-bold text-xl mb-2">How did the boy bully the girl?</p>
        {["Spilled grape juice from the zip lock bag on her face", "Called her names", "Beat the girl"].map((opt) => (
          <label key={opt} className="flex items-center gap-2 ml-3">
            <input
              type="radio"
              name="bullyAction"
              checked={answers.bullyAction === opt}
              onChange={() => setAnswers({ ...answers, bullyAction: opt })}
              className="accent-violet-600"
            />
            {opt}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <p className="font-bold text-xl mb-2">Who intervened to stop the boy from bullying?</p>
        {["An adult", "Her father", "The school Principal", "Her peer"].map((opt) => (
          <label key={opt} className="flex items-center gap-2 ml-3">
            <input
              type="checkbox"
              checked={answers.intervened.includes(opt)}
              onChange={() => toggleCheckbox("intervened", opt)}
              className="accent-violet-600"
            />
            {opt}
          </label>
        ))}
      </div>

      {[
        ["Was the father right to intervene?", "fatherRight"],
        ["Was the father’s action to combat bullying appropriate?", "fatherAction"],
        ["Did the girl’s classmates help combat bullying?", "classmatesHelp"],
        ["If you were present in the cafeteria, would you have helped the girl?", "helpGirl"],
      ].map(([q, key]) => (
        <div key={key} className="mb-6">
          <p className="font-bold text-xl mb-2">{q}</p>
          {["Yes", "No"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 ml-3">
              <input
                type="radio"
                name={key}
                checked={(answers as any)[key] === opt}
                onChange={() => setAnswers({ ...answers, [key]: opt })}
                className="accent-violet-600"
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <div className="mb-6">
        <p className="font-bold text-xl mb-2">What can a principal do to combat bullying?</p>
        {[
          "Beat up the bully like the bully beat the girl",
          "Insult the bully like the bully insulted the girl",
          "Speak to the bully about his misbehavior",
          "Speak to the bully’s parents about his misbehavior",
          "Warn the bully about the consequences of repeated misbehavior",
          "Ask the students to report misbehavior",
          "Suspend the bully from school if misbehavior is repeated more than three times",
        ].map((opt) => (
          <label key={opt} className="flex items-center gap-2 ml-3">
            <input
              type="checkbox"
              checked={answers.principalAction.includes(opt)}
              onChange={() => toggleCheckbox("principalAction", opt)}
              className="accent-violet-600"
            />
            {opt}
          </label>
        ))}
      </div>

      <div className="text-center">
        <button onClick={handleGeneratePDF} className="bg-violet-900 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-violet-800">
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default Slide2;
