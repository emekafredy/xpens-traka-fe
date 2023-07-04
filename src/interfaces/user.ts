export interface IAuthProps {
  email: string;
  password: string;
  username?: string;
  avatar?: any;
}

export interface UserAuthResponse {
  data?: {
    data: {
      id: string;
      type: string;
      attributes: {
        id: string;
        email: string;
        username: string;
        createdDate: string;
        authToken: string;
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
  success: boolean; 
}

export interface UserObject {
  id: string;
  type: string;
  attributes: {
    id: string;
    email: string;
    username: string;
    createdDate: string;
    authToken: string;
    incomesTotal: number | string;
    expensesTotal: number | string;
    recentTransactions: {
      transactionId: string;
      amount: number | string;
      transactionType: string;
      date: string;
      category: string;
    }[];
    monthlyGrouped: {
      incomes: any[];
      expenses: any[];
    }
  }
}

export interface UserObjectII {
  id: string;
  type: string;
  email: string;
  username: string;
  createdDate: string;
  authToken: string;
}
