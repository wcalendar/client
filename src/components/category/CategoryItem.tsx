import { Category } from '@/types/Category';
import styled from 'styled-components';

const CategoryItemContainer = styled.li<{ level: number }>`
  width: 100%;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  gap: 8px;
  font-size: 12px;
`;

const CategoryTitleButton = styled.button<{ theme: string; level: number }>`
  width: 80%;
  height: 100%;
  border: none;
  background: ${({ theme }) => theme};
  border-radius: 5px;
  padding: 8px;
  overflow: hidden;
  margin-left: ${({ level }) =>
    level === 0 ? '0' : level === 1 ? '1rem' : '2rem'};
  font-weight: ${({ level }) => (level === 0 ? '700' : '400')};
`;

export default function CategoryItem({ name, color, level }: Category) {
  return (
    <CategoryItemContainer level={level}>
      <CategoryTitleButton theme={color} level={level}>
        {name}
      </CategoryTitleButton>
    </CategoryItemContainer>
  );
}
