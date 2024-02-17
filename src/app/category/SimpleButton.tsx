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

  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightGray};
    cursor: default;
  }
`;

interface SimpleButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export default function SimpleButton({
  children,
  disabled,
  onClick,
}: SimpleButtonProps) {
  return <Container onClick={onClick} disabled={disabled} >{children}</Container>
}