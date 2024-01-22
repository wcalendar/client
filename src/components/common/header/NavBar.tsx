import styled from 'styled-components';
import { mdiAccount, mdiCog } from '@mdi/js';
import MenuButton from './MenuButton';
import MenuItem from './MenuItem';
import { Device } from '@/types';
import SearchButton from './SearchButton';

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
`;

interface NavBarProps {
  device: Device;
}

export default function NavBar({
  device,
}: NavBarProps) {
  return (
    <NavBarContainer>
      {device !== 'desktop' && (
        <SearchButton />
      )}
      <MenuButton icon={mdiCog}>
        <MenuItem>공지사항</MenuItem>
        <MenuItem>사용방법</MenuItem>
        <MenuItem>오류제보/문의하기</MenuItem>
        <MenuItem>이용약관</MenuItem>
        <MenuItem>개인정보 취급방침</MenuItem>
      </MenuButton>
      <MenuButton icon={mdiAccount}>
        <MenuItem>로그아웃</MenuItem>
        <MenuItem>회원탈퇴</MenuItem>
      </MenuButton>
    </NavBarContainer>
  );
}