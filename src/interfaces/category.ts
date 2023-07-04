export interface CategoryResponse<T> {
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

export interface ICategoryProps {
  id: string;
  type: string;
  attributes: {
    id: string;
    name: number | string;
    section: string;
  }
}

export interface ICreateCategoryProps {
  name?: string;
  section?: string;
}

export interface CreateCategoryResponse {
  success: boolean;
  data?: {
    data: {
      id: string;
      type: string;
      attributes: {
        id: string;
        name: number | string;
        section: string;
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
