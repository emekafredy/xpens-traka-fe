import { FC } from 'react';
import {Box, Button, Alert} from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FlashNotification:FC<State> = ({
  open,
  setOpen
}: State) => {
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const buttons = (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={handleClick}>
        Top-Right
      </Button>
    </Box>
  );

  return (
    <Box sx={{ width: 500 }}>
      {buttons}
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </Box>
  );
}
