import { FC, useEffect } from 'react';
import {
  Box,
  Typography,
  styled
} from '@mui/material';
import { TransactionSummaries } from '../../components/TransactionSummaries';
import { RecentTransactions } from '../../components/RecentTransactions';
import { useSelector } from 'react-redux';
import { getUserAuthState } from '../../store/slices/user';

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

export const Dashboard:FC = () => {
  const { user } = useSelector(getUserAuthState);

  useEffect(() => {
    user
  }, [user?.attributes?.recentTransactions]);

  return (
    <Wrapper>
      <TransactionSummaries user={user} />
      <Typography fontWeight="bold">
        Recent Transactions
      </Typography>
      <RecentTransactions recentTransactions={user?.attributes?.recentTransactions}/>
    </Wrapper>
  );
}
