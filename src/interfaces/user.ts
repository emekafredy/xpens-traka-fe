export interface IAuthProps {
  email: string;
  password: string;
  username?: string;
}

export interface ErrorResponse {
  response: {
    data: {
      status: {
        message: string;
      }
    }
  }
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
    recentTransactions: {
      transactionId: string;
      amount: number;
      transactionType: string;
      date: string;
      category: string;
    }[];
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
