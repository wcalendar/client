import { dSearchResultList } from "@/dummies/calendar";
import { useModal } from "@/providers/ModalProvider/useModal";
import { ModalStatus, SearchResult } from "@/types";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ResultItem from "./ResultItem";

const Background = styled.div<{ $status: string }>`
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
  opacity: ${({ $status }) => $status === 'open' ? '.5' : '0'};
  animation: ${({ $status }) => $status === 'open' ? 'fadeIn' : 'fadeOut'} .25s;
`;

const Container = styled.div<{ $width: string, $status: string }>`
  position: fixed;
  top: 15%;
  left: 50%;
  z-index: 10;
  transform: ${({ $status }) => $status === 'open' ? 'scale(1)' : 'scale(.97)'} translateX(-50%);
  max-width: ${({ $width }) => $width};
  width: 98%;
  height: auto;
  max-height: 90vh;
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
  padding: .5rem 1rem;
`;

export interface SearchModalProps {
}

export default function SearchModal({
}: SearchModalProps) {
  const [modalStatus, setModalStatus] = useState<ModalStatus>('open');
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
    if(modalStatus === 'closing') closeModal();
  }, [modalStatus]);

  const handleModalClose = useCallback(() => {
    setModalStatus('closing');
  }, []);

  return (
    <>
      <Background $status={modalStatus} onClick={handleModalClose} onAnimationEnd={handleAnimationEnd} />
      <Container $width='33.75rem' $status={modalStatus}>
        <Input type='text' placeholder="일정 검색" ref={inputRef} />
        <IconWrapper>
          <Icon path={mdiMagnify} />
        </IconWrapper>
        <List>
          {resultList.map(result => (
            <ResultItem key={`sr-${result.groupCode}`} searchResult={result} />
          ))}
        </List>
      </Container>
    </>
  )
}