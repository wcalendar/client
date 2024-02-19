import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MiniCalendar from "./MiniCalendar";
import { Dayjs } from "dayjs";
import time from "@/lib/time";

type DatePickerProps = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
  disabled?: boolean;
}

const Container = styled.div`
  position: relative;
`;

const Selector = styled.div<{ disabled: number }>`
  display: inline-block;
  width: auto;
  height: 1.75rem;
  line-height: 1.75rem;
  padding: 0 .5rem;
  font-size: .75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
  user-select: none;
  cursor: pointer;

  ${({ theme, disabled }) => disabled ? `
  cursor: default;
  color: ${theme.colors.gray};
  background: ${theme.colors.gray}40;
  ` : ''}
`;

export default function DatePicker({
  value,
  onChange,
  disabled,
}: DatePickerProps) {
  const [isMiniCalendarOpen, setMiniCalendarOpen] = useState(false);

  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if(datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setMiniCalendarOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, []);

  const handleToggleMiniCalendar = () => {
    if(!disabled) setMiniCalendarOpen(!isMiniCalendarOpen);
  }

  const handleDateClick = (value: Dayjs) => {
    onChange(value);
    setMiniCalendarOpen(false);
  }

  return (
    <Container ref={datePickerRef}>
      <Selector disabled={disabled ? 1 : 0} onClick={handleToggleMiniCalendar}>
        {time.toString(value, 'YYYY.MM.DD')}
      </Selector>
      {isMiniCalendarOpen && (
        <MiniCalendar date={value} onDateClick={handleDateClick} />
      )}
    </Container>
  );
}