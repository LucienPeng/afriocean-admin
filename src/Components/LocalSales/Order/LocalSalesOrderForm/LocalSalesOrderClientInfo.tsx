import { LocalSalesCustomer, LocalSalesOrder } from '../../../../model/localSales.model';
import { Grid, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useFormContext } from 'react-hook-form';
import { useDeviceMetadata } from '../../../Common/DeviceMetadataProvider';
import { parseISO } from 'date-fns';
import fr from 'date-fns/locale/fr';

export const LocalSalesOrderClientInfo = (props: { customer: LocalSalesCustomer; orderId: string }) => {
  const { customer, orderId } = props;
  const { isMobileView } = useDeviceMetadata();
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext<LocalSalesOrder>();

  const handleCustomChange = (value: Date | null) => {
    if (value) {
      setValue('date', value.toISOString());
    }
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={isMobileView ? 2 : 4}>
        <Grid item xs={12}>
          <Grid container spacing={isMobileView ? 2 : 1}>
            <Grid item xs={12} sm={6}>
              <Typography color="text.primary" fontWeight={700}>
                Nº commande :
                <Typography color="text.primary" fontWeight={700} component="span">
                  {' '}
                  {orderId}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
              <Typography color="text.primary" fontWeight={700}>
                Date de commande :
              </Typography>
              <Controller
                name="date"
                control={control}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      slotProps={{
                        textField: {
                          required: true,
                          error: !!errors.date,
                        },
                      }}
                      label="Date de naissance"
                      value={parseISO(value)}
                      onChange={(newValue) => handleCustomChange(newValue)}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item container spacing={1}>
            <Grid item xs={12} sm={3}>
              <Typography color="text.primary" fontWeight={700}>
                Client :
                <Typography color="text.primary" component="span">
                  {' '}
                  {`${customer?.firstName} ${customer?.lastName}`}
                </Typography>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography color="text.primary" fontWeight={700}>
                Nº identité :
                <Typography color="text.primary" component="span">
                  {' '}
                  {customer?.id}
                </Typography>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography color="text.primary" fontWeight={700}>
                Tel (1) :
                <Typography color="text.primary" component="span">
                  {' '}
                  {customer?.phone1}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography color="text.primary" fontWeight={700}>
                Tel (2) :
                <Typography color="text.primary" component="span">
                  {' '}
                  {customer?.phone2}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid item container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography color="text.primary" fontWeight={700}>
                Email :
                <Typography color="text.primary" component="span">
                  {' '}
                  {customer?.email}
                </Typography>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.primary" fontWeight={700}>
                Adress :
                <Typography color="text.primary" component="span">
                  {' '}
                  {customer?.address}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
