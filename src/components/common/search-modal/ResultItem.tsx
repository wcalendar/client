import time from "@/lib/time";
import { useModal } from "@/providers/ModalProvider/useModal";
import { ScheduleToRender } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  user-select: none;
  padding: .5rem;
  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const Content = styled.div`
  height: .875rem;
  line-height: .875rem;
  font-size: .75rem;
  font-weight: bold;
`;

const Date = styled.div`
  height: .75rem;
  line-height: .75rem;
  font-size: .625rem;
`;

interface ResultItemProps {
  searchResult: ScheduleToRender;
}

export default function ResultItem({
  searchResult,
}: ResultItemProps) {
  const router = useRouter();
  const { addModal } = useModal()
  const { content, startDate, endDate } = searchResult;

  const handleClick = useCallback(() => {
    addModal({
      key: 'newSchedule',
      modalProps: {
        newScheduleModalInfo: { schedule: searchResult },
        onScheduleCreate: () => { router.push('/'); },
      },
    });
  }, [searchResult]);

  return (
    <Container onClick={handleClick}>
      <Content>{content}</Content>
      <Date>{`${time.toString(startDate, 'YYYY.MM.DD')} - ${time.toString(endDate, 'YYYY.MM.DD')}`}</Date>
    </Container>
  )
}