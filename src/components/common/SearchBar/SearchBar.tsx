import Svgs from "@/assets/Svgs";
import { newSearchDummyData } from "@/dummies/calendar";
import styled from "styled-components"
import SearchResultItem from "./SearchResultItem";
import { useCallback, useEffect, useRef, useState } from "react";
import { ModalStatus } from "@/types";

const Container = styled.div`
  position: relative;
  width: 21.25rem;
  height: 2.5rem;
  overflow: visible;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: .9375rem;
  padding-left: .75rem;
  padding-right: 2.75rem;
  border-radius: .5rem;
  border: 1px solid ${({ theme }) => theme.colors.black20};

  &:focus {
    outline: none;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  top: .625rem;
  right: .75rem;
  width: 1.25rem;
  height: 1.25rem;

  path {
    fill: ${({ theme }) => theme.colors.black20};
  }
`;

const SearchListWrapper = styled.div.withConfig({
  shouldForwardProp: p => !['status'].includes(p),
})<{ status: ModalStatus }>`
  position: absolute;
  top: 3rem;
  z-index: 10;
  width: 100%;
  height: 16.25rem;
  border-radius: .5rem;
  border: 1px solid ${({ theme }) => theme.colors.black20};
  box-shadow: 4px 4px 12px 0 ${({ theme }) => theme.colors.black12};
  padding: .75rem;
  overflow-y: auto;
  transform: translateY(${({ status }) => status === 'open' ? '0%' : '-10%'});
  opacity: ${({ status }) => status === 'open' ? 1 : 0};
  animation: ${({ status }) => status === 'open' ? 'fromUpOpen' : 'fromUpClose'} .25s;
  background-color: ${({ theme }) => theme.colors.white};
`;

const NoResult = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: .9375rem;
  color: ${({ theme }) => theme.colors.black50};
  user-select: none;
`;

const SearchList = styled.div`
  height: auto;
`;

export default function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchListRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<ModalStatus>('closed');

  const list = newSearchDummyData;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if(searchInputRef.current && !searchInputRef.current.contains(e.target as Node) && searchListRef.current && !searchListRef.current.contains(e.target as Node)) {
        handleListClose();
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, []);

  const handleInputFocus = useCallback(() => {
    setStatus('open');
  }, []);

  const handleListClose = useCallback(() => {
    setStatus('closing');
  }, []);

  const handleListAnimationEnd = useCallback(() => {
    if(status === 'closing') setStatus('closed');
  }, [status]);

  return (
    <Container>
      <SearchInput placeholder='일정 검색' onClick={handleInputFocus} ref={searchInputRef} />
      <SearchIconWrapper>
        <Svgs svgKey="search" />
      </SearchIconWrapper>
      {status !== 'closed' && (
        <SearchListWrapper status={status} ref={searchListRef} onAnimationEnd={handleListAnimationEnd}>
          {/* <NoResult>해당하는 일정이 없습니다.</NoResult> */}
          <SearchList>
            {list.map((item, i) => (
              <SearchResultItem key={`search-result-${item.scheduleGroupCode}-${i}`} searchResult={item} ></SearchResultItem>
            ))}
          </SearchList>
        </SearchListWrapper>
      )}
    </Container>
  );
}