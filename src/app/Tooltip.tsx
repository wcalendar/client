import { Category, ModalStatus } from "@/types";
import styled from "styled-components"

const Container = styled.div<{ $status: ModalStatus, $level: number }>`
  position: absolute;
  left: calc(${({ $level }) => 1 + ($level * 0.5)}rem);
  top: var(--cell-height);
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
  category: Category;
  status: ModalStatus;
  onAnimationEnd: () => void;
}

export default function Tooltip({
  category,
  status,
  onAnimationEnd,
}: TooltipProps) {
  return (
    <Container $status={status} $level={category.level} onAnimationEnd={onAnimationEnd} >

    </Container>
  );
}