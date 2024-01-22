'use client';

import CategoryHeader from '@/app/category/CategoryHeader';
import Header from '@/components/common/header/Header';
import time from '@/lib/time';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';
import CategoryBody from './CategoryBody';
import { Category } from '@/types';

const Container = styled.main`
  position: relative;
  --cell-width: ${({ theme }) => theme.sizes.calendar.cellWidth.desktop};
  --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.desktop};
  --memo-width: ${({ theme }) => theme.sizes.calendar.memoWidth.desktop};
  --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.desktop};
`;

export default function CategoryPage() {
  const [currentDate, setDate] = useState<Dayjs>(time.now());

  const handleDateChange = (value: Dayjs) => {
    setDate(value);
  };

  return (
    <Container>
      <Header date={currentDate} onDateChange={handleDateChange} />
      <CategoryHeader />
      <CategoryBody currentDate={currentDate} />
    </Container>
  );
}