import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main/Main';
import { Catalog } from './pages/Catalog/Catalog';
import { Booking } from './pages/Booking/Booking';

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </>
  );
};
