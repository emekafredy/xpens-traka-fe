import { FC, useState } from 'react';
import {
  Box,
  Typography,
  styled,
  Button
} from '@mui/material';
import { userTransactions } from '../../hooks/transaction';
import { Loader } from '../../components/Loader';
import { BudgetsTable } from './BudgetsTable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CreateBudgetModal } from './CreateBudgetModal';

const Wrapper = styled(Box)(({ theme }) => ({
  paddingTop: "8rem",
  width: "90%",
  margin: "auto",
  [theme.breakpoints.down("md")]: {
    paddingTop: "8rem",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    paddingTop: "8rem",
    width: "90%",
  },
}));

export const Budgets:FC = () => {
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
                color: "#1876D1",
                fontSize: "1.1rem"
              }}
            >
              Add {path} {'  '} <AddCircleIcon />
            </Button>
          </Box>
          <BudgetsTable
            page={page}
            handleChange={handleChange}
          />
        </>
      )}
      <CreateBudgetModal
        open={createTransactionModalOpen}
        setOpen={setCreateTransactionModalOpen}
        title={path}
      />
    </Wrapper>
  );
}
