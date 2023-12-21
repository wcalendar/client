import { useState } from "react";
import styled from "styled-components";
import MiniCalendar from "./MiniCalendar";
import { Dayjs } from "dayjs";
import time from "@/lib/time";

type DatePickerProps = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
}

const Container = styled.div`
  position: relative;
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
}: DatePickerProps) {
  const [isMiniCalendarOpen, setMiniCalendarOpen] = useState(false);

  const handleToggleMiniCalendar = () => {
    setMiniCalendarOpen(!isMiniCalendarOpen);
  }

  const handleDateClick = (value: Dayjs) => {
    onChange(value);
    setMiniCalendarOpen(false);
  }

  return (
    <Container>
      <Selector onClick={handleToggleMiniCalendar}>
        {time.toString(value, 'YYYY.MM.DD')}
      </Selector>
      {isMiniCalendarOpen && (
        <MiniCalendar date={value} onDateClick={handleDateClick} />
      )}
    </Container>
  );
}