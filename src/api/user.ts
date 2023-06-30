import request from './common';
import { UserAuthResponse } from '../interfaces/user';
import { returnError } from '../lib/utils';

export const getUserAccount = async (): Promise<UserAuthResponse> => {
  try {
    const user = await request.get('/users/my_account');

    return { data: user.data, success: true };
  } catch (err) {
    return returnError(err);
  }
};
