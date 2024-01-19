import { dSearchResultList } from "@/dummies/calendar";
import { useModal } from "@/providers/ModalProvider/useModal";
import { SearchResult } from "@/types";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { useCallback, useEffect, useRef, useState } from "react";
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
  box-shadow: 0px 2px 4px 1px ${({ theme }) => theme.colors.gray};
  transform-origin: left;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};

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

const Input = styled.input`
  width: 100%;
  height: 3.75rem;
  line-height: 3.75rem;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  font-size: .875rem;
  font-weight: bold;
  text-indent: 1rem;

  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: calc( (3.75rem / 2) - .75rem );
  right: 1rem;
  width: 1.5rem;
  height: 1.5rem;

  path {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const List = styled.ul`
  width: 100%;
  height: 30rem;
  list-style: none;
  overflow-y: auto;
  padding: 1rem;
`;

const Item = styled.li`
  width: 100%;
  height: 4.125rem;
`;

export interface SearchModalProps {
  state: string;
}

export default function SearchModal({
  state,
}: SearchModalProps) {
  const [modalStatus, setModalStatus] = useState('open');
  const [resultList, setResultList] = useState<SearchResult[]>([]);

  const { closeModal } = useModal();

  const inputRef = useRef<HTMLInputElement>(null);

  const getResultList = useCallback(async () => {
    setResultList(dSearchResultList);
  }, []);

  useEffect(() => {
    inputRef.current!.focus();

    getResultList();
  });

  const handleAnimationEnd = useCallback(() => {
    if(modalStatus === 'close') closeModal();
  }, [modalStatus]);

  const handleModalClose = useCallback(() => {
    setModalStatus('close');
  }, []);

  return (
    <>
      <Background $state={modalStatus} onClick={handleModalClose} onAnimationEnd={handleAnimationEnd} />
      <Container $width='33.75rem' $state={modalStatus}>
        <Input type='text' placeholder="일정 검색" ref={inputRef} />
        <IconWrapper>
          <Icon path={mdiMagnify} />
        </IconWrapper>
        <List>
          {resultList.map(result => (
            // TODO 여기서부터 다시
            <Item />
          ))}
        </List>
      </Container>
    </>
  )
}