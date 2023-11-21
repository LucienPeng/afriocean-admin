import { Container, Stack, Toolbar } from '@mui/material';
import { StyledPaper } from './Common/StyledUI/StyledPaper';
import { StyledTitle } from './Common/StyledUI/StyledTitle';
import { StyledAppBar } from './Common/StyledUI/StyledAppBar';



export const ApplicationsNavigation = () => {
  return (
    <Stack>
      <StyledAppBar>
        <Toolbar>
          <StyledTitle>Demandes</StyledTitle>
        </Toolbar>
      </StyledAppBar>
      <Container maxWidth="lg">
        <StyledPaper
          elevation={0}
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}
        ></StyledPaper>
      </Container>
    </Stack>
  );
};
