'use client';

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

const CategoryContainer = styled.div`
  width: 20%;
  height: 100%;
  background: ${({ theme }) => theme.colors.white};
  padding: 1rem;
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
        <CategoryContainer>Category</CategoryContainer>
        <CalendarContainer>Calendar</CalendarContainer>
      </Main>
    </Container>
  );
}