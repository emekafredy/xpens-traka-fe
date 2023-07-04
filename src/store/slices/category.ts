import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoryProps } from '../../interfaces/category';
import { RootState } from '..';

type CategoryProps = {
  categories: ICategoryProps[];
}

const initialState: CategoryProps = {
  categories: [],
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategoryProps[]>) => {
      state.categories = action.payload;
    }
  },
})

export const { setCategories } = categorySlice.actions;

export const getAllCategoriesState = (state: RootState): CategoryProps => {
  return state.category
}

export default categorySlice.reducer
