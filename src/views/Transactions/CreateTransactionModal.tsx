import { FC, useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  styled,
  Modal,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
  Button
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { SelectChangeEvent } from '@mui/material/Select';
import { createTransactionSchema } from '../../validation/transaction';
import { userCategories } from '../../hooks/category';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategoriesState } from '../../store/slices/category';
import { CreateCategoryDialog } from '../../components/CreateCategorDialog';
import { createTransaction } from '../../api/transaction';
import { renderErrorMessage, renderSuccessMessage } from '../../lib/utils';
import { setTransactions, getAllTransactionsState } from '../../store/slices/transaction';
import { ITransactionPaginatedProps, ITransactionProps } from '../../interfaces/transaction';

const Wrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  width: "30%",
  margin: "auto",
  marginTop: "10rem",
  padding: "4em",
  borderRadius: "5px",
  [theme.breakpoints.down("sm")]: {
     width: "100%",
     borderRadius: "0px",
     height: "100%",
     margin: "auto",
     marginTop: "0",
     padding: "2em",
  },
  [theme.breakpoints.down("md")]: {
     width: "80%"
  },
  [theme.breakpoints.up("lg")]: {
    width: "30%",
  },
}));

type CreateTransactionInputs = TypeOf<typeof createTransactionSchema>;

interface ICreateTransactionModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  title: string;
}

export const CreateTransactionModal:FC<ICreateTransactionModalProps> = ({
  open,
  setOpen,
  title,
}) => {
  const { loading } = userCategories(title);
  const { categories } = useSelector(getAllCategoriesState);
  const { transactions } = useSelector(getAllTransactionsState);
  const dispatch = useDispatch();

  // Create Category Dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setValue,
  } = useForm<CreateTransactionInputs>({
    resolver: zodResolver(createTransactionSchema),
  });

  const [categoryId, setCategoryId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [date, setDate] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value as string);
  };

  const handleDateChange = (event: any) => {
    setDate(`${event.$d}` as string);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    setValue('category_id', categoryId);
  }, [categoryId]);

  useEffect(() => {
    setValue('date', date)
  }, [date]);

  const onSubmitHandler: SubmitHandler<CreateTransactionInputs> = async (values) => {
    setSubmitting(true);
    const modifiedValues = {
      ...values,
      amount: title === 'Income' ? parseFloat(values.amount) : -(parseFloat(values.amount)),
      transaction_type: title
    }
    const result = await createTransaction(modifiedValues)

    if (result.success) {
      const newTransaction = ([result?.data?.data] || []);
			const newTransactions = {
        ...transactions,
        results: {
          data: [
            ...newTransaction,
            ...transactions?.results.data as ITransactionProps[]
          ]
        }
      }

      dispatch(setTransactions(newTransactions as ITransactionPaginatedProps));
      renderSuccessMessage("New Transaction Created")
      setOpen(false);
      setSubmitting(false);
    } else {
      renderErrorMessage(result.error);
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
      <Wrapper>
        <Box textAlign="right">
          <CloseOutlinedIcon
            onClick={() => setOpen(false)}
            cursor="pointer"
          />
        </Box>
        <Divider />
        <Typography
          component="h1"
          variant="h4"
          mt={2}
          mb={4}
        >
          Add {title}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <TextField
            label="Amount"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '100%' }}
            autoFocus
            type="number"
            error={!!errors['amount']}
            helperText={errors['amount'] ? errors['amount'].message : ''}
            {...register('amount')}
            InputProps={{
              startAdornment: <InputAdornment position="start">₦</InputAdornment>,
            }}
          />

          <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id="simple-select-label">Category</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={categoryId}
              label="Category"
              onChange={handleChange}
              error={!!errors['category_id']}
              disabled={loading}
            >
              {categories?.map((cat) => (
                <MenuItem
                  key={cat?.id}
                  value={cat?.id}
                >
                  {cat?.attributes?.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText id="simple-select" sx={{ color: "#D32E2F" }}>
              {errors['category_id'] ? errors['category_id'].message : ''}
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ m: 1, width: '100%' }}>
            <Button
              onClick={() => setDialogOpen(true)}
              variant="outlined"
              sx={{ py: 2 }}
            >
              Add Category <AddCircleIcon />
            </Button>
          </FormControl>

          <FormControl sx={{ m: 1, width: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={handleDateChange}
                  />
                    <FormHelperText id="simple-select" sx={{ color: "#D32E2F" }}>
                      {errors['date'] ? errors['date'].message : ''}
                    </FormHelperText>
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>

          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            loading={submitting}
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </LoadingButton>
        </Box>

        <CreateCategoryDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          section={title}
          categories={categories}
        />
      </Wrapper>
    </Modal>
  );
}
