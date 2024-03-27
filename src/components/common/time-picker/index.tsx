import Svgs from "@/assets/Svgs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Counter from "./Counter";
import { ModalStatus } from "@/types";

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['width'].includes(p),
})<{ width: string }>`
  position: relative;
  width: ${({ width }) => width};
`;

const InputBox = styled.div`
  width: 100%;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.black20};
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  user-select: none;
  padding: 0 .5rem;
  display: flex;
  align-items: center;
`;

const InputText = styled.div.withConfig({
  shouldForwardProp: p => !['notSelected'].includes(p),
})<{ notSelected: boolean }>`
  flex-grow: 1;
  font-size: .9375rem;
  color: ${({ theme, notSelected }) => notSelected ? theme.colors.black50 : theme.colors.black};  
`;

const IconWrapper = styled.div`
  flex: 1.5rem 0 0;
  height: 1.5rem;

  svg {
    pointer-events: none;
  }

  path {
    fill: ${({ theme }) => theme.colors.black50};
  }
`;

const TimeBox = styled.div.withConfig({
  shouldForwardProp: p => !['status'].includes(p),
})<{ status: ModalStatus }>`
  position: absolute;
  top: 3rem;
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.black20};
  box-shadow: 4px 4px 12px 0 ${({ theme }) => theme.colors.black12};
  display: flex;
  gap: .75rem;
  justify-content: center;
  align-items: center;
  transform: ${({ status }) => status === 'open' ? 'translateY(0)' : 'translateY(-10%)'} ;
  opacity: ${({ status }) => status === 'open' ? '1' : '0'};
  animation: ${({ status }) => status === 'open' ? 'fromUpOpen' : 'fromUpClose'} .25s;
`;

const Colon = styled.div`
  width: .25rem;
  height: .75rem;
`;

const Point = styled.div`
  width: .25rem;
  height: .25rem;
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  margin-bottom: .25rem;
`;

interface TimePickerProps {
  width?: string;
  name?: string;
}

export default function TimePicker({
  width = '100%',
  name,
}: TimePickerProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const timeBoxRef = useRef<HTMLDivElement>(null);

  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const inputValue = useMemo(() => `${hour < 10 ? `0${hour}` : `${hour}`}:${minute < 10 ? `0${minute}` : `${minute}`}`, [hour, minute]);

  const [timeBoxStatus, setTimeBoxStatus] = useState<ModalStatus>('closed');

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      console.log(e.target);
      if(inputRef.current && !inputRef.current.contains(e.target as Node) && timeBoxRef.current && !timeBoxRef.current.contains(e.target as Node)) {
        console.log('asdf');
        setTimeBoxStatus('closing');
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, []);

  const handleHourChange = useCallback((value: number) => {
    if(value >= -1 && value <= 24) {
      if(value === -1) setHour(23);
      else if(value === 24) setHour(0);
      else setHour(value);
    } else setHour(0);
  }, []);

  const handleMinuteChange = useCallback((value: number) => {
    if(value >= -1 && value <= 60) {
      if(value === -1) setMinute(59);
      else if(value === 60) setMinute(0);
      else setMinute(value);
    } else setMinute(0);
  }, []);

  const handleInputClick = useCallback(() => {
    setTimeBoxStatus('open');
  }, []);

  const handleTimeBoxAnimationEnd = useCallback(() => {
    if(timeBoxStatus === 'closing') setTimeBoxStatus('closed');
  }, [timeBoxStatus]);

  return (
    <Container width={width}>
      <input name={name} type='hidden' />
      <InputBox ref={inputRef} onClick={handleInputClick}>
        <InputText notSelected={!Boolean(inputValue)}>{inputValue || 'hh:mm'}</InputText>
        <IconWrapper>
          <Svgs svgKey={timeBoxStatus === 'closed' ? 'arrowDown' : 'arrowUp'} />
        </IconWrapper>
      </InputBox>
      {timeBoxStatus !== 'closed' && (
        <TimeBox ref={timeBoxRef} onAnimationEnd={handleTimeBoxAnimationEnd} status={timeBoxStatus}>
          <Counter value={hour} onChange={handleHourChange} max={23} />
          <Colon>
            <Point />
            <Point />
          </Colon>
          <Counter value={minute} onChange={handleMinuteChange} max={59} />
        </TimeBox>
      )}
    </Container>
  );
}