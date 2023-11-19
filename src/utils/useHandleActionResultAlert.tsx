import { Alert, Collapse } from '@mui/material';
import { useState } from 'react';

export const useHandleActionResultAlert = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const ErrorMessageAlert = () => {
    return (
      <Collapse in={!!errorMessage}>
        <Alert severity="error">{errorMessage}</Alert>
      </Collapse>
    );
  };

  const ActionSuccessAlert = () => {
    return (
      <Collapse in={!!successMessage}>
        <Alert severity="success">{successMessage}</Alert>
      </Collapse>
    );
  };

  return { errorMessage, successMessage, setSuccessMessage, setErrorMessage, ErrorMessageAlert, ActionSuccessAlert };
};
