import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { MaterialModel } from '../../../model/material.model';
import { MuiFileInput } from 'mui-file-input';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';

interface MaterialItemFormPhotoControllerProps {
  readonly disabled: boolean;
  readonly file: File | null;
  readonly previewURL: string;
  readonly setFile: (file: File | null) => void;
  readonly setPreviewURL: (previewURL: string) => void;
}

export const MaterialItemFormPhotoController = (props: MaterialItemFormPhotoControllerProps) => {
  const { file, previewURL, disabled, setFile, setPreviewURL } = props;
  const { control } = useFormContext<MaterialModel>();

  const handleFileChange = (newValue: File | null) => {
    const file = newValue;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFile(file);
    } else {
      setPreviewURL('');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewURL('');
  };

  return (
    <Grid item xs={12} sm={6}>
      <Stack alignItems="center" spacing={1}>
        <Typography color="text.primary">Photo</Typography>
        <Box maxHeight="300px" maxWidth="200px" component="img" src={previewURL} />
        <Controller
          name="photo"
          control={control}
          defaultValue={''}
          render={() => (
            <MuiFileInput
              disabled={disabled}
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Sélétionner une image"
              InputProps={{
                inputProps: {
                  accept: 'image/*',
                },
                startAdornment: <AttachFileIcon />,
                endAdornment: (
                  <IconButton onClick={handleRemoveFile} disabled={disabled}>
                    <CancelIcon />
                  </IconButton>
                ),
              }}
              value={file}
              onChange={handleFileChange}
            />
          )}
        />
      </Stack>
    </Grid>
  );
};
