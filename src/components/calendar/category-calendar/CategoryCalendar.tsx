
import Svgs from "@/assets/Svgs";
import useCalendar from "@/hooks/useCalendar";
import styled from "styled-components";
import CategoryChip from "../CategoryChip";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { useCurrentDate } from "@/providers/CurrentDateProvider/useCurrentDate";
import DailyTitle from "../DailyTitle";
import ScheduleByCategory from "./ScheduleByCategory";
import useDragMove from "@/hooks/useDragMove";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1.5rem;

  --category-cell-width: 15.25rem;

  @media ${({ theme }) => theme.devices.mobile} {
    --category-cell-width: 7.5rem;
  }
`;

const CategorySide = styled.div`
  flex: var(--category-cell-width) 0 0;
  height: 100%;
  border-right: 2px solid ${({ theme }) => `${theme.colors.black}33`};
  overflow: hidden;
`;

const HeaderRow = styled.div.withConfig({
  shouldForwardProp: p => !['dayCount'].includes(p),
})<{ dayCount: number }>`
  position: sticky;
  z-index: 1;
  width: calc(${({ dayCount }) => dayCount === 1 ? `var(--category-cell-width)` : `${dayCount} * var(--new-cell-width)`});
  height: 4.25rem;
  top: 0;
  display: flex;
`;

const HeaderTip = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 .75rem;
  gap: .625rem;
`;

const HeaderTipText = styled.div`
  flex-grow: 1;
  font-weight: bold;
  font-size: 1.375rem;
  user-select: none;
`;

const Body = styled.div.withConfig({
  shouldForwardProp: p => !['dayCount', 'isMoveMode'].includes(p),
})<{ dayCount: number, isMoveMode: boolean, }>`
  width: 13.75rem;
  min-height: ${({ dayCount }) => dayCount === 1 ? '200%' : '100%'};
  margin: 0 auto;
`;

const ScheduleSide = styled.div.withConfig({
  shouldForwardProp: p => !['isMoveMode'].includes(p),
})<{ isMoveMode: boolean }>`
  position: relative;
  flex: calc(100% - var(--category-cell-width)) 0 0;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  ${({ isMoveMode }) => isMoveMode ? 'cursor: grab;' : ''}
`;

export default function CategoryCalendar() {
  const { categoryToRenderList, openedCategories, toggleCategoryOpen, } = useCalendar();
  const { currentDate } = useCurrentDate();

  const categorySideRef = useRef<HTMLDivElement>(null);
  const scheduleSideRef = useRef<HTMLDivElement>(null);

  const [isMoveMode, onMouseDown, onMouseUp, onMouseMove] = useDragMove(scheduleSideRef);

  const calendarHeaderItems = useMemo(() => {
    const daysInMonth = currentDate.daysInMonth();
    let dayOfTheWeek = currentDate.day();

    return Array.from({ length: daysInMonth }, (v, i) => i + 1).map(d => {
      const result = { date: d, day: dayOfTheWeek };

      dayOfTheWeek++;
      if (dayOfTheWeek >= 7) dayOfTheWeek = 0;

      return result;
    });
  }, [currentDate]);

  useEffect(() => {
    const categorySideBody = categorySideRef.current!;
    const scheduleSideBody = scheduleSideRef.current!;
    const handleScheduleSideScroll = () => {
      categorySideBody.scrollTop = scheduleSideBody.scrollTop;
    };
    scheduleSideBody.addEventListener('scroll', handleScheduleSideScroll);

    return () => {
      scheduleSideBody.removeEventListener('scroll', handleScheduleSideScroll);
    }
  }, []);

  console.log(openedCategories);

  return (
    <Container>
      <CategorySide ref={categorySideRef}>
        <HeaderRow dayCount={1}>
          <HeaderTip>
            <Svgs svgKey='category' />
            <HeaderTipText>카테고리</HeaderTipText>
            <Svgs svgKey='arrowRight' />
          </HeaderTip>
        </HeaderRow>
        <Body dayCount={1} isMoveMode={false}>
          {categoryToRenderList.map(categoryToRender => (
            <CategoryChip categoryToRender={categoryToRender} openedCategories={openedCategories} toggleCategoryOpen={toggleCategoryOpen} />
          ))}
        </Body>
      </CategorySide>
      <ScheduleSide
        ref={scheduleSideRef}
        isMoveMode={isMoveMode}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseUp}
      >
        <HeaderRow dayCount={currentDate.daysInMonth()}>
          {calendarHeaderItems.map(item => (
            <DailyTitle key={`dt-${currentDate.year()}-${currentDate.month()}-${item.date}`} date={item.date} day={item.day} selected={false} />
          ))}
        </HeaderRow>
        <Body dayCount={currentDate.daysInMonth()} isMoveMode={false}>
          {categoryToRenderList.map(c0 => (
            <ScheduleByCategory key={`sbc-${c0.category.id}`} categoryToRender={c0} openedCategories={openedCategories} toggleCategoryOpen={toggleCategoryOpen} />
          ))}
        </Body>
      </ScheduleSide>
    </Container>
  );
}