import React from 'react';

const Header = ({ 
  darkMode, 
  setDarkMode, 
  currentPage, 
  setCurrentPage, 
  setEditMode, 
  setTitle, 
  setCode, 
  setSelectedTags 
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Code Wallet</h1>
            </div>
            <nav className="ml-6 flex space-x-4">
              <button
                onClick={() => setCurrentPage('fragments')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'fragments'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Fragments
              </button>
              <button
                onClick={() => setCurrentPage('tags')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'tags'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Tags
              </button>
            </nav>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => {
                setEditMode(false);
                setTitle('');
                setCode('');
                setSelectedTags([]);
                setCurrentPage('form');
              }}
              className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              New
            </button>
            <button
              onClick={() => setCurrentPage('info')}
              className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Info
            </button>
            <div className="ml-4">
              <label className="inline-flex items-center cursor-pointer">
                <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {darkMode ? '🌙' : '☀️'}
                </span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <div className={`w-11 h-6 rounded-full peer 
                    ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'} 
                    peer-checked:after:translate-x-full after:content-[''] 
                    after:absolute after:top-[2px] after:left-[2px] 
                    after:bg-white after:rounded-full after:h-5 after:w-5 
                    after:transition-all`}></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 