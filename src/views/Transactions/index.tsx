import { FC, useState } from 'react';
import {
  Box,
  Typography,
  styled,
  Button
} from '@mui/material';
import { userTransactions } from '../../hooks/transaction';
import { Loader } from '../../components/Loader';
import { TransactionsTable } from './TransactionsTable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CreateTransactionModal } from './CreateTransactionModal';

const Wrapper = styled(Box)(({ theme }) => ({
  paddingTop: "5rem",
  width: "90%",
  margin: "auto",
  [theme.breakpoints.down("md")]: {
    paddingTop: "5rem",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    paddingTop: "5rem",
    width: "90%",
  },
}));

export const Transactions:FC = () => {
  const [page, setPage] = useState(1);
  const [createTransactionModalOpen, setCreateTransactionModalOpen] = useState<boolean>(false);
  const path = window.location.pathname?.slice(1) || ''
  const { loading } = userTransactions(path, page);

  const handleChange = (_event: any, value: number) => {
    setPage(value);
  };


  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <Typography fontWeight="bold" fontSize="2rem">
              {`${path}s`}
            </Typography>
            <Button
              onClick={() =>  setCreateTransactionModalOpen(true)}
              variant="outlined"
              sx={{
                fontWeight: "bold",
                color: '#9C27B0',
                fontSize: "1.1rem"
              }}
            >
              Add {path} {'  '} <AddCircleIcon />
            </Button>
          </Box>
          <TransactionsTable
            page={page}
            handleChange={handleChange}
          />
        </>
      )}
      <CreateTransactionModal
        open={createTransactionModalOpen}
        setOpen={setCreateTransactionModalOpen}
        title={path}
      />
    </Wrapper>
  );
}
