import React from 'react';

const InfoPage = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About Code Wallet</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Save and organize your code snippets</li>
              <li>Tag your fragments for easy filtering</li>
              <li>Dark mode support</li>
              <li>Keyboard shortcuts for productivity</li>
              <li>Drag & drop file import</li>
              <li>Syntax highlighting</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Developers</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Code Wallet is an open-source project built with React, Electron, and Tailwind CSS.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Data Privacy</h3>
            <p className="text-gray-700 dark:text-gray-300">
              All your code fragments and tags are stored locally on your device. We don't collect or transmit any of your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage; 