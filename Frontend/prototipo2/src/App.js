// src/App.js
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './components/Authentication';
import Inicio from './components/Inicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/autenticacion" element={<Authentication />} />
        <Route path="/" element={<Inicio />} />
      </Routes>
    </Router>
  );
}

export default App;
