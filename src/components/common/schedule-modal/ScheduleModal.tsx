import { ScheduleModalInfo } from "@/app/page";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

type ScheduleModalProps = {
  scheduleModalInfo: ScheduleModalInfo;
  onScheduleModalClose: () => void;
}

const Container = styled.div<{ $x: string, $y: number }>`
  position: absolute;
  left: ${({ $x }) => $x};
  top: ${({ $y }) => $y}px;
  width: 16.875rem;
  height: auto;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  background-color: white;
`;

const Header = styled.div`
  width: 100%;
  padding: .75rem;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
`;

const Title = styled.div`
  flex-grow: 1;
  font-size: .875rem;
  font-weight: bold;
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
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: .5rem;
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
}: ScheduleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const { x, y, schedule } = scheduleModalInfo;
  const renderX = useMemo(() => {
    if(x > (window.innerWidth / 2)) return `calc(${x}px - 16.875rem)`;
    else return `${x}px`;
  }, [x]);

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
    <Container $x={renderX} $y={y} ref={modalRef} >
      <Header>
        <Title>{schedule.title}</Title>
        <CheckBox type='checkbox' />
        <CloseButton onClick={onScheduleModalClose}>
          <Icon path={mdiClose} />
        </CloseButton>
      </Header>
      <Body>
        <Button>수정</Button>
        <Button>삭제</Button>
      </Body>
    </Container>
  )
}