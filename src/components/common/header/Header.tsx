import styled from 'styled-components';
import Logo from './Logo';
import NavBar from './NavBar';
import Monthly from './Monthly';
import { Dayjs } from 'dayjs';

type HeaderProps = {
  date?: Dayjs;
  onDateChange?: (value: Dayjs) => void;
}

const Container = styled.header`
  width: 100%;
  height: var(--header-height);
  background: white;
  display: flex;
  padding: var(--header-padding);
  align-items: center;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const NavContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

export default function Header({
  date,
  onDateChange,
}: HeaderProps) {  
  return (
    <Container>
      <Logo />
      {(date && onDateChange) ? (
        <NavContainer>
          <Monthly value={date} onChange={onDateChange}/>
          <NavBar />
        </NavContainer>
      ) : (
        <NavBar />
      )}
    </Container>
  );
}
