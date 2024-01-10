import styled from 'styled-components';
import Logo from './Logo';
import NavBar from './NavBar';
import Monthly from './Monthly';
import SearchBar from './SearchBar';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  date?: string;
  onDateChange?: (value: string) => void;
}

const HeaderContainer = styled.header`
  background: white;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  width: 100%;
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
  const pathName = usePathname();
  return (
    <HeaderContainer>
      <Logo />
      {(date && onDateChange) ? (
        <NavContainer>
          <Monthly value={date} onChange={onDateChange}/>
          <SearchBar />
          <NavBar />
        </NavContainer>
      ) : (
        <NavBar />
      )}
    </HeaderContainer>
  );
}
