import { ChangeEventHandler, FormEventHandler, forwardRef, useCallback, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
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

const ColorItem = styled.input<{ $color: CategoryColor }>`
  appearance: none;

  &::before {
    display: block;
    content: "";
    background-color: ${({ theme, $color }) => theme.colors.category($color, 0)};
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid white;
    transition: transform ease .25s, border ease .25s;
  }

  &:hover:enabled::before {
    transform: scale(1.1);
    border: 1px solid ${({ theme }) => theme.colors.black};
  }

  &:checked:enabled::before {
    transform: scale(1.1);
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

const colors: CategoryColor[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'];

type CategoryFormProps = {
  selectedCategory: Category | null;
  resetForm: () => void;
};

const CategoryForm = forwardRef<HTMLFormElement, CategoryFormProps>(({
  selectedCategory,
  resetForm,
}, ref) => {
  const theme = useTheme();

  const isActive = Boolean(selectedCategory);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isVisible, setVisible] = useState<boolean>();
  const [color, setColor] = useState<CategoryColor>();

  useEffect(() => {
    setName(selectedCategory?.name || '');
    setDescription(selectedCategory?.description || '');
    setVisible(selectedCategory?.isVisible);
    setColor(selectedCategory?.color);
  }, [selectedCategory]);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    console.log(formData.get('categoryName'));
  }, []);

  const handleNameChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setName(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setDescription(e.target.value);
  }, []);

  const handleVisibleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    if(e.target.value === 'true') setVisible(true);
    else if(e.target.value === 'false') setVisible(false);
  }, []);

  const handleColorChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const newColor = e.target.value as CategoryColor;
    setColor(newColor); 
  }, []);

  const handleCancel = useCallback(() => {
    resetForm();
  }, []);

  return (
    <Container onSubmit={handleSubmit} ref={ref} >
      <Row>
        <Label>제목</Label>
        <TextInput
          name='categoryName'
          type="text"
          disabled={!isActive}
          maxLength={20}
          tabIndex={1}
          value={name}
          onChange={handleNameChange}
        />
      </Row>
      <Row>
        <Label>비고</Label>
        <TextInput
          name='categoryDescription'
          type="text"
          placeholder='카테고리 관련 메모 입력(마감일, 주기 등)'
          disabled={!isActive}
          maxLength={20}
          tabIndex={2}
          value={description}
          onChange={handleDescriptionChange}
        />
      </Row>
      <Row>
        <Label>표시 여부</Label>
        <FormRadioButton
          name='categoryVisible'
          value='true'
          checked={isVisible === undefined ? false : isVisible}
          onChange={handleVisibleChange}
          label='표시'
          disabled={!isActive}
          tabIndex={3}
        />
        <FormRadioButton
          name='categoryVisible'
          value='false'
          checked={isVisible === undefined ? false : !isVisible}
          onChange={handleVisibleChange}
          label='숨기기'
          disabled={!isActive}
          tabIndex={4}
        />
      </Row>
      <Row>
        <Label>범주</Label>
        <ColorSelector>
          {colors.map((colorName, i) => (
            <ColorItem
              name='categoryColor'
              key={colorName}
              type='radio'
              value={colorName}
              $color={colorName}
              disabled={!isActive}
              checked={color === undefined ? false : color === colorName}
              onChange={handleColorChange}
              tabIndex={i+5}
            />
          ))}
        </ColorSelector>
      </Row>
      <Divider />
      <FormControlButtons>
        <FormSimpleButton tabIndex={12} value='저장' disabled={!isActive} />
        <SimpleButton onClick={handleCancel} disabled={!isActive}>취소</SimpleButton>
      </FormControlButtons>
    </Container>
  );
})

export default CategoryForm;