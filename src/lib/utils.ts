import { Category } from '@/types';

/**
 * Retrieves an array of categories.
 *
 * @return {Category[]} The array of categories.
 */
export const getCategories = (): Category[] => {
  return [
    {
      name: '카테고리 1',
      level: 0,
      color: 'red',
    },
    {
      name: '카테고리 2',
      level: 1,
      color: 'blue',
    },
    {
      name: '카테고리 3',
      level: 2,
      color: 'red',
    },
    {
      name: '카테고리 4',
      level: 1,
      color: 'red',
    },
    {
      name: '카테고리 5',
      level: 0,
      color: 'red',
    },
    {
      name: '카테고리 6',
      level: 1,
      color: 'red',
    },
  ];
};
