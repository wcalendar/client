import Svgs from "@/assets/Svgs";
import { useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 3.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .75rem;
`;

const IconButton = styled.button`
  flex: 1.5rem 0 0;
  height: 1.5rem;
  cursor: pointer;

  path {
    fill: ${({ theme }) => theme.colors.black50};
  }
`;

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.black20};
  border-radius: 8px;
  padding: .5rem;
  font-size: .9375rem;
  color: ${({ theme }) => theme.colors.black};

  &:focus {
    outline: none;
  }
`;

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
}

export default function Counter({
  value,
  onChange,
  max,
}: CounterProps) {
  const handleUpClick = useCallback(() => {
    if(value <= max && value >= 0) {
      onChange(value + 1);
    } else onChange(0);
  }, [value, onChange, max]);

  const handleDownClick = useCallback(() => {
    if(value <= max && value >= 0) {
      onChange(value - 1);
    } else onChange(0);
  }, [value, onChange, max]);

  return (
    <Container>
      <IconButton onClick={handleUpClick}>
        <Svgs svgKey='arrowUp' />
      </IconButton>
      <Input value={value} onChange={(e) => onChange(parseInt(e.target.value))}/>
      <IconButton onClick={handleDownClick}>
        <Svgs svgKey='arrowDown' />
      </IconButton>
    </Container>
  );
}