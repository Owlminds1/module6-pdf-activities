"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import MyImage from "@/components/myImage";
import Image from "next/image";

const questions = [
  "How many digital devices do you have access to?",
  "How many hours do you spend on video calls per week?",
  "How many hours do you spend on audio calls per week?",
  "How many hours do you spend surfing the internet for educational or leisurely activities?",
  "How many hours do you spend streaming visual content per week?",
  "How many emails do you send per week?",
  "How many tabs do you have open on your browser at a time?",
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DigitalFootprintActivity = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  // 🥧 Pie chart data (Only Q2–Q5)
  const pieData = [
    { name: "Video Calls", value: Number(answers[1]) || 0 },
    { name: "Audio Calls", value: Number(answers[2]) || 0 },
    { name: "Surfing Internet", value: Number(answers[3]) || 0 },
    { name: "Streaming Content", value: Number(answers[4]) || 0 },
  ];

  // 📄 PDF — only text (no chart)
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 30;

    // 🧾 Title Centered
    doc.setFontSize(18);
    const title = "Digital Footprint Activity";
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

    doc.save("Digital_Footprint.pdf");
  };

  return (

    
    <div className=" max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
       Let’s calculate your digital footprint.
      </h1>
<div className="w-full flex  justify-center items-center py-5">
   <div className="w-[300px] h-[300px] relative">
    <Image src="/C44Images/DP.jpg" fill objectFit="cover"  alt="image"/>
   </div>
</div>
      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={i}>
            <label className="block font-semibold mb-2 text-gray-800">
              {i + 1}. {q}
            </label>
            <input
              type="number"
              placeholder="Enter number"
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        ))}
      </div>

      {/* 🥧 Pie Chart (Q2–Q5 only) */}
      <div className="my-10 h-72">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
          Pie Chart (Q2–Q5)
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* PDF Button */}
      <button
        onClick={generatePDF}
        className="w-full bg-blue-700 mt-5 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-all"
      >
        Download PDF 
      </button>
    </div>
  );
};

export default DigitalFootprintActivity;
