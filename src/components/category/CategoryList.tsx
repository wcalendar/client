import styled from 'styled-components';
import CategoryItem from './CategoryItem';
import { Category } from '@/types/Category';

const CategoryListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

type CategoryListProps = {
  categories: Category[];
};

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <CategoryListContainer>
      {categories.map(({ name, color, level }) => (
        <CategoryItem key={name} name={name} color={color} level={level} />
      ))}
    </CategoryListContainer>
  );
}
