import request from './common';
import { IAuthProps, UserAuthResponse } from '../interfaces/user';
import { returnError } from '../lib/utils';

export const signUpUser = async (
  userData: IAuthProps
): Promise<UserAuthResponse> => {
  try {
    const user = await request.post('/users/signup', userData);

    const authToken = user?.data?.data?.attributes?.authToken;

    if (authToken) {
      localStorage.setItem('authToken', authToken);
    }

    return { data: user?.data, success: true };
  } catch (err) {
    return returnError(err);
  }
};

export const loginUser = async (
  userData: IAuthProps
): Promise<UserAuthResponse> => {
  try {
    const user = await request.post('/users/login', userData);

    const authToken = user?.data?.data?.attributes?.authToken;

    if (authToken) {
      localStorage.setItem('authToken', authToken);
    }

    return { data: user?.data, success: true  };
  } catch (err) {
    return returnError(err);
  }
};
