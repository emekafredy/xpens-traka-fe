import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { addCommasToNumbers } from '../lib/utils';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#48018A",
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
interface IRecenttransactionsProps {
  recentTransactions?: {
    transactionId: string;
    amount: number | string;
    transactionType: string;
    date: string;
    category: string;
  }[];
}

export const RecentTransactions:FC<IRecenttransactionsProps> = ({
  recentTransactions
}) => {
  return (
    <TableContainer style={{ borderRadius: "0px", marginBottom: "5rem" }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">AMOUNT</StyledTableCell>
            <StyledTableCell align="right">TYPE</StyledTableCell>
            <StyledTableCell align="right">DATE</StyledTableCell>
            <StyledTableCell align="right">CATEGORY</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentTransactions?.map(tr => (
            <StyledTableRow key={tr.transactionId}>
              <StyledTableCell component="th" scope="row">{tr.transactionId}</StyledTableCell>
              <StyledTableCell align="right"> {addCommasToNumbers(tr.amount)} </StyledTableCell>
              <StyledTableCell align="right"> {tr.transactionType} </StyledTableCell>
              <StyledTableCell align="right"> {tr.date} </StyledTableCell>
              <StyledTableCell align="right"> {tr.category} </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
