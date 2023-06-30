import { FC } from 'react';
import {
  Typography,
  Box,
  styled
} from '@mui/material';

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


// interface IDashboardProps {
//   setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   setSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

export const Dashboard:FC = () => {
  return (
    <Wrapper>
      <TypographyHeader>
        Dashboard OOOO
      </TypographyHeader>
    </Wrapper>
  );
}
