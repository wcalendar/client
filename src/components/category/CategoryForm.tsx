import { useState } from 'react';
import styled from 'styled-components';

const CategoryFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  margin-left: 32px;
  height: fit-content;
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

const CategoryColorSelectContainer = styled.div``;

const CategorySelect = styled.select``;

const LABEL_TITLE = '제목';
const LABEL_OPTION = '비고';
const LABEL_VIEW = '표시 여부';
const LABEL_COLOR = '범주';
const OPTION_HELPER_TEXT = '카테고리 관련 메모 입력(마감일, 주기 등)';
const LABEL_SHOW = '표시';
const LABEL_HIDE = '숨기기';
const MAX_TEXT_COUNT = 20;

type CategoryFormProps = {
  isActive: boolean;
  color: string;
  name: string;
  description: string;
};

const colorOptions = [
  { label: 'Color 1', color: '#FF0000' },
  { label: 'Color 2', color: '#FFA500' },
  { label: 'Color 3', color: '#FFFF00' },
  { label: 'Color 4', color: '#008000' },
  { label: 'Color 5', color: '#0000FF' },
  { label: 'Color 6', color: '#4B0082' },
  { label: 'Color 7', color: '#9400D3' },
];

export default function CategoryForm({ isActive, color }: CategoryFormProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    colorOptions[4].color,
  );

  return (
    <CategoryFormContainer id="category-form">
      <ContentContainer>
        <TitleLabel>{LABEL_TITLE}</TitleLabel>
        <TextInput
          type="text"
          disabled={!isActive}
          maxLength={MAX_TEXT_COUNT}
          required
        />
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LABEL_OPTION}</TitleLabel>
        <TextInput
          type="text"
          placeholder={OPTION_HELPER_TEXT}
          disabled={!isActive}
          maxLength={MAX_TEXT_COUNT}
          required
        />
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LABEL_VIEW}</TitleLabel>
        <SelectLabel>
          <input
            type="radio"
            name="display"
            value="show"
            disabled={!isActive}
            defaultChecked
          />
          <span>{LABEL_SHOW}</span>
        </SelectLabel>
        <SelectLabel>
          <input
            type="radio"
            name="display"
            value="hide"
            disabled={!isActive}
          />
          <span>{LABEL_HIDE}</span>
        </SelectLabel>
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LABEL_COLOR}</TitleLabel>
        <CategoryColorSelectContainer>
          <ul style={{ display: 'flex', gap: '8px', listStyle: 'none' }}>
            {colorOptions.map(({ label, color }) => (
              <li
                key={label}
                style={{
                  backgroundColor: color,
                  width: '24px',
                  height: '24px',
                }}
                onClick={() => setSelectedColor(color)}
              ></li>
            ))}
          </ul>
        </CategoryColorSelectContainer>
      </ContentContainer>
    </CategoryFormContainer>
  );
}
