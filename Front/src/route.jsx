import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './routes/App';
import Header from './components/header';
import Electricista from './routes/electricista';
import Profile from './components/profile';
import Valoraciones from './routes/valoraciones';
import Perfil from './routes/perfil';

const Root = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<App />} />
        </Route>
        <Route path="electricista/:user" element={<Electricista />} />
        <Route path="profile" element={<Profile />} />
        <Route path="valoraciones" element={<Valoraciones />} />
        <Route path="electricista/perfil/:id" element={<Perfil tipo="electricista"/>} />
        <Route path="usuario/perfil/:id" element={<Perfil tipo="usuario"/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;