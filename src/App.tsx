import { FC } from 'react';
import { AppRouter } from './AppRouter';
import Navigation from './components/Navigation';

export const App:FC = () => {
  return (
    <>
      <Navigation />
      <AppRouter />
    </>
  )
}
