import { AppBar } from '@mui/material';
import { ReactNode } from 'react';

export const StyledAppBar = ({ children }: { children: ReactNode }) => {
  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        color: 'text.primary',
        backgroundColor: 'common.white',
        position: 'relative',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      {children}
    </AppBar>
  );
};
