import DatePicker from "@/components/common/date-picker/DatePicker";
import time from "@/lib/time";
import { mdiMinus } from "@mdi/js";
import Icon from "@mdi/react";
import { Dayjs } from "dayjs";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1.75rem;
  display: flex;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  width: 20%;
  height: 1.75rem;
  line-height: 1.75rem;
  font-size: .875rem;
`;

const Input = styled.input`
  width: 60%;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
  text-indent: .5rem;

  &:focus {
    outline: none;
  }
`;

const Interval = styled.div`
  width: 1rem;
  margin: 0 .5rem;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tips = styled.ul`
  margin-top: 2rem;
  padding: 0 1rem;
`;

const Tip = styled.li`
  font-size: .75rem;
`;

export default function NewScheduleModal() {
  const [startDate, setStartDate] = useState<Dayjs>(time.now());
  const [endDate, setEndDate] = useState<Dayjs>(time.now());

  const handleStartDateChange = (value: Dayjs) => {
    setStartDate(value);
  }

  const handleEndDateChange = (value: Dayjs) => {
    setEndDate(value);
  }

  return (
    <Container>
      <Line>
        <Label>제목</Label>
        <Input></Input>
      </Line>
      <Line>
        <Label>일시</Label>
        <DatePicker value={startDate} onChange={handleStartDateChange} />
        <Interval><Icon path={mdiMinus} /></Interval>
        <DatePicker value={endDate} onChange={handleEndDateChange} />
      </Line>
      <Line>
        <Label>카테고리</Label>
      </Line>
      <Line>
        <Label>우선순위 추가</Label>
      </Line>
      <Tips>
        <Tip>카테고리 선택 후 일시 변경시에 카테고리가 없는 '월'로의 이동 및 선택은 불가합니다.</Tip>
        <Tip>카테고리 리스트는 선택한 일시를 기준으로 일시의 시작 '월'과 종료 '월' 시점에 동시에 존재하는 카테고리들이 보여집니다.</Tip>
      </Tips>
    </Container>
  )
}