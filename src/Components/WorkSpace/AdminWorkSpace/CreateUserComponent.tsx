import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Department, Profile, Roles } from '../../../model/company.model';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import { useHandleActionResultAlert } from '../../../Utils/useHandleActionResultAlert';
import { useHandleLoading } from '../../../Utils/useHandleLoading';
import { StyledTextField } from '../../Common/StyledUI/StyledTextField';
import { PageWrapper } from '../../Common/PageWrapper';
import { PageSection } from '../../Common/PageSection';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface CreateUserFormModel extends Profile {
  readonly defaultPassword: string;
  readonly role: string;
  readonly department: string;
}

const DEFAULT_FORM_VALUES = {
  email: '',
  defaultPassword: '',
  firstName: '',
  lastName: '',
  role: '',
  department: '',
};

const roles = ['User', 'Administrator'] as Roles[];

const DEPARTMENT_VALUE = Object.values(Department).filter((operation) => isNaN(Number(operation)));

export const CreateUserComponent = () => {
  const { db } = useFirebaseDB();
  const { errorMessage, successMessage, setErrorMessage, setSuccessMessage, ErrorMessageAlert, ActionSuccessAlert } =
    useHandleActionResultAlert();
  const { isLoading, setIsLoading, LoadingSpinner } = useHandleLoading();
  const { control, reset, getValues, handleSubmit } = useForm<CreateUserFormModel>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const handleCancel = () => reset(DEFAULT_FORM_VALUES);
  const createUserHandler = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const auth = getAuth();
    const { email, defaultPassword, firstName, lastName, role, department } = getValues();
    await createUserWithEmailAndPassword(auth, email, defaultPassword)
      .then(async (userCredential) => {
        const newUserInfo = { firstName, lastName, email, department, role, uid: userCredential.user.uid };
        await updateProfile(userCredential.user, {
          displayName: firstName,
        });
        await setDoc(doc(db, 'User', `${firstName}-${userCredential.user.uid}`), newUserInfo);
        reset(DEFAULT_FORM_VALUES);
        setIsLoading(false);
        setErrorMessage('');
        setSuccessMessage('User has been created');
        return userCredential;
      })
      .catch((error) => {
        setIsLoading(false);
        setSuccessMessage('');
        setErrorMessage(error.message);
      });
  };

  return (
    <PageWrapper icon={<PersonAddIcon />} componentName="Create User" containerMaxWidth="sm">
      <PageSection>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <StyledTextField
                  onChange={onChange}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First name"
                  autoComplete="given-name"
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <StyledTextField
                  onChange={onChange}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last name"
                  autoComplete="family-name"
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <StyledTextField
                  onChange={onChange}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="defaultPassword"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <StyledTextField
                  value={value}
                  onChange={onChange}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="defaultPassword"
                  label="Default Password"
                  autoComplete="password"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select variant="outlined" fullWidth labelId="role" id="role" onChange={onChange} value={value}>
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="department"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel id="role-label">Department</InputLabel>
                  <Select
                    variant="outlined"
                    fullWidth
                    labelId="role-label"
                    id="role"
                    onChange={onChange}
                    value={value}
                    label="Department"
                  >
                    {DEPARTMENT_VALUE.map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {isLoading ? (
            <LoadingSpinner />
          ) : successMessage.length !== 0 ? (
            <ActionSuccessAlert />
          ) : errorMessage.length !== 0 ? (
            <ErrorMessageAlert />
          ) : null}
          <Grid item xs={12}>
            <Stack width="100%" direction="row" justifyContent="center" spacing={1}>
              <Button variant="contained" onClick={handleCancel} color="error">
                cancel
              </Button>
              <Button variant="contained" onClick={handleSubmit(createUserHandler)}>
                save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </PageSection>
    </PageWrapper>
  );
};
