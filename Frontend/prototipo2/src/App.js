// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Authentication from './components/Authentication';
import Inicio from './components/Inicio';
import Mazos from './components/Mazos';
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
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/mazos" element={<Mazos />} />
        {/* Otras rutas */}
      </Routes>
    </>
  );
}

export default App;
