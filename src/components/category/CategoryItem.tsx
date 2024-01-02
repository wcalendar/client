import { CategoryColor } from '@/dummies/calendar';
import { Category } from '@/types';
import styled from 'styled-components';

const CategoryItemContainer = styled.li<{ level: number }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  justify-content: flex-start;
  cursor: pointer;
`;

type CategoryItemProps = Category & {
  getCategory: () => void;
};

const CategoryName = styled.div<{ $level: number; $color: CategoryColor }>`
  width: calc(
    100% - ${({ $level }) => 1 + $level * 0.5}rem - var(--memo-width)
  );
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, $color, $level }) =>
    theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-right: 1px;
  padding: 4px;
  min-width: 80%;
  color: white;
`;

const CategoryDescription = styled.div<{
  $color: CategoryColor;
  $level: number;
}>`
  width: calc(var(--memo-width) - 1px);
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, $color, $level }) =>
    theme.colors.category($color, $level)};
  border-radius: 5px;
  padding: 4px;
  color: white;
`;

export default function CategoryItem({
  categoryName,
  categoryColor,
  categoryLevel,
  categoryDescription,
  getCategory,
}: CategoryItemProps) {
  return (
    <CategoryItemContainer level={categoryLevel} onClick={getCategory}>
      <CategoryName $color={categoryColor} $level={categoryLevel}>
        {categoryName}
      </CategoryName>
      <CategoryDescription $level={categoryLevel} $color={categoryColor}>
        {categoryDescription}
      </CategoryDescription>
    </CategoryItemContainer>
  );
}
