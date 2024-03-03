import Svgs from "@/assets/Svgs";
import { CategoryColor, NewCategoryToRender } from "@/types";
import { useCallback, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`

`;

const ChipWrapper = styled.div`
  width: 13.75rem;
  height: var(--new-cell-height);
  display: flex;
  justify-content: flex-end;
  margin-bottom: .75rem;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 6.5rem;
  }
`;

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['level', 'color'].includes(p),
})<{ level: number, color: CategoryColor, }>`
  display: flex;
  align-items: center;
  gap: .5rem;
  width: ${({ level }) => level == 0 ? '13.75rem' : (level == 1 ? '12.5rem' : '11.25rem')};
  height: 100%;
  padding: 0 .75rem;
  user-select: none;
  cursor: pointer;

  ${({ theme, level, color }) => level === 0 ? `
  border-bottom: 2px solid ${theme.colors.category(color, 0)};
  ` : (level === 1 ? `
  background-color: ${theme.colors.newCategory(color, 2)};
  border-radius: 8px;
  ` : `
  border-left: 2px solid ${`${theme.colors.category(color, 0)}80`};
  `)}

  svg {
    flex: 1.125rem 0 0;
  }

  path {
    fill: ${({ theme, color }) => theme.colors.category(color, 0)};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: ${({ level }) => level == 0 ? '6.5rem' : (level == 1 ? '5.75rem' : '5.25rem')};
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
  color: ${({ theme, color }) => theme.colors.category(color, 0)};
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
  color: ${({ theme, color }) => theme.colors.category(color, 0)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface CategoryChipProps {
  categoryToRender: NewCategoryToRender;
}

export default function CategoryChip({
  categoryToRender,
}: CategoryChipProps) {
  const { category, lines } = categoryToRender;

  const [isOpen, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  return (
    <Wrapper>
      <ChipWrapper>
        <Container level={category.level} color={category.color} onClick={handleClick}>
          <Content level={category.level}>
            {category.level > 0 && <Memo color={category.color}>{category.description}</Memo>}
            <Name level={category.level} color={category.color}>{category.name}</Name>
          </Content>
          {category.level < 2 && <Svgs svgKey={isOpen ? 'arrowDownSmall' : 'arrowRightSmall'}/>}
        </Container>
      </ChipWrapper>
      {category.children.map((child, i) => (
        <CategoryChip key={`category-chip-${child.category.id}-${child.category.level}`} categoryToRender={child} />
      ))}
    </Wrapper>
  )
}