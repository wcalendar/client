import { ModalStatus } from "@/types";
import styled from "styled-components"

const Container = styled.div<{ $status: ModalStatus}>`
  position: absolute;
  z-index: 50;
  ${({ $status }) => $status === 'open' ? `
  opacity: 1;
  transform: translateY(0);
  animation: fromUpOpen .25s;
  ` : `
  opacity: 0;
  transform: translateY(-10%);
  animation: fromUpClose .25s;
  `}
  
  width: 5rem;
  height: 5rem;
  background: red;
`;

interface TooltipProps {
  status: ModalStatus;
  onAnimationEnd: () => void;
}

export default function Tooltip({
  status,
  onAnimationEnd,
}: TooltipProps) {
  return (
    <Container $status={status} onAnimationEnd={onAnimationEnd} >

    </Container>
  );
}