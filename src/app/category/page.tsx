'use client';

import CategoryHeader from '@/app/category/CategoryHeader';
import styled from 'styled-components';
import CategoryBody from './CategoryBody';
import { useCurrentDate } from '@/providers/CurrentDateProvider/useCurrentDate';

const Container = styled.main`
  position: relative;
`;

export default function CategoryPage() {
  const { currentDate } = useCurrentDate();

  return (
    <Container>
      <CategoryHeader />
      <CategoryBody currentDate={currentDate} />
    </Container>
  );
}