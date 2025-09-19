import React from 'react';
import ReflectionForm from './components/ReflectionForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">NextTier</h1>
        <p className="app-description">
          Your AI-powered assistant for crafting the perfect raise request. 
          Get personalized guidance and practice with a mock meeting to build your confidence.
        </p>
      </div>
      <div className="chatbox-container">
        <ReflectionForm />
      </div>
    </div>
  );
}

export default App;
