import {
  AppBar,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { useFirebase } from '../../useFirebase';
import { useHandleActionResultAlert } from '../../Utils/useHandleActionResultAlert';
import { useHandleLoading } from '../../Utils/useHandleLoading';
import { useUserRedux } from '../../useUserRedux';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment, { Moment } from 'moment';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';

export interface DeplacementFormModel {
  readonly requestDate: Moment | string;
  readonly absenceStartTime: Moment | string;
  readonly absenceEndTime: Moment | string;
  readonly motif: motif;
  readonly destination?: string;
}

type motif = 'En mission' | 'Cours prives';
const motifs: motif[] = ['En mission', 'Cours prives'];

const DEFAULT_FORM_VALUES: DeplacementFormModel = {
  requestDate: moment(),
  absenceStartTime: moment(),
  absenceEndTime: moment(),
  motif: 'Cours prives',
  destination: '',
};

export const DemandeDeplacement = () => {
  const { db } = useFirebase();
  const { profile } = useUserRedux();
  const { errorMessage, successMessage, setErrorMessage, setSuccessMessage, ErrorMessageAlert, ActionSuccessAlert } =
    useHandleActionResultAlert();
  const { isLoading, setIsLoading, LoadingSpinner } = useHandleLoading();
  const { control, watch, reset, getValues, handleSubmit } = useForm<DeplacementFormModel>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const isEnMission = watch('motif') === 'En mission';

  const handleCancel = () => reset(DEFAULT_FORM_VALUES);
  const createUserHandler = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const { requestDate, absenceEndTime, absenceStartTime, motif, destination } = getValues();
    await addDoc(collection(db, 'Admin/Demande/Deplacement'), {
      firstName: profile?.firstName,
      email: profile?.email,
      department: profile?.department,
      requestDate: String(requestDate),
      absenceEndTime: String(absenceEndTime),
      absenceStartTime: String(absenceStartTime),
      destination,
      motif,
    })
      .then((res) => {
        reset(DEFAULT_FORM_VALUES);
        setIsLoading(false);
        setErrorMessage('');
        setSuccessMessage('Demande envoyée');
        return res;
      })
      .catch((error) => {
        setIsLoading(false);
        setSuccessMessage('');
        setErrorMessage(error.message);
      });
  };

  return (
    <Stack>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Demande de déplacement
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Grid container rowSpacing={3} columnSpacing={1}>
            <Grid item xs={12}>
              <Controller
                name="requestDate"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      label="Date de demande"
                      value={value}
                      onChange={onChange}
                      format={'DD.MM.YYYY'}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="absenceStartTime"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      label="ABSENSE A PARTIR DU"
                      value={value}
                      onChange={onChange}
                      format={'DD.MM.YYYY HH:mm'}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="absenceEndTime"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      label="ABSENSE TERMINE AU (PRÉVUE)"
                      value={value}
                      onChange={onChange}
                      format={'DD.MM.YYYY HH:mm'}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="motif"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth margin="none">
                    <InputLabel id="role-label">Motif</InputLabel>
                    <Select variant="outlined" fullWidth labelId="role" id="role" onChange={onChange} value={value}>
                      {motifs.map((motif) => (
                        <MenuItem key={motif} value={motif}>
                          {motif}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {isEnMission && (
                <Controller
                  name="destination"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <StyledTextField
                      fullWidth
                      onChange={onChange}
                      variant="outlined"
                      margin="normal"
                      required
                      id="destination"
                      label="destination"
                      value={value}
                    />
                  )}
                />
              )}
            </Grid>
          </Grid>
          {isLoading ? (
            <LoadingSpinner />
          ) : successMessage.length !== 0 ? (
            <ActionSuccessAlert />
          ) : errorMessage.length !== 0 ? (
            <ErrorMessageAlert />
          ) : null}
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleCancel} color="error">
              cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit(createUserHandler)}>
              save
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Stack>
  );
};
