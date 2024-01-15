import styled from 'styled-components';
import { Category } from '@/types';
import CategoryItem from './CategoryItem';
import { useFocus } from '@/hooks/useFocus';

type CategoryListProps = {
  categories: Category[];
};

export default function CategoryList({ categories }: CategoryListProps) {
  const getCategory = () => {};

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
          getCategory={getCategory}
          categoryStartDate={category.categoryStartDate}
          categoryEndDate={category.categoryEndDate}
          useFocus={useFocus}
        />
      ))}
    </CategoryListContainer>
  );
}

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
