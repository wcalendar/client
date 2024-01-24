import { dSearchResultList } from "@/dummies/calendar";
import { ModalStatus, SearchResult } from "@/types";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ResultItem from "./ResultItem";
import FixedModal from "../fixed-modal/FixedModal";

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

  const inputRef = useRef<HTMLInputElement>(null);

  const getResultList = useCallback(async () => {
    setResultList(dSearchResultList);
  }, []);

  useEffect(() => {
    inputRef.current!.focus();

    getResultList();
  });

  const handleModalClose = useCallback(() => {
    setModalStatus('closing');
  }, []);

  return (
    <FixedModal status={modalStatus} width="33.75rem" onModalClose={handleModalClose}>
      <Input type='text' placeholder="일정 검색" ref={inputRef} />
      <IconWrapper>
        <Icon path={mdiMagnify} />
      </IconWrapper>
      <List>
        {resultList.map(result => (
          <ResultItem key={`sr-${result.groupCode}`} searchResult={result} />
        ))}
      </List>
    </FixedModal>
  )
}