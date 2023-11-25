import { Avatar, Breakpoint, Container, IconButton, Stack, Toolbar } from '@mui/material';
import { StyledPaper } from './StyledUI/StyledPaper';
import { StyledTitle } from './StyledUI/StyledTitle';
import { StyledAppBar } from './StyledUI/StyledAppBar';
import { ReactNode } from 'react';
import UndoIcon from '@mui/icons-material/Undo';
import { useNavigate } from 'react-router-dom';
interface PageWrapperProps {
  readonly children: ReactNode;
  readonly icon?: ReactNode;
  readonly componentName: string;
  readonly containerMaxWidth: string;
}

export const PageWrapper = (props: PageWrapperProps) => {
  const { children, icon, componentName, containerMaxWidth } = props;
  const navigate = useNavigate();
  return (
    <Stack>
      <StyledAppBar>
        <Toolbar>
          <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={5} alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.main', color: 'common.white' }} variant="rounded">
                {icon}
              </Avatar>
              <StyledTitle>{componentName}</StyledTitle>
            </Stack>
            <IconButton aria-label="retun-t0-previous-Page" onClick={() => navigate(-1)}>
              <UndoIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </StyledAppBar>
      <Container maxWidth={containerMaxWidth as Breakpoint}>
        <StyledPaper
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '100%',
            //minHeight: 750,
          }}
        >
          {children}
        </StyledPaper>
      </Container>
    </Stack>
  );
};
