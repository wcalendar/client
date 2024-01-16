import Dropdown from "@/components/common/Dropdown";
import RadioButton from "@/components/common/RadioButton";
import DatePicker from "@/components/common/date-picker/DatePicker";
import FixedModal, { ModalButton } from "@/components/common/fixed-modal/FixedModal";
import time from "@/lib/time";
import { mdiMinus } from "@mdi/js";
import Icon from "@mdi/react";
import { Dayjs } from "dayjs";
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { CategoryDto, CategoryToRender, FixedCategoryInfo, NewScheduleDto, NewScheduleModalInfo, ScheduleToRender } from "@/types";
import { categoryListDummyData } from "@/dummies/calendar";
import Spinnable from "@/components/common/spinner/Spinnable";

interface NewScheduleModal {
  onClose: () => void;
  onScheduleCreate: (newSchedule: NewScheduleDto) => void;
  newScheduleModalInfo: NewScheduleModalInfo;
}

const Container = styled.div`
  position: relative;
  height: 30rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1.75rem;
  display: flex;
  margin-bottom: 1rem;
`;

const SubLine = styled.div`
  display: none;
  width: 100%;
  height: .875rem;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.devices.mobile} {
    display: flex;
  }
`;

const DesktopDurationWrapper = styled.div`
  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }

  width: auto;
  height: 100%;
  display: flex;
`;

const Label = styled.div`
  flex-basis: 6rem;
  flex-grow: 0;
  flex-shrink: 0;
  height: 1.75rem;
  line-height: 1.75rem;
  font-size: .875rem;
`;

const Input = styled.input`
  flex-basis: calc(100% - 6rem - 3rem);
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
  text-indent: .5rem;

  &:focus {
    outline: none;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    flex-basis: calc(100% - 6rem);
  }
`;

const Interval = styled.div<{ $disabled: number }>`
  width: 1rem;
  margin: 0 .5rem;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme, $disabled }) => $disabled ? `color: ${theme.colors.gray};` : ''}

  svg {
    color: inherit;
  }

  path {
    color: inherit;
  }
`;

const DropDownWrapper = styled.div`
  flex-basis: calc(100% - 6rem - 3rem);
  height: 100%;

  @media ${({ theme }) => theme.devices.mobile} {
    flex-basis: calc(100% - 6rem);
  }
`;

const Tips = styled.ul`
  margin-top: 2rem;
  padding: 0 1rem;
`;

const Tip = styled.li`
  font-size: .75rem;
`;

const isScheduleToRender = (schedule: ScheduleToRender | undefined): schedule is ScheduleToRender => {
  return Boolean(schedule);
}

const isFixedCategoryInfo = (fixedCategoryInfo: FixedCategoryInfo | undefined): fixedCategoryInfo is FixedCategoryInfo => {
  return Boolean(fixedCategoryInfo);
}

