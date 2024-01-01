import { Category } from '@/types';
import styled from 'styled-components';
import CategoryName from './CategoryName';
import CategoryDescription from './CategoryDescription';

const CategoryItemContainer = styled.li<{ level: number }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  cursor: pointer;
`;

const getCategoryInfo = () => {
  console.log('test');
};

export default function CategoryItem({ name, color, level, memo }: Category) {
  return (
    <CategoryItemContainer level={level} onClick={getCategoryInfo}>
      <CategoryName name={name} color={color} />
      <CategoryDescription description={memo ?? ''} color={color} />
    </CategoryItemContainer>
  );
}
