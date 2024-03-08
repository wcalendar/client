import { NewCategoryToRender, NewScheduleToRender } from "@/types";
import { useMemo } from "react";
import styled from "styled-components";
import ScheduleChip from "../ScheduleChip";

const Wrapper = styled.div.withConfig({
  shouldForwardProp: p => !['level'].includes(p),
})<{ level: number }>`
  margin-top: ${({ level }) => level === 0 ? '1.25rem' : '0'};
`;

const Container = styled.div`
  height: auto;
`;

const Line = styled.div`
  height: var(--new-cell-height);
  margin-bottom: .5rem;
`;

interface ScheduleByCategoryProps {
  categoryToRender: NewCategoryToRender;
  openedCategories: Record<string, boolean>;
  toggleCategoryOpen: (categoryId: string) => void;
}

export default function ScheduleByCategory({
  categoryToRender,
  openedCategories,
  toggleCategoryOpen,
}: ScheduleByCategoryProps) {
  const { category, lines } = categoryToRender;
  const isOpen = openedCategories[category.id];

  const schedulesByLine = useMemo(() => {
    return lines.map(line => {
      const scheduleList: (NewScheduleToRender | null | undefined)[] = [];

      let groupCode: string | undefined = undefined;
      for(let i=0; i<line.length; i++) {
        if(line[i] === null) {
          scheduleList.push(null);
        } else {
          if(groupCode && groupCode === line[i]!.groupCode) {
            scheduleList.push(undefined);
          } else {
            scheduleList.push(line[i]!);
            groupCode = line[i]!.groupCode;
          }
        }
      }

      return scheduleList;
    })
  }, [lines]);

  return (
    <Wrapper level={category.level}>
      <Container >
        {schedulesByLine.map((line, i) => (
          <Line key={`line-${category.id}-${i}`}>
            {line.map((item, i) => item && (
              <ScheduleChip
                schedule={item}
                // TODO
                onFinish={() => {}}
              />
            ))}
          </Line>
        ))}
      </Container>
      {isOpen && category.children.map(child => (
        <ScheduleByCategory key={`sbc-${child.category.id}`} categoryToRender={child} openedCategories={openedCategories} toggleCategoryOpen={toggleCategoryOpen} />
      ))}
    </Wrapper>
  );
}