import { useCallback, useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  const handleChange = useCallback(() => {
    setMatches(getMatches(query));
  }, [query]);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [handleChange, query]);

  return matches;
}
