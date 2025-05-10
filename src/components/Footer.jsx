function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {currentYear} GPrepWeb - G検定対策アプリ
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
              プライバシーポリシー
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
              利用規約
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
              お問い合わせ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
