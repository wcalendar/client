'use client';

import Header from '@/components/common/Header';
import styled from 'styled-components';

const Main = styled.main`
  --main-color: gray;

  width: 1280px;
  height: 100vh;
  margin: 0 auto;
  background: var(--main-color);
`;

export default function Home() {
  return (
    <Main>
      <Header />
    </Main>
  );
}
