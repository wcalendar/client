import { useModal } from "@/providers/ModalProvider/useModal";
import { useCallback, useState } from "react";
import styled from "styled-components";

const Background = styled.div<{ $state: string }>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: ${({ $state }) => $state === 'open' ? '.5' : '0'};
  animation: ${({ $state }) => $state === 'open' ? 'fadeIn' : 'fadeOut'} .25s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 0.5;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 0.5;
    }

    100% {
      opacity: 0;
    }
  }
`;

const Container = styled.div<{ $width: string, $state: string }>`
  position: fixed;
  top: 15%;
  left: 50%;
  z-index: 10;
  transform: ${({ $state }) => $state === 'open' ? 'scale(1)' : 'scale(.97)'} translateX(-50%);
  max-width: ${({ $width }) => $width};
  width: 98%;
  height: auto;
  max-height: 90vh;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: auto;
  opacity: ${({ $state }) => $state === 'open' ? '1' : '0'};
  animation: ${({ $state }) => $state === 'open' ? 'scaleIn' : 'scaleOut'} .25s;
  background-color: white;
  box-shadow: 0px 2px 4px 2px ${({ theme }) => theme.colors.gray};
  transform-origin: left;

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(.97) translateX(-50%);
    }

    to {
      opacity: 1;
      transform: scale(1) translateX(-50%);
    }
  }

  @keyframes scaleOut {
    from {
      opacity: 1;
      transform: scale(1) translateX(-50%);
    }

    to {
      opacity: 0;
      transform: scale(.97) translateX(-50%);
    }
  }
`;

export interface SearchModalProps {
  state: string;
}

export default function SearchModal({
  state,
}: SearchModalProps) {
  const [modalStatus, setModalStatus] = useState('open');

  const { closeModal } = useModal()

  const handleAnimationEnd = useCallback(() => {
    if(modalStatus === 'close') closeModal();
  }, [modalStatus]);

  const handleModalClose = useCallback(() => {
    setModalStatus('close');
  }, []);

  return (
    <>
      <Background $state={modalStatus} onClick={handleModalClose} onAnimationEnd={handleAnimationEnd} />
      <Container $width='30rem' $state={modalStatus}>
        <div style={{ height: 500, backgroundColor: 'blue' }}></div>
      </Container>
    </>
  )
}