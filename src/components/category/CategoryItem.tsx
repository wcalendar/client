import { Category } from '@/lib/types';
import styled from 'styled-components';

const CategoryItemContainer = styled.li<{ type: string }>`
  width: 100%;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  `;

const CategoryTitle = styled.span<{ theme: string; type: string }>`
  width: 80%;
  height: 100%;
  background: ${({ theme }) => theme};
  border-radius: 5px;
  padding: 8px;
  overflow: hidden;
  margin-left: ${({ type }) => (type === 'Main' ? '0' : '1rem')};
  font-weight: ${({ type }) => (type === 'Main' ? '700' : '400')};
`;

export default function CategoryItem({ name, color, type }: Category) {
  return (
    <CategoryItemContainer type={type}>
      <CategoryTitle theme={color} type={type}>
        {name}
      </CategoryTitle>
    </CategoryItemContainer>
  );
}
