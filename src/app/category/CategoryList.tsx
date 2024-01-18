import styled from 'styled-components';
import { Category } from '@/types';
import CategoryItem from '../../components/category/CategoryItem';
import { useFocus } from '@/hooks/useFocus';
import { forwardRef } from 'react';

const Container = styled.ul`
  width: 100%;
  list-style: none;
  min-height: 18rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 1rem;
  border-radius: 4px;
  overflow-x: hidden;
  overflow-y: auto;
`;

type CategoryListProps = {
  categories: Category[];
};

export default forwardRef<HTMLLIElement, CategoryListProps>(
  function CategoryList({ categories }, ref) {
    return (
      <Container>
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
      </Container>
    );
  },
);