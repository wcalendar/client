'use client';

import Image from 'next/image';
import styled from 'styled-components'

const Container = styled.main`
  position: fixed;
  left: calc(50% - 200px);
  top: calc(50% - 140px);
  width: 400px;
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
  top: -0.5rem;
  right: 0;
  width: 2.375rem;
  height: 2.375rem;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const Tip = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray};
  font-size: .875rem;
  margin-bottom: 1rem;
`;

const KakaoLoginButton = styled.button`
  display: block;
  margin: 0 auto;
  width: 300px;
  height: 45px;
  position: relative;
  cursor: pointer;
  border: none;
`;

export default function Login() {

  const handleKakaoLoginClick = async () => {
    // 임시
    const response = await fetch('/');
    const data = await response.json();
  };

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
      <KakaoLoginButton onClick={handleKakaoLoginClick}>
        <Image src={'/images/kakao_login_medium_wide.png'} alt='카카오 로그인' width={300} height={45} />
      </KakaoLoginButton>
    </Container>
  )
}
