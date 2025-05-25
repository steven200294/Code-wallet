import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// Import components
import Header from './components/Header';
import FragmentsPage from './components/FragmentsPage';
import FormPage from './components/FormPage';
import TagsPage from './components/TagsPage';
import InfoPage from './components/InfoPage';
import CodeModal from './components/CodeModal';

// Main App Component
const App = () => {
  // State for dark mode
  const [darkMode, setDarkMode] = React.useState(false);
  
  // State for code fragments
  const [fragments, setFragments] = React.useState(() => {
    const saved = localStorage.getItem('codeFragments');
    return saved ? JSON.parse(saved) : [];
  });
  
  // State for tags
  const [tags, setTags] = React.useState(() => {
    const saved = localStorage.getItem('codeTags');
    return saved ? JSON.parse(saved) : ['JavaScript', 'React', 'CSS', 'HTML'];
  });
  
  // States for form inputs
  const [title, setTitle] = React.useState('');
  const [code, setCode] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [newTag, setNewTag] = React.useState('');
  const [filterTag, setFilterTag] = React.useState('');
  
  // State for editing
  const [editMode, setEditMode] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  
  // State for current page
  const [currentPage, setCurrentPage] = React.useState('fragments');
  
  // State for modal
  const [showCodeModal, setShowCodeModal] = React.useState(false);
  const [selectedCode, setSelectedCode] = React.useState('');
  
  // Effect to save fragments to localStorage
  React.useEffect(() => {
    localStorage.setItem('codeFragments', JSON.stringify(fragments));
  }, [fragments]);
  
  // Effect to save tags to localStorage
  React.useEffect(() => {
    localStorage.setItem('codeTags', JSON.stringify(tags));
  }, [tags]);
  
  // Effect to apply dark mode
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Effect to apply syntax highlighting
  React.useEffect(() => {
    // Légère temporisation pour s'assurer que le DOM est complètement chargé
    const applyHighlighting = setTimeout(() => {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }, 100);
    
    return () => clearTimeout(applyHighlighting);
  }, [fragments, filterTag, showCodeModal]);
  
  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCode(event.target.result);
      };
      reader.readAsText(file);
    }
  };
  
  // Add or edit fragment
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !code) return;
    
    if (editMode) {
      // Update existing fragment
      setFragments(fragments.map(fragment => 
        fragment.id === editId 
          ? { ...fragment, title, code, tags: selectedTags } 
          : fragment
      ));
      setEditMode(false);
      setEditId(null);
    } else {
      // Add new fragment
      const newFragment = {
        id: Date.now(),
        title,
        code,
        tags: selectedTags,
        date: new Date().toISOString()
      };
      setFragments([...fragments, newFragment]);
    }
    
    // Reset form
    setTitle('');
    setCode('');
    setSelectedTags([]);
    setCurrentPage('fragments');
  };
  
  // Delete fragment
  const deleteFragment = (id) => {
    setFragments(fragments.filter(fragment => fragment.id !== id));
    setCurrentPage('fragments');
  };
  
  // Edit fragment
  const editFragment = (fragment) => {
    setEditMode(true);
    setEditId(fragment.id);
    setTitle(fragment.title);
    setCode(fragment.code);
    setSelectedTags(fragment.tags);
    setCurrentPage('form');
  };
  
  // Add tag
  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };
  
  // Toggle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Filter fragments by tag
  const filteredFragments = filterTag 
    ? fragments.filter(fragment => fragment.tags.includes(filterTag))
    : fragments;
  
  // Setup keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+S for save
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSubmit(e);
      }
      // Ctrl+D for dark mode toggle
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        setDarkMode(!darkMode);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit, darkMode]);
  
  // Show code modal
  const showCode = (code) => {
    setSelectedCode(code);
    setShowCodeModal(true);
  };
  
  // Copy code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedCode);
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setEditMode={setEditMode}
        setTitle={setTitle}
        setCode={setCode}
        setSelectedTags={setSelectedTags}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'fragments' && (
          <FragmentsPage
            filteredFragments={filteredFragments}
            tags={tags}
            filterTag={filterTag}
            setFilterTag={setFilterTag}
            showCode={showCode}
            editFragment={editFragment}
            deleteFragment={deleteFragment}
            setEditMode={setEditMode}
            setTitle={setTitle}
            setCode={setCode}
            setSelectedTags={setSelectedTags}
            setCurrentPage={setCurrentPage}
          />
        )}
        
        {currentPage === 'form' && (
          <FormPage
            editMode={editMode}
            title={title}
            setTitle={setTitle}
            code={code}
            setCode={setCode}
            tags={tags}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            newTag={newTag}
            setNewTag={setNewTag}
            addTag={addTag}
            handleSubmit={handleSubmit}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            deleteFragment={deleteFragment}
            editId={editId}
          />
        )}
        
        {currentPage === 'tags' && (
          <TagsPage
            tags={tags}
            fragments={fragments}
            setNewTag={setNewTag}
            setTags={setTags}
            setFilterTag={setFilterTag}
            setCurrentPage={setCurrentPage}
          />
        )}
        
        {currentPage === 'info' && <InfoPage />}
      </main>
      
      <CodeModal
        showCodeModal={showCodeModal}
        selectedCode={selectedCode}
        copyToClipboard={copyToClipboard}
        setShowCodeModal={setShowCodeModal}
      />
    </div>
  );
};

// Render component to DOM
const root = createRoot(document.getElementById('root'));
root.render(<App />);