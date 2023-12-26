import { StyledPaper } from './StyledUI/StyledPaper';
import { ReactNode } from 'react';

export const PageSection = ({ children }: { children: ReactNode }) => {
  return (
    <StyledPaper
      sx={{
        my: { xs: 3, md: 6 },
        p: { xs: 2, md: 3 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        //minHeight: 350,
      }}
    >
      {children}
    </StyledPaper>
  );
};
