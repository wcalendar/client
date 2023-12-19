import styled from 'styled-components';
import Logo from './Logo';
import NavBar from './NavBar';
import Monthly from './Monthly';
import SearchBar from './SearchBar';

const HeaderContainer = styled.header`
  background: white;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 80%;
`;
function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <NavContainer>
        <Monthly />
        <SearchBar />
        <NavBar />
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;
