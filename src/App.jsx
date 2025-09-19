import React from 'react';
import ReflectionForm from './components/ReflectionForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">NextTier</h1>
        <p className="app-description">
          An AI assistant developed to help craft the perfect raise or promotion request. 
        </p>
      </div>
      <div className="chatbox-container">
        <ReflectionForm />
      </div>
    </div>
  );
}

export default App;
