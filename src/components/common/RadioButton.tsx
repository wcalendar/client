import { ChangeEventHandler, MouseEventHandler } from "react";
import styled from "styled-components";

type RadioButtonProps = {
  label: string;
  checked: boolean;
  onChange: MouseEventHandler<HTMLDivElement>;
}

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &+& {
    margin-left: .5rem;
  }
`;

const Input = styled.input`
  font-size: .75rem;
  margin-right: .25rem;
`;

const Label = styled.span`
  font-size: .75rem;
  user-select: none;
`;

export default function RadioButton({
  label,
  checked,
  onChange,
}: RadioButtonProps) {
  return (
    <Container onClick={onChange}>
      <Input type='radio' checked={checked} />
      <Label>{label}</Label>
    </Container>
  )
}