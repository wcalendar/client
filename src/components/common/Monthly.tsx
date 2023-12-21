import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import styled from 'styled-components';

const MonthlyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const ArrowButton = styled(Button)`
  border: 1px solid gray;
  border-radius: 8px;
`;

const goPrevMonth = () => {
  console.log('2023.11');
};
const showCalendar = () => {
  console.log('calendar');
};
const goNextMonth = () => {
  console.log('2024.01');
};
export default function Monthly() {
  return (
    <MonthlyContainer>
      <ArrowButton onClick={goPrevMonth}>
        <RiArrowLeftSLine />
      </ArrowButton>
      <Button onClick={showCalendar}>2023. 12.</Button>
      <ArrowButton onClick={goNextMonth}>
        <RiArrowRightSLine />
      </ArrowButton>
    </MonthlyContainer>
  );
}