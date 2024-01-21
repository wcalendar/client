import styled, { useTheme } from 'styled-components';
import Logo from './Logo';
import NavBar from './NavBar';
import Monthly from './Monthly';
import SearchBar from './SearchBar';
import { Dayjs } from 'dayjs';
import { useModal } from '@/providers/ModalProvider/useModal';
import { useCallback } from 'react';
import useDevice from '@/hooks/useDevice';

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
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const NavContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
`;

export default function Header({
  date,
  onDateChange,
}: HeaderProps) {  
  const device = useDevice();

  return (
    <Container>
      <Logo />
      {(date && onDateChange) ? (
        <NavContainer>
          <Monthly value={date} onChange={onDateChange}/>
          {device === 'desktop' && (
            <SearchBar />
          )}
          <NavBar device={device} />
        </NavContainer>
      ) : (
        <NavBar device={device}/>
      )}
    </Container>
  );
}
