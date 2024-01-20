import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.button`
  background-color: white;
  border: none;
  width: 9rem;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: .875rem;
  font-weight: bold;
  text-align: left;
  text-indent: 1rem;
  cursor: pointer;
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