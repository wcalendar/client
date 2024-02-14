import time from "@/lib/time";
import { useModal } from "@/providers/ModalProvider/useModal";
import { SearchedScheduleDto } from "@/types";
import { usePathname, useRouter } from "next/navigation";
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
  searchResult: SearchedScheduleDto;
}

export default function ResultItem({
  searchResult,
}: ResultItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { addModal, closeModal } = useModal()
  const { scheduleContent: content, scheduleStartDate: startDate, scheduleEndDate: endDate } = searchResult;

  const handleClick = useCallback(() => {
    addModal({
      key: 'newSchedule',
      modalProps: {
        newScheduleModalInfo: { schedule: {
          id: searchResult.scheduleId,
          groupCode: searchResult.scheduleGroupCode,
          categoryId: searchResult.categoryId,
          content,
          isPriority: searchResult.isPriority,
          isFinished: searchResult.isFinished,
          startDate: time.fromString(startDate),
          endDate: time.fromString(endDate),
        } },
        onScheduleCreate: () => {
          closeModal();
          if(pathname === '/') location.reload();
        },
      },
    });
  }, [searchResult]);

  return (
    <Container onClick={handleClick}>
      <Content>{content}</Content>
      <Date>{`${startDate} - ${endDate}`}</Date>
    </Container>
  )
}