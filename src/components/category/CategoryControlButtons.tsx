import styled from 'styled-components';
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

const ControlButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
`;

const ADD_TEXT = '추가';
const DELETE_TEXT = '삭제';

type CategoryControlButtonsProps = {
  isActive: boolean;
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
  isActive,
}: CategoryControlButtonsProps) {
  
  return (
    <ControlButtonsContainer>
      <ButtonsContainer>
        <ControlButton onClick={addHandler} disabled={!isActive}>
          {ADD_TEXT}
        </ControlButton>
        <ControlButton onClick={deleteHandler}>{DELETE_TEXT}</ControlButton>
      </ButtonsContainer>
      <ButtonsContainer>
        <ArrowButton onClick={upHandler} icon={<RiArrowUpSLine size={24} />} />
        <ArrowButton
          onClick={downHandler}
          icon={<RiArrowDownSLine size={24} />}
        />
      </ButtonsContainer>
    </ControlButtonsContainer>
  );
}
