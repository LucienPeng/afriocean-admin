import { useState } from 'react';
import { useDebounce } from './useDebounce';

export const useSearchKeywords = () => {
  const [keywords, setKeywords] = useState<string>('');
  const throttledValue = useDebounce(keywords, 500);

  return { throttledValue, keywords, setKeywords };
};
