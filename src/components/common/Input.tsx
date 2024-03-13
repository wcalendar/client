import styled from 'styled-components';
import { useCallback, ChangeEventHandler } from 'react';

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['width'].includes(p),
})<{ width: string }>`
  position: relative;
  width: ${({ width }) => width};
`;

const TextInput = styled.textarea`
  width: 100%;
  min-height: 40px;
  padding: .5rem;
  border: 1px solid ${({ theme }) => theme.colors.black20};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: .9375rem;
  line-height: 1.375rem;
  color: ${({ theme }) => theme.colors.black};
  resize: none;
  font-family: none;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.black05};
  }
`;

const Description = styled.div`
  margin-top: .25rem;
  font-size: .6875rem;
  color: ${({ theme }) => theme.colors.black50};
  user-select: none;
`;

interface InputProps {
  width?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  description?: string;
}

export default function Input({
  width = '100%',
  placeholder,
  value,
  onChange,
  disabled,
  description,
}: InputProps) {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    const textarea = (e.target as HTMLTextAreaElement);
    // 개행 문자 입력 금지
    const newValue = textarea.value.replace(/(\r\n|\n|\r)/gm, '');

    onChange(e.target.value);
    
    // 자동 높이 조절
    textarea.value = newValue;
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight + 2) + 'px';
  }, [onChange]);

  return (
    <Container width={width} >
      <TextInput value={value} placeholder={placeholder} rows={1} wrap='on' onChange={handleChange} disabled={disabled} />
      {description && (
        <Description>
          *{description}
        </Description>
      )}
    </Container>
  )
}