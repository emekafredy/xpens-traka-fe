import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './views/Home';

export const AppRouter:FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
