import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.button`
  height: 1.75rem;
  line-height: 1.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  font-size: .75rem;
  font-weight: bold;
  background-color: white;
  padding: 0 .5rem;
  cursor: pointer;
`;

interface SimpleButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export default function SimpleButton({
  children,
  onClick,
}: SimpleButtonProps) {
  return <Container onClick={onClick} >{children}</Container>
}