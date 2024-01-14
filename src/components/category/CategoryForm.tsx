import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LabelText, InputMaxLength, ButtonText } from './constants';

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

  const getCurrentCategoryData = () => {
    console.log('get data');
  };

  useEffect(() => {
    getCurrentCategoryData();
    setSelectedColor(color);
  }, [color]);
  return (
    <CategoryFormContainer
      action={formData => {
        const categoryTitle = formData.get('categoryTitle');
        const categoryDescription = formData.get('categoryDescription');
        const categoryIsShow = formData.get('display');
        const categoryColor = selectedColor;
      }}
    >
      <ContentContainer>
        <TitleLabel>{LabelText.title}</TitleLabel>
        <TextInput
          type="text"
          disabled={!isActive}
          maxLength={InputMaxLength}
          name="categoryTitle"
        />
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LabelText.description}</TitleLabel>
        <TextInput
          type="text"
          placeholder={LabelText.descriptionPlaceHolder}
          disabled={!isActive}
          maxLength={InputMaxLength}
          name="categoryDescription"
        />
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LabelText.isVisible}</TitleLabel>
        <SelectLabel>
          <input
            type="radio"
            name="display"
            value="show"
            disabled={!isActive}
            defaultChecked
          />
          <span>{LabelText.show}</span>
        </SelectLabel>
        <SelectLabel>
          <input
            type="radio"
            name="display"
            value="hide"
            disabled={!isActive}
          />
          <span>{LabelText.hide}</span>
        </SelectLabel>
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>{LabelText.color}</TitleLabel>
        <CategoryColorSelectContainer>
          {colorOptions.map(({ label, color }) => (
            <CategorySelect
              key={label}
              $color={color}
              type="button"
              name="categoryColor"
              disabled={!isActive}
              onClick={e => {
                setSelectedColor(e.currentTarget.value);
              }}
              value={color}
            />
          ))}
        </CategoryColorSelectContainer>
      </ContentContainer>

      <hr style={{ width: '100%', height: '1px' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          gap: '8px',
        }}
      >
        <button type="submit">{ButtonText.save}</button>
        <button>{ButtonText.cancel}</button>
      </div>
    </CategoryFormContainer>
  );
}

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

const CategoryColorSelectContainer = styled.ul`
  display: flex;
  gap: 16px;
  list-style: none;
`;

const CategorySelect = styled.input<{ $color: string }>`
  background-color: ${({ $color }) => $color};
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: none;
  color: ${({ $color }) => $color};
  cursor: pointer;
  &:focus {
    border: 2px solid black;
    padding: 4px;
  }
`;
