import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './client/Dashboard';
import ClientHeader from './client/ClientHeader';
import Product from './client/Product';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<><Header /><Home /></>} />
      <Route path="/login" element={<><Header /><Login /></>} />
      <Route path="/register" element={<><Header /><Register /></>} />
      <Route path="/dashboard" element={<><ClientHeader /><Dashboard /></>} />
      <Route path="/product" element={<><ClientHeader /><Product /></>} />
    </Routes>
  </>
);

export default App;
