import time from "@/lib/time";
import { Priority } from "@/types";
import { Dayjs } from "dayjs";
import styled from "styled-components";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useCallback } from "react";
import PriorityChip from "./PriorityChip";
import { OnDragEndResponder } from "react-beautiful-dnd";
import useDev from "@/hooks/useDev";
import { apis } from "@/lib/apis";
import { AxiosError } from "axios";
import useExceptionPopup from "@/hooks/useExceptionPopup";
import useCalendarData from "@/swr/useCalendarData";

const Container = styled.div`

`;

const SubTitle = styled.div`
  margin-bottom: .25rem;
  font-size: .9375rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.div`
  margin-bottom: 1.25rem;
  font-size: 1.375rem;
  font-weight: bold;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: .75rem;
`;

interface PrioritySheetProps {
  date: Dayjs;
  priorities: Priority[];
}

export default function PrioritySheet({
  date,
  priorities,
}: PrioritySheetProps) {
  const { isDev } = useDev();
  const openExceptionPopup = useExceptionPopup();
  const { mutateCalendarData } = useCalendarData();

  const updatePriority = useCallback(async (newPriorities: string[]) => {
    if(isDev()) return;

    try {
      const response = await apis.updateSchedulePriority(newPriorities, time.toString(date, 'YYYY-MM-DD'));
      mutateCalendarData();
    } catch(e) {
      const error = e as AxiosError<any>;
      openExceptionPopup(error);
    }
  }, [date]);

  const handleDragEnd: OnDragEndResponder = useCallback((result) => {
    const { source, destination } = result;
    if(!destination) return;

    const newPriorities = priorities.map(priority => priority.scheduleId);
    const target = newPriorities[source.index];

    newPriorities.splice(source.index, 1);
    newPriorities.splice(destination.index, 0, target);

    updatePriority(newPriorities);
  }, [updatePriority, priorities]);

  return (
    <Container>
      <SubTitle>
        우선순위
      </SubTitle>
      <Title>
        {time.toString(date, 'YYYY. MM. DD')}
      </Title>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='priorityList'>
          {(provided) => (
            <List {...provided.droppableProps}  ref={provided.innerRef}>
              {priorities.map((priority, i) => (
                <PriorityChip key={`pc-${priority.scheduleId}}`} priority={priority} onFinish={() => {}} index={i} />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}