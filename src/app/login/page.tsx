'use client';

import styled from 'styled-components'
import GoogleLoginButton from './GoogleLoginButton';
import Link from 'next/link';
import Svgs from '@/assets/Svgs';
import useDevice from '@/hooks/useDevice';

const Container = styled.main`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  left: calc(50% - 18.75rem);
  top: 15%;
  width: 37.5rem;
  height: 34.375rem;
  padding: 7.5rem 3.125rem;
  border: 1px solid ${({ theme }) => theme.colors.black20};
  border-radius: 20px;

  @media ${({ theme }) => theme.devices.mobile} {
    top: var(--new-header-height);
    left: 0;
    width: 100%;
    height: calc(100vh - var(--new-header-height));
    border: none;
    justify-content: flex-start;
    padding: 0 1.25rem;
  }
`;

const Title = styled.div`
  width: 100%;

  @media ${({ theme }) => theme.devices.mobile} {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const LogoWrapper = styled.div`
  width: auto;
  padding-left: 2rem;
  margin: 0 auto;
  text-align: center;

  @media ${({ theme }) => theme.devices.mobile} {
    padding-left: 1rem;
  }
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.25rem;
  font-weight: normal;
  margin-top: 1.25rem;
  color: ${({ theme }) => theme.colors.black50};
  user-select: none;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 1.125rem;
  }
`;

const ButtonBox = styled.div`
  @media ${({ theme }) => theme.devices.mobile} {
    flex: auto 0 0;
    padding-top: .75rem;
    padding-bottom: 3rem;
  }
`;

const ButtonDescription = styled.p`
  text-align: center;
  font-size: .9375rem;
  color: ${({ theme }) => theme.colors.black50};
  user-select: none;
  margin-bottom: .5rem;
`;

export default function Login() {
  const device = useDevice();

  return (
    <Container>
      <Title>
        <LogoWrapper>
          <Svgs svgKey={device === 'mobile' ? 'mainLogoSmall' : 'mainLogoBig'} />
        </LogoWrapper>
        <Description>복잡한 일정과 하루를 가장 쉽고{device === 'mobile' && <br />} 편하게 관리 하는 방법</Description>
      </Title>
      <ButtonBox>
        <ButtonDescription>구글 계정으로 3초만에 시작하기</ButtonDescription>
        <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}oauth2/authorization/google`}><GoogleLoginButton /></Link>
      </ButtonBox>
    </Container>
  )
}
