import { Badge, IconButton, Stack, Toolbar, Typography, styled } from '@mui/material';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthActions } from '../../Store/Auth/auth-actions';
import { useUserRedux } from '../../useUserRedux';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const Navbar = () => {
  const { signOutHandler } = useAuthActions();
  const { userProfile } = useUserRedux();
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          component="img"
          src="https://i.imgur.com/1UpdxEV.png"
          alt="logo"
          height={40}
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer', flexGrow: 0, display: { xs: 'none', sm: 'block' } }}
        />
        <Stack direction="row" spacing={1.5} justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Hi {userProfile?.firstName}
          </Typography>
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
