import { ReactNode } from "react";
import styled from "styled-components"

const Container = styled.div<{ isCategory: number; }>`
  width: calc(${({ isCategory }) => isCategory ?
  `var(--category-cell-width)` :
  `var(--cell-width) + 1px`});
  height: 100%;
  border-right: ${({ theme, isCategory }) => isCategory === 0 ? 'none' : `1px solid ${theme.colors.lightGray}`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

type HeaderCellProps = {
  isCategory?: boolean;
  children: ReactNode;
}

export default function Cell({
  isCategory,
  children,
}: HeaderCellProps) {
  return (
    <Container isCategory={isCategory ? 1 : 0}>
      {children}
    </Container>
  )
}