import styled from "styled-components";
import { Category, CategoryColor, CategoryModalInfo, ModalStatus } from "@/types";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import Tooltip from "./Tooltip";
import useDevice from "@/hooks/useDevice";

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
  const device = useDevice();
  const {id, name, level, color, description, } = category;

  const categoryNameRef = useRef<HTMLDivElement>(null);

  const [tooltipStatus, setTooltipStatus] = useState<ModalStatus>('closed');
  const [tooltipTop, setTooltipTop] = useState(0);

  useEffect(() => {
    if(tooltipStatus === 'open' && categoryNameRef.current) {
      setTooltipTop(categoryNameRef.current.getBoundingClientRect().top);
    }
  }, [tooltipStatus]);

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if(device !== 'desktop' && categoryNameRef.current) {
      const {x, y, width} = categoryNameRef.current.getBoundingClientRect();

      onCategoryClick({
        x: x + width + 16,
        y,
        category,
      });
    }
  }, [category, device]);

  const handleMouseEnter = useCallback(() => {
    if(device === 'desktop') {
      setTooltipStatus('open');
    }
  }, [device]);

  const handleMouseLeave = useCallback(() => {
    if(device === 'desktop') {
      setTooltipStatus('closing');
    }
  }, [device]);

  const handleTooltipAnimationEnd = useCallback(() => {
    if(tooltipStatus === 'closing') {
      setTooltipStatus('closed');
    }
  }, [tooltipStatus]);

  return (
    <Container $line_count={lineCount} $is_hovered={isHovered ? 1 : 0} $color={color}>
      <CategoryName
        ref={categoryNameRef}
        $level={level} $color={color}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {name}
      </CategoryName>
      <Description $level={level} $color={color}>{description}</Description>
      {tooltipStatus !== 'closed' && (
        <Tooltip status={tooltipStatus} category={category} onAnimationEnd={handleTooltipAnimationEnd} top={tooltipTop} />
      )}
    </Container>
  )
}