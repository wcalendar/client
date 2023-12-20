'use client';

import Header from '@/components/common/Header';
import FixedModal from '@/components/common/fixed-modal/FixedModal';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.main`
  width: 100%;
  height: 100vh;
  position: relative;
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

const InModal = styled.div`
  width: 100%;
  height: 300px;
  padding: 16px;
  background-color: red;
`;

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  }
  const handleCloseModal = () => {
    setModalOpen(false);
  }

  return (
    <Container>
      {isModalOpen && (
        <FixedModal width='400px' title='일정 등록' buttonList={[{ text: '저장', onClick: () => {} }, { text: '취소', onClick: handleCloseModal }]} onClose={handleCloseModal} >
          <InModal />
        </FixedModal>
      )}
      <Header />
      <Main>
        <CategoryContainer onClick={handleOpenModal}>Category</CategoryContainer>
        <CalendarContainer>Calendar</CalendarContainer>
      </Main>
    </Container>
  );
}
