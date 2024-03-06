import styled from "styled-components";
import Chip from "../Chip";
import { CategoryColor, NewSearchedScheduleDto } from "@/types";

const Container = styled.div`
  height: auto;
  padding: .5rem;
  cursor: pointer;
  transition: background-color .25s ease;

  &:hover {
    border-radius: .5rem;
    background-color: ${({ theme }) => `${theme.colors.black}0D`};
  }

  &+& {
    border-top: 1px solid ${({ theme }) => `${theme.colors.black}1A`};
  }
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  gap: .25rem;
  font-size: .6875rem;
  font-weight: bold;
  color: ${({ theme }) => `${theme.colors.black}33`};
  user-select: none;
  margin-bottom: .5rem;
`;

const Content = styled.div`
  font-size: .9375rem;
  font-weight: bold;
  user-select: none;
  margin-bottom: .25rem;
`;

const MemoAlarm = styled.span.withConfig({
  shouldForwardProp: p => !['color'].includes(p),
})<{ color: CategoryColor}>`
  display: inline-block;
  width: .25rem;
  height: .25rem;
  border-radius: .25rem;
  background-color: ${({ color, theme }) => theme.colors.category(color, 0) };
  margin-left: .25rem;
  vertical-align: top;
`;

const Date = styled.div`
  font-size: .6875rem;
  user-select: none;
  color: ${({ theme }) => `${theme.colors.black}80`};
`;

interface SearchResultItemProps {
  searchResult: NewSearchedScheduleDto;
}

export default function SearchResultItem({
  searchResult,
}: SearchResultItemProps) {
  const { categoryNames, categoryColor, scheduleContent, scheduleStartDate, scheduleEndDate, scheduleMemo, } = searchResult;

  return (
    <Container>
      <Category>
        <Chip width='3.75rem' label={categoryNames[0]} color='newRed' />
        {categoryNames[1] && <>/<Chip width='3.75rem' label={categoryNames[1]} color='newRed' /></>}
        {categoryNames[2] && <>/<Chip width='3.75rem' label={categoryNames[2]} color='newRed' /></>}
      </Category>
      <Content>
        {scheduleContent}
        {scheduleMemo && <MemoAlarm color={categoryColor} />}
      </Content>
      <Date>
        {scheduleStartDate} ~ {scheduleEndDate}
      </Date>
    </Container>
  );
}