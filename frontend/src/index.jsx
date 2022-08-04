import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import In from './pages/In';
import Out from './pages/Out';
import Ingredient from './pages/Ingredient';
import Product from './pages/Product';
import InReport from './pages/InReport';
import OutReport from './pages/OutReport';
import Navigation from './components/Navigation';

import './styles/Ingredient.css';
import './styles/Form.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/in" element={<In />} />
        <Route path="/out" element={<Out />} />
        <Route path="/ingredient" element={<Ingredient />} />
        <Route path="/product" element={<Product />} />
        <Route path="/inReport" element={<InReport />} />
        <Route path="/outReport" element={<OutReport />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
