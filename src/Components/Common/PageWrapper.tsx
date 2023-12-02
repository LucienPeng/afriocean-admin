import { Avatar, Breakpoint, Container, IconButton, Stack, Toolbar, useTheme } from '@mui/material';
import { StyledTitle } from './StyledUI/StyledTitle';
import { StyledAppBar } from './StyledUI/StyledAppBar';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
interface PageWrapperProps {
  readonly icon?: ReactNode;
  readonly children: ReactNode;
  readonly componentName: string;
  readonly containerMaxWidth: string;
}

export const PageWrapper = (props: PageWrapperProps) => {
  const { children, icon, componentName, containerMaxWidth } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Stack>
      <StyledAppBar>
        <Toolbar>
          <Stack width="100%" direction="row" alignItems="center" spacing={2}>
            <IconButton
              size="small"
              sx={{ bgcolor: theme.palette.grey[200] }}
              aria-label="retun-to-previous-Page"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.main', color: 'common.white' }} variant="rounded">
                {icon}
              </Avatar>
              <StyledTitle>{componentName}</StyledTitle>
            </Stack>
          </Stack>
        </Toolbar>
      </StyledAppBar>
      <Container maxWidth={containerMaxWidth as Breakpoint}>{children}</Container>
    </Stack>
  );
};
