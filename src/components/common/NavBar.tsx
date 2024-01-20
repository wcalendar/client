import styled from 'styled-components';
import { mdiAccount, mdiCog } from '@mdi/js';
import MenuButton from './MenuButton';
import MenuItem from './MenuItem';

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
`;

export default function NavBar() {
  return (
    <NavBarContainer>
      <MenuButton icon={mdiCog}>
        <MenuItem>공지사항</MenuItem>
        <MenuItem>사용방법</MenuItem>
        <MenuItem>오류제보/문의하기</MenuItem>
        <MenuItem>이용약관</MenuItem>
        <MenuItem>개인정보 취급방침</MenuItem>
      </MenuButton>
      <MenuButton icon={mdiAccount}>
        <></>
      </MenuButton>
    </NavBarContainer>
  );
}