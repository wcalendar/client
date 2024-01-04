import styled from 'styled-components';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import ArrowButton from '../common/ArrowButton';
import { ButtonText } from './constants';

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
          {ButtonText.add}
        </ControlButton>
        <ControlButton onClick={deleteHandler}>
          {ButtonText.delete}
        </ControlButton>
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
