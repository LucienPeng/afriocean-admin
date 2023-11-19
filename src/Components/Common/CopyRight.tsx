import { Typography } from '@mui/material';

export const Copyright = (props: { fontColor?: string }) => {
  return (
    <Typography variant="body2" color={props.fontColor || 'text.secondary'} align="center" my={1}>
      {`Copyright © AFRIOCEAN ${new Date().getFullYear()}`}
    </Typography>
  );
};
