import styled from 'styled-components';
import { ButtonText } from './constants';

export default function CancelButton() {
  return <Button>{ButtonText.cancel}</Button>;
}

const Button = styled.button`
  background-color: transparent;
  border: 1px solid black;
  padding: 4px;
  border-radius: 4px;
`;
