'use client';

import Svgs from "@/assets/Svgs";
import useDevice from "@/hooks/useDevice";
import styled from "styled-components";
import MenuButton from "./MenuButton";
import MenuItem from "./MenuItem";
import { useCallback } from "react";
import useDev from "@/hooks/useDev";
import useExceptionPopup from "@/hooks/useExceptionPopup";
import { usePopup } from "@/providers/PopupProvider/usePopup";
import { usePathname, useRouter } from "next/navigation";
import { apis } from "@/lib/apis";
import { AxiosError } from "axios";

const Container = styled.div`
  width: 100%;
  height: var(--new-header-height);
  background-color: white;
  padding: var(--new-header-vertical-padding) 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const BackButton = styled.button`
  flex: 1.5rem 0 0;
  height: 1.5rem;
  cursor: pointer;
`;

const Logo = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const MenuList = styled.div`
  display: flex;
  gap: 1.5rem;

  @media ${({ theme }) => theme.devices.mobile} {
    flex: auto 0 0;
    gap: .75rem;
  }
`;

export default function Header() {
  const { isDev } = useDev();
  const device = useDevice();
  const openExceptionPopup = useExceptionPopup();
  const pathname = usePathname();
  
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
      const error = e as AxiosError<any>;
      openExceptionPopup(error);
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
      const error = e as AxiosError<any>;
      openExceptionPopup(error);
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
    <Container>
      <BackButton>
        <Svgs svgKey="arrowLeft" />
      </BackButton>
      <Logo>
        <Svgs svgKey={device === 'mobile' ? 'logoSmall' : 'logoBig'} />
      </Logo>
      {pathname !== '/login' && (
        <MenuList>
          <MenuButton icon="preference" >
            <MenuItem href='https://wplannerteam.notion.site/a858124ff6254c7e8731e12a022d22d6?pvs=4'>공지사항</MenuItem>
            <MenuItem href='https://wplannerteam.notion.site/612fd9a4bdee41b2948ea4cfbfcd254a?pvs=4'>사용방법</MenuItem>
            <MenuItem href='http://pf.kakao.com/_ZcKxaG/chat'>오류제보/문의하기</MenuItem>
            <MenuItem href='https://wplannerteam.notion.site/Wplanner-4f3faa443e8c4cccb9bbc9d1a27955f4?pvs=4'>이용약관</MenuItem>
            <MenuItem href='https://wplannerteam.notion.site/Wplanner-954f56204fc948399c35509f30d173b1?pvs=4'>개인정보 취급방침</MenuItem>
          </MenuButton>
          <MenuButton icon='myPage'>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            <MenuItem onClick={handleSignOut}>회원탈퇴</MenuItem>
          </MenuButton>
        </MenuList>
      )}
    </Container>
  )
}