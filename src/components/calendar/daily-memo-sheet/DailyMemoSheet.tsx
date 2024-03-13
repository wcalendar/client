import styled from "styled-components"
import DailyMemoEditor from "./DailyMemoEditor";
import { useCallback, useState } from "react";

const Container = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 1.25rem;
  }
`;

const Title = styled.div`
  flex: auto 0 0;
  font-size: .9375rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;

  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;

const EditorWrapper = styled.div`
  flex-grow: 1;
`;

export default function DailyMemoSheet() {
  const [memo, setMemo] = useState('');

  const handleMemoChange = useCallback((value: string) => {
    setMemo(value);
  }, []);

  return (
    <Container>
      <Title>Daily memo</Title>
      <EditorWrapper>
        <DailyMemoEditor value={memo} onChange={handleMemoChange} />
      </EditorWrapper>
    </Container>
  )
}