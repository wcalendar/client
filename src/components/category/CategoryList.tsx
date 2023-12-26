import styled from 'styled-components';
import CategoryItem from './CategoryItem';
import { Category } from '@/lib/types';

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
      {categories.map(item => (
        <CategoryItem
          key={item.id}
          name={item.name}
          color={item.color}
          type={item.type}
        />
      ))}
    </CategoryListContainer>
  );
}
