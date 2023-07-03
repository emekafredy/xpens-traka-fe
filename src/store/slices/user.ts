import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserObject } from '../../interfaces/user';
import { RootState } from '..';

type UserProps = {
  user?: UserObject;
  isAuthenticated: boolean;
}

const initialState: UserProps = {
  user: {
    id: '',
    type: '',
    attributes: {
      id: '',
      email: '',
      username: '',
      createdDate: '',
      authToken: '',
      incomesTotal: '',
      expensesTotal: '',
      recentTransactions: [],
      monthlyGrouped: {
        incomes: [],
        expenses: [],
      }
    }
  },
  isAuthenticated: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    }
  },
})

export const { setUser } = userSlice.actions

export const getUserAuthState = (state: RootState): UserProps => {
  return state.user
}

export default userSlice.reducer
