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
`;

type CategoryListProps = {
  categories: Category[];
};

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <CategoryListContainer>
      {categories.map(({ name, color, level, memo }) => (
        <CategoryItem
          key={name}
          name={name}
          color={color}
          level={level}
          memo={memo}
        />
      ))}
    </CategoryListContainer>
  );
}
