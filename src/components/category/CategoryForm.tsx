import styled from 'styled-components';
import CategoryColorSelector from './CategoryColorSelector';
import { useState } from 'react';

const CategoryFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const TitleLabel = styled.label`
  width: 100px;
`;

const SelectLabel = styled.label`
  display: flex;
  gap: 8px;
`;

const TextInput = styled.input`
  width: 344px;
  height: 28px;
  padding-left: 4px;
`;

const LABEL_TITLE = '제목';
const LABEL_OPTION = '비고';
const LABEL_VIEW = '표시 여부';
const LABEL_COLOR = '범주';
const OPTION_HELPER_TEXT = '카테고리 관련 메모 입력(마감일, 주기 등)';
const LABEL_SHOW = '표시';
const LABEL_HIDE = '숨기기';

type CategoryFormProps = {
  isActive: boolean;
  color: string;
  name: string;
  description: string;
};

export default function CategoryForm({ isActive, color }: CategoryFormProps) {
  const handleColorChange = (selectedColor: string) => {
    console.log(`Selected Color: ${selectedColor}`);
  };

  const onSubmitHandler = () => {
    console.log('Submit btn clicked');
  };

  return (
    <CategoryFormContainer onSubmit={onSubmitHandler}>
      <ContentContainer>
        <TitleLabel>{LABEL_TITLE}</TitleLabel>
        <TextInput type="text" disabled={!isActive} />
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LABEL_OPTION}</TitleLabel>
        <TextInput
          type="text"
          placeholder={OPTION_HELPER_TEXT}
          disabled={!isActive}
        />
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LABEL_VIEW}</TitleLabel>
        <SelectLabel>
          <input type="radio" name="display" value="show" />
          <span>{LABEL_SHOW}</span>
        </SelectLabel>
        <SelectLabel>
          <input type="radio" name="display" value="hide" />
          <span>{LABEL_HIDE}</span>
        </SelectLabel>
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LABEL_COLOR}</TitleLabel>
        <CategoryColorSelector onColorChange={handleColorChange} />
      </ContentContainer>
    </CategoryFormContainer>
  );
}
