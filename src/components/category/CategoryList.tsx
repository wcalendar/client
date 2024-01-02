import styled from 'styled-components';
import { Category } from '@/types';
import CategoryItem from './CategoryItem';

const CategoryListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  list-style: none;
  max-height: 300px;
  overflow-y: scroll;
  gap: 2px;
`;

type CategoryListProps = {
  categories: Category[];
  getCategory: () => void;
};

export default function CategoryList({
  categories,
  getCategory,
}: CategoryListProps) {
  return (
    <CategoryListContainer>
      {categories.map(
        ({
          categoryName,
          categoryColor,
          categoryLevel,
          categoryDescription,
          categoryVisible,
          categoryStartDate,
          categoryEndDate,
        }) => (
          <CategoryItem
            key={categoryName}
            categoryName={categoryName}
            categoryColor={categoryColor}
            categoryLevel={categoryLevel}
            categoryDescription={categoryDescription}
            categoryVisible={categoryVisible}
            getCategory={getCategory}
            categoryStartDate={categoryStartDate}
            categoryEndDate={categoryEndDate}
          />
        ),
      )}
    </CategoryListContainer>
  );
}
