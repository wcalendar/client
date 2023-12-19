import { ReactNode } from "react";
import styled from "styled-components"
import { DefaultTheme } from "styled-components/dist/types";

const Container = styled.div<{ theme: DefaultTheme; $is_category: number; }>`
  width: ${({ theme, $is_category }) => theme.sizes.calendar.cellWidth + $is_category}px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
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