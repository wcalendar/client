'use client';

import CategoryHeader from '@/app/category/CategoryHeader';
import time from '@/lib/time';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';
import CategoryBody from './CategoryBody';

const Container = styled.main`
  position: relative;
`;

export default function CategoryPage() {
  const [currentDate, setDate] = useState<Dayjs>(time.now());

  const handleDateChange = (value: Dayjs) => {
    setDate(value);
  };

  return (
    <Container>
      <CategoryHeader />
      <CategoryBody currentDate={currentDate} />
    </Container>
  );
}