import { CategoryColor } from "@/types";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { MouseEventHandler } from "react";
import styled from "styled-components";

type CellProps = {
  start: number;
  categoryIdx: number;
  categoryColor: CategoryColor;
  onMouseOver: (categoryIdx: number) => void;
  onMouseOut: () => void;
};

const Container = styled.div<{ $start: number, $color: CategoryColor }>`
  position: absolute;
  top: 0;
  left: calc(${({ $start }) => `${$start} * (var(--cell-width) + 1px)`});
  height: 100%;
  width: calc((var(--cell-width) + 1px) - 1px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ease .25s;
  color: white;

  &:hover {
    background: ${({ theme, $color }) => theme.colors.category($color, 1)};
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const IconWrapper = styled.div`
  width: var(--cell-height);
  height: var(--cell-height);
  color: inherit;
  svg {
    color: inherit;
  }
  path {
    color: inherit;
  }
`;

export default function Cell({
  start,
  categoryIdx,
  categoryColor,
  onMouseOver,
  onMouseOut,
}: CellProps) {
  const handleMouseOver: MouseEventHandler<HTMLDivElement> = () => {
    onMouseOver(categoryIdx);
  }

  return (
    <Container $start={start} $color={categoryColor} onMouseOver={handleMouseOver} onMouseOut={onMouseOut}>
      <IconWrapper>
        <Icon path={mdiPlus} />
      </IconWrapper>
    </Container>
  );
}