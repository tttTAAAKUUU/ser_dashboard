import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set the initial value
    setMatches(media.matches);

    // Define a callback function to handle changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener to handle changes
    media.addEventListener('change', listener);

    // Clean up the listener when the component unmounts
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]); // Re-run the effect if the query changes

  return matches;
}