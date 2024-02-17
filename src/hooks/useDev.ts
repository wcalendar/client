import { useCallback } from "react";

export default function useDev() {
  const isDev = useCallback(() => {
    const dev = typeof window !== 'undefined' && localStorage.getItem('dev');
    return dev && dev === '0612';
  }, []);

  return {
    isDev,
  };
}