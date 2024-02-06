import styled from 'styled-components';
import { mdiAccount, mdiCog } from '@mdi/js';
import MenuButton from './MenuButton';
import MenuItem from './MenuItem';
import SearchButton from './SearchButton';
import { useCallback } from 'react';
import { usePopup } from '@/providers/PopupProvider/usePopup';
import { AxiosError } from 'axios';
import { apis } from '@/lib/apis';
import useDev from '@/hooks/useDev';
import { useRouter } from 'next/navigation';

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
`;

export default function NavBar() {
  const { isDev } = useDev();
  const { openPopup, closePopup } = usePopup();
  const router = useRouter();

  const logout = useCallback(async () => {
    if(isDev()) return;

    try {
      closePopup();

      await apis.logout();
      localStorage.removeItem('at');

      router.push('/login');
    } catch(e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }, []);

  const handleLogout = useCallback(() => {
    openPopup({
      title: '로그아웃',
      description: <>로그아웃 하시겠습니까?</>,
      buttons: [
        { label: '취소', onClick: closePopup },
        { label: '확인', onClick: logout },
      ],
    });
  }, []);

  return (
    <NavBarContainer>
      <SearchButton />
      <MenuButton icon={mdiCog}>
        <MenuItem onClick={() => {}}>공지사항</MenuItem>
        <MenuItem onClick={() => {}}>사용방법</MenuItem>
        <MenuItem onClick={() => {}}>오류제보/문의하기</MenuItem>
        <MenuItem onClick={() => {}}>이용약관</MenuItem>
        <MenuItem onClick={() => {}}>개인정보 취급방침</MenuItem>
      </MenuButton>
      <MenuButton icon={mdiAccount}>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        <MenuItem onClick={() => {}}>회원탈퇴</MenuItem>
      </MenuButton>
    </NavBarContainer>
  );
}