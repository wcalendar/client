import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MiniCalendar from "./MiniCalendar";
import { Dayjs } from "dayjs";
import time from "@/lib/time";

type DatePickerProps = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
  invisible?: boolean;
}

const Container = styled.div<{ $invisible: number }>`
  position: relative;
  visibility: ${({ $invisible }) => $invisible ? 'hidden' : 'visible'};
`;

const Selector = styled.div`
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
`;

export default function DatePicker({
  value,
  onChange,
  invisible,
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
    setMiniCalendarOpen(!isMiniCalendarOpen);
  }

  const handleDateClick = (value: Dayjs) => {
    onChange(value);
    setMiniCalendarOpen(false);
  }

  return (
    <Container ref={datePickerRef} $invisible={invisible ? 1 : 0}>
      <Selector onClick={handleToggleMiniCalendar}>
        {time.toString(value, 'YYYY.MM.DD')}
      </Selector>
      {isMiniCalendarOpen && (
        <MiniCalendar date={value} onDateClick={handleDateClick} />
      )}
    </Container>
  );
}