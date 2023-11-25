import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import moment, { Moment } from 'moment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';
import { useFirebaseDB } from '../../../useFirebaseDB';
import { useHandleActionResultAlert } from '../../../Utils/useHandleActionResultAlert';
import { useUserRedux } from '../../../useUserRedux';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledTextField } from '../../Common/StyledUI/StyledTextField';
import { ApplicationModel, Applications, DATE_TIME_FORMAT } from '../../../model/application.model';
import { useMutation } from 'react-query';
import { EmailTemplate, useEmailNotification } from '../../../Utils/useEmailNotification';
import { PageWrapper } from '../../Common/PageWrapper';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { PageSection } from '../../Common/PageSection';

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
  const { profile } = useUserRedux();
  const { control, watch, reset, getValues, handleSubmit } = useForm<DeplacementFormModel>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES,
  });
  const { errorMessage, successMessage, setErrorMessage, setSuccessMessage, ErrorMessageAlert, ActionSuccessAlert } =
    useHandleActionResultAlert();
  const { setFirebaseData } = useFirebaseDB();
  const { sendEmailNotification } = useEmailNotification();

  const sendEmail: (data: EmailTemplate) => Promise<void> = async (params: EmailTemplate) =>
    sendEmailNotification(params);

  const createNewUser = (newData: unknown) => setFirebaseData('Application', newData);

  const { mutate, isLoading: isSending } = useMutation(sendEmail);
  const { mutateAsync, isLoading } = useMutation(createNewUser);

  const cancelHandler = () => reset(DEFAULT_FORM_VALUES);

  const createUserHandler = async () => {
    const { requestDate, absenceEndTime, absenceStartTime, motif, destination, applicationType } = getValues();
    try {
      await mutateAsync({
        uid: profile?.uid,
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
        comment: '',
      });
      mutate({
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        applicationType: Applications.Deplacement,
        submitTime: moment().format(DATE_TIME_FORMAT),
      });
      reset(DEFAULT_FORM_VALUES);
      setErrorMessage('');
      setSuccessMessage('Demande envoyée');
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage("Demande n'est pas envoyée à cause des certains raisons");
    }
  };

  const getDurationInHours = (endDateTime: Moment, startDateTime: Moment) => {
    const duration = moment.duration(endDateTime.diff(startDateTime));
    const hours = duration.asHours();
    return hours;
  };

  const isEnMission = watch('motif') === 'En mission';

  return (
    <PageWrapper icon={<DriveEtaIcon />} componentName="Demande de Déplacement" containerMaxWidth="sm">
      <PageSection>
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
                    label="Absense à partir du"
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
                    label="Absence Termine au (prévu)"
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
                    label="Destination"
                    value={value}
                  />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={700} color="text.primary" textAlign="center">
              {`Absence temps en total : ${getDurationInHours(
                watch('absenceEndTime') as Moment,
                watch('absenceStartTime') as Moment,
              ).toFixed(1)} hr`}
            </Typography>
          </Grid>
        </Grid>
        {isLoading || isSending ? (
          <CircularProgress color="secondary" />
        ) : successMessage.length !== 0 ? (
          <ActionSuccessAlert />
        ) : errorMessage.length !== 0 ? (
          <ErrorMessageAlert />
        ) : null}
        <Stack direction="row" spacing={1} mt={2}>
          <Button variant="contained" onClick={cancelHandler} color="error">
            cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit(createUserHandler)}>
            save
          </Button>
        </Stack>
      </PageSection>
    </PageWrapper>
  );
};
