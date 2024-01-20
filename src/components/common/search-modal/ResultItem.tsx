import time from "@/lib/time";
import { SearchResult } from "@/types";
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

const Categories = styled.div`
  height: .75rem;
  line-height: .75rem;
  font-size: .625rem;
`;

const Date = styled.div`
  height: .75rem;
  line-height: .75rem;
  font-size: .625rem;
`;

interface ResultItemProps {
  searchResult: SearchResult;
}

export default function ResultItem({
  searchResult,
}: ResultItemProps) {
  const { content, categories, startDate, endDate } = searchResult

  return (
    <Container>
      <Content>{content}</Content>
      <Categories>{categories.join('/')}</Categories>
      <Date>{`${time.toString(startDate, 'YYYY.MM.DD')} - ${time.toString(endDate, 'YYYY.MM.DD')}`}</Date>
    </Container>
  )
}