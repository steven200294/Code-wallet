import React, { useState } from 'react';
import './CodeHighlight.css';

const FormPage = ({
  editMode,
  title,
  setTitle,
  code,
  setCode,
  tags,
  selectedTags,
  toggleTag,
  newTag,
  setNewTag,
  addTag,
  handleSubmit,
  handleDragOver,
  handleDrop,
  deleteFragment,
  editId
}) => {
  const [tagFilter, setTagFilter] = useState('');
  
  // Filtrer les tags en fonction de la recherche
  const filteredTags = tags.filter(tag => 
    tag.toLowerCase().includes(tagFilter.toLowerCase())
  );
  
  // Catégories de tags prédéfinies
  const commonCategories = ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Java', 'SQL', 'TypeScript'];
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {editMode ? 'Edit Fragment' : 'New Fragment'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="title"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Fragment title"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Code
              </label>
              <div 
                className="mt-1 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <textarea
                  id="code"
                  rows="8"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-0 dark:bg-gray-700 dark:text-white font-mono"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste or drop your code here..."
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Drag & drop a text file to import code
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (Select at least one)
              </label>
              
              {/* Common Categories Section */}
              <div className="mb-3">
                <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Common Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {commonCategories.map(tag => (
                    tags.includes(tag) && (
                      <button
                        key={tag}
                        type="button"
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          selectedTags.includes(tag)
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    )
                  ))}
                  
                  {/* Add missing common tags */}
                  {commonCategories.filter(cat => !tags.includes(cat)).map(tag => (
                    <button
                      key={tag}
                      type="button"
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 border border-dashed border-gray-300 dark:border-gray-600"
                      onClick={() => {
                        setNewTag(tag);
                        addTag();
                        setTimeout(() => toggleTag(tag), 10);
                      }}
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Search and Filter for Other Tags */}
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Filter tags..."
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                />
              </div>
              
              {/* Other Tags */}
              <div className="mb-4 max-h-40 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                <div className="flex flex-wrap gap-2">
                  {filteredTags
                    .filter(tag => !commonCategories.includes(tag))
                    .map(tag => (
                      <button
                        key={tag}
                        type="button"
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          selectedTags.includes(tag)
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                </div>
                
                {filteredTags.filter(tag => !commonCategories.includes(tag)).length === 0 && tagFilter && (
                  <div className="text-center py-2 text-sm text-gray-500 dark:text-gray-400">
                    No matching tags found
                  </div>
                )}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700 dark:text-white"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add new tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
              
              {selectedTags.length === 0 && (
                <p className="mt-2 text-sm text-red-500">
                  Please select at least one tag for your code fragment.
                </p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              {editMode && (
                <button
                  type="button"
                  onClick={() => deleteFragment(editId)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                disabled={selectedTags.length === 0}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white 
                  ${selectedTags.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage; 