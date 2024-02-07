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

  const signOut = useCallback(async () => {
    if(isDev()) return;

    try {
      closePopup();

      await apis.signOut();
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

  const handleSignOut = useCallback(() => {
    openPopup({
      title: '회원탈퇴',
      description: <>정말 탈퇴하시겠습니까?<br />탈퇴시 카테고리 및 일정이 모두 삭제됩니다</>,
      buttons: [
        { label: '탈퇴', onClick: signOut, warning: true },
        { label: '취소', onClick: closePopup },
      ],
    })
  }, []);

  return (
    <NavBarContainer>
      <SearchButton />
      <MenuButton icon={mdiCog}>
        <MenuItem href='https://wplannerteam.notion.site/a858124ff6254c7e8731e12a022d22d6?pvs=4'>공지사항</MenuItem>
        <MenuItem href='https://wplannerteam.notion.site/612fd9a4bdee41b2948ea4cfbfcd254a?pvs=4'>사용방법</MenuItem>
        <MenuItem href='http://pf.kakao.com/_ZcKxaG/chat'>오류제보/문의하기</MenuItem>
        <MenuItem href='https://wplannerteam.notion.site/Wplanner-4f3faa443e8c4cccb9bbc9d1a27955f4?pvs=4'>이용약관</MenuItem>
        <MenuItem href='https://wplannerteam.notion.site/Wplanner-954f56204fc948399c35509f30d173b1?pvs=4'>개인정보 취급방침</MenuItem>
      </MenuButton>
      <MenuButton icon={mdiAccount}>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        <MenuItem onClick={handleSignOut}>회원탈퇴</MenuItem>
      </MenuButton>
    </NavBarContainer>
  );
}