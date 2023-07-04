import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { RecentsChart } from './RecentsChart';
import { UserObject } from '../interfaces/user';

interface ITransactionSummariesProps {
  user?: UserObject;
}

export const TransactionSummaries:FC<ITransactionSummariesProps> = ({ user }) => {
  return (
    <Box style={{ marginBottom: '2rem' }}>
      <Grid
        container
        columnGap={2}
      >
        <Grid item xs={5.5} sx={{ mr: 8 }}>
          <RecentsChart
            title="Income"
            chartData={user?.attributes?.monthlyGrouped?.incomes || []}
          />
        </Grid>

        <Grid item xs={5.5}>
          <RecentsChart
            title="Expense"
            chartData={user?.attributes?.monthlyGrouped?.expenses || []}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
