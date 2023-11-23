import { Avatar, Button, Grid, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { authActions } from '../Store/Auth/auth-slice';
import { useNavigate } from 'react-router-dom';
import { useUserRedux } from '../useUserRedux';
import { useFirebaseDB } from '../useFirebaseDB';
import { doc, getDoc } from '@firebase/firestore';
import { Copyright } from '../Components/Common/CopyRight';
import { useHandleActionResultAlert } from '../Utils/useHandleActionResultAlert';
import { useHandleLoading } from '../Utils/useHandleLoading';
import { useDeviceMetadata } from '../Components/Common/DeviceMetadataProvider';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface SignInFormModel {
  readonly email: string;
  readonly password: string;
}

const DEFAULT_FORM_VALUES = {
  email: '',
  password: '',
};

const BACKGROUND_IMAGE =
  'url(https://images.pexels.com/photos/18189731/pexels-photo-18189731.jpeg?auto=compress&cs=tinysrgb&w=1600)';

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
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: BACKGROUND_IMAGE,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          ...(isMobileView && {
            backgroundImage: BACKGROUND_IMAGE,
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'multiply',
            backgroundColor: 'secondary.light',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }),
        }}
      >
        <Stack direction="column" justifyContent="center" alignItems="center" height="100%" spacing={5} sx={{ mx: 4 }}>
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
                  onChange={onChange}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
              href="#"
              variant={isMobileView ? 'body1' : 'body2'}
              color={isMobileView ? 'common.white' : 'inherit'}
              alignSelf={isMobileView ? 'end' : 'start'}
            >
              Forgot password?
            </Link>
          </Stack>
          <LoadingSpinner />
          <Copyright fontColor={isMobileView ? 'common.white' : ''} />
        </Stack>
      </Grid>
    </Grid>
  );
}
