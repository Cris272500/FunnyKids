// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Authentication from './components/Authentication';
import Inicio from './components/Inicio';
import Categorias from './components/Categorias';
import Navbar from './components/Navbar';
import Flashcards from './components/Flashcards';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Renderiza el Navbar solo si la ruta no es /autenticacion */}
      {location.pathname !== '/autenticacion' && <Navbar />}
      
      <Routes>
        <Route path="/autenticacion" element={<Authentication />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/flashcards" element={<Flashcards />} />
        {/* Otras rutas */}
      </Routes>
    </>
  );
}

export default App;
