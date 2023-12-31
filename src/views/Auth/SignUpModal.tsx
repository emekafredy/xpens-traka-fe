import { FC, useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  styled,
  Modal,
  Divider,
  Grid,
  Link,
  Button
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
import { UserObject } from '../../interfaces/user';
import Avatar from '../../assets/images/avatar.jpeg';

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
  marginTop: "4rem",
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
  const [ imageUrl, setImageUrl ] = useState('');
  const { isAuthenticated } = useSelector(getUserAuthState);
  const dispatch = useDispatch();

  if (isAuthenticated) setOpen(false);
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setValue
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    console.log('ghhhhh', event.target.avatar);
    console.log('filee', file);
    setValue('avatar', file);
    setImageUrl(URL.createObjectURL(file));
  }

  const onSubmitHandler: SubmitHandler<SignUpInputs> = async (values) => {
    setSubmitting(true);
    console.log('values', values);
    const result = await signUpUser(values)

    if (result.success) {
      await dispatch(
        setUser({
          user: result?.data?.data as UserObject,
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
          <Box style={{ textAlign: "center" }}>
            <Box
              component="img"
              sx={{
                height: 200,
                width: 200,
                display: "block",
                textAlign: "center",
                margin: "auto",
                borderRadius: "100%",
                marginBottom: "1rem"
              }}
              alt="user avatar"
              src={imageUrl || Avatar}
            />
            <Button
              variant="contained"
              component="label"
            >
              Select Avatar
              <input
                accept="image/*"
                type="file"
                name="avatar"
                hidden
                onChange={(e) => handleImageChange(e)}
              />
            </Button>
          </Box>

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
