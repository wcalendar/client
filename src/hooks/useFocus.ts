import { useRef } from 'react';

export const useFocus = () => {
  const categoryRef = useRef<HTMLLIElement | null>(null);

  const focusItem = () => {
    if (categoryRef.current) {
      categoryRef.current.focus();
    }
  };

  return { categoryRef, focusItem };
};
