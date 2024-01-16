import styled from 'styled-components';
import { Category } from '@/types';
import CategoryItem from './CategoryItem';
import { useFocus } from '@/hooks/useFocus';
import { forwardRef } from 'react';

type CategoryListProps = {
  categories: Category[];
};

export default forwardRef<HTMLLIElement, CategoryListProps>(
  function CategoryList({ categories }, ref) {
    return (
      <CategoryListContainer>
        {categories.map(category => (
          <CategoryItem
            key={category.categoryName}
            categoryId={category.categoryId}
            categoryName={category.categoryName}
            categoryColor={category.categoryColor}
            categoryLevel={category.categoryLevel}
            categoryDescription={category.categoryDescription}
            categoryVisible={category.categoryVisible}
            categoryStartDate={category.categoryStartDate}
            categoryEndDate={category.categoryEndDate}
            useFocus={useFocus}
            ref={ref}
          />
        ))}
      </CategoryListContainer>
    );
  },
);

const CategoryListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  list-style: none;
  max-height: 300px;
  gap: 2px;
  border: 1px solid gray;
  padding: 8px;
  padding-right: 40px;
  border-radius: 8px;
  overflow: hidden;
  overflow-y: scroll;
`;
