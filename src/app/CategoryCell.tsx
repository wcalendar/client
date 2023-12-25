import { CategoryColor, CategoryWithSchedule } from "@/dummies/calendar";
import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

const Container = styled.div<{ $line_count: number, }>`
  width: 100%;
  height: calc(${({ theme, $line_count }) => `(var(--cell-height) * ${$line_count}) + (${$line_count - 1} * ${theme.sizes.calendar.lineGap})`});
  margin-top: ${({ theme }) => theme.sizes.calendar.lineGap};
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  font-size: .75rem;
`;

const Category = styled.div<{ $level: number, $color: CategoryColor }>`
  width: calc(100% - ${({ $level }) => 1 + ($level * 0.5)}rem - 3.375rem);
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-right: 1px;
  
  padding-left: .5rem;
  user-select: none;
`;

const Memo = styled.div<{ $level: number, $color: CategoryColor }>`
  width: calc(3.375rem - 1px);
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  padding-left: .5rem;
`;

type CategoryCellProps = {
  category: CategoryWithSchedule;
  lineCount: number;
};

export default function CategoryCell({
  category,
  lineCount,
}: CategoryCellProps) {
  const {id, name, level, color, memo, } = category;

  return (
    <Container $line_count={lineCount}>
      <Category $level={level} $color={color}>
        {name}
      </Category>
      <Memo $level={level} $color={color}>{memo}</Memo>
    </Container>
  )
}