import styled from 'styled-components';
import { ButtonText } from './constants';

type CancelButtonProps = {
  handleCancel: () => void;
};

export default function CancelButton({ handleCancel }: CancelButtonProps) {
  return <Button onClick={handleCancel}>{ButtonText.cancel}</Button>;
}

const Button = styled.button`
  background-color: transparent;
  border: 1px solid black;
  padding: 4px;
  border-radius: 4px;
`;
