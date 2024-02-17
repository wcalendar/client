import CategoryModalContent from "@/components/common/category-modal/CategoryModalContent";
import { Category, ModalStatus } from "@/types";
import styled from "styled-components"

const Container = styled.div<{ status: ModalStatus, top: number }>`
  position: fixed;
  left: calc(var(--category-name-width) + 1.5rem);
  top: ${({ top }) => top}px;
  ${({ status }) => status === 'open' ? `
  opacity: 1;
  transform: translateY(0);
  animation: fromUpOpen .25s;
  ` : `
  opacity: 0;
  transform: translateY(-10%);
  animation: fromUpClose .25s;
  `}

  width: 16.875rem;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  background-color: white;
  user-select: none;
  z-index: 15;

  @media ${({ theme }) => theme.devices.mobile} {
    left: calc(50% - (16.875rem / 2));
  }
`;

interface TooltipProps {
  category: Category;
  status: ModalStatus;
  onAnimationEnd: () => void;
  top: number;
}

export default function Tooltip({
  category,
  status,
  onAnimationEnd,
  top,
}: TooltipProps) {
  return (
    <Container status={status} top={top} onAnimationEnd={onAnimationEnd} >
      <CategoryModalContent category={category} />
    </Container>
  );
}