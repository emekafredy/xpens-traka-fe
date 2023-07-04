import { FC, useState } from 'react';
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions
} from '@mui/material';
import { createCategory } from '../api/category';
import { renderErrorMessage, renderSuccessMessage } from '../lib/utils';
import { setCategories } from '../store/slices/category';
import { useDispatch } from 'react-redux';
import { ICategoryProps } from '../interfaces/category';

interface ICreateCategoryDialog {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  section: string;
  categories: ICategoryProps[];
}

export const CreateCategoryDialog:FC<ICreateCategoryDialog> = ({
  open,
  setOpen,
  section,
  categories
}) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const result = await createCategory({
      name, section
    })

    if (result.success) {
      const newCategory = ([result?.data?.data] || []) as ICategoryProps[];
			const newCategories = [...newCategory, ...categories] || [];

      dispatch(setCategories(newCategories));

      renderSuccessMessage("Category added");
      setOpen(false);
    } else {
      renderErrorMessage(result.error);
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle textAlign="center">Add new category</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            id="outlined-start-adornment"
            sx={{ width: '100%' }}
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
