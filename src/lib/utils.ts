import { Category } from '@/types';
import time from './time';

/**
 * Retrieves an array of categories.
 *
 * @return {Category[]} The array of categories.
 */
export const getCategories = (): Category[] => {
  return [
    {
      categoryId: 1,
      categoryName: '카테고리 1',
      categoryLevel: 0,
      categoryColor: 'red',
      categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
      categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
      categoryDescription: '하하',
      categoryVisible: true,
    },
    {
      categoryId: 4,
      categoryName: '카테고리 1-1',
      categoryLevel: 1,
      categoryColor: 'red',
      categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
      categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
      categoryDescription: '하하',
      categoryVisible: true,
    },
    {
      categoryId: 5,
      categoryName: '카테고리 1-1-1',
      categoryLevel: 2,
      categoryColor: 'red',
      categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
      categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
      categoryDescription: '하하',
      categoryVisible: true,
    },
    {
      categoryId: 2,
      categoryName: '카테고리 2',
      categoryLevel: 0,
      categoryColor: 'blue',
      categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
      categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
      categoryDescription: '하하',
      categoryVisible: true,
    },
    {
      categoryId: 3,
      categoryName: '카테고리 3',
      categoryLevel: 0,
      categoryColor: 'green',
      categoryStartDate: time.toString(time.new(2024, 0), 'YYYY-MM-DD'),
      categoryEndDate: time.toString(time.new(2099, 0), 'YYYY-MM-DD'),
      categoryDescription: '하하',
      categoryVisible: true,
    },
  ];
};
