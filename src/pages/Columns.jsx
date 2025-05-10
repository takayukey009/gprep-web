import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import ReactMarkdown from "react-markdown";

export default function Columns() {
  const { columns } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColumn, setSelectedColumn] = useState(null);
  
  // カテゴリーのリストを取得
  const categories = ["all", ...new Set(columns.map(column => column.category))];
  
  // 検索とフィルタリング
  const filteredColumns = columns.filter(column => {
    const matchesSearch = column.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         column.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || column.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // 詳細表示
  const handleColumnClick = (column) => {
    setSelectedColumn(column);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // 詳細ビューに戻る
  const handleBackToList = () => {
    setSelectedColumn(null);
  };

  // 詳細表示
  if (selectedColumn) {
    return (
      <div className="animate-fadeIn">
        <button 
          onClick={handleBackToList}
          className="mb-4 flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          一覧に戻る
        </button>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
          <div className="flex items-center mb-4">
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
              {selectedColumn.category}
            </span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{selectedColumn.title}</h1>
          
          <div className="prose dark:prose-invert prose-sm sm:prose-base max-w-none text-gray-700 dark:text-gray-300">
            <ReactMarkdown>{selectedColumn.content}</ReactMarkdown>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <Link to="/" className="flex-1 mr-2">
            <button className="w-full py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>ホーム</span>
            </button>
          </Link>
          
          <Link to="/quiz" className="flex-1 ml-2">
            <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span>クイズに挑戦</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // 一覧表示
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">キーワード解説</h2>
        <p className="text-gray-600 dark:text-gray-400">G検定の重要なキーワードと概念の解説</p>
      </div>
      
      {/* 検索とフィルター */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="キーワードを検索..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "すべて" : category}
            </button>
          ))}
        </div>
      </div>
      
      {/* カラム一覧 */}
      {filteredColumns.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredColumns.map(column => (
            <div 
              key={column.id} 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => handleColumnClick(column)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  {column.category}
                </span>
              </div>
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">{column.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {column.content.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">検索結果がありません</p>
        </div>
      )}
      
      <Link to="/" className="block w-full mt-6">
        <button className="w-full py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>ホームに戻る</span>
        </button>
      </Link>
    </div>
  );
}
