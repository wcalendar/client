import styled from "styled-components"
import { Priority } from "./page";
import PriorityItem from "./PriorityItem";

type PriorityListProps = {
  priorities: Priority[];
}

const Container = styled.div`
  height: 100%;
  width: calc((var(--cell-width) + 1px));
  overflow-y: auto;
`;

export default function PriorityList({
  priorities,
}: PriorityListProps) {
  return (
    <Container>
      {priorities.map(priority => (
        <PriorityItem
          key={`pi-${priority.scheduleId}`}
          priority={priority}
        />
      ))}
    </Container>
  )
}