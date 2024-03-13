import { ChangeEventHandler, useCallback } from "react";
import styled from "styled-components";

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['width'].includes(p),
})<{ width: string }>`
  width: ${({ width }) => width};
`;

const TextField = styled.textarea.withConfig({
  shouldForwardProp: p => !['height'].includes(p),
})<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  resize: none;
  font-family: inherit;
  border: 1px solid ${({ theme }) => theme.colors.black20};
  border-radius: 8px;
  padding: .5rem;
  color: ${({ theme }) => theme.colors.black};
  font-size: .9375rem;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.black05};
  }
`;

const Description = styled.p`
  margin-top: .25rem;
  color: ${({ theme }) => theme.colors.black50};
  font-size: .6875rem;
`;

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  width?: string;
  height: string;
  placeholder?: string;
  disabled?: boolean;
  description?: string;
}

export default function Textarea({
  value,
  onChange,
  width = '100%',
  height,
  placeholder,
  disabled,
  description,
}: TextareaProps) {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <Container width={width}>
      <TextField height={height} value={value} onChange={handleChange} placeholder={placeholder} disabled={disabled} />
      {description && <Description>* {description}</Description>}
    </Container>
  );
}