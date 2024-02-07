'use client';

import Image from "next/image";
import styled from "styled-components";
import AgreeOption from "./AgreeOption";
import { useCallback, useState } from "react";

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

const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  line-height: 2.25rem;
  text-align: center;
`;

const DivideLine = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  margin: 1rem auto;
`;

const AgreeOptions = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Buttons = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ fill: number }>`
  flex-grow: 1;
  height: 2.625rem;
  background-color: ${({ fill, theme }) => fill ? theme.colors.blue : 'white'};
  border: 1px solid ${({ fill, theme }) => fill ? theme.colors.blue : theme.colors.black};
  border-radius: 10px;
  cursor: pointer;
  color: ${({ fill, theme }) => fill ? 'white' : theme.colors.black};
  font-weight: bold;
`;

export default function Terms() {
  const [isAgreeTermsOfUse, setAgreeTermsOfUse] = useState(false);
  const [isAgreePersonal, setAgreePersonal] = useState(false);

  const handleAllAgreeChange = useCallback(() => {
    if(isAgreeTermsOfUse && isAgreePersonal) {
      setAgreeTermsOfUse(false);
      setAgreePersonal(false);
    } else {
      setAgreeTermsOfUse(true);
      setAgreePersonal(true);
    }
  }, [isAgreeTermsOfUse, isAgreePersonal]);

  const handleIsAgreeTermsOfUseChange = useCallback(() => {
    setAgreeTermsOfUse(!isAgreeTermsOfUse);
  }, [isAgreeTermsOfUse]);

  const handleIsAgreePersonalChange = useCallback(() => {
    setAgreePersonal(!isAgreePersonal);
  }, [isAgreePersonal]);

  return (
    <Container>
      <Title>
        w p l a n n e r
        <IconWrapper>
          <Image src={'/images/icon_clock.svg'} alt='시계 아이콘' fill />
        </IconWrapper>
      </Title>
      <SubTitle>
        wplanner 가입
      </SubTitle>
      <DivideLine />
      <AgreeOptions>
        <AgreeOption
          value={isAgreeTermsOfUse && isAgreePersonal}
          onChange={handleAllAgreeChange}
          href=""
          all
        >
          전체 동의합니다.
        </AgreeOption>
        <AgreeOption
          value={isAgreeTermsOfUse}
          onChange={handleIsAgreeTermsOfUseChange}
          href="https://wplannerteam.notion.site/Wplanner-4f3faa443e8c4cccb9bbc9d1a27955f4?pvs=4"
        >
          이용약관 동의(필수)
        </AgreeOption>
        <AgreeOption
          value={isAgreePersonal}
          onChange={handleIsAgreePersonalChange}
          href="https://wplannerteam.notion.site/Wplanner-954f56204fc948399c35509f30d173b1?pvs=4"
        >
          개인정보 수집 및 이용에 대한 동의(필수)
        </AgreeOption>
      </AgreeOptions>
      <Buttons>
        <Button fill={0}>취소</Button>
        <Button fill={1}>확인</Button>
      </Buttons>
    </Container>
  );
}