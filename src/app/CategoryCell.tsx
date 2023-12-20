import { CategoryWithSchedule } from "@/dummies/calendar";
import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

const Container = styled.div<{ theme: DefaultTheme, $line_count: number, }>`
  width: 100%;
  height: calc(${({ $line_count }) => 1.125 * $line_count}rem + ${({ theme, $line_count }) => ($line_count - 1) * theme.sizes.calendar.lineGap}px);
  margin-top: ${({ theme}) => theme.sizes.calendar.lineGap}px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  font-size: .75rem;
  line-height: 1.125rem;
`;

const Category = styled.div<{ theme: DefaultTheme, $level: number, $color: number }>`
  width: calc(100% - ${({ $level }) => 1 + ($level * 0.5)}rem - 3.375rem);
  height: 1.125rem;
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-right: 1px;
  
  padding-left: .5rem;
  user-select: none;
`;

const Memo = styled.div<{ theme: DefaultTheme, $level: number, $color: number }>`
  width: calc(3.375rem - 1px);
  height: 1.125rem;
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