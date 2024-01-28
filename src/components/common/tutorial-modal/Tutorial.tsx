import { memo, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
`;

const SlideBox = styled.div`
  position: relative;
  width: 22.5rem;
  height: 22.5rem;
  overflow: hidden;
`;

const Slide = styled.div<{ $page: number }>`
  position: absolute;
  top: 0;
  left: ${({ $page }) => -22.5 * $page}rem;
  width: 90rem;
  height: 100%;
  display: flex;
  transition: left ease .25s;
`;

const SlidePage = styled.div<{ $color: string }>`
  flex-basis: 22.5rem;
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  background-color: ${({ $color }) => $color};
`;

const ButtonBox = styled.div`
  display: flex;
`;

const Button = styled.button`

`;

const Tutorial = memo(function Tutorial() {
  const [page, setPage] = useState(0);

  console.log(page);

  return (
    <Container>
      <SlideBox>
        <Slide $page={page}>
          <SlidePage $color='red' />
          <SlidePage $color='blue' />
          <SlidePage $color='green' />
          <SlidePage $color='yellow' />
        </Slide>
      </SlideBox>
      <ButtonBox>
        <Button onClick={() => setPage(page-1)}>prev</Button>
        <Button onClick={() => setPage(page+1)}>next</Button>
      </ButtonBox>
    </Container>
  );
});

export default Tutorial;