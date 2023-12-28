import Dropdown from "@/components/common/Dropdown";
import RadioButton from "@/components/common/RadioButton";
import DatePicker from "@/components/common/date-picker/DatePicker";
import FixedModal, { FixedModalProps } from "@/components/common/fixed-modal/FixedModal";
import { CategoryDto, categoryListDummyData } from "@/dummies/calendar";
import time from "@/lib/time";
import { mdiMinus } from "@mdi/js";
import Icon from "@mdi/react";
import { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import styled from "styled-components";

interface NewScheduleModal extends Omit<FixedModalProps, 'children'> {

}

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

const DropDownWrapper = styled.div`
  width: 60%;
  height: 100%;
`;

const Tips = styled.ul`
  margin-top: 2rem;
  padding: 0 1rem;
`;

const Tip = styled.li`
  font-size: .75rem;
`;

export default function NewScheduleModal({
  width,
  title,
  buttonList,
  onClose,
}: NewScheduleModal) {
  // TODO 카테고리 리스트 구하는 로직 필요
  const categoryList = useMemo<CategoryDto[]>(() => {
    return categoryListDummyData;
  }, []);

  const dropdownValues = useMemo<string[]>(() => {
    return [
      '-',
      ...categoryList.map(category => category.name),
    ]
  }, [categoryList]);

  const [startDate, setStartDate] = useState<Dayjs>(time.now());
  const [endDate, setEndDate] = useState<Dayjs>(time.now());
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [isPriority, setPriority] = useState(true);

  const handleStartDateChange = (value: Dayjs) => {
    setStartDate(value);
  }

  const handleEndDateChange = (value: Dayjs) => {
    setEndDate(value);
  }

  const handleCategoryIdxChange = (idx: number) => {
    setCategoryIdx(idx);
  }

  const handlePriorityChange = (value: boolean) => {
    setPriority(value);
  }

  return (
    <FixedModal
      width={width}
      title={title}
      buttonList={buttonList}
      onClose={onClose}
    >
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
          <DropDownWrapper>
            <Dropdown values={dropdownValues} selectedIdx={categoryIdx} height='1.75rem' onChange={handleCategoryIdxChange} />
          </DropDownWrapper>
        </Line>
        <Line>
          <Label>우선순위 추가</Label>
          <RadioButton label="추가" checked={isPriority} onChange={() => handlePriorityChange(true)} />
          <RadioButton label="추가하지 않음" checked={!isPriority} onChange={() => handlePriorityChange(false)} />
        </Line>
        <Tips>
          <Tip>{`카테고리 선택 후 일시 변경시에 카테고리가 없는 '월'로의 이동 및 선택은 불가합니다.`}</Tip>
          <Tip>{`카테고리 리스트는 선택한 일시를 기준으로 일시의 시작 '월'과 종료 '월' 시점에 동시에 존재하는 카테고리들이 보여집니다.`}</Tip>
        </Tips>
      </Container>
    </FixedModal>
  )
}