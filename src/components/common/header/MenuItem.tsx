import { MouseEventHandler, ReactNode, useCallback } from "react";
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
  onClick: () => void;
}

export default function MenuItem({
  children,
  onClick,
}: MenuItemProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.stopPropagation();
    onClick();
  }, [onClick]);

  return (
    <Container onClick={handleClick}>
      {children}
    </Container>
  );
}