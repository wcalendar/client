'use client';

import CategoryBar from '@/components/category/CategoryBar';
import Header from '@/components/common/Header';
import styled from 'styled-components';

const Container = styled.main`
  width: 100%;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  height: 100%;
`;

const CalendarContainer = styled.div`
  width: 80%;
  height: 100%;
  padding: 1rem;
`;

export default function Home() {
  return (
    <Container>
      <Header />
      <Main>
        <CategoryBar />
        <CalendarContainer>Calendar</CalendarContainer>
      </Main>
    </Container>
  );
}