import request from './common';
import {
  ICreateCategoryProps,
  ICategoryProps,
  CategoryResponse,
  CreateCategoryResponse
} from '../interfaces/category';
import { returnError } from '../lib/utils';

export const getCategories = async (
  section: string
): Promise<CategoryResponse<ICategoryProps>> => {
  try {
    const { data } = await request.get(`/categories?section=${section}`);

    return { data: data.data, success: true };
  } catch (err) {
    return returnError(err);
  }
};

export const createCategory = async (
  categoryData: ICreateCategoryProps
): Promise<CreateCategoryResponse> => {
  try {
    const { data } = await request.post('/categories', categoryData);

    return { data: data, success: true };
  } catch (err) {
    return returnError(err);
  }
};
