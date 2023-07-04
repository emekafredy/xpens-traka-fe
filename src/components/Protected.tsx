import * as React from 'react';
import { RouteProps, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getUserAuthState } from '../store/slices/user';

type ProtectedProps = RouteProps & {
  children: JSX.Element;
}

export default function Protected({
  children,
}: ProtectedProps): React.ReactElement {
  const { isAuthenticated } = useSelector(getUserAuthState);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children;
};
