import { Category, CategoryColor } from '@/types';
import { mdiEyeOffOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ $color: CategoryColor }>`
  width: 100%;
  height: 1.125rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: .75rem;
  user-select: none;
  margin-bottom: var(--line-gap);
`;

const CategoryName = styled.div<{ $level: number, $color: CategoryColor, $is_selected: number}>`
  width: calc(10.375rem - ${({ $level }) => 1 + ($level * 0.5)}rem);
  height: 1.125rem;
  line-height: 1.125rem;
  background-color: ${({ theme, $color, $level, $is_selected }) => $is_selected ? theme.colors.lightGray : theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-right: 1px;
  margin-left: ${({ $level }) => $level * 0.5}rem;
  padding-left: .5rem;
  cursor: pointer;

  @media ${({ theme }) => theme.devices.tablet} {
    width: calc(14.375rem - ${({ $level }) => 1 + ($level * 0.5)}rem);
  }
`;

const Description = styled.div<{ $level: number, $color: CategoryColor, $is_selected: number }>`
  width: calc(4rem - 1px);
  height: 1.125rem;
  line-height: 1.125rem;
  background-color: ${({ theme, $color, $level, $is_selected }) => $is_selected ? theme.colors.lightGray : theme.colors.category($color, $level)};
  border-radius: 5px;
  padding-left: .5rem;
  overflow: hidden;

  @media ${({ theme }) => theme.devices.tablet} {
    display: none;
  }
`;

const InvisibleIcon = styled.div`
  width: 1rem;
  height: 1rem;
  margin-left: .5rem;
`;

interface CategoryItemProps {
  category: Category;
  isSelected: boolean;
  onClick: (category: Category) => void;
};

export default function CategoryItem({
  category,
  isSelected,
  onClick,
}: CategoryItemProps) {
  const { name, description, color, level, } = category;

  const handleClick = useCallback(() => {
    onClick(category);
  }, [category, onClick]);

  return (
    <Container $color={color}>
      <CategoryName $color={color} $level={level} $is_selected={isSelected ? 1 : 0} onClick={handleClick}>
        {name}
      </CategoryName>
      <Description $level={level} $color={color} $is_selected={isSelected ? 1 : 0} onClick={handleClick}>
        {description}
      </Description>
      <InvisibleIcon>
        <Icon path={mdiEyeOffOutline} />
      </InvisibleIcon>
    </Container>
  );
}