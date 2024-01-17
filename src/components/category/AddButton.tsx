import styled from 'styled-components';
import { ButtonText } from './constants';

//카테고리 추가 버튼
export default function AddButton() {
  return <Button>{ButtonText.add}</Button>;
}

const Button = styled.button``;
