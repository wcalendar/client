import { CategoryWithSchedule } from "@/dummies/calendar";
import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

const Container = styled.div<{ $line_count: number, }>`
  width: 100%;
  height: calc(${({ $line_count }) => 1.125 * $line_count}rem + ${({ $line_count }) => ($line_count - 1) * 2}px);
  margin-top: 2px;  
`;

const Category = styled.div<{ theme: DefaultTheme, $level: number, $color: number }>`
  width: calc(100% - ${({ $level }) => 1 + ($level * 0.5)}rem);
  height: 1.125rem;
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  margin-left: auto;
  border-radius: 5px;

  font-size: .75rem;
  line-height: 1.125rem;
  padding-left: 1rem;
  user-select: none;
`;

type CategoryCellProps = {
  category: CategoryWithSchedule;
  lineCount: number;
};

export default function CategoryCell({
  category,
  lineCount,
}: CategoryCellProps) {
  const {id, name, level, color, } = category;

  return (
    <Container $line_count={lineCount}>
      <Category $level={level} $color={color}>
        {name}
      </Category>
    </Container>
  )
}