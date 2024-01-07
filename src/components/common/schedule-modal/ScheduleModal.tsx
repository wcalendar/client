import { ScheduleModalInfo, ScheduleToRender } from "@/types";
import time from "@/lib/time";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

type ScheduleModalProps = {
  scheduleModalInfo: ScheduleModalInfo;
  onScheduleModalClose: () => void;
  onScheduleFinish: (categoryId: number, groupCode: number) => void;
  onUpdateClick: (schedule: ScheduleToRender) => void;
}

const Container = styled.div<{ $x: string, $y: string }>`
  position: absolute;
  left: ${({ $x }) => $x};
  top: ${({ $y }) => $y};
  width: 16.875rem;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  background-color: white;
  user-select: none;
  z-index: 15;

  @media ${({ theme }) => theme.devices.mobile} {
    left: calc(50% - (16.875rem / 2));
  }
`;

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

export default function ScheduleModal({
  scheduleModalInfo,
  onScheduleModalClose,
  onScheduleFinish,
  onUpdateClick,
}: ScheduleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const { x, y, schedule } = scheduleModalInfo;
  const renderX = useMemo(() => {
    if(x > (window.innerWidth / 2)) return `calc(${x}px - 16.875rem)`;
    else return `${x}px`;
  }, [x]);

  const renderY = useMemo(() => {
    if((y + 150) > window.innerHeight) return `calc(${y}px - 6.875rem)`;
    else return `${y}px`;
  }, [y]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if(modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onScheduleModalClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }

  }, []);

  return (
    <Container $x={renderX} $y={renderY} ref={modalRef} >
      <Header>
        <Title $is_finished={schedule.isFinished ? 1 : 0}>{schedule.content}</Title>
        <CheckBox type='checkbox' checked={schedule.isFinished} onChange={() => onScheduleFinish(schedule.categoryId, schedule.groupCode)} />
        <CloseButton onClick={onScheduleModalClose}>
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
          <Button>삭제</Button>
        </ButtonBox>
      </Body>
    </Container>
  )
}