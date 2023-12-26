import styled from 'styled-components';
import ControlButton from '../common/ControlButton';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import ArrowButton from '../common/ArrowButton';

const ControlButtonsContainer = styled.div`
  display: flex;
  padding: 1rem;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const ADD_TEXT = '추가';
const DELETE_TEXT = '삭제';

type CategoryControlButtonsProps = {
  addHandler: () => void;
  deleteHandler: () => void;
  upHandler: () => void;
  downHandler: () => void;
};

export default function CategoryControlButtons({
  addHandler,
  deleteHandler,
  upHandler,
  downHandler,
}: CategoryControlButtonsProps) {
  return (
    <ControlButtonsContainer>
      <ButtonsContainer>
        <ControlButton onClick={addHandler} title={ADD_TEXT} />
        <ControlButton onClick={deleteHandler} title={DELETE_TEXT} />
      </ButtonsContainer>
      <ButtonsContainer>
        <ArrowButton
          onClick={upHandler}
          icon={<RiArrowUpSLine size={24} />}
        />
        <ArrowButton
          onClick={downHandler}
          icon={<RiArrowDownSLine size={24} />}
        />
      </ButtonsContainer>
    </ControlButtonsContainer>
  );
}
