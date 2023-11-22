import { TableRow, styled } from '@mui/material';

export const StyledTableRow = styled(TableRow)`
  && {
    td {
      border: none; /* Remove borders for all other rows */
    }
  }
`;
