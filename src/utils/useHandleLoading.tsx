import { CircularProgress, Collapse } from '@mui/material';
import { useState } from 'react';

export const useHandleLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const LoadingSpinner = () => {
    return (
      <Collapse in={isLoading}>
        <CircularProgress color="secondary" />
      </Collapse>
    );
  };

  return { isLoading, setIsLoading, LoadingSpinner };
};
