import { ErrorRes, ScheduleModalInfo, ScheduleToRender } from "@/types";
import time from "@/lib/time";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";
import FloatingModal from "../floating-modal/FloatingModal";
import { useCallback, useState } from "react";
import { useModal } from "@/providers/ModalProvider/useModal";
import { apis } from "@/lib/apis";
import { AxiosError } from "axios";
import useDev from "@/hooks/useDev";

const Header = styled.div`
  width: 100%;
  padding: .75rem;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
`;

const Title = styled.div<{ $is_finished: number }>`
  flex-grow: 1;
  font-size: .875rem;
  font-weight: bold;
  ${({ $is_finished }) => $is_finished ? `text-decoration: line-through;` : ''}
`;

const CheckBox = styled.input`
  flex-basis: 13px;
  flex-shrink: 0;
  height: 13px;
  margin-left: .25rem;
`;

const CloseButton = styled.button`
  flex-basis: 13px;
  flex-shrink: 0;
  height: 13px;
  margin-left: .25rem;
  border: none;
  background: white;
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  padding: .5rem;
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  padding: 0 1rem;
  margin-bottom: .5rem;
`;

const Label = styled.div`
  flex-basis: 20%;
  flex-grow: 0;
  height: 1rem;
  line-height: 1rem;
  font-size: .75rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const Value = styled.div`
  height:  1rem;
  font-size: .75rem;
  line-height: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  padding: 0 .5rem;
  height: 1.875rem;
  line-height: 1.875rem;
  font-size: .875rem;
  font-weight: bold;
  background: white;
  cursor: pointer;
`;

export type ScheduleModalProps = {
  scheduleModalInfo: ScheduleModalInfo;
  onScheduleFinish: (categoryId: string, groupCode: string) => void;
  onUpdateClick: (schedule: ScheduleToRender) => void;
  onScheduleDelete: (categoryId: string, groupCode: string) => void;
}

export default function ScheduleModal({
  scheduleModalInfo,
  onScheduleFinish,
  onUpdateClick,
  onScheduleDelete,
}: ScheduleModalProps) {
  const { isDev } = useDev();
  const [modalInfo, setModalInfo] = useState<ScheduleModalInfo>(scheduleModalInfo);
  const { x, y, schedule } = modalInfo;
  console.log(schedule.id);

  const {closeModal} = useModal();

  const handleModalClose = useCallback(() => {
    closeModal();
  }, []);

  const handleScheduleFinish = useCallback(() => {
    onScheduleFinish(schedule.categoryId, schedule.groupCode);

    const newModalInfo = {...modalInfo};
    newModalInfo.schedule.isFinished = !newModalInfo.schedule.isFinished;
    setModalInfo(newModalInfo);
  }, [modalInfo]);

  const deleteSchedule = useCallback(async (scheduleId: string) => {
    if(isDev()) return;

    try {
      const response = apis.deleteSchedule(scheduleId);
      console.log(response);
    } catch(e) {
      const error = e as AxiosError<ErrorRes>;
      console.log(error.response?.data);
    }
  }, []);

  const handleScheduleDelete = useCallback(() => {
    if(confirm('일정을 삭제하시겠습니까?')) {
      onScheduleDelete(schedule.categoryId, schedule.groupCode);
      deleteSchedule(schedule.id);
    }
  }, [schedule]);
  
  return (
    <FloatingModal mobilePos="center" x={x} y={y} onClose={handleModalClose}>
      <Header>
        <Title $is_finished={schedule.isFinished ? 1 : 0}>{schedule.content}</Title>
        <CheckBox type='checkbox' checked={schedule.isFinished} onChange={handleScheduleFinish} />
        <CloseButton onClick={handleModalClose}>
          <Icon path={mdiClose} />
        </CloseButton>
      </Header>
      <Body>
        <Line>
          <Label>일시</Label>
          <Value>{`${time.toString(schedule.startDate, 'YYYY.MM.DD')} ~ ${time.toString(schedule.endDate, 'YYYY.MM.DD')}`}</Value>
        </Line>
        <ButtonBox>
          <Button onClick={() => onUpdateClick(schedule)}>수정</Button>
          <Button onClick={handleScheduleDelete}>삭제</Button>
        </ButtonBox>
      </Body>
    </FloatingModal>
  )
}