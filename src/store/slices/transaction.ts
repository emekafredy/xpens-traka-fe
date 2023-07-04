import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITransactionPaginatedProps } from '../../interfaces/transaction';
import { RootState } from '..';

type TransactionProps = {
  transactions?: ITransactionPaginatedProps;
}

const initialState: TransactionProps = {
  transactions: {
    meta: {
      pagination: {
        current_page: null,
        next_page: null,
        prev_page: null,
        total_count: null,
        total_pages: null,
      },
    },
    results: {
      data: [],
    },
  },
}

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<ITransactionPaginatedProps>) => {
      state.transactions = action.payload;
    }
  },
})

export const { setTransactions } = transactionSlice.actions

export const getAllTransactionsState = (state: RootState): TransactionProps => {
  return state.transaction
}

export default transactionSlice.reducer
