import { useFormStatus } from 'react-dom';
import { ButtonText } from './constants';
import styled from 'styled-components';

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? '...' : <span>{ButtonText.save}</span>}
    </Button>
  );
}

const Button = styled.button`
  background-color: transparent;
  border: 1px solid black;
  padding: 4px;
  border-radius: 4px;
`;
