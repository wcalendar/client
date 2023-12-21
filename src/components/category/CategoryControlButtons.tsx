import styled from 'styled-components';
import ControlButton from '../common/ControlButton';

const ControlButtonsContainer = styled.div`
  display: flex;
  padding: 1rem;
  gap: 8px;
`;

const ADD_TEXT = '추가';
const DELETE_TEXT = '삭제';

export default function CategoryControlButtons() {
  const onAddHandler = () => {};
  const onDeleteHandler = () => {};

  return (
    <ControlButtonsContainer>
      <ControlButton onClick={onAddHandler} title={ADD_TEXT} />
      <ControlButton onClick={onDeleteHandler} title={DELETE_TEXT} />
    </ControlButtonsContainer>
  );
}
