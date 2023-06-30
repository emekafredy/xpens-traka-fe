import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoginModal } from '../Auth/LoginModal';
import { SignUpModal } from '../Auth/SignUpModal';
import { getUserAuthState } from '../../store/slices/user';
import { Welcome } from './Welcome';
import { Dashboard } from './Dashboard';


export const Home:FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { isAuthenticated } = useSelector(getUserAuthState);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <Welcome
          setLoginModalOpen={setLoginModalOpen}
          setSignUpModalOpen={setSignUpModalOpen}
        />
      )}
      
      <LoginModal
        open={loginModalOpen}
        setOpen={setLoginModalOpen}
        openSignUpModal={setSignUpModalOpen}
        submitting={submitting}
        setSubmitting={setSubmitting}
      />

      <SignUpModal
        open={signUpModalOpen}
        setOpen={setSignUpModalOpen}
        openLoginModal={setLoginModalOpen}
        submitting={submitting}
        setSubmitting={setSubmitting}
      />
    </>
  );
}