export default function NewScheduleModal({
  onClose,
  onScheduleCreate,
  newScheduleModalInfo
}: NewScheduleModal) {
  const { schedule, fixedCategoryInfo } = newScheduleModalInfo;

  const isUpdateMode = isScheduleToRender(schedule);
  const isFixedCategoryMode = isFixedCategoryInfo(fixedCategoryInfo);

  const [categoryList, setCategoryList] = useState<CategoryDto[]>([]);
  const [scheduleTitle, setScheduleTitle] = useState(isUpdateMode ? schedule.content : '');
  const [isDuration, setDuration] = useState(isUpdateMode ? !schedule.startDate.isSame(schedule.endDate) : false);
  const [startDate, setStartDate] = useState<Dayjs>(isUpdateMode ? schedule.startDate : (isFixedCategoryMode ? fixedCategoryInfo.date : time.now()));
  const [endDate, setEndDate] = useState<Dayjs>(isUpdateMode ? schedule.endDate : (isFixedCategoryMode ? fixedCategoryInfo.date : time.now()));
  const [categoryIdx, setCategoryIdx] = useState(0);
  // TODO isPriority로 수정해야함
  const [isPriority, setPriority] = useState(isUpdateMode ? schedule.isFinished : true);

  const [isLoading, setLoading] = useState(false);

  const isDropdownDisabled = useMemo(() => {
    return categoryList.length === 0;
  }, [categoryList]);

  const dropdownValues = useMemo<string[]>(() => {
    if(isDropdownDisabled) return ['데이터를 불러오는 중 입니다.'];

    const result: string[] = ['-'];

    let idx = 1;
    categoryList.forEach(c1 => {
      result.push(c1.categoryName);
      if(isFixedCategoryMode && fixedCategoryInfo.categoryId === c1.categoryId) setCategoryIdx(idx);
      idx++;

      c1.children.forEach(c2 => {
        result.push(`  ${c2.categoryName}`);
        if(isFixedCategoryMode && fixedCategoryInfo.categoryId === c2.categoryId) setCategoryIdx(idx);
        idx++;

        c2.children.forEach(c3 => {
          result.push(`    ${c3.categoryName}`);
          if(isFixedCategoryMode && fixedCategoryInfo.categoryId === c3.categoryId) setCategoryIdx(idx);
          idx++;
        })
      })
    });

    return result;
  }, [isDropdownDisabled, categoryList]);


  // 기간이 변경되면 새 카테고리 리스트를 가져옴
  useEffect(() => {
    const getCategoryList = async () => {
      // TODO API
      setTimeout(() => {
        setCategoryList(categoryListDummyData);
      }, 1000);
    };
    
    getCategoryList();
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

  const handleSaveNewScheduleClick = useCallback(() => {
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

    // TODO api
    onScheduleCreate({
      scheduleContent: newTitle,
      scheduleStartDate: time.toString(startDate, 'YYYY-MM-DD'),
      scheduleEndDate: isDuration ? time.toString(startDate, 'YYYY-MM-DD') : time.toString(endDate, 'YYYY-MM-DD'),
      categoryId: categoryList[categoryIdx-1].categoryId,
      schedulePriority: -1,
      isDuration: isDuration,
      isPriority: isPriority,
    });
  }, [scheduleTitle, startDate, endDate, categoryList, categoryIdx, isDuration, isPriority, onScheduleCreate]);

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
      width='33.75rem'
      title={isUpdateMode ? '일정 수정' : '일정 등록'}
      buttonList={buttonList}
      onClose={onClose}
    >
      <Container>
        <Spinnable isLoading={isLoading}>
          <Line>
            <Label>제목</Label>
            <Input maxLength={20} value={scheduleTitle} onChange={handleChangeScheduleTitle}></Input>
          </Line>
          <Line>
            <Label>일시</Label>
            <DatePicker value={startDate} onChange={handleStartDateChange} disabled={isFixedCategoryMode} />
            <Interval $disabled={isDuration ? 0 : 1} ><Icon path={mdiMinus} /></Interval>
            <DatePicker value={endDate} onChange={handleEndDateChange} disabled={!isDuration} />
            <DesktopDurationWrapper>
              <div style={{width: '1rem'}} />
              <RadioButton label="하루 일정" checked={!isDuration} onChange={() => handleDurationChange(false)} />
              <RadioButton label="기간 일정" checked={isDuration} onChange={() => handleDurationChange(true)} />
            </DesktopDurationWrapper>
          </Line>
          <SubLine>
            <Label />
            <RadioButton label="하루 일정" checked={!isDuration} onChange={() => handleDurationChange(false)} />
            <RadioButton label="기간 일정" checked={isDuration} onChange={() => handleDurationChange(true)} />
          </SubLine>
          <Line>
            <Label>카테고리</Label>
            <DropDownWrapper>
              <Dropdown
                values={dropdownValues}
                selectedIdx={categoryIdx}
                height='1.75rem'
                onChange={handleCategoryIdxChange}
                disabled={isDropdownDisabled}
              />
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
        </Spinnable>
      </Container>
    </FixedModal>
  )
}