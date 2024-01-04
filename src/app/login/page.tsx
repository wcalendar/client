'use client';

import Image from 'next/image';
import styled from 'styled-components'
import GoogleLoginButton from './GoogleLoginButton';
import Link from 'next/link';

const Container = styled.main`
  position: fixed;
  left: calc(50% - 15rem);
  top: 10rem;
  width: 30rem;
  height: auto;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: bold;
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 1rem;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: -1rem;
  right: 2.75rem;
  width: 2.375rem;
  height: 2.375rem;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.75rem;
  font-weight: normal;
  margin-bottom: 1rem;
`;

const Tip = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray};
  font-size: .875rem;
  margin-bottom: 1rem;
`;

export default function Login() {
  return (
    <Container>
      <Title>
        w p l a n n e r
        <IconWrapper>
          <Image src={'/images/icon_clock.svg'} alt='시계 아이콘' fill />
        </IconWrapper>
      </Title>
      <Description>복잡한 일정과 하루를<br />가장 쉽고 편하게 관리 하는 방법</Description>
      <Tip>카카오톡으로 3초만에 시작하기</Tip>
      <Link href={'https://wplanner.co.kr/oauth2/authorization/google'}><GoogleLoginButton /></Link>
    </Container>
  )
}
