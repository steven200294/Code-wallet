import React, { useState } from 'react';
import './CodeHighlight.css';

const TagsPage = ({
  tags,
  fragments,
  setNewTag,
  setTags,
  setFilterTag,
  setCurrentPage
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtrer les tags en fonction de la recherche
  const filteredTags = tags.filter(tag => 
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Récupérer tous les fragments associés aux tags filtrés ou dont le titre correspond
  const matchingFragments = searchQuery 
    ? fragments.filter(fragment => 
        fragment.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) || 
        fragment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fragment.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  // Naviguer vers la page des fragments avec un filtre spécifique
  const showFragmentsWithTag = (tag) => {
    setFilterTag(tag);
    setCurrentPage('fragments');
  };

  return (
    <div>
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tags</h2>
          <button
            onClick={() => {
              setNewTag('');
              // Show modal for new tag
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Tag
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search for tags, fragment titles or code content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Section des tags */}
      {filteredTags.length === 0 && !matchingFragments.length ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No results found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchQuery ? `No tags or fragments match "${searchQuery}"` : "Start by creating some tags"}
          </p>
        </div>
      ) : (
        <>
          {filteredTags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Matching Tags</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTags.map(tag => {
                  const taggedFragments = fragments.filter(f => f.tags.includes(tag));
                  return (
                    <div 
                      key={tag} 
                      className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{tag}</h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setNewTag(tag);
                                // Show modal for editing tag
                              }}
                              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                              aria-label="Edit"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                // Delete tag
                                setTags(tags.filter(t => t !== tag));
                              }}
                              className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                              aria-label="Delete"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          {taggedFragments.length} fragments
                        </div>
                        
                        {taggedFragments.length > 0 && (
                          <div className="mt-4">
                            <button
                              onClick={() => showFragmentsWithTag(tag)}
                              className="inline-flex items-center px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                            >
                              View all fragments with this tag
                              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Nouvelle section pour afficher les fragments correspondant à la recherche */}
      {searchQuery && matchingFragments.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Matching Fragments ({matchingFragments.length})
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchingFragments.map(fragment => (
              <div 
                key={fragment.id} 
                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {/* Surligner le titre s'il correspond à la recherche */}
                      {fragment.title.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                        <span className="bg-yellow-100 dark:bg-yellow-900">{fragment.title}</span>
                      ) : (
                        fragment.title
                      )}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setCurrentPage('fragments');
                          setFilterTag('');
                          setTimeout(() => {
                            // Simuler un clic sur le fragment dans la page des fragments
                            const fragmentElement = document.getElementById(`fragment-${fragment.id}`);
                            if (fragmentElement) {
                              fragmentElement.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                        }}
                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        aria-label="View fragment"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {fragment.tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => showFragmentsWithTag(tag)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${tag.toLowerCase().includes(searchQuery.toLowerCase())
                            ? 'bg-indigo-500 text-white'
                            : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                          } hover:bg-indigo-200 dark:hover:bg-indigo-800 cursor-pointer`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {new Date(fragment.date).toLocaleDateString()}
                  </div>
                  
                  {/* Aperçu du code */}
                  <div className="mt-3 text-xs overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900 p-2 max-h-24">
                    <pre className="overflow-hidden overflow-ellipsis">
                      <code className="language-plaintext">
                        {fragment.code.length > 100 
                          ? fragment.code.substring(0, 100) + '...' 
                          : fragment.code}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsPage; 