import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './views/Home';
import { Transactions } from './views/Transactions';
import Protected from './components/Protected';
import { Budgets } from './views/Budgets';

export const AppRouter:FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/Income'
          element={
            <Protected>
              <Transactions />
            </Protected>
          }/>
        <Route
          path='/Expense'
          element={
            <Protected>
              <Transactions />
            </Protected>
        }/>
        <Route
          path='/Budget'
          element={
            <Protected>
              <Budgets />
            </Protected>
        }/>
      </Routes>
    </BrowserRouter>
  )
}
