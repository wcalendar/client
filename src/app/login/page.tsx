'use client';

import Image from 'next/image';
import styled from 'styled-components'
import GoogleLoginButton from './GoogleLoginButton';
import Link from 'next/link';

const Container = styled.main`
  position: fixed;
  left: calc(50% - 11.25rem);
  top: 10rem;
  width: 22.5rem;
  height: auto;
  padding: 1.25rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: bold;
  text-align: center;
  font-size: 3.125rem;
  margin-bottom: 1rem;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: -1rem;
  right: -1rem;
  width: 2.5rem;
  height: 2.5rem;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 3rem;
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
      <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}oauth2/authorization/google`}><GoogleLoginButton /></Link>
    </Container>
  )
}
