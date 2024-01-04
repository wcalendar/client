import { CategoryColor } from '@/dummies/calendar';
import { useFocus } from '@/hooks/useFocus';
import { Category } from '@/types';
import { RefObject, useEffect } from 'react';
import styled from 'styled-components';

type CategoryItemProps = Category & {
  getCategory: () => void;
  useFocus: () => { categoryRef: RefObject<HTMLLIElement | null> , focusItem:()=> void };
};

export default function CategoryItem({
  categoryName,
  categoryColor,
  categoryLevel,
  categoryDescription,
  getCategory,
}: CategoryItemProps) {
  const { categoryRef, focusItem } = useFocus();

  useEffect(() => {
    focusItem();
  }, [focusItem]);

  return (
    <CategoryItemContainer
      // tabIndex={categoryRef.current?.}
      $level={categoryLevel}
      ref={categoryRef}
      onClick={getCategory}
    >
      <CategoryName $color={categoryColor} $level={categoryLevel}>
        {categoryName}
      </CategoryName>
      <CategoryDescription $level={categoryLevel} $color={categoryColor}>
        {categoryDescription}
      </CategoryDescription>
    </CategoryItemContainer>
  );
}

const CategoryItemContainer = styled.li<{ $level: number }>`
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:focus {
    border: 1px solid black;
    background-color: gray;
  }
`;

const CategoryContent = styled.span`
  border-radius: 5px;
  margin-right: 1px;
  padding: 4px;
  display: flex;
  align-items: center;
  color: white;
`;

const CategoryName = styled(CategoryContent)<{
  $level: number;
  $color: CategoryColor;
}>`
  width: calc(
    100% - ${({ $level }) => 1 + $level * 0.5}rem - var(--memo-width)
  );
  background-color: ${({ theme, $color, $level }) =>
    theme.colors.category($color, $level)};
`;

const CategoryDescription = styled(CategoryName)<{
  $color: CategoryColor;
  $level: number;
}>`
  width: calc(var(--memo-width) - 1px);
  background-color: ${({ theme, $color, $level }) =>
    theme.colors.category($color, $level)};
`;
