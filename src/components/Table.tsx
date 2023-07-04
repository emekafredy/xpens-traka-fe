import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Pagination,
  Box,
  Divider
} from '@mui/material';

import { tableCellClasses } from '@mui/material/TableCell';
import { addCommasToNumbers } from '../lib/utils';
import { ITransactionPaginatedProps } from '../interfaces/transaction';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1876D1",
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

interface ICommonTableProps {
  data?: ITransactionPaginatedProps;
  isPaginated: boolean;
  page: number;
  handleChange: (e: any, v: number) => void;
}

export const CommonTable:FC<ICommonTableProps> = ({
  data,
  isPaginated,
  page,
  handleChange
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
          {data?.results?.data?.map(tr => (
            <StyledTableRow key={tr.id}>
              <StyledTableCell component="th" scope="row">{tr?.attributes.transactionId}</StyledTableCell>
              <StyledTableCell align="right"> {addCommasToNumbers(tr?.attributes.amount)} </StyledTableCell>
              <StyledTableCell align="right"> {tr?.attributes.transactionType} </StyledTableCell>
              <StyledTableCell align="right"> {tr?.attributes.date} </StyledTableCell>
              <StyledTableCell align="right"> {tr?.attributes.categoryName} </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Divider />
        {isPaginated && (
            <Box
              sx={{
                  margin: "auto",
                  width: "fit-content",
                  alignItems: "center",
                  textAlign: "center",
                  py: 4
              }}
            >
              <Pagination
                count={data?.meta?.pagination?.total_pages || 0}
                page={page}
                onChange={handleChange} 
                color="primary"
              />
          </Box>
        )}
    </TableContainer>
  );
};
