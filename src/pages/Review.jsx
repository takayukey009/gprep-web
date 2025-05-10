import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Link } from "react-router-dom";

export default function Review() {
  const { questions, mistakes, clearMistakes } = useContext(AppContext);
  const mistakeQuestions = questions.filter(q => mistakes.includes(q.id));
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // 間違えた問題がない場合の表示
  if (mistakeQuestions.length === 0) {
    return (
      <div className="text-center space-y-6 py-10 animate-fadeIn">
        <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">間違えた問題はありません！</h2>
        <p className="text-gray-600 dark:text-gray-300">まだ間違えた問題がありません。クイズにチャレンジしてみましょう。</p>
        
        <Link to="/quiz" className="inline-block">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <span>クイズを始める</span>
          </button>
        </Link>
      </div>
    );
  }

  // 間違えた問題を表示
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">間違えた問題を復習</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{mistakeQuestions.length} 問題あります</p>
        </div>
        
        {!showConfirmClear ? (
          <button 
            onClick={() => setShowConfirmClear(true)}
            className="px-3 py-2 text-sm rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/30 transition-colors flex items-center space-x-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>全てクリア</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowConfirmClear(false)}
              className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              キャンセル
            </button>
            <button 
              onClick={() => {
                clearMistakes();
                setShowConfirmClear(false);
              }}
              className="px-3 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              確認
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {mistakeQuestions.map(q => (
          <div 
            key={q.id} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
          >
            <div 
              className="flex justify-between items-start cursor-pointer"
              onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
            >
              <p className="font-medium text-gray-800 dark:text-white pr-4">{q.text}</p>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform ${expandedQuestion === q.id ? 'rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            
            {expandedQuestion === q.id && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 animate-fadeIn">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">正解: <span className="font-semibold text-green-700 dark:text-green-400">{q.choices[q.answerIndex]}</span></p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">全ての選択肢:</h4>
                  <ul className="space-y-1 text-sm">
                    {q.choices.map((choice, idx) => (
                      <li key={idx} className={`pl-2 border-l-2 ${idx === q.answerIndex ? 'border-green-500 text-green-700 dark:text-green-400' : 'border-gray-300 dark:border-gray-700'}`}>
                        {choice}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {q.explanation && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">解説:</h4>
                    <p className="mt-1 text-sm">{q.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex space-x-3 pt-4">
        <Link to="/" className="flex-1">
          <button className="w-full py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>ホームに戻る</span>
          </button>
        </Link>
        
        <Link to="/quiz" className="flex-1">
          <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            <span>新しいクイズを始める</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
