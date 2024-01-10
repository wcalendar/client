import styled from 'styled-components';
import Monthly from '../common/Monthly';
import ControlButton from '../common/ControlButton';
import { FormEvent, useState } from 'react';
import { ButtonText, LabelText } from './constants';
import dayjs from 'dayjs';

type CategoryHeaderProps = {
  saveHandler: (event: FormEvent<HTMLFormElement>) => void;
  cancelHandler: () => void;
};

export default function CategoryHeader({
  saveHandler,
  cancelHandler,
}: CategoryHeaderProps) {
  // 임시로 이 곳에 date 를 작성해두었습니다.
  const [date, setDate] = useState(dayjs().format('YYYY. MM.'));

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  return (
    <CategoryHeaderContainer>
      <CategoryHeaderContentsContainer>
        <CategoryHeaderTitle>{LabelText.pageTitle}</CategoryHeaderTitle>
        <Monthly value={date} onChange={handleDateChange} />
        <CategoryHeaderButtons>
          <Button
            type="submit"
            form="category-form"
            onClick={() => {
              saveHandler;
            }}
          >
            {ButtonText.save}
          </Button>
          <ControlButton onClick={cancelHandler} title={ButtonText.cancel} />
        </CategoryHeaderButtons>
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

const CategoryHeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  border: 1px solid gray;
  border-radius: 4px;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem;
`;
