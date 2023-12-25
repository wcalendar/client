import { ReactNode } from "react";
import styled from "styled-components"
import { DefaultTheme } from "styled-components/dist/types";

const Container = styled.div<{ $is_category: number; }>`
  width: calc(${({ $is_category }) => `var(--cell-width) + ${$is_category}px`});
  height: 100%;
  border-right: ${({ theme, $is_category }) => $is_category === 0 ? 'none' : `1px solid ${theme.colors.lightGray}`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

type CellProps = {
  isCategory?: boolean;
  children: ReactNode;
}

export default function Cell({
  isCategory,
  children,
}: CellProps) {
  return (
    <Container $is_category={isCategory ? 0 : 1}>
      {children}
    </Container>
  )
}