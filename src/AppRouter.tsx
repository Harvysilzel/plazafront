// src/AppRouter.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/about';
import Defaults from './pages/PorDefecto';
import UserForm from './pages/SingUp';
import Logins from './pages/login';
import DetalleProducto from './pages/ShowProducto';
import VirtualStore from './pages/ShowVirtualStore';
import Promociones from './pages/ShowDescuentos';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About/>} />
  <Route path="/SingUp" element={<UserForm/>} />
  <Route path="/*" element={<Defaults/>} />
  <Route path='/Login' element={<Logins/>} />
  <Route path="/DetalleProducto/:id" element={<DetalleProducto/>} />
  <Route path="/VirtualStore/:id" element={<VirtualStore/>} />
  <Route path='/Promociones' element={<Promociones/>} />


</Routes>
    </Router>
  );
};

export default AppRouter;
