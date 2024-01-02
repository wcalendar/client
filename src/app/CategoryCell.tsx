import { CategoryColor, CategoryWithSchedule } from "@/dummies/calendar";
import styled from "styled-components";
import { Category } from "./page";

const Container = styled.div<{ $line_count: number, }>`
  width: 100%;
  height: calc(${({ $line_count }) => `(var(--cell-height) * ${$line_count}) + (${$line_count - 1} * var(--line-gap))`});
  margin-top: var(--line-gap);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  font-size: .75rem;
`;

const CategoryName = styled.div<{ $level: number, $color: CategoryColor }>`
  width: calc(100% - ${({ $level }) => 1 + ($level * 0.5)}rem - var(--memo-width));
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  margin-right: 1px;
  
  padding-left: .5rem;
  user-select: none;
`;

const Memo = styled.div<{ $level: number, $color: CategoryColor }>`
  width: calc(var(--memo-width) - 1px);
  height: var(--cell-height);
  line-height: var(--cell-height);
  background-color: ${({ theme, $color, $level }) => theme.colors.category($color, $level)};
  border-radius: 5px;
  padding-left: .5rem;
`;

type CategoryCellProps = {
  category: Category;
  lineCount: number;
};

export default function CategoryCell({
  category,
  lineCount,
}: CategoryCellProps) {
  const {id, name, level, color, description, } = category;

  return (
    <Container $line_count={lineCount}>
      <CategoryName $level={level} $color={color}>
        {name}
      </CategoryName>
      <Memo $level={level} $color={color}>{description}</Memo>
    </Container>
  )
}