import DatePicker from "@/components/common/date-picker/DatePicker";
import time from "@/lib/time";
import { Dayjs } from "dayjs";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`

`;

export default function NewScheduleModal() {
  const [startDate, setStartDate] = useState<Dayjs>(time.now());

  const handleStartDateChange = (value: Dayjs) => {
    console.log(value);
    setStartDate(value);
  }

  return (
    <Container>
      <DatePicker value={startDate} onChange={handleStartDateChange} />
    </Container>
  )
}