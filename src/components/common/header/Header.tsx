'use client';

import styled from 'styled-components';
import Logo from './Logo';
import NavBar from './NavBar';
import Monthly from './Monthly';
import useDevice from '@/hooks/useDevice';
import { usePathname } from 'next/navigation';
import { useCurrentDate } from '@/providers/CurrentDateProvider/useCurrentDate';

const Container = styled.header.withConfig({ shouldForwardProp: p => !['isHeaderVisible'].includes(p) })<{ isHeaderVisible: number }>`
  ${({ isHeaderVisible }) => isHeaderVisible ? '' : 'display: none;'}
  width: 100%;
  height: var(--header-height);
  background: white;
  padding: var(--header-padding);

  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  @media ${({ theme }) => theme.devices.mobile} {
    height: 50%;
  }
`;

const NavContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  @media ${({ theme }) => theme.devices.mobile} {
    justify-content: flex-end;
  }
`;

export default function Header() {
  const path = usePathname();
  const isHeaderVisible = path !== '/login' && path !== '/login/terms';

  const device = useDevice();
  const { currentDate, setCurrentDate } = useCurrentDate();

  return (
    <Container isHeaderVisible={isHeaderVisible ? 1 : 0}>
      <Row>
        <Logo />
        <NavContainer>
          {device !== 'mobile' && (<Monthly value={currentDate} onChange={setCurrentDate}/>)}
          <NavBar />
        </NavContainer>
      </Row>
      {device === 'mobile' && (
        <Row>
          <Monthly value={currentDate} onChange={setCurrentDate}/>
        </Row>
      )}
    </Container>
  );
}
