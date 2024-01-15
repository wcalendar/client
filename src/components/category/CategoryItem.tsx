import { useFocus } from '@/hooks/useFocus';
import { Category, CategoryColor } from '@/types';
import { RefObject, useEffect, useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import styled from 'styled-components';

type CategoryItemProps = Category & {
  getCategory: () => void;
  useFocus: () => {
    categoryRef: RefObject<HTMLLIElement | null>;
    focusItem: () => void;
  };
};

export default function CategoryItem({
  categoryId,
  categoryName,
  categoryColor,
  categoryLevel,
  categoryDescription,
  categoryVisible,
  getCategory,
}: CategoryItemProps) {
  const { categoryRef, focusItem } = useFocus();
  const [currentVisible, setCurrentVisible] =
    useState<boolean>(categoryVisible);

  const handleGetCategory = () => {
    focusItem();
    getCategory();
  };

  const handleToggleVisible = (isVisible: boolean) => {
    setCurrentVisible(!isVisible);
    return !isVisible;
  };

  return (
    <CategoryItemContainer
      tabIndex={categoryId}
      $level={categoryLevel}
      ref={categoryRef}
      onClick={handleGetCategory}
    >
      <CategoryName $color={categoryColor} $level={categoryLevel}>
        {categoryName}
      </CategoryName>
      <CategoryDescription $level={categoryLevel} $color={categoryColor}>
        {categoryDescription}
      </CategoryDescription>
      <CategoryVisibleContainer>
        {!categoryVisible ? (
          <CategoryVisibleToggle
            type="button"
            onClick={() => handleToggleVisible(categoryVisible)}
          >
            <RiEyeOffLine />
          </CategoryVisibleToggle>
        ) : (
          ''
        )}
      </CategoryVisibleContainer>
    </CategoryItemContainer>
  );
}

const CategoryItemContainer = styled.li<{ $level: number }>`
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
  margin-left: auto;
  &:focus > span {
    background-color: #ececec;
    color: black;
    font-weight: bold;
    text-decoration: underline;
  }
  ${({ $level }) => {
    switch ($level + 1) {
      case 1:
        return ``;
      case 2:
        return `
          padding-left: 8px;
        `;
      case 3:
        return `     
          padding-left: 16px;
        `;
      default:
        return '';
    }
  }}
`;

const CategoryContent = styled.span`
  border-radius: 5px;
  padding: 4px;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
  font-size: 12px;
`;

const CategoryName = styled(CategoryContent)<{
  $level: number;
  $color: CategoryColor;
}>`
  width: 100%;
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

const CategoryVisibleContainer = styled.div`
  width: 32px;
  height: 32px;
  cursor: default;
`;

const CategoryVisibleToggle = styled.button`
  background-color: transparent;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
