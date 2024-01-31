import styled from "styled-components";
import { Category, CategoryColor, CategoryModalInfo, ModalStatus } from "@/types";
import { MouseEvent, useCallback, useState } from "react";
import Tooltip from "./Tooltip";

const Container = styled.div<{ $line_count: number, $is_hovered: number, $color: CategoryColor }>`
  position: relative;
  width: 100%;
  height: calc(${({ $line_count }) => `(var(--cell-height) * ${$line_count}) + (${$line_count - 1} * var(--line-gap))`});
  margin-bottom: var(--line-gap);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  font-size: .75rem;
  user-select: none;
  ${({ $is_hovered, theme, $color }) => $is_hovered ? `background: ${theme.colors.category($color, 1)}40;` : ''}
  transition: background ease .25s;

  --category-name-width: 10.375rem;
  --category-name-ml: .5rem;

  @media ${({ theme }) => theme.devices.tablet} {
    --category-name-width: 8.375rem;
    --category-name-ml: .25rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    --category-name-width: 7.125rem;
  }
`;

const CategoryName = styled.div<{ $level: number, $color: CategoryColor }>`
  width: calc(var(--category-name-width) - (${({ $level }) => $level} * var(--category-name-ml)));
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-right: 1px;
  padding-left: .5rem;
  cursor: pointer;
  transition: all ease .25s;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Description = styled.div<{ $level: number, $color: CategoryColor }>`
  width: calc(${({ theme }) => theme.sizes.calendar.memoWidth.desktop} - 1px);
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  padding-left: .5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media ${({ theme }) => theme.devices.tablet} {
    display: none;
  }
`;

type CategoryCellProps = {
  category: Category;
  lineCount: number;
  onCategoryClick: (category: CategoryModalInfo) => void;
  isHovered: boolean;
};

export default function CategoryCell({
  category,
  lineCount,
  onCategoryClick,
  isHovered,
}: CategoryCellProps) {
  const {id, name, level, color, description, } = category;

  const [tooltipStatus, setTooltipStatus] = useState<ModalStatus>('closed');

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    onCategoryClick({
      x: e.clientX,
      y: e.clientY,
      category,
    });
  }, [category]);

  const handleMouseEnter = useCallback(() => {
    setTooltipStatus('open');
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltipStatus('closing');
  }, []);

  const handleTooltipAnimationEnd = useCallback(() => {
    if(tooltipStatus === 'closing') {
      setTooltipStatus('closed');
    }
  }, [tooltipStatus]);

  console.log(tooltipStatus);

  return (
    <Container $line_count={lineCount} $is_hovered={isHovered ? 1 : 0} $color={color}>
      <CategoryName
        $level={level} $color={color}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {name}
      </CategoryName>
      <Description $level={level} $color={color}>{description}</Description>
      {tooltipStatus !== 'closed' && (
        <Tooltip status={tooltipStatus} category={category} onAnimationEnd={handleTooltipAnimationEnd} />
      )}
    </Container>
  )
}