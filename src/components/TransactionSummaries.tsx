import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { InfoCard } from './InfoCard';
import { RecentsChart } from './RecentsChart';

export const TransactionSummaries:FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={4}>
      <Grid container spacing={2}>
        <Grid item xs={7} sx={{ boxShadow: 3 }}>
          <RecentsChart />
        </Grid>
        <Grid item xs={5}>
          <Box height="50%">
            <InfoCard
              title="Problems completed today"
              value={5}
              footer={<div> 24% increase from yesterday </div>}
            />
          </Box>
          <Box height="50%">
            <InfoCard
              title="Total Assignment completed"
              value={`98/130`}
              footer={<div> 8% increase from yesterday </div>}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
