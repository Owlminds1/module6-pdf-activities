"use client";
import React, { useState, useEffect } from "react";
import dropZoneData from "@/layout-C44-L3-A1/dropZone.json";
import dragData from "@/layout-C44-L3-A1/dragData.json";
import jsPDF from "jspdf";

interface DragItem {
  text: string;
  val: string;
}

const Table: React.FC = () => {
  const [dragItems, setDragItems] = useState<DragItem[]>([]);
  const [droppedItems, setDroppedItems] = useState<(string | null)[]>(
    Array(dropZoneData.length).fill(null)
  );
  const [feedback, setFeedback] = useState<(string | null)[]>(
    Array(dropZoneData.length).fill(null)
  );
  const [correctBg, setCorrectBg] = useState<HTMLAudioElement>();

  useEffect(() => {
    const shuffled = [...(dragData as DragItem[])].sort(() => Math.random() - 0.5);
    setDragItems(shuffled);
    setCorrectBg(new Audio("/sound/correct.mp3"));
  }, []);

  // 🟢 handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: DragItem): void => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  // 🟢 allow drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  // 🟢 handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number): void => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("text/plain");
    if (!itemData) return;

    const draggedItem: DragItem = JSON.parse(itemData);
    const targetZone = dropZoneData[index];

    const updatedItems = [...droppedItems];
    const updatedFeedback = [...feedback];

    if (draggedItem.val === targetZone) {
      updatedItems[index] = draggedItem.text;
      updatedFeedback[index] = "correct";
      correctBg?.play();
      setDragItems((prev) => prev.filter((i) => i.val !== draggedItem.val));
    } else {
      updatedFeedback[index] = "wrong";
      setTimeout(() => {
        setFeedback((prev) => {
          const reset = [...prev];
          reset[index] = null;
          return reset;
        });
      }, 800);
    }

    setDroppedItems(updatedItems);
    setFeedback(updatedFeedback);
  };

  const allDropped = droppedItems.every((item) => item !== null);

  // 🟣 Generate PDF
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("SMART Guidelines — Suggestive Responses", 20, 20);

    doc.setFont("helvetica", "normal");

    // Table Header
    let y = 40;
    doc.setFontSize(12);
    

    // Data Rows
    y += 10;
    dropZoneData.forEach((key, index) => {
      doc.text(key, 20, y);
      const text = droppedItems[index] || "";
      const splitText = doc.splitTextToSize(text, 130);
      doc.text(splitText, 60, y);
      y += splitText.length * 7;
    });

    doc.save("SMART_Guidelines_Answers.pdf");
  };

  return (
    <div
      className={`grid ${
        allDropped ? "grid-cols-1" : "grid-cols-12"
      } w-full p-6 gap-4 transition-all duration-500`}
    >
      {/* LHS - Drag Items */}
      {!allDropped && (
        <div className="col-span-4 w-full">
          <div className="flex flex-col gap-3">
            {dragItems.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="p-3 border border-violet-200 rounded-lg cursor-grab bg-violet-50 hover:bg-violet-100 transition text-black"
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RHS - Drop Table */}
      <div
        className={`${
          allDropped ? "col-span-12" : "col-span-8"
        } w-full transition-all duration-500`}
      >
        <div className="grid grid-cols-12 border border-black rounded-lg overflow-hidden">
          {/* SMART Words Column */}
          <div className="col-span-4 border-r border-black">
            {dropZoneData.map((item: string, index: number) => (
              <div
                key={index}
                className="p-3 border-b min-h-[100px] border-black font-semibold text-black"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Drop Area Column */}
          <div className="col-span-8 bg-white">
            {dropZoneData.map((_, index: number) => (
              <div
                key={index}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`p-3 min-h-[100px] border-b border-black flex items-center justify-center text-center transition-all duration-300 ${
                  feedback[index] === "correct"
                    ? "text-black font-medium bg-green-50"
                    : feedback[index] === "wrong"
                    ? "bg-red-100 text-red-700 shake"
                    : "text-gray-400 italic"
                }`}
              >
                {droppedItems[index] ? droppedItems[index] : "Drop here"}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Submit / PDF Button */}
      <div
        className={`${
          allDropped ? "visible" : "invisible"
        } col-span-12 w-full text-center mt-4`}
      >
        <button
          onClick={handleGeneratePDF}
          className="py-2 px-8 cursor-pointer bg-violet-900 text-white rounded-lg hover:bg-violet-800 transition"
        >
          Download PDF
        </button>
      </div>


    </div>
  );
};

export default Table;
