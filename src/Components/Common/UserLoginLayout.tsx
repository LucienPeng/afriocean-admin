import { Grid, Paper, Stack } from '@mui/material';
import { Copyright } from './CopyRight';
import { useDeviceMetadata } from './DeviceMetadataProvider';
import { ReactNode } from 'react';

const BACKGROUND_IMAGE =
  'url(https://images.pexels.com/photos/18189731/pexels-photo-18189731.jpeg?auto=compress&cs=tinysrgb&w=1600)';

export const UserLoginLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  const { isMobileView } = useDeviceMetadata();

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: BACKGROUND_IMAGE,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          ...(isMobileView && {
            backgroundImage: BACKGROUND_IMAGE,
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'multiply',
            backgroundColor: 'secondary.light',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }),
        }}
      >
        <Stack direction="column" justifyContent="center" alignItems="center" height="100%" spacing={5} sx={{ mx: 4 }}>
          {children}
          <Copyright fontColor={isMobileView ? 'common.white' : ''} />
        </Stack>
      </Grid>
    </Grid>
  );
};
