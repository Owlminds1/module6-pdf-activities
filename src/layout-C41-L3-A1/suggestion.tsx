import React from 'react'
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
const Suggestion = () => {
  return (
    <div className="w-full  p-2 space-y-6  ">
      <form className="space-y-6">
        {questions.map((q, i) => (
          <div key={i}>
            <h4 className="font-bold text-lg text-black mb-2">{i+1}. {q.title}</h4>
            <label className="block text-black text-md font-semibold mb-2">
              {q.question}
            </label>
          <p className='text-md text-black font-medium'>{q.suggestion}</p>
          </div>
        ))}
      </form>

     
    </div>
  )
}

export default Suggestion
