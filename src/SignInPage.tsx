import { useState } from 'react';
import { Alert, Avatar, Button, Collapse, Grid, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import { AuthError, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Controller, useForm } from 'react-hook-form';

interface SignInFormModel {
  readonly email: string;
  readonly password: string;
}

const DEFAULT_FORM_VALUES = {
  email: '',
  password: '',
};

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const { control, getValues, handleSubmit } = useForm<SignInFormModel>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const submitSignInForm = () => {
    const { email, password } = getValues();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setErrorMessage('');
        return user;
      })
      .catch((error: AuthError) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://images.pexels.com/photos/18189731/pexels-photo-18189731.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Stack direction="column" justifyContent="space-around" alignItems="center" height="100%" sx={{ mx: 4 }}>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Sign in</Typography>
          </Stack>

          <Stack spacing={2} width="100%">
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

            {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(submitSignInForm)}
            >
              Sign In
            </Button>

            <Collapse in={!!errorMessage}>
              <Alert severity="error">{errorMessage}</Alert>
            </Collapse>

            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Stack>
          <Copyright />
        </Stack>
      </Grid>
    </Grid>
  );
}

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" mt={5}>
      {`Copyright © AFRIOCEAN ${new Date().getFullYear()}`}
    </Typography>
  );
};
