'use client';

import CategoryHeader from '@/app/category/CategoryHeader';
import Header from '@/components/common/header/Header';
import time from '@/lib/time';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';
import CategoryBody from './CategoryBody';

const Container = styled.main`
  position: relative;

  --header-height: ${({ theme }) => theme.sizes.header.headerHeight.desktop};
  --header-padding: ${({ theme }) => theme.sizes.header.headerPadding.desktop};

  @media ${({ theme }) => theme.devices.tablet} {
    --header-height: ${({ theme }) => theme.sizes.header.headerHeight.tablet};
    --header-padding: ${({ theme }) => theme.sizes.header.headerPadding.tablet};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    --header-height: ${({ theme }) => theme.sizes.header.headerHeight.mobile};
    --header-padding: ${({ theme }) => theme.sizes.header.headerPadding.mobile};
  }
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