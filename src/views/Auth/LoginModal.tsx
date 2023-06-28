import { FC } from 'react';
import {
  Modal,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Link,
  styled,
  Divider,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface ILoginModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  openSignUpModal: (val: boolean) => void;
}

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

export const LoginModal:FC<ILoginModalProps> = ({
  open,
  setOpen,
  openSignUpModal
}) => {
  const handleSubmit = (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
          mt={4}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Grid>
            Don't have an account? 
            <Link
              variant="body2"
              onClick={() => {
                setOpen(false)
                openSignUpModal(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {' '} Create one
            </Link>
          </Grid>
        </Box>
      </Wrapper>
    </Modal>
  );
}
