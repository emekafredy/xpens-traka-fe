export interface TransactionResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    response: {
      data: {
        status: {
          message: string;
        }
      }
    }
  };
}

export interface ITransactionProps {
  id: string;
  type: string;
  attributes: {
    transactionId: string;
    id: string;
    amount: number | string;
    currency: string;
    transactionType: string;
    date: string;
    categoryName: string;
  }
}

export interface ITransactionPaginatedProps {
  meta: {
    pagination: {
      current_page: number | null;
      next_page: number | null;
      prev_page: number | null;
      total_count: number | null;
      total_pages: number | null;
    };
  };
  results: {
    data: ITransactionProps[];
  };
}

export const EmptyPaginationState = {
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
};

export interface ICreateTransactionProps {
  amount?: number;
  date?: string;
  category_id?: string;
  transaction_type?: string;
}

export interface CreateTransactionResponse {
  success: boolean;
  data?: {
    data: {
      id: string;
      type: string;
      attributes: {
        transactionId: string;
        id: string;
        amount: number | string;
        currency: string;
        transactionType: string;
        date: string;
        categoryName: string;
      }
    }
  };
  error?: {
    response: {
      data: {
        status: {
          message: string;
        }
      }
    }
  };
}
