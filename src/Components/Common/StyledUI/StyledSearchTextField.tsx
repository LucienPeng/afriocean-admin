import { StyledTextField } from './StyledTextField';
import { IconButton, InputAdornment, useTheme } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface SearchBarProps {
  readonly id: string;
  readonly keywords: string;
  readonly placeholder: string;
  readonly setKeywords: (keywords: string) => void;
  readonly onKeyDownHandler?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const StyledSearchTextField = (props: SearchBarProps) => {
  const { id, keywords, placeholder, onKeyDownHandler, setKeywords } = props;
  const theme = useTheme();

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setKeywords(event.target.value),
    [setKeywords],
  );
  const resetKeywordsHandler = () => setKeywords('');

  return (
    <StyledTextField
      autoComplete="off"
      inputRef={(input) => input && input.focus()}
      fullWidth
      id={id}
      value={keywords}
      placeholder={placeholder}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: keywords.length !== 0 && (
          <InputAdornment position="end">
            <IconButton onClick={resetKeywordsHandler} sx={{ padding: 0, marginRight: '12px' }}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: `${theme.palette.grey['800']}`,
          },
        },
        '& .MuiInputBase-root': {
          paddingRight: 0,
        },
        '& .MuiInputBase-input': {
          fontSize: '16px',
        },
      }}
    />
  );
};
