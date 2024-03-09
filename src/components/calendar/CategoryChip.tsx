import Svgs from "@/assets/Svgs";
import { CategoryColor, NewCategoryToRender } from "@/types";
import { useCallback, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div.withConfig({
  shouldForwardProp: p => !['level'].includes(p),
})<{ level: number }>`
  width: var(--new-category-cell-width);
  margin-top: ${({ level }) => level === 0 ? '1.25rem' : '0'};
`;

const ChipWrapper = styled.div.withConfig({
  shouldForwardProp: p => !['lineCount'].includes(p),
})<{ lineCount: number }>`
  height: calc((${({ lineCount }) => Math.max(1, lineCount)} * var(--new-cell-height)) + (${({lineCount}) => Math.max(0, lineCount-1)} * .5rem));
  display: flex;
  justify-content: flex-end;
  margin-bottom: .5rem;
`;

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['level', 'color'].includes(p),
})<{ level: number, color: CategoryColor, }>`
  width: calc(var(--new-category-cell-width) - ${({ level }) => `(${level} * 1.25rem)`});
  height: 100%;
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 0 .75rem;
  user-select: none;
  cursor: pointer;

  ${({ theme, level, color }) => level === 0 ? `
  border-bottom: 2px solid ${theme.colors.newCategory(color, 0)};
  ` : (level === 1 ? `
  background-color: ${theme.colors.newCategory(color, 2)};
  border-radius: 8px;
  ` : `
  border-left: 2px solid ${`${theme.colors.newCategory(color, 0)}80`};
  `)}

  svg {
    flex: 1.125rem 0 0;
  }

  path {
    fill: ${({ theme, color }) => theme.colors.newCategory(color, 0)};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: calc(var(--new-category-cell-width) - ${({ level }) => level === 0 ? '0px' : (level === 1) ? '.75rem' : '1.25rem'});
  }
`;

const Content = styled.div.withConfig({
  shouldForwardProp: p => !['level'].includes(p),
})<{ level: number }>`
  flex: ${({ level }) => level === 0 ? '10.625rem' : (level === 1 ? '9.375rem' : '100%')} 0 0;
  overflow: hidden;

  @media ${({ theme }) => theme.devices.mobile} {
    flex: ${({ level }) => level === 0 ? '3.375rem' : (level === 1 ? '2.625rem' : '100%')} 0 0;
  }
`;

const Name = styled.div.withConfig({
  shouldForwardProp: p => !['level', 'color'].includes(p),
})<{ level: number, color: CategoryColor }>`
  width: 100%;
  font-size: ${({ level }) => level === 0 ? '1.125rem' : '.9375rem'};
  font-weight: bold;
  color: ${({ theme, color }) => theme.colors.newCategory(color, 0)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ level }) => level === 0 ? '.9375rem' : '.8125rem'};
  }
`;

const Memo = styled.div.withConfig({
  shouldForwardProp: p => !['color'].includes(p),
})<{ color: CategoryColor }>`
  width: 100%;
  font-size: .6375rem;
  color: ${({ theme, color }) => theme.colors.newCategory(color, 0)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface CategoryChipProps {
  categoryToRender: NewCategoryToRender;
  openedCategories: Record<string, boolean>;
  toggleCategoryOpen: (categoryId: string) => void;
}

export default function CategoryChip({
  categoryToRender,
  openedCategories,
  toggleCategoryOpen,
}: CategoryChipProps) {
  const { category, lines } = categoryToRender;
  const hasChild = category.children.length > 0;
  const isOpen = openedCategories[category.id];

  const handleClick = useCallback(() => {
    if(hasChild) toggleCategoryOpen(category.id);
  }, [hasChild, category, toggleCategoryOpen]);

  return (
    <Wrapper level={category.level}>
      <ChipWrapper lineCount={lines.length}>
        <Container level={category.level} color={category.color} onClick={handleClick}>
          <Content level={category.level}>
            {category.level > 0 && <Memo color={category.color}>{category.description}</Memo>}
            <Name level={category.level} color={category.color}>{category.name}</Name>
          </Content>
          {(category.level < 2 && hasChild) && <Svgs svgKey={isOpen ? 'arrowDownSmall' : 'arrowRightSmall'}/>}
        </Container>
      </ChipWrapper>
      {isOpen && category.children.map((child, i) => (
        <CategoryChip key={`category-chip-${child.category.id}-${child.category.level}`} categoryToRender={child} openedCategories={openedCategories} toggleCategoryOpen={toggleCategoryOpen} />
      ))}
    </Wrapper>
  )
}