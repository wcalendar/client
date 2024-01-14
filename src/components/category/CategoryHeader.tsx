import styled from 'styled-components';
import Monthly from '../common/Monthly';
import { LabelText } from './constants';

type CategoryHeaderProps = {
  date: string;
  setDate: (value: string) => void;
};

export default function CategoryHeader({ date, setDate }: CategoryHeaderProps) {
  
  const handleDateChange = (value: string) => {
    setDate(value);
  };

  return (
    <CategoryHeaderContainer>
      <CategoryHeaderContentsContainer>
        <CategoryHeaderTitle>{LabelText.pageTitle}</CategoryHeaderTitle>
        <Monthly value={date} onChange={handleDateChange} />
      </CategoryHeaderContentsContainer>
    </CategoryHeaderContainer>
  );
}

const CategoryHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  position: fixed;
  top: 40px;
  background-color: white;
  margin-top: 8px;
`;

const CategoryHeaderContentsContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 5px;
  max-width: 768px;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
`;

const CategoryHeaderTitle = styled.h2`
  font-size: 18px;
`;
