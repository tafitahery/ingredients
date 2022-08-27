import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Ingredient from './pages/Ingredient';
import Product from './pages/Product';
import InReport from './pages/Inventory';
import Navigation from './components/Navigation';
import User from './pages/User';

import './styles/Ingredient.css';
import './styles/Form.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingredient" element={<Ingredient />} />
        <Route path="/product" element={<Product />} />
        <Route path="/inventory" element={<InReport />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
