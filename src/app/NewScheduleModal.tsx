import Dropdown from "@/components/common/Dropdown";
import RadioButton from "@/components/common/RadioButton";
import DatePicker from "@/components/common/date-picker/DatePicker";
import FixedModal, { FixedModalProps, ModalButton } from "@/components/common/fixed-modal/FixedModal";
import { CategoryDto, categoryListDummyData } from "@/dummies/calendar";
import time from "@/lib/time";
import { mdiMinus } from "@mdi/js";
import Icon from "@mdi/react";
import { Dayjs } from "dayjs";
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ScheduleToRender } from "./page";

interface NewScheduleModal extends Omit<FixedModalProps, 'children' | 'buttonList' | 'title'> {
  schedule?: ScheduleToRender;
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

const Interval = styled.div<{ $invisible: number }>`
  width: 1rem;
  margin: 0 .5rem;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ $invisible }) => $invisible ? 'hidden' : 'visible'};
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
  onClose,
  schedule,
}: NewScheduleModal) {
  const [categoryList, setCategoryList] = useState<CategoryDto[]>([]);
  const [scheduleTitle, setScheduleTitle] = useState(schedule ? schedule.content : '');
  const [isDuration, setDuration] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs>(schedule ? schedule.startDate : time.now());
  const [endDate, setEndDate] = useState<Dayjs>(schedule ? schedule.endDate : time.now());
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [isPriority, setPriority] = useState(schedule ? schedule.isFinished : true);

  const dropdownValues = useMemo<string[]>(() => {
    return [
      '-',
      ...categoryList.map(category => category.categoryName),
    ]
  }, [categoryList]);

  // 기간이 변경되면 새 카테고리 리스트를 가져옴
  useEffect(() => {
    setCategoryIdx(0);

    // TODO 카테고리 리스트 구하는 로직 필요
    setCategoryList(categoryListDummyData);
  }, [startDate, endDate]);

  const handleChangeScheduleTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setScheduleTitle(e.target.value);
  }

  const handleStartDateChange = useCallback((value: Dayjs) => {
    setStartDate(value);

    if(value.isAfter(endDate)) {
      setEndDate(value);
    }
  }, [endDate]);

  const handleEndDateChange = useCallback((value: Dayjs) => {
    setEndDate(value);

    if(value.isBefore(startDate)) {
      setStartDate(value);
    }
  }, [startDate]);

  const handleDurationChange = (value: boolean) => {
    setDuration(value);
  }

  const handleCategoryIdxChange = (idx: number) => {
    setCategoryIdx(idx);
  }

  const handlePriorityChange = (value: boolean) => {
    setPriority(value);
  }

  const handleSaveNewScheduleClick = () => {
    // Title
    const newTitle = scheduleTitle.trim();
    if(newTitle.length === 0) {
      alert('제목을 입력해주세요');

      return;
    }

    // Category
    if(categoryIdx === 0){
      alert('카테고리를 선택해주세요');

      return;
    }

  }

  const buttonList: ModalButton[] = [
    {
      text: '저장',
      onClick: handleSaveNewScheduleClick,
    },
    {
      text: '취소',
      onClick: onClose,
    },
  ];

  return (
    <FixedModal
      width={width}
      title={schedule ? '일정 수정' : '일정 등록'}
      buttonList={buttonList}
      onClose={onClose}
    >
      <Container>
        <Line>
          <Label>제목</Label>
          <Input maxLength={20} value={scheduleTitle} onChange={handleChangeScheduleTitle}></Input>
        </Line>
        <Line>
          <Label>일시</Label>
          <DatePicker value={startDate} onChange={handleStartDateChange} />
          <Interval $invisible={isDuration ? 0 : 1} ><Icon path={mdiMinus} /></Interval>
          <DatePicker value={endDate} onChange={handleEndDateChange} invisible={!isDuration} />
          <div style={{width: '1rem'}} />
          <RadioButton label="하루 일정" checked={!isDuration} onChange={() => handleDurationChange(false)} />
          <RadioButton label="기간 일정" checked={isDuration} onChange={() => handleDurationChange(true)} />
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