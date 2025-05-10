import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

export default function Home() {
  const { questions, mistakes } = useContext(AppContext);
  const progress = questions.length > 0 ? (questions.length - mistakes.length) / questions.length : 0;
  const progressPercent = Math.round(progress * 100);
  
  // 進捗に応じたメッセージを表示
  const getProgressMessage = () => {
    if (progressPercent < 25) return "まだ始めたばかりです。頑張りましょう！";
    if (progressPercent < 50) return "良い調子です。続けましょう！";
    if (progressPercent < 75) return "素晴らしい進捗です！";
    if (progressPercent < 100) return "もう少しで完了です！";
    return "完璧です！おめでとうございます！";
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ウェルカムセクション */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">G検定対策アプリ</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">ディープラーニングの知識を効率的に学習</p>
      </div>
      
      {/* 進捗リング */}
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 36 36" className="w-full h-full transform transition-transform hover:scale-105">
          {/* 背景リング */}
          <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e5e7eb" strokeWidth="2" className="dark:opacity-30" />
          
          {/* 進捗リング */}
          <circle 
            cx="18" 
            cy="18" 
            r="15.9155" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="2.5" 
            strokeDasharray={`${progressPercent}, 100`} 
            strokeLinecap="round" 
            transform="rotate(-90 18 18)" 
            className="transition-all duration-1000 ease-out"
          />
          
          {/* パーセント表示 */}
          <text x="18" y="18" className="fill-current text-2xl font-bold" textAnchor="middle" dominantBaseline="middle">
            {progressPercent}%
          </text>
          
          {/* 小さいテキスト */}
          <text x="18" y="23" className="fill-current text-xs" textAnchor="middle" dominantBaseline="middle">
            完了
          </text>
        </svg>
        
        {/* 進捗メッセージ */}
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-300">{getProgressMessage()}</p>
      </div>
      
      {/* 統計情報 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm text-center transition-transform hover:scale-105">
          <p className="text-gray-500 dark:text-gray-400 text-xs">全問題数</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{questions.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm text-center transition-transform hover:scale-105">
          <p className="text-gray-500 dark:text-gray-400 text-xs">間違えた問題</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{mistakes.length}</p>
        </div>
      </div>
      
      {/* アクションボタン */}
      <div className="space-y-3">
        <Link to="/quiz" className="block w-full">
          <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            <span>クイズを始める</span>
          </button>
        </Link>
        
        <Link to="/review" className="block w-full">
          <button className="w-full py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <span>間違えた問題を復習 ({mistakes.length})</span>
          </button>
        </Link>
        
        <Link to="/columns" className="block w-full">
          <button className="w-full py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span>コラムを学習する</span>
          </button>
        </Link>
      </div>
      
      {/* 最終更新日 */}
      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
        最終更新: 2025年5月10日
      </p>
    </div>
  );
}
