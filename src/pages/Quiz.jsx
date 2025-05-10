import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const { questions, addMistake } = useContext(AppContext);
  const [idx, setIdx] = useState(0);
  const [selection, setSelection] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const q = questions[idx];
  const choices = [...q.choices, "わからない"];
  
  // プログレスバーの計算
  const progress = ((idx + 1) / questions.length) * 100;

  // 選択時のフィードバックを表示
  useEffect(() => {
    if (selection !== null) {
      setShowFeedback(true);
    }
  }, [selection]);

  // 次の問題に進む
  function next() {
    if (selection !== q.answerIndex) addMistake(q.id);
    
    setIsAnimating(true);
    setTimeout(() => {
      if (idx + 1 < questions.length) {
        setSelection(null);
        setShowFeedback(false);
        setIdx(idx + 1);
      } else {
        // クイズ完了時の処理
        navigate("/");
      }
      setIsAnimating(false);
    }, 300);
  }

  // 選択肢の表示スタイルを決定
  const getChoiceStyle = (index) => {
    let baseStyle = "w-full py-3 px-4 rounded-lg border text-left transition-all duration-200 flex items-center ";
    
    if (selection === null) {
      // 未選択時
      return baseStyle + "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700";
    }
    
    if (index === q.answerIndex) {
      // 正解の選択肢
      return baseStyle + "bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-500 text-green-800 dark:text-green-200";
    }
    
    if (selection === index) {
      // 選択された不正解
      return baseStyle + "bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-500 text-red-800 dark:text-red-200";
    }
    
    // その他の選択肢
    return baseStyle + "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 opacity-70";
  };

  return (
    <div className={`space-y-6 ${isAnimating ? 'opacity-0' : 'animate-fadeIn'}`}>
      {/* プログレスバー */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span>問題 {idx + 1}/{questions.length}</span>
          <span>{Math.round(progress)}% 完了</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* 問題文 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-4">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-1">問題 {idx + 1}</h2>
        <p className="text-gray-700 dark:text-gray-200">{q.text}</p>
      </div>
      
      {/* 選択肢 */}
      <div className="space-y-3">
        {choices.map((choice, i) => (
          <button
            key={i}
            className={getChoiceStyle(i)}
            onClick={() => selection === null && setSelection(i)}
            disabled={selection !== null}
          >
            <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center">
              {String.fromCharCode(65 + i)}
            </span>
            <span>{choice}</span>
            
            {/* 正解/不正解アイコン */}
            {showFeedback && i === q.answerIndex && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-green-600 dark:text-green-400 animate-fadeIn" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            
            {showFeedback && selection === i && i !== q.answerIndex && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-red-600 dark:text-red-400 animate-fadeIn" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
      
      {/* フィードバックメッセージ */}
      {showFeedback && (
        <div className={`mt-4 p-4 rounded-lg animate-fadeIn ${selection === q.answerIndex ? 
            "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800" : 
            "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
          }`}
        >
          <p className={selection === q.answerIndex ? 
            "text-green-800 dark:text-green-200" : 
            "text-red-800 dark:text-red-200"
          }>
            {selection === q.answerIndex ? 
              "正解です！" : 
              `不正解です。正解は「${q.choices[q.answerIndex]}」です。`
            }
          </p>
        </div>
      )}
      
      {/* 次へボタン */}
      {selection !== null && (
        <button
          onClick={next}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-colors mt-6 flex items-center justify-center space-x-2"
        >
          <span>{idx + 1 < questions.length ? "次の問題へ" : "結果を見る"}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}
