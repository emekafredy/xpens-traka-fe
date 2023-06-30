import { FC, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  styled,
  Modal,
  Divider,
  Grid,
  Link,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { signUpUser } from '../../api/auth';
import { setUser, getUserAuthState } from '../../store/slices/user';
import { useSelector, useDispatch } from 'react-redux';
import { renderErrorMessage, renderSuccessMessage } from '../../lib/utils';
import { signUpSchema } from '../../validation/auth';

type SignUpInputs = TypeOf<typeof signUpSchema>;

interface ISignUpModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  openLoginModal: (val: boolean) => void;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
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

export const SignUpModal:FC<ISignUpModalProps> = ({
  open,
  setOpen,
  openLoginModal,
  submitting,
  setSubmitting
}) => {
  const { isAuthenticated } = useSelector(getUserAuthState);
  const dispatch = useDispatch();

  if (isAuthenticated) setOpen(false);
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<SignUpInputs> = async (values) => {
    setSubmitting(true);
    const result = await signUpUser(values)

    if (result.success) {
      await dispatch(
        setUser({
          user: result?.data?.data,
          isAuthenticated: true,
        })
      );
      renderSuccessMessage("User Registration Successful")
      setOpen(false);
      setSubmitting(false);
    } else {
      renderErrorMessage(result.error);
      setSubmitting(false);
    }
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
          Sign Up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            error={!!errors['email']}
            helperText={errors['email'] ? errors['email'].message : ''}
            {...register('email')}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            error={!!errors['username']}
            helperText={errors['username'] ? errors['username'].message : ''}
            {...register('username')}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors['password']}
            helperText={errors['password'] ? errors['password'].message : ''}
            {...register('password')}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="passwordConfirm"
            autoComplete="current-password"
            error={!!errors['passwordConfirm']}
            helperText={
              errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''
            }
            {...register('passwordConfirm')}
          />

          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            loading={submitting}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>

          <Grid>
            Already have an account? 
            <Link
              variant="body2"
              onClick={() => {
                setOpen(false);
                openLoginModal(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {' '} Sign in instead
            </Link>
          </Grid>
        </Box>
      </Wrapper>
    </Modal>
  );
}
