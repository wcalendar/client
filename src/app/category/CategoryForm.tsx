import { ChangeEventHandler, FormEventHandler, forwardRef, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Category, CategoryColor, CategoryUpdateDto, ErrorRes } from '@/types';
import SimpleButton from './SimpleButton';
import FormRadioButton from '@/components/common/FormRadioButton';
import FormSimpleButton from './FormSimpleButton';
import { AxiosError } from 'axios';
import { apis } from '@/lib/apis';
import useDev from '@/hooks/useDev';

const Container = styled.form`
  width: 28.125rem;
  padding-top: 4.375rem;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 20.625rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 17.5rem;
    padding-top: 1rem;
  }
`;

const Row = styled.div`
  display: flex;
  height: 1.75rem;
  margin-bottom: .5rem;
`;

const Label = styled.label`
  flex: 6.25rem 0 0;
  height: 100%;
  line-height: 1.75rem;
  font-size: .875rem;

  @media ${({ theme }) => theme.devices.tablet} {
    flex: 5.125rem 0 0;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    flex: 4rem 0 0;
  }
`;

const TextInput = styled.input`
  flex-grow: 1;
  height: 1.75rem;
  line-height: 1.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  text-indent: .5rem;
  font-size: .75rem;
`;

const ColorSelector = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  list-style: none;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 8px;
  }
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

  &:disabled::before {
    opacity: .5;
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
  onCategoryUpdate: () => void;
};

const CategoryForm = forwardRef<HTMLFormElement, CategoryFormProps>(
function CategoryForm({
  selectedCategory,
  resetForm,
  onCategoryUpdate,
}, ref) {
  const { isDev } = useDev();
  const isActive = Boolean(selectedCategory);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isVisible, setVisible] = useState<boolean>();
  const [color, setColor] = useState<CategoryColor>();

  useEffect(() => {
    setName(selectedCategory?.name || '');
    setDescription(selectedCategory?.description || '');
    setVisible(selectedCategory?.isVisible);
    setColor((selectedCategory && (selectedCategory.level === 0)) ? selectedCategory.color : undefined);
  }, [selectedCategory]);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(async (e) => {
    e.preventDefault();

    if(!selectedCategory) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const newCategoryUpdateDto: CategoryUpdateDto = {
      categoryName: formData.get('categoryName') as string,
      categoryDescription: formData.get('categoryDescription') as string,
      categoryVisible: formData.get('categoryVisible') === 'true' ? true : false,
      categoryColor: selectedCategory.level === 0 ? formData.get('categoryColor') as CategoryColor : selectedCategory.color,
    };

    if(isDev()) {
      console.log(newCategoryUpdateDto);
      return;
    }

    try {
      const response = await apis.updateCategory(selectedCategory.id, newCategoryUpdateDto);
      onCategoryUpdate();
    } catch(e) {
      const error = e as AxiosError<ErrorRes>;
      console.log(error.response?.data);
    }

  }, [selectedCategory]);

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
              disabled={Boolean(!selectedCategory || selectedCategory.level > 0)}
              checked={color === undefined ? false : color === colorName}
              onChange={handleColorChange}
              tabIndex={i+5}
            />
          ))}
        </ColorSelector>
      </Row>
      <Divider />
      <FormControlButtons>
        <SimpleButton onClick={handleCancel} disabled={!isActive}>취소</SimpleButton>
        <FormSimpleButton tabIndex={12} value='저장' disabled={!isActive} />
      </FormControlButtons>
    </Container>
  );
})

export default CategoryForm;