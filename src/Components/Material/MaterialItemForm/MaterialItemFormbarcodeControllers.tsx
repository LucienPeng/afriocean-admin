import { Grid, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { MaterialModel } from '../../../model/material.model';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

export const MaterialItemFormbarcodeControllers = () => {
  const { watch } = useFormContext<MaterialModel>();

  return (
    <Grid item xs={12} sm={6}>
      {watch('itemId') && (
        <Stack spacing={5} alignItems="center">
          <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
            <Typography color="text.primary">QR code</Typography>
            <QRCode value={watch('itemId')} size={80} />
          </Stack>
          <Stack
            width="100%"
            direction="column"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            sx={{ overflow: 'hidden' }}
          >
            <Typography color="text.primary">Barcode</Typography>
            <Barcode value={watch('itemId') ?? ''} width={1} height={30} />
          </Stack>
        </Stack>
      )}
    </Grid>
  );
};
