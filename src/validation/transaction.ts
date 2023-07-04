import { object, string } from 'zod';

export const createTransactionSchema = object({
  amount: string()
  .nonempty('Please enter an amount'),
  date: string()
    .nonempty('Please enter a date'),
  category_id: string()
    .nonempty('Please select a category'),
});
