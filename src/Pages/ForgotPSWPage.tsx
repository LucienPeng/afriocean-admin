import { Avatar, Button, IconButton, Stack, TextField } from '@mui/material';
import { UserLoginLayout } from '../Components/Common/UserLoginLayout';
import { ChangeEvent, useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useHandleActionResultAlert } from '../Utils/useHandleActionResultAlert';
import { useHandleLoading } from '../Utils/useHandleLoading';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

export default function ForgotPSWPage() {
  const [email, setEmail] = useState('');
  const { setErrorMessage, ErrorMessageAlert, setSuccessMessage, ActionSuccessAlert } = useHandleActionResultAlert();
  const { setIsLoading, LoadingSpinner } = useHandleLoading();
  const navigate = useNavigate();
  const isEmailCorrect = !email.includes('@');

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const sendResetPasswordMail = () => {
    setIsLoading(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccessMessage('Un mail a été envoyé');
        setIsLoading(false);
        setEmail('');
        return null;
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message);
        setEmail('');
      });
  };

  return (
    <UserLoginLayout>
      <Stack spacing={2} width="100%">
        <TextField
          value={email}
          error={isEmailCorrect && email.length !== 0}
          variant="outlined"
          onChange={onChangeHandler}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          sx={{
            '.MuiInputBase-input': {
              backgroundColor: '#fff',
            },
          }}
        />
        <Button
          disabled={isEmailCorrect || email.length === 0}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={sendResetPasswordMail}
        >
          Send Reset Email
        </Button>
        <Stack my={3} spacing={3} justifyContent="center" alignItems="center">
          <LoadingSpinner />
          <ActionSuccessAlert />
          <ErrorMessageAlert />
          <IconButton onClick={() => navigate('/')}>
            <Avatar sx={{ bgcolor: 'primary.main', color: 'common.white' }}>
              <ArrowBackIosNewIcon />
            </Avatar>
          </IconButton>
        </Stack>
      </Stack>
    </UserLoginLayout>
  );
}
