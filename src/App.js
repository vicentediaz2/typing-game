import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import TypingGame from './TypingGame';
import './App.css';
import './LanguageSelector.css';

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  return (
    <div className="App">
      {!selectedLanguage ? (
        <LanguageSelector onLanguageSelect={setSelectedLanguage} />
      ) : (
        <TypingGame language={selectedLanguage} />
      )}
    </div>
  );
};

export default App;