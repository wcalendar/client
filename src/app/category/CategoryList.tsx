import styled from 'styled-components';
import { Category } from '@/types';
import CategoryItem from './CategoryItem';

const Container = styled.ul`
  width: 100%;
  list-style: none;
  min-height: 18rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 1rem;
  border-radius: 4px;
  overflow-x: hidden;
  overflow-y: auto;

  --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.desktop};
  --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.desktop};

  @media ${({ theme }) => theme.devices.tablet} {
    --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.tablet};
    --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.tablet};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.mobile};
    --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.mobile};
  }
`;

type CategoryListProps = {
  categoryList: Category[];
  selectedCategory: Category | null;
  onCategoryItemClick: (category: Category) => void;
};

export default function CategoryList({
  categoryList,
  selectedCategory,
  onCategoryItemClick,
}: CategoryListProps) {
  return (
    <Container>
      {categoryList.map(category => (
        <CategoryItem
          key={`ci-${category.id}`}
          category={category}
          isSelected={selectedCategory ? (selectedCategory.id === category.id) : false}
          onClick={onCategoryItemClick}
        />
      ))}
    </Container>
  );
}