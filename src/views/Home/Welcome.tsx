import { FC } from 'react';
import {
  Typography,
  Box,
  Divider,
  Grid,
  styled
} from '@mui/material';
import { Button } from '../../components/Button';

const Wrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  // backgroundImage: "linear-gradient(to right, #FFFAF0, #FFFFFF, #FFFAF0)",
  height: "80vh",
  width: "100%",
  paddingTop: "15rem",
  [theme.breakpoints.down("md")]: {
    paddingTop: "15rem",
  },
  [theme.breakpoints.up("lg")]: {
    paddingTop: "20rem",
  },
}));


const TypographyHeader = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "5em",
  fontWeight: "bold",
  fontFamily: "revert",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "5em",
  },
}));

const TypographyBody = styled(Box)(({ theme }) => ({
  textAlign: "center",
  fontSize: "1.3em",
  fontFamily: "monospace",
  fontStyle: "italic",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.3em",
  },
}));

interface IWelcomeProps {
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Welcome:FC<IWelcomeProps> = ({
  setLoginModalOpen,
  setSignUpModalOpen
}) => {
  return (
    <Wrapper>
      <TypographyHeader>
        Xpens Traka
      </TypographyHeader>
      <Divider />
      <TypographyBody>
        Keep Track of Your Financial Transactions (Incomes, Expenses and Budgets)
      </TypographyBody>

      <Grid container justifyContent="center" spacing={2} mt={2}>
        <Grid item>
          <Button
            label="Login"
            bgColor='#9C27B0'
            onClick={() =>  setLoginModalOpen(true)}
          />
        </Grid>

        <Grid item>
          <Button
            label="Create Account"
            onClick={() =>  setSignUpModalOpen(true)}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
}
