import { useEffect, useState } from "react";

export default function useMode(key: string) {
  const [isMode, setMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === key && document.activeElement?.tagName === 'BODY') {
        e.preventDefault();
        setMode(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if(e.key === key) {
        setMode(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return [ isMode ];
}