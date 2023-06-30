import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppRouter } from './AppRouter';
import Navigation from './components/Navigation';
import { authUser } from './hooks/user';
import { Loader } from './components/Loader';
import 'react-toastify/dist/ReactToastify.css';

export const App:FC = () => {
  const { loading } = authUser();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navigation />
          <AppRouter />
          <ToastContainer />
        </>
      )}
    </>
  )
}
