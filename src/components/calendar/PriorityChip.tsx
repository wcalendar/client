import Svgs from "@/assets/Svgs";
import { CategoryColor, Priority } from "@/types";
import styled from "styled-components";
import CheckBox from "../common/CheckBox";
import { Draggable } from "@hello-pangea/dnd";

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['color', 'isFinished', 'isDragging'].includes(p),
})<{ color: CategoryColor, isFinished: boolean, isDragging: boolean, }>`
  height: 3.75rem;
  padding: 0 .5rem;
  border-radius: 8px;
  display: flex;
  gap: .25rem;
  align-items: center;
  background-color: ${({ theme, color, isFinished }) => isFinished ? theme.colors.black05 : theme.colors.category(color, 2)};
  cursor: pointer;
  flex-direction: row;
  ${({ theme, isDragging }) => isDragging ? `box-shadow: 4px 4px 12px 0 ${theme.colors.black12};` : ''}

  .move {
    cursor: grab;
  }

  .move path {
    fill: ${({ theme, color }) => theme.colors.category(color, 0)};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: row-reverse;
  }
`;

const SvgWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

const Content = styled.div.withConfig({
  shouldForwardProp: p => !['color','isFinished'].includes(p),
})<{ color: CategoryColor, isFinished: boolean }>`
  flex-grow: 1;
  font-size: .9375rem;
  color: ${({ theme, color, isFinished }) => isFinished ? theme.colors.black50 : theme.colors.category(color, 0)};
  ${({ isFinished }) => isFinished ? 'text-decoration: line-through;' : ''}
  user-select: none;
`;


interface PriorityChipProps {
  priority: Priority;
  onFinish: () => void;
  index: number;
}

export default function PriorityChip({
  priority,
  onFinish,
  index,
}: PriorityChipProps) {
  const { color, isFinished, scheduleId } = priority;

  return (
    <Draggable draggableId={scheduleId} index={index}>
      {(provided, snapshot) => (
        <Container {...provided.draggableProps} ref={provided.innerRef} color={color} isFinished={isFinished} isDragging={snapshot.isDragging}>
          {!isFinished && (
            <SvgWrapper {...provided.dragHandleProps}>
              <Svgs svgKey='move' className='move' />
            </SvgWrapper>
          )}
          <Content color={color} isFinished={isFinished}>{priority.content}</Content>
          <CheckBox size='big' checked={isFinished} onChange={onFinish} />
        </Container>
      )}
    </Draggable>
  );
}