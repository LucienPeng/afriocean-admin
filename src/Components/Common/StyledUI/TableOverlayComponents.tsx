import { CircularProgress, Stack, Typography } from '@mui/material';

export const LoadingOverlay = () => {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" my={10}>
      <CircularProgress color="secondary" />
    </Stack>
  );
};

export const NoRowsOverlay = () => {
  return (
    <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" my={5}>
      <Typography>Désolé, pas de résultat trouvé.</Typography>
    </Stack>
  );
};
