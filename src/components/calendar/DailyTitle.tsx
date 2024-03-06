import Svgs from "@/assets/Svgs";
import styled from "styled-components";

const days = ['일', '월', '화', '수', '목', '금', '토'];

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['selected'].includes(p),
})<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .25rem;
  width: var(--new-cell-width);
  height: 4.25rem;
  border-bottom: 4px solid ${({ theme, selected }) => selected ? theme.colors.primary : `${theme.colors.black}1A`};
  user-select: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  transition: background-color .25s ease, border-bottom .25s ease;
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}0D`};
    border-bottom: 4px solid ${({ theme }) => `${theme.colors.primary}80`};
  }

  @media ${({ theme }) => theme.devices.tablet} {
    gap: 0;
  }
`;

const Day = styled.div.withConfig({
  shouldForwardProp: p => !['selected'].includes(p),
})<{ selected: boolean }>`
  flex: 1rem 0 0;
  font-size: .8125rem;
  color: ${({ theme, selected }) => `${selected ? theme.colors.primary : theme.colors.black}80`};
  text-align: center;
  transition: color .25s ease;

  @media ${({ theme }) => theme.devices.tablet} {
    flex: .875rem 0 0;
    font-size: .6875rem;
  }
`;

const Date = styled.div.withConfig({
  shouldForwardProp: p => !['selected'].includes(p),
})<{ selected: boolean }>`
  flex: 1.75rem 0 0;
  font-size: 1.375rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme, selected }) => selected ? theme.colors.primary : theme.colors.black};
  transition: color .25s ease;

  @media ${({ theme }) => theme.devices.tablet} {
    flex: 1.5rem 0 0;
    font-size: 1.25rem;
  }
`;

const IconWrapper = styled.div`
  display: none;
  text-align: center;

  @media ${({ theme }) => theme.devices.tablet} {
    display: block;
  }
`;

interface DailyTitleProps {
  date: number;
  day: number;
  selected: boolean;
}

export default function DailyTitle({
  date,
  day,
  selected,
}: DailyTitleProps) {
  return (
    <Container selected={selected}>
      <Day selected={selected}>{days[day]}요일</Day>
      <Date selected={selected}>{date < 10 && '0'}{date}</Date>
      <IconWrapper>
        <Svgs svgKey='arrowDownSmall' />
      </IconWrapper>
    </Container>
  );
}