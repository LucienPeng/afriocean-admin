import { Typography } from '@mui/material';

export const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" my={1}>
      {`Copyright © AFRIOCEAN ${new Date().getFullYear()}`}
    </Typography>
  );
};
