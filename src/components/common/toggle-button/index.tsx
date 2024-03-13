import { ChangeEventHandler, useCallback } from "react";
import styled from "styled-components";

const Label = styled.label`
  display: inline-block;
  cursor: pointer;
  width: 3.75rem;
  height: 2rem;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  appearance: none;
`;

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['checked'].includes(p),
})<{ checked: boolean }>`
  width: 3.75rem;
  height: 2rem;
  border-radius: 2rem;
  padding: .25rem;
  background-color: ${({ theme, checked }) => checked ? theme.colors.primary : theme.colors.black10};
  transition: background-color .25s ease;
`;

const Switch = styled.div.withConfig({
  shouldForwardProp: p => !['checked'].includes(p),
})<{ checked: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1rem;
  background-color: ${({ theme, checked }) => checked ? theme.colors.white : theme.colors.black20};
  transition: transform .25s ease, background-color .25s ease;
  transform: translateX(${({ checked }) => checked ? '1.75rem' : '0%'});
`;

interface ToggleButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ToggleButton({
  checked,
  onChange,
}: ToggleButtonProps) {

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange(e.target.checked);
  }, [onChange]);

  return (
    <Label>
      <HiddenCheckbox checked={checked} onChange={handleChange}/>
      <Container checked={checked}>
        <Switch checked={checked} />
      </Container>
    </Label>
  );
}