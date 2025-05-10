import { useState } from 'react';

function QuizCard({ question, onAnswer, showAnswer = false }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // 「わからない」選択肢を追加
  const choices = [...question.choices, "わからない"];
  
  const handleSelectAnswer = (index) => {
    if (showAnswer) return; // 答え表示中は選択できない
    setSelectedAnswer(index);
    onAnswer(index);
  };
  
  // 選択肢のスタイルを決定する関数
  const getChoiceStyle = (index) => {
    if (!showAnswer) {
      return selectedAnswer === index 
        ? "bg-blue-100 border-blue-500 dark:bg-blue-900 dark:border-blue-400" 
        : "bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600";
    }
    
    // 答え表示モードの場合
    if (index === question.answer) {
      return "bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-400";
    } else if (selectedAnswer === index) {
      return "bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-400";
    } else {
      return "bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600";
    }
  };

  return (
    <div className="quiz-card card max-w-2xl mx-auto">
      <div className="mb-6">
        <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded mb-2">
          {question.category}
        </span>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          {question.question}
        </h2>
      </div>
      
      <div className="space-y-3">
        {choices.map((choice, index) => (
          <button
            key={index}
            className={`w-full text-left p-4 border-2 rounded-lg transition-colors ${getChoiceStyle(index)}`}
            onClick={() => handleSelectAnswer(index)}
            disabled={showAnswer}
          >
            <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {choice}
          </button>
        ))}
      </div>
      
      {showAnswer && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">解説</h3>
          <p className="text-gray-700 dark:text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default QuizCard;
