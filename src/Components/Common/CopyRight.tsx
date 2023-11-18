import { Typography } from '@mui/material';

export const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" mt={5}>
      {`Copyright © AFRIOCEAN ${new Date().getFullYear()}`}
    </Typography>
  );
};
