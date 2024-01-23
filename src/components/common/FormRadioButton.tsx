import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  
  &+& {
    margin-left: .5rem;
  }
`;

const Input = styled.input`
  font-size: .75rem;
  margin-right: .25rem;
`;

const Label = styled.label`
  font-size: .75rem;
  user-select: none;
  display: flex;
  align-items: center;
`;

type FormRadioButtonProps = {
  name: string;
  label: string;
  value: string;
  tabIndex: number;
  defaultChecked?: boolean;
}

export default function FormRadioButton({
  name,
  label,
  value,
  tabIndex,
  defaultChecked,
}: FormRadioButtonProps) {
  return (
    <Container>
      <Label>
        <Input type='radio' name={name} value={value} tabIndex={tabIndex} defaultChecked={defaultChecked} />
        {label}
      </Label>
    </Container>
  )
}