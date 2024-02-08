import { useModal } from "@/providers/ModalProvider/useModal";
import { ModalStatus } from "@/types";
import { ReactNode, useCallback } from "react";
import styled from "styled-components";

const Background = styled.div<{ $status: string, backgroundColor: 'black' | 'white' }>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, backgroundColor }) => backgroundColor === 'black' ? theme.colors.black : 'white'};
  opacity: ${({ $status }) => $status === 'open' ? '.5' : '0'};
  animation: ${({ $status }) => $status === 'open' ? 'fadeIn' : 'fadeOut'} .25s;
`;

const Modal = styled.div<{ $width: string, $status: string }>`
  position: fixed;
  top: 10%;
  left: 50%;
  z-index: 10;
  transform: ${({ $status }) => $status === 'open' ? 'scale(1)' : 'scale(.97)'} translateX(-50%);
  max-width: ${({ $width }) => $width};
  width: 98%;
  height: auto;
  max-height: 80vh;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: auto;
  opacity: ${({ $status }) => $status === 'open' ? '1' : '0'};
  animation: ${({ $status }) => $status === 'open' ? 'scaleIn' : 'scaleOut'} .25s;
  background-color: white;
  box-shadow: 0px 2px 4px 1px ${({ theme }) => theme.colors.gray};
  transform-origin: left;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

interface FixedModalsProps {
  width: string;
  status: ModalStatus;
  children: ReactNode;
  backgroundColor: 'black' | 'white';
  onModalClose: () => void;
}

export default function FixedModal({
  width,
  status,
  children,
  backgroundColor,
  onModalClose,
}: FixedModalsProps) {
  const { closeModal } = useModal();

  const handleAnimationEnd = useCallback(() => {
    if(status === 'closing') closeModal();
  }, [status]);

  return (
    <>
      <Background $status={status} backgroundColor={backgroundColor} onAnimationEnd={handleAnimationEnd} onClick={onModalClose} />
      <Modal $status={status} $width={width}>{children}</Modal>
    </>
  );
}