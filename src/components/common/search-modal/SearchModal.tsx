import { ModalStatus, ScheduleToRender, SearchedScheduleDto } from "@/types";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ResultItem from "./ResultItem";
import FixedModal from "../fixed-modal/FixedModal";
import useDev from "@/hooks/useDev";
import { searchDummyData } from "@/dummies/calendar";
import { apis } from "@/lib/apis";
import { AxiosError } from "axios";

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

const ListWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 3.75rem);
  overflow-y: auto;
`;

const List = styled.ul`
  width: 100%;
  list-style: none;
  padding: .5rem 1rem;
`;

export interface SearchModalProps {
}

export default function SearchModal({
}: SearchModalProps) {
  const { isDev } = useDev();
  const [modalStatus, setModalStatus] = useState<ModalStatus>('open');
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [resultList, setResultList] = useState<SearchedScheduleDto[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const getResultList = useCallback(async (newSearchTerm: string) => {
    if(isDev()) {
      setResultList(searchDummyData);
      return;
    }

    try {
      const response = await apis.searchSchedule(newSearchTerm);
      setResultList(response.resultBody);
    } catch(e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
    }

  }, []);

  useEffect(() => {
    inputRef.current!.focus();
  });

  const handleModalClose = useCallback(() => {
    setModalStatus('closing');
  }, []);

  const handleSearchTermChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setSearchTerm(e.target.value);

    const newSearchTerm = e.target.value.trim();
    if(newSearchTerm.length > 0) {
      if(debounceTimer) clearTimeout(debounceTimer);
      setDebounceTimer(setTimeout(() => getResultList(newSearchTerm), 1000));
    } else {
      if(debounceTimer) clearTimeout(debounceTimer);
    }

  }, [debounceTimer]);

  return (
    <FixedModal status={modalStatus} width="33.75rem" backgroundColor="white" onModalClose={handleModalClose}>
      <Input type="text" placeholder="일정 검색" ref={inputRef} value={searchTerm} onChange={handleSearchTermChange} />
      <IconWrapper>
        <Icon path={mdiMagnify} />
      </IconWrapper>
      <ListWrapper>
        <List>
          {resultList.map(result => (
            <ResultItem key={`sr-${result.scheduleGroupCode}`} searchResult={result} />
          ))}
        </List>
      </ListWrapper>
    </FixedModal>
  )
}