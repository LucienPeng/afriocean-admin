import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';
import { useFirebase } from '../../useFirebase';
import { useHandleActionResultAlert } from '../../Utils/useHandleActionResultAlert';
import { useHandleLoading } from '../../Utils/useHandleLoading';
import { useUserRedux } from '../../useUserRedux';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment, { Moment } from 'moment';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';
import { ApplicationModel, Applications, DATE_TIME_FORMAT } from '../../model/application.model';
import { useMutation } from 'react-query';
import { StyledPaper } from '../Common/StyledUI/StyledPaper';
import { StyledTitle } from '../Common/StyledUI/StyledTitle';
import { StyledAppBar } from '../Common/StyledUI/StyledAppBar';
export interface DeplacementFormModel extends ApplicationModel {
  readonly absenceStartTime: Moment | string;
  readonly absenceEndTime: Moment | string;
  readonly motif: motif;
  readonly destination?: string;
}

type motif = 'En mission' | 'Cours prives';
const motifs: motif[] = ['En mission', 'Cours prives'];

const DEFAULT_FORM_VALUES: DeplacementFormModel = {
  applicationType: Applications.Deplacement,
  requestDate: moment(),
  absenceStartTime: moment(),
  absenceEndTime: moment(),
  motif: 'Cours prives',
  destination: '',
};

export const DeplacementForm = () => {
  const { setFirebaseData } = useFirebase();
  const { profile } = useUserRedux();
  const { errorMessage, successMessage, setErrorMessage, setSuccessMessage, ErrorMessageAlert, ActionSuccessAlert } =
    useHandleActionResultAlert();
  const { isLoading, setIsLoading, LoadingSpinner } = useHandleLoading();
  const { control, watch, reset, getValues, handleSubmit } = useForm<DeplacementFormModel>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const isEnMission = watch('motif') === 'En mission';
  const createNewUser = (newData: unknown) => setFirebaseData('Application', newData);
  const addNewUserMutation = useMutation(createNewUser);

  const handleCancel = () => reset(DEFAULT_FORM_VALUES);
  const createUserHandler = async () => {
    setIsLoading(true);
    const { requestDate, absenceEndTime, absenceStartTime, motif, destination, applicationType } = getValues();
    try {
      await addNewUserMutation.mutateAsync({
        isProcessed: false,
        isApproved: null,
        applicationType,
        firstName: profile?.firstName,
        email: profile?.email,
        department: profile?.department,
        requestDate: String(requestDate),
        absenceEndTime: String(absenceEndTime),
        absenceStartTime: String(absenceStartTime),
        destination,
        motif,
      });
      reset(DEFAULT_FORM_VALUES);
      setIsLoading(false);
      setErrorMessage('');
      setSuccessMessage('Demande envoyée');
    } catch (error) {
      setIsLoading(false);
      setSuccessMessage('');
      setErrorMessage("Demande n'est pas envoyée à cause des certains raisons");
    }
  };

  const getDurationInHours = (endDateTime: Moment, startDateTime: Moment) => {
    const duration = moment.duration(endDateTime.diff(startDateTime));
    const hours = duration.asHours();
    return hours;
  };
  return (
    <Stack>
      <StyledAppBar>
        <Toolbar>
          <StyledTitle>Demande de déplacement</StyledTitle>
        </Toolbar>
      </StyledAppBar>
      <Container maxWidth="sm">
        <StyledPaper
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
                      format={DATE_TIME_FORMAT}
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
                      format={DATE_TIME_FORMAT}
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
                      format={DATE_TIME_FORMAT}
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
            <Grid item xs={12}>
              <Typography color="text.primary" textAlign="center">
                {`Absence temps en total : ${getDurationInHours(
                  watch('absenceEndTime') as Moment,
                  watch('absenceStartTime') as Moment,
                )} hr`}
              </Typography>
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
        </StyledPaper>
      </Container>
    </Stack>
  );
};
