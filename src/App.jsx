import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import Review from "./pages/Review.jsx";
import Columns from "./pages/Columns.jsx";
import { AppProvider } from "./context/AppContext.jsx";

// ヘッダーコンポーネント
function Header({ title }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        {isHome ? (
          <div className="w-6"></div>
        ) : (
          <Link to="/" className="text-gray-600 dark:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        )}
        
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title || "GPrep Web"}</h1>
        
        <div className="w-6"></div> {/* バランスを取るための空のスペース */}
      </div>
    </header>
  );
}

// ナビゲーションバーコンポーネント
function NavBar() {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-xl mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          <Link to="/" className={`flex flex-col items-center p-2 ${location.pathname === "/" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">ホーム</span>
          </Link>
          
          <Link to="/quiz" className={`flex flex-col items-center p-2 ${location.pathname === "/quiz" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs mt-1">クイズ</span>
          </Link>
          
          <Link to="/review" className={`flex flex-col items-center p-2 ${location.pathname === "/review" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs mt-1">復習</span>
          </Link>
          
          <Link to="/columns" className={`flex flex-col items-center p-2 ${location.pathname.includes("/columns") ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xs mt-1">コラム</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// メインアプリコンポーネント
export default function App() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("GPrep Web");
  
  // ページに応じてタイトルを更新
  useEffect(() => {
    switch(location.pathname) {
      case "/":
        setPageTitle("GPrep Web");
        break;
      case "/quiz":
        setPageTitle("クイズ");
        break;
      case "/review":
        setPageTitle("復習");
        break;
      case "/columns":
        setPageTitle("コラム");
        break;
      default:
        if (location.pathname.includes("/columns/")) {
          setPageTitle("コラム詳細");
        } else {
          setPageTitle("GPrep Web");
        }
    }
  }, [location]);

  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
        <Header title={pageTitle} />
        
        <main className="flex-grow max-w-xl w-full mx-auto p-4 pb-20"> {/* 下部ナビゲーションの高さ分のパディングを追加 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/review" element={<Review />} />
            <Route path="/columns" element={<Columns />} />
            <Route
              path="*"
              element={
                <div className="text-center py-10">
                  <h1 className="text-2xl font-bold mb-4">404</h1>
                  <p className="mb-4">ページが見つかりませんでした</p>
                  <Link className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors" to="/">
                    ホームに戻る
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>
        
        <NavBar />
      </div>
    </AppProvider>
  );
}
