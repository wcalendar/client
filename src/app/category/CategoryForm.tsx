import { FormEventHandler, useCallback, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { LabelText, InputMaxLength } from '../../components/category/constants';
import { Category, CategoryColor } from '@/types';
import SimpleButton from './SimpleButton';
import FormRadioButton from '@/components/common/FormRadioButton';
import FormSimpleButton from './FormSimpleButton';

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

const ColorItem = styled.input<{ $color: string }>`
  appearance: none;

  &::before {
    display: block;
    content: "";
    background-color: ${({ $color }) => $color};
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid white;
    transition: transform ease .25s, border ease .25s;
  }

  &:hover::before {
    transform: scale(1.2);
    border: 1px solid ${({ theme }) => theme.colors.black};
  }

  &:checked::before {
    transform: scale(1.2);
    border: 1px solid ${({ theme }) => theme.colors.black};
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
  selectedCategory: Category | null;
};

export default function CategoryForm({
  selectedCategory
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

  const isActive = Boolean(selectedCategory);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

  }, []);

  return (
    <Container onSubmit={handleSubmit} >
      <Row>
        <Label>{LabelText.title}</Label>
        <TextInput
          type="text"
          disabled={!isActive}
          maxLength={InputMaxLength}
          name="categoryName"
          required
          defaultValue=''
          tabIndex={1}
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
          defaultValue=''
          tabIndex={2}
        />
      </Row>
      <Row>
        <Label>{LabelText.isVisible}</Label>
        <FormRadioButton name='categoryVisible' value='ture' label='표시' tabIndex={3} defaultChecked />
        <FormRadioButton name='categoryVisible' value='false' label='숨기기' tabIndex={4} />
      </Row>
      <Row>
        <Label>{LabelText.color}</Label>
        <ColorSelector>
          {colorOptions.map(({ label, color }, i) => (
            <ColorItem
              key={label}
              type='radio'
              name='categoryColor'
              value={label}
              $color={color}
              tabIndex={i+5}
              defaultChecked={i === 0}
            />
          ))}
        </ColorSelector>
      </Row>
      <Divider />
      <FormControlButtons>
        <FormSimpleButton tabIndex={12} value='저장' />
        <SimpleButton onClick={() => {}}>취소</SimpleButton>
      </FormControlButtons>
    </Container>
  );
}