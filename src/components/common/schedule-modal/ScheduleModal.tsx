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
import { usePopup } from "@/providers/PopupProvider/usePopup";
import useCalendarData from "@/swr/useCalendarData";
import useExceptionPopup from "@/hooks/useExceptionPopup";
import useAmplitude from "@/providers/AmplitudeProvider/useAmplitude";

const Header = styled.div`
  width: 100%;
  padding: .75rem;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.oldWhite};
`;

const Title = styled.div.withConfig({
  shouldForwardProp: p => !['isFinished'].includes(p),
})<{ isFinished: number }>`
  flex-grow: 1;
  font-size: .875rem;
  font-weight: bold;
  overflow-x: hidden;
  overflow-wrap: break-word;
  ${({ isFinished }) => isFinished ? `text-decoration: line-through;` : ''}
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
  onUpdateClick: (schedule: ScheduleToRender) => void;
}

export default function ScheduleModal({
  scheduleModalInfo,
  onUpdateClick,
}: ScheduleModalProps) {
  const { isDev } = useDev();
  const openExceptionPopup = useExceptionPopup();
  const { trackAmpEvent } = useAmplitude();

  const { openPopup, closePopup } = usePopup();
  const { mutateCalendarData } = useCalendarData();

  const [modalInfo, setModalInfo] = useState<ScheduleModalInfo>(scheduleModalInfo);
  const { x, y, schedule } = modalInfo;

  const { closeModal } = useModal();

  const handleModalClose = useCallback(() => {
    closeModal();
  }, []);

  const handleScheduleFinish = useCallback(async () => {
    if(!isDev()) {
      try {
        await apis.finishSchedule(schedule.id, !schedule.isFinished);
        trackAmpEvent('Schedule', { Type: 'Finish' });
        mutateCalendarData();
      } catch(e) {
        const error = e as AxiosError<any>;
        openExceptionPopup(error);
      }
    }
    
    const newModalInfo = {...modalInfo};
    newModalInfo.schedule.isFinished = !newModalInfo.schedule.isFinished;
    setModalInfo(newModalInfo);
  }, [schedule, modalInfo, trackAmpEvent]);

  const deleteSchedule = useCallback(async () => {
    closePopup();

    if(isDev()) return;

    try {
      await apis.deleteSchedule(schedule.id);
      trackAmpEvent('Schedule', { Type: 'Delete' });
      mutateCalendarData();
      closeModal();
    } catch(e) {
      const error = e as AxiosError<any>;
      openExceptionPopup(error);
    }
  }, [schedule, trackAmpEvent]);

  const handleScheduleDeleteClick = useCallback(() => {
    openPopup({
      title: '일정 삭제',
      description: <>일정을 삭제하시겠습니까?</>,
      buttons: [
        { label: '삭제', onClick: deleteSchedule, warning: true },
        { label: '취소', onClick: closePopup },
      ],
    });
  }, []);
  
  return (
    <FloatingModal mobilePos="center" x={x} y={y} onClose={handleModalClose}>
      <Header>
        <Title isFinished={schedule.isFinished ? 1 : 0}>{schedule.content}</Title>
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
          <Button onClick={handleScheduleDeleteClick}>삭제</Button>
        </ButtonBox>
      </Body>
    </FloatingModal>
  )
}