import Dropdown from "@/components/common/Dropdown";
import RadioButton from "@/components/common/RadioButton";
import DatePicker from "@/components/common/date-picker/DatePicker";
import time from "@/lib/time";
import { mdiMinus } from "@mdi/js";
import Icon from "@mdi/react";
import { Dayjs } from "dayjs";
import { ChangeEventHandler, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { ErrorRes, FixedCategoryInfo, ModalStatus, NewScheduleDto, NewScheduleModalInfo, ScheduleToRender } from "@/types";
import Spinnable from "@/components/common/spinner/Spinnable";
import { apis } from "@/lib/apis";
import { AxiosError } from "axios";
import FixedModal from "../fixed-modal/FixedModal";
import useCategoryListDropdown from "./useCategoryListDropdown";
import useDev from "@/hooks/useDev";

const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 0 1rem;
  user-select: none;

  font-size: .875rem;
  font-weight: bold;
  color: white;
  line-height: 2.5rem;
`;

const ModalBody = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 1rem;
`;

const Container = styled.div`
  position: relative;
  height: 26rem;
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

const Required = styled.span`
  color: ${({ theme }) => theme.colors.warningRed};
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
  margin-bottom: 2rem;
  padding: 0 1rem;
`;

const Tip = styled.li`
  font-size: .75rem;
`;

const DeleteLine = styled.div`
  width: 100%;
  font-size: .75rem;
  height: 1rem;
  line-height: 1rem;
  color: ${({ theme }) => theme.colors.warningRed};
  user-select: none;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: .75rem;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 1rem;
`;

const ModalFooter = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
`;

const Button = styled.button`
  flex-basis: 50%;
  height: 100%;
  line-height: 4rem;
  border: none;
  background: white;
  font-size: 1.25rem;
  cursor: pointer;
`;

const isScheduleToRender = (schedule: ScheduleToRender | undefined): schedule is ScheduleToRender => {
  return Boolean(schedule);
}

const isFixedCategoryInfo = (fixedCategoryInfo: FixedCategoryInfo | undefined): fixedCategoryInfo is FixedCategoryInfo => {
  return Boolean(fixedCategoryInfo);
}

export interface NewScheduleModalProps {
  onScheduleCreate: () => void;
  newScheduleModalInfo: NewScheduleModalInfo;
}

export default function NewScheduleModal({
  onScheduleCreate,
  newScheduleModalInfo
}: NewScheduleModalProps) {
  const { isDev } = useDev();
  const [status, setStatus] = useState<ModalStatus>('open');

  const { schedule, fixedCategoryInfo } = newScheduleModalInfo;

  const isUpdateMode = isScheduleToRender(schedule);
  const isFixedCategoryMode = isFixedCategoryInfo(fixedCategoryInfo);

  const isFirstLoad = useRef(true);
  const shouldSetCategoryIdx = isFirstLoad.current && (isFixedCategoryMode || isUpdateMode);

  const isFixedCategory = (categoryId: string) => {
    return isFirstLoad.current && ((isFixedCategoryMode && fixedCategoryInfo.categoryId === categoryId) || (isUpdateMode && schedule.categoryId === categoryId));
  };

  const [scheduleTitle, setScheduleTitle] = useState(isUpdateMode ? schedule.content : '');
  const [isDuration, setDuration] = useState(isUpdateMode ? !schedule.startDate.isSame(schedule.endDate) : false);
  const [startDate, setStartDate] = useState<Dayjs>(isUpdateMode ? schedule.startDate : (isFixedCategoryMode ? fixedCategoryInfo.date : time.now()));
  const [endDate, setEndDate] = useState<Dayjs>(isUpdateMode ? schedule.endDate : (isFixedCategoryMode ? fixedCategoryInfo.date : time.now()));
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [isPriority, setPriority] = useState(isUpdateMode ? schedule.isPriority : true);

  const [isLoading, setLoading] = useState(false);

  const {
    categoryList,
    firstCategoryIdx,
    secondCategoryIdx,
    thirdCategoryIdx,
    firstDropdownValues,
    secondDropdownValues,
    thirdDropdownValues,
    isDropdownDisabled,
    handleFirstCategoryIdxChange,
    handleSecondCategoryIdxChange,
    handleThirdCategoryIdxChange,
  } = useCategoryListDropdown(startDate, endDate, isFirstLoad, shouldSetCategoryIdx, isFixedCategory);

  const handleClose = useCallback(() => {
    setStatus('closing');
  }, []);

  const handleChangeScheduleTitle: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setScheduleTitle(e.target.value);
  }, []);

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

  const handleDurationChange = useCallback((value: boolean) => {
    setDuration(value);
    if(!value) setEndDate(startDate);
  }, [startDate]);

  const handlePriorityChange = useCallback((value: boolean) => {
    setPriority(value);
  }, []);

  const handleSaveNewScheduleClick = useCallback(async () => {
    // Title
    const newTitle = scheduleTitle.trim();
    if(newTitle.length === 0) {
      alert('제목을 입력해주세요');

      return;
    }

    // Category
    if(firstCategoryIdx === 0){
      alert('카테고리를 선택해주세요');

      return;
    }

    const newCategoryId = thirdCategoryIdx > 0 ?
    categoryList[firstCategoryIdx-1].children[secondCategoryIdx-1].children[thirdCategoryIdx-1].categoryId :
    (secondCategoryIdx > 0 ?
      categoryList[firstCategoryIdx-1].children[secondCategoryIdx-1].categoryId :
      categoryList[firstCategoryIdx-1].categoryId
    );

    const newScheduleDto: NewScheduleDto = {
      scheduleContent: newTitle,
      scheduleStartDate: time.toString(startDate, 'YYYY-MM-DD'),
      scheduleEndDate: !isDuration ? time.toString(startDate, 'YYYY-MM-DD') : time.toString(endDate, 'YYYY-MM-DD'),
      categoryId: newCategoryId,
      isPriority: isPriority,
    }

    if(isDev()) {
      console.log(newScheduleDto);
      return;
    }

    setLoading(true);
    try {
      const response = isUpdateMode ? await apis.updateSchedule(newScheduleDto, schedule.id) : await apis.addSchedule(newScheduleDto);
      setLoading(false);
      onScheduleCreate();
    } catch(e) {
      const error = e as AxiosError<ErrorRes>;
      console.log(error.response?.data);
    }
  }, [scheduleTitle, firstCategoryIdx, secondCategoryIdx, thirdCategoryIdx, categoryList, startDate, endDate, isDuration, isPriority, isUpdateMode, schedule]);

  return (
    <FixedModal
      width='33.75rem'
      backgroundColor="white"
      status={status}
      onModalClose={handleClose}
    >
      <ModalHeader>
        {isUpdateMode ? '일정 수정' : '일정 등록'}
      </ModalHeader>
      <ModalBody>
        <Container>
          <Spinnable isLoading={isLoading}>
            <Line>
              <Label>제목<Required>*</Required></Label>
              <Input maxLength={20} value={scheduleTitle} onChange={handleChangeScheduleTitle}></Input>
            </Line>
            <Line>
              <Label>일시<Required>*</Required></Label>
              <DatePicker value={startDate} onChange={handleStartDateChange} />
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
              <Label>카테고리<Required>*</Required></Label>
              <DropDownWrapper>
                <Dropdown
                  values={firstDropdownValues}
                  selectedIdx={firstCategoryIdx}
                  height='1.75rem'
                  onChange={handleFirstCategoryIdxChange}
                  disabled={isDropdownDisabled}
                />
              </DropDownWrapper>
            </Line>
            {firstCategoryIdx > 0 && (
              <Line>
                <Label>2단계 카테고리</Label>
                <DropDownWrapper>
                  <Dropdown
                    values={secondDropdownValues}
                    selectedIdx={secondCategoryIdx}
                    height='1.75rem'
                    onChange={handleSecondCategoryIdxChange}
                  />
                </DropDownWrapper>
              </Line>
            )}
            {secondCategoryIdx > 0 && (
              <Line>
                <Label>3단계 카테고리</Label>
                <DropDownWrapper>
                  <Dropdown
                    values={thirdDropdownValues}
                    selectedIdx={thirdCategoryIdx}
                    height='1.75rem'
                    onChange={handleThirdCategoryIdxChange}
                  />
                </DropDownWrapper>
              </Line>
            )}
            <Line>
              <Label>우선순위 추가<Required>*</Required></Label>
              <RadioButton label="추가" checked={isPriority} onChange={() => handlePriorityChange(true)} />
              <RadioButton label="추가하지 않음" checked={!isPriority} onChange={() => handlePriorityChange(false)} />
            </Line>
            <Tips>
              <Tip>{`카테고리 선택 후 일시 변경시에 카테고리가 없는 '월'로의 이동 및 선택은 불가합니다.`}</Tip>
              <Tip>{`카테고리 리스트는 선택한 일시를 기준으로 일시의 시작 '월'과 종료 '월' 시점에 동시에 존재하는 카테고리들이 보여집니다.`}</Tip>
            </Tips>
            {isUpdateMode && (
              <DeleteLine>
                일정을 삭제 하시겠습니까? 삭제한 일정은 복구할 수 없습니다.
                <DeleteButton>삭제하기</DeleteButton>
              </DeleteLine>
            )}
          </Spinnable>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>
          취소
        </Button>
        <Button onClick={handleSaveNewScheduleClick} style={{ fontWeight: 'bold' }}>
          저장
        </Button>
      </ModalFooter>
    </FixedModal>
  )
}