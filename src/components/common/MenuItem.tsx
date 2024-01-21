import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.button`
  position: relative;
  display: block;
  width: auto;
  background-color: white;
  border: none;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: .875rem;
  font-weight: bold;
  text-align: left;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

interface MenuItemProps {
  children: ReactNode;
}

export default function MenuItem({
  children,
}: MenuItemProps) {
  return (
    <Container onClick={(e) => {e.stopPropagation();}}>
      {children}
    </Container>
  );
}