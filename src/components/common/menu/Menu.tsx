import { ModalStatus } from "@/types";
import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div<{ $status: ModalStatus }>`
  position: absolute;
  transform-origin: right;
  right: 0;
  top: 1.5rem;
  transform: translateY(${({ $status }) => $status === 'open' ? '0%' : '-10%'});
  opacity: ${({ $status }) => $status === 'open' ? 1 : 0};
  animation: ${({ $status }) => $status === 'open' ? 'downOpen' : 'upOpen'} .25s;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
  padding: 1rem 0;

  @keyframes downOpen {
    0% {
      transform: translateY(-10%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes upOpen {
    0% {
      transform: translateY(0);
      opacity: 1;
    }

    100% {
      transform: translateY(-10%);
      opacity: 0;
    }
  }
`;

interface MenuProps {
  status: ModalStatus,
  children: ReactNode,
  onAnimationEnd: () => void;
}

export default function Menu({
  status,
  children,
  onAnimationEnd,
}: MenuProps) {
  return (
    <Container $status={status} onAnimationEnd={onAnimationEnd}>
      {children}
    </Container>
  );
}