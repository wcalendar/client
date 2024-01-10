import styled from "styled-components";
import { CalendarCategory, CategoryColor, CategoryModalInfo } from "@/types";
import { MouseEvent, useCallback } from "react";

const Container = styled.div<{ $line_count: number, }>`
  width: 100%;
  height: calc(${({ $line_count }) => `(var(--cell-height) * ${$line_count}) + (${$line_count - 1} * var(--line-gap))`});
  margin-top: var(--line-gap);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  font-size: .75rem;
  user-select: none;
`;

const CategoryName = styled.div<{ $level: number, $color: CategoryColor }>`
  width: calc(100% - ${({ $level }) => 1 + ($level * 0.5)}rem - ${({ theme }) => theme.sizes.calendar.memoWidth.desktop});
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-right: 1px;
  padding-left: .5rem;
  cursor: pointer;
  transition: all ease .25s;

  &:hover {
    transform: translateX(-1px) translateY(-1px);
    box-shadow: 2px 2px 4px 1px ${({ theme }) => theme.colors.black80};
  }

  @media ${({ theme }) => theme.devices.tablet} {
    width: calc(100% - ${({ $level }) => 1 + ($level * 0.5)}rem);
  }
`;

const Description = styled.div<{ $level: number, $color: CategoryColor }>`
  width: calc(${({ theme }) => theme.sizes.calendar.memoWidth.desktop} - 1px);
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  padding-left: .5rem;
  overflow: hidden;

  @media ${({ theme }) => theme.devices.tablet} {
    display: none;
  }
`;

type CategoryCellProps = {
  category: CalendarCategory;
  lineCount: number;
  onCategoryClick: (category: CategoryModalInfo) => void;
};

export default function CategoryCell({
  category,
  lineCount,
  onCategoryClick,
}: CategoryCellProps) {
  const {id, name, level, color, description, } = category;

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    onCategoryClick({
      x: e.clientX,
      y: e.clientY,
      category,
    });
  }, [category]);

  return (
    <Container $line_count={lineCount}>
      <CategoryName $level={level} $color={color} onClick={handleClick}>
        {name}
      </CategoryName>
      <Description $level={level} $color={color}>{description}</Description>
    </Container>
  )
}