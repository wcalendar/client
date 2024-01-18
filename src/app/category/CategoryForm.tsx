import { ChangeEvent, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { LabelText, InputMaxLength, ButtonText } from '../../components/category/constants';
import { postNewCategory } from '@/app/actions';
import { Category, CategoryColor } from '@/types';
import RadioButton from '@/components/common/RadioButton';
import SimpleButton from './SimpleButton';

const Container = styled.form`
  padding-top: 4.375rem;
`;

const Row = styled.div`
  display: flex;
  height: 1.75rem;
  margin-bottom: .5rem;
`;

const Label = styled.label`
  width: 6.25rem;
  height: 100%;
  line-height: 1.75rem;
  font-size: .875rem;
`;

const TextInput = styled.input`
  width: 21.5rem;
  height: 1.75rem;
  line-height: 1.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  text-indent: .5rem;
  font-size: .75rem;
`;

const ColorSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  list-style: none;
`;

const ColorItem = styled.button<{ $color: string, $is_selected: number }>`
  background-color: ${({ $color }) => $color};
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 4px;
  border: 1px solid ${({ theme, $is_selected }) => $is_selected ? theme.colors.black : 'white'};
  color: ${({ $color }) => $color};
  cursor: pointer;
  transition: border ease .25s, transform ease .25s;
  ${({ $is_selected }) => $is_selected ? 'transform: scale(1.2);' : ''}

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.black};
  }

  &:disabled {
    cursor: default;
  }
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin-top: 1rem;
`;

const FormControlButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
  gap: .75rem;
`;

type ColorOption = { label: CategoryColor, color: string };

type CategoryFormProps = {
  isActive: boolean;
  currentCategoryData: Category;
};

export default function CategoryForm({
  isActive,
  currentCategoryData,
}: CategoryFormProps) {
  const theme = useTheme();

  const colorOptions = useMemo<ColorOption[]>(() => [
    { label: 'red', color: theme.colors.categoryMainRed },
    { label: 'orange', color: theme.colors.categoryMainOrange },
    { label: 'yellow', color: theme.colors.categoryMainYellow },
    { label: 'green', color: theme.colors.categoryMainGreen },
    { label: 'blue', color: theme.colors.categoryMainBlue },
    { label: 'purple', color: theme.colors.categoryMainPurple },
    { label: 'gray', color: theme.colors.categoryMainGray },
  ], [theme]);

  const { categoryName, categoryDescription, categoryLevel, categoryColor } =
    currentCategoryData;

  const [isFormActive, setFormActive] = useState(true);
  const [isVisible, setVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState<CategoryColor>('red');
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
    <Container
      action={formData => postNewCategory(formData, selectedColor)}
    >
      <Row>
        <Label>{LabelText.title}</Label>
        <TextInput
          type="text"
          disabled={!isActive}
          maxLength={InputMaxLength}
          name="categoryTitle"
          required
          onChange={e => onHandleNameChange(e)}
        />
      </Row>
      <Row>
        <Label>{LabelText.description}</Label>
        <TextInput
          type="text"
          placeholder={LabelText.descriptionPlaceHolder}
          disabled={!isActive}
          maxLength={InputMaxLength}
          name="categoryDescription"
          required
          onChange={e => onHandleDescriptionChange(e)}
        />
      </Row>
      <Row>
        <Label>{LabelText.isVisible}</Label>
        <RadioButton label='표시' checked={isVisible} onChange={() => {setVisible(true)}}/>
        <RadioButton label='숨기기' checked={!isVisible} onChange={() => {setVisible(false)}}/>
      </Row>
      <Row>
        <Label>{LabelText.color}</Label>
        <ColorSelector>
          {colorOptions.map(({ label, color }) => (
            <ColorItem
              key={label}
              $color={color}
              $is_selected={label === selectedColor ? 1 : 0}
              onClick={e => {
                setSelectedColor(label);
              }}
            />
          ))}
        </ColorSelector>
      </Row>
      <Divider />
      <FormControlButtons>
        <SimpleButton onClick={() => {}}>저장</SimpleButton>
        <SimpleButton onClick={() => {}}>취소</SimpleButton>
      </FormControlButtons>
    </Container>
  );
}