import styled from 'styled-components';
import Logo from './Logo';
import NavBar from './NavBar';
import Monthly from './Monthly';
import SearchBar from './SearchBar';
import { Dayjs } from 'dayjs';
import { useModal } from '@/providers/ModalProvider/useModal';
import { useCallback } from 'react';

type HeaderProps = {
  date?: Dayjs;
  onDateChange?: (value: Dayjs) => void;
}

const Container = styled.header`
  width: 100%;
  height: 4.375rem;
  background: white;
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 80%;
`;

export default function Header({
  date,
  onDateChange,
}: HeaderProps) {
  const { addModal } = useModal();

  const handleSearchBarClick = useCallback(() => {
    addModal({ key: 'search', modalProps: {state: 'open'} });
  }, []);

  return (
    <Container>
      <Logo />
      {(date && onDateChange) ? (
        <NavContainer>
          <Monthly value={date} onChange={onDateChange}/>
          <SearchBar onClick={handleSearchBarClick} />
          <NavBar />
        </NavContainer>
      ) : (
        <NavBar />
      )}
    </Container>
  );
}
