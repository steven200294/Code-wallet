import React, { useState } from 'react';
import './CodeHighlight.css';

const FragmentsPage = ({
  filteredFragments,
  tags,
  filterTag,
  setFilterTag,
  showCode,
  editFragment,
  deleteFragment,
  setEditMode,
  setTitle,
  setCode,
  setSelectedTags,
  setCurrentPage
}) => {
  // Suppression de la recherche dans cette page
  // const [searchQuery, setSearchQuery] = useState('');
  
  // Utiliser directement les fragments filtrés par tag, sans filtrage par recherche
  const searchFilteredFragments = filteredFragments;
  
  // Construire un résumé des types de tags présents
  const tagCounts = {};
  tags.forEach(tag => {
    tagCounts[tag] = filteredFragments.filter(f => f.tags.includes(tag)).length;
  });
  
  // Trier les tags par fréquence (du plus utilisé au moins utilisé)
  const sortedTags = [...tags].sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {filterTag ? `Fragments tagged with "${filterTag}"` : "All Fragments"}
          </h2>
          <button
            onClick={() => {
              setEditMode(false);
              setTitle('');
              setCode('');
              setSelectedTags([]);
              setCurrentPage('form');
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Fragment
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          {/* Suppression de la barre de recherche */}
          
          {/* Tag Filter Dropdown */}
          <div className="flex-shrink-0">
            <select
              className="pl-3 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
            >
              <option value="">All tags</option>
              {sortedTags.map(tag => (
                <option key={tag} value={tag}>{tag} ({tagCounts[tag]})</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Active Filters - modification pour n'afficher que le filtre par tag */}
        {filterTag && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
            {filterTag && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                Tag: {filterTag}
                <button 
                  onClick={() => setFilterTag('')}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none dark:hover:bg-indigo-800"
                >
                  <span className="sr-only">Remove filter</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}
      </div>
      
      {searchFilteredFragments.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No fragments found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {filterTag 
              ? `No code fragments with tag "${filterTag}" found.`
              : "Get started by creating a new fragment."}
          </p>
          <div className="mt-6">
            {filterTag ? (
              <button
                onClick={() => {
                  setFilterTag('');
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Clear filters
              </button>
            ) : (
              <button
                onClick={() => { setEditMode(false);setTitle(''); setCode('');setSelectedTags([]); setCurrentPage('form');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                New Fragment
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {searchFilteredFragments.map(fragment => (
            <div 
              key={fragment.id} 
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{fragment.title}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => showCode(fragment.code)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      aria-label="View code"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => editFragment(fragment)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      aria-label="Edit"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteFragment(fragment.id)}
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                      aria-label="Delete"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-1">
                  {fragment.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        if (filterTag !== tag) {
                          setFilterTag(tag);
                        }
                      }}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${filterTag === tag 
                          ? 'bg-indigo-500 text-white' 
                          : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800'
                        } cursor-pointer`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {new Date(fragment.date).toLocaleDateString()}
                </div>
                
                {/* Suppression de la prévisualisation du code liée à la recherche */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FragmentsPage; 