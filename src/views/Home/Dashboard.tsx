import { FC } from 'react';
import {
  Box,
  styled
} from '@mui/material';
import { TransactionSummaries } from '../../components/TransactionSummaries';
import { RecentTransactions } from '../../components/RecentTransactions';

const Wrapper = styled(Box)(({ theme }) => ({
  height: "80vh",
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
  return (
    <Wrapper>
      <TransactionSummaries />
      <RecentTransactions />
    </Wrapper>
  );
}
