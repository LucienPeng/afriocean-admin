import { CircularProgress, Collapse, SxProps } from '@mui/material';
import { useState } from 'react';

export const useHandleLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const LoadingSpinner = (props: { variant?: SxProps }) => {
    return (
      <Collapse in={isLoading}>
        <CircularProgress color="secondary" sx={props.variant} />
      </Collapse>
    );
  };

  return { isLoading, setIsLoading, LoadingSpinner };
};
