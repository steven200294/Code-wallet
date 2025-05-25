import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import './CodeHighlight.css';

const CodeModal = ({
  showCodeModal,
  selectedCode,
  copyToClipboard,
  setShowCodeModal
}) => {
  // Appliquer la coloration syntaxique après que le composant est monté
  useEffect(() => {
    if (showCodeModal) {
      document.querySelectorAll('.code-preview pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [showCodeModal, selectedCode]);

  if (!showCodeModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" 
          aria-hidden="true"
          onClick={() => setShowCodeModal(false)}
        ></div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        {/* Modal */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Code</h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Copy
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
            
            <div className="code-preview">
              <pre className="mt-2 text-sm overflow-x-auto rounded-md bg-gray-900 p-4 max-h-[70vh] overflow-y-auto">
                <code>{selectedCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeModal; 