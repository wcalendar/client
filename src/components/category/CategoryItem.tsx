import styled from 'styled-components';

type CategoryItemProps = {
  title: string;
  period: string;
  theme: string;
  type: string;
};

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

const CategoryPeriod = styled.span<{ theme: string; type: string }>`
  width: 20%;
  height: 100%;
  font-weight: 400;
  text-align: center;
  background: ${({ theme }) => theme};
  border-radius: 5px;
  padding: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DEFAULT_TEXT = '비고';

export default function CategoryItem({
  title,
  period,
  theme,
  type,
}: CategoryItemProps) {
  return (
    <CategoryItemContainer type={type}>
      <CategoryTitle theme={theme} type={type}>
        {title}
      </CategoryTitle>
      <CategoryPeriod theme={theme} type={type}>
        {type === 'Main' ? DEFAULT_TEXT : period}
      </CategoryPeriod>
    </CategoryItemContainer>
  );
}
