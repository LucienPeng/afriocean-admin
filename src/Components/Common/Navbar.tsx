import { Badge, IconButton, Stack, Toolbar, Typography, styled } from '@mui/material';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import { useAuthActions } from '../../Store/Auth/auth-actions';
import { useUserRedux } from '../../useUserRedux';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useDeviceMetadata } from './DeviceMetadataProvider';

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const Navbar = (props: { setIsOpen: (isOpen: boolean) => void }) => {
  const { setIsOpen } = props;
  const { signOutHandler } = useAuthActions();
  const { displayName } = useUserRedux();
  const { isMobileView } = useDeviceMetadata();
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isMobileView ? (
          <Stack direction="row" justifyContent="space-between" width="100%">
            <IconButton onClick={() => setIsOpen(true)}>
              <MenuIcon sx={{ color: 'common.white' }} />
            </IconButton>
            <IconButton color="inherit" onClick={signOutHandler}>
              <LogoutIcon />
            </IconButton>
          </Stack>
        ) : (
          <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
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
                Hi {displayName}
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
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};
