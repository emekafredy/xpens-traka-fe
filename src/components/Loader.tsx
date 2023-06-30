import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Loader:FC = () => {
  return (
    <Box
      textAlign="center"
      paddingTop="20rem"
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}
