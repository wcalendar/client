import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LabelText, InputMaxLength, ButtonText } from './constants';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import { postNewCategory } from '@/app/actions';
import { Category } from '@/types';

type CategoryFormProps = {
  isActive: boolean;
  currentCategoryData: Category;
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

export default function CategoryForm({
  isActive,
  currentCategoryData,
}: CategoryFormProps) {
  const [isFormActive, setFormActive] = useState<boolean>(false);
  const { categoryName, categoryDescription, categoryLevel, categoryColor } =
    currentCategoryData;
  const [selectedColor, setSelectedColor] = useState<string>(
    colorOptions[4].color,
  );
  const [currentCategoryName, setCurrentCategoryName] =
    useState<string>(categoryName);

  const [currentCategoryDescription, setCurrentCategoryDescription] =
    useState<string>(categoryDescription ? categoryDescription : '');

  //TODO 서버에 폼 제출?
  const saveCategory = (formData: FormData, color: string) => {};

  //TODO form 초기화
  const cancelCategory = () => {};

  const onHandleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentCategoryName(e.currentTarget.value);
  };

  const onHandleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentCategoryDescription(e.currentTarget.value);
  };

  return (
    <CategoryFormContainer
      action={formData => postNewCategory(formData, selectedColor)}
    >
      <ContentContainer>
        <TitleLabel>{LabelText.title}</TitleLabel>
        <TextInput
          type="text"
          disabled={!isActive}
          maxLength={InputMaxLength}
          name="categoryTitle"
          required
          onChange={e => onHandleNameChange(e)}
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
          required
          onChange={e => onHandleDescriptionChange(e)}
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
      <Divider />
      <FormControlButtons>
        <SubmitButton />
        <CancelButton handleCancel={cancelCategory} />
      </FormControlButtons>
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
  &:disabled {
    cursor: default;
  }
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
`;

const FormControlButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 8px;
`;
