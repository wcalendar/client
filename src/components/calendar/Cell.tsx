import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";

type CellProps = {
  start: number;
};

const Container = styled.div<{ $start: number }>`
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
}: CellProps) {
  return (
    <Container $start={start}>
      <IconWrapper>
        <Icon path={mdiPlus} />
      </IconWrapper>
    </Container>
  );
}