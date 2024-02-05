import { CategoryColor } from "@/types";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { MouseEventHandler } from "react";
import styled from "styled-components";

type CellProps = {
  start: number;
  categoryIdx: number;
  categoryId: number;
  categoryColor: CategoryColor;
  onMouseOver: (categoryIdx: number) => void;
  onMouseOut: () => void;
  onClick: (categoryId: number, day: number) => void;
};

const Container = styled.div<{ $start: number, $color: CategoryColor }>`
  position: absolute;
  top: 0;
  left: calc(${({ $start }) => `${$start} * (var(--cell-width) + 1px)`});
  height: 100%;
  width: calc((var(--cell-width) + 1px) - 5px);
  margin: 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ease .25s;
  color: white;
  border-radius: 5px;

  &:hover {
    background: ${({ theme, $color }) => theme.colors.finishedCategory($color)};
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
  categoryId,
  categoryColor,
  onMouseOver,
  onMouseOut,
  onClick,
}: CellProps) {
  const handleMouseOver: MouseEventHandler<HTMLDivElement> = () => {
    onMouseOver(categoryIdx);
  }

  return (
    <Container $start={start} $color={categoryColor} onMouseOver={handleMouseOver} onMouseOut={onMouseOut} onClick={() => onClick(categoryId, start+1)}>
      <IconWrapper>
        <Icon path={mdiPlus} />
      </IconWrapper>
    </Container>
  );
}