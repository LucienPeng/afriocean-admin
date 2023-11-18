import { Badge, IconButton, Stack, Toolbar, Typography, styled } from '@mui/material';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthActions } from '../../Store/Auth/auth-actions';

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const Navbar = () => {
  const { signOutHandler } = useAuthActions();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={signOutHandler}>
            <LogoutIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
