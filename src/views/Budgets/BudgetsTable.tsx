import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box, styled } from '@mui/material';
import { getAllTransactionsState } from '../../store/slices/transaction';
import { CommonTable } from '../../components/Table';

const Wrapper = styled(Box)(() => ({
  marginBottom: "10rem"
}));

interface IBudgetsTableProps {
  page: number;
  handleChange: (e: any, v: number) => void;
}

export const BudgetsTable:FC<IBudgetsTableProps> = ({
  page,
  handleChange
}) => {
  const { transactions } = useSelector(getAllTransactionsState);

  return (
    <Wrapper>
      <CommonTable
        data={transactions}
        isPaginated={true}
        page={page}
        handleChange={handleChange}
      />
    </Wrapper>
  );
};
