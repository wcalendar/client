import styled from 'styled-components';
import { ButtonText } from './constants';

export default function DeleteButton() {
  return <Button>{ButtonText.delete}</Button>;
}

const Button = styled.button`
  background-color: transparent;
  border: 1px solid black;
  padding: 2px;
  border-radius: 4px;
`;
