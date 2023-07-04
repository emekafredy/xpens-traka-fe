import request from './common';
import {
  TransactionResponse,
  ITransactionPaginatedProps,
  ICreateTransactionProps,
  CreateTransactionResponse
} from '../interfaces/transaction';
import { returnError } from '../lib/utils';

export const getTransactions = async (
  query: string,
  page: number | 1
): Promise<TransactionResponse<ITransactionPaginatedProps>> => {
  try {
    const { data } = await request.get(`/transactions/?page=${page}&query=${query}`);

    return { data: data, success: true };
  } catch (err) {
    return returnError(err);
  }
};


export const createTransaction = async (
  transactionData: ICreateTransactionProps
): Promise<CreateTransactionResponse> => {
  try {
    const transaction = await request.post('/transactions', transactionData);

    return { data: transaction?.data, success: true };
  } catch (err) {
    return returnError(err);
  }
};
