import { Category, CategoryColor } from '@/types';
import { mdiEyeOffOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['isSelected'].includes(p),
})<{ isSelected: number }>`
  width: 100%;
  transition: padding .25s ease;
  ${({ isSelected }) => isSelected ? `
  padding-top: 5px;
  padding-bottom: 5px;
  ` : ''}
  margin-bottom: var(--line-gap);
`;

const Wrapper = styled.div`
  width: 100%;
  height: calc(var(--cell-height));
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: .75rem;
  user-select: none;
`;

const CategoryName = styled.div.withConfig({
  shouldForwardProp: p => !['level', 'color', 'isSelected'].includes(p),
})<{ level: number, color: CategoryColor, isSelected: number}>`
  width: calc(10.375rem - ${({ level }) => 1 + (level * 0.5)}rem);
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, color, level }) => theme.colors.category(color, level)};
  border-radius: 5px;
  margin-right: 1px;
  margin-left: ${({ level }) => level * 0.5}rem;
  padding-left: .5rem;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ isSelected }) => isSelected ? `
  text-decoration: underline;
  font-weight: bold;
  ` : ''}

  @media ${({ theme }) => theme.devices.tablet} {
    width: calc(14.375rem - ${({ level }) => 1 + (level * 0.5)}rem);
  }
`;

const Description = styled.div<{ level: number, color: CategoryColor }>`
  width: calc(4rem - 1px);
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, color, level }) => theme.colors.category(color, level)};
  border-radius: 5px;
  padding-left: .5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

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
  const { name, description, color, level, isVisible } = category;

  const handleClick = useCallback(() => {
    onClick(category);
  }, [category, onClick]);

  return (
    <Container isSelected={isSelected ? 1 : 0}>
      <Wrapper>
        <CategoryName color={color} level={level} isSelected={isSelected ? 1 : 0} onClick={handleClick}>
          {name}
        </CategoryName>
        <Description level={level} color={color} onClick={handleClick}>
          {description}
        </Description>
        {!isVisible && (
          <InvisibleIcon>
            <Icon path={mdiEyeOffOutline} />
          </InvisibleIcon>
        )}
      </Wrapper>
    </Container>
  );
}