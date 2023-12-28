import { CategoryColor } from '@/types/Category';
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

type CategoryOption = {
  name: string;
  color: CategoryColor;
};

const options: CategoryOption[] = [
  {
    name: 'Main',
    color: 'blue',
  },
  {
    name: 'Sub',
    color: 'green',
  },
];

const LABEL_TITLE = '제목';
const LABEL_OPTION = '비고';
const LABEL_VIEW = '표시 여부';
const LABEL_COLOR = '범주';
const OPTION_HELPER_TEXT = '카테고리 관련 메모 입력(마감일, 주기 등)';

export default function CategoryForm() {
  const [categoryColor, setCategoryColor] = useState<string>('blue');
  return (
    <CategoryFormContainer>
      <ContentContainer>
        <TitleLabel>{LABEL_TITLE}</TitleLabel>
        <TextInput type="text" />
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LABEL_OPTION}</TitleLabel>
        <TextInput type="text" placeholder={OPTION_HELPER_TEXT} />
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LABEL_VIEW}</TitleLabel>
        <SelectLabel>
          <input type="radio" name="display" value="show" checked />
          <span>표시</span>
        </SelectLabel>
        <SelectLabel>
          <input type="radio" name="display" value="hide" />
          <span>숨기기</span>
        </SelectLabel>
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LABEL_COLOR}</TitleLabel>
        <CategoryColorSelector
          color={categoryColor}
          setColor={setCategoryColor}
        />
      </ContentContainer>
    </CategoryFormContainer>
  );
}
