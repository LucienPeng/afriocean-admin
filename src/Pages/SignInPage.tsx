import { Avatar, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { doc, getDoc } from '@firebase/firestore';
import { authActions } from '../Store/Auth/auth-slice';
import { useNavigate } from 'react-router-dom';
import { useUserRedux } from '../useUserRedux';
import { useFirebaseDB } from '../Utils/Firebase/useFirebaseDB';
import { useHandleActionResultAlert } from '../Utils/useHandleActionResultAlert';
import { useHandleLoading } from '../Utils/useHandleLoading';
import { useDeviceMetadata } from '../Components/Common/DeviceMetadataProvider';
import { UserLoginLayout } from '../Components/Common/UserLoginLayout';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface SignInFormModel {
  readonly email: string;
  readonly password: string;
}

const DEFAULT_FORM_VALUES = {
  email: '',
  password: '',
};

export default function SignInPage() {
  const { setErrorMessage, ErrorMessageAlert } = useHandleActionResultAlert();
  const { setIsLoading, LoadingSpinner } = useHandleLoading();
  const { dispatch } = useUserRedux();
  const { db, collection } = useFirebaseDB();
  const { isMobileView } = useDeviceMetadata();

  const { control, reset, getValues, handleSubmit } = useForm<SignInFormModel>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const navigate = useNavigate();

  const submitSignInForm = async () => {
    setIsLoading(true);
    const { email, password } = getValues();
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
        setErrorMessage(error.message);
        return error;
      });
      const docUserRef = doc(collection(db, 'User'), `${userCredential.user.displayName}-${userCredential.user.uid}`);
      const docUserSnap = await getDoc(docUserRef);

      if (docUserSnap.exists()) {
        const userData = docUserSnap.data();
        reset(DEFAULT_FORM_VALUES);
        setErrorMessage('');
        navigate('/');
        setIsLoading(false);
        dispatch(
          authActions.loginSucceed({
            isLoggedIn: true,
            user: userData,
          }),
        );
      } else {
        setIsLoading(false);
        setErrorMessage('Sorry, something went wrong');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Sorry, please check again your email account or password');
    }
  };

  return (
    <UserLoginLayout>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign in</Typography>
      </Stack>
      <Stack component="form" spacing={2} width="100%">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <TextField
              variant="outlined"
              onChange={onChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              sx={{
                '.MuiInputBase-input': {
                  backgroundColor: '#fff',
                },
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <TextField
              onChange={onChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                '.MuiInputBase-input': {
                  backgroundColor: '#fff',
                },
              }}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit(submitSignInForm)}
        >
          Sign In
        </Button>
        <ErrorMessageAlert />
        <Link
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/forgot-password')}
          variant={isMobileView ? 'body1' : 'body2'}
          color={isMobileView ? 'common.white' : 'inherit'}
          alignSelf={isMobileView ? 'end' : 'start'}
        >
          Forgot password?
        </Link>
      </Stack>
      <LoadingSpinner />
    </UserLoginLayout>
  );
}
