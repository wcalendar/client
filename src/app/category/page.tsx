'use client';

import CategoryForm from '@/components/category/CategoryForm';
import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryList from '@/components/category/CategoryList';
import CategoryMenuHelperText from '@/components/category/CategoryMenuHelperText';
import DeleteModal from '@/components/category/DeleteModal';
import {
  AlertText,
  ButtonText,
  DefaultCategoryLevel,
  LevelOneCountMax,
  MainCategoryLevel,
} from '@/components/category/constants';
import Header from '@/components/common/Header';
import time from '@/lib/time';
import { getCategories } from '@/lib/utils';
import { Category } from '@/types';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import styled from 'styled-components';

export default function CategoryPage() {
  // All Category List
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  // Today date
  const [currentDate, setDate] = useState<Dayjs>(time.now());
  // Category Form Active
  const [isFormActive, setFormActive] = useState(false);
  // Level One Category Button Active
  const [isLevelOneActive, setLevelOneActive] = useState(true);
  // Initial Category Data
  const [currentCategoryData, setCurrentCategoryData] = useState<Category>({
    categoryLevel: DefaultCategoryLevel,
    categoryName: '',
    categoryVisible: true,
    categoryColor: 'blue',
    categoryDescription: '',
    categoryStartDate: dayjs().format('YYYY-MM-DD'),
    categoryEndDate: '2099-12-31',
  });
  // Delete Modal Show
  const [isDeleteModalShow, setDeleteModalShow] = useState<boolean>(false);

  const currentCategoryRef = useRef<HTMLLIElement>(null);
  console.log(currentCategoryRef);
  useEffect(() => {
    setCategoryList(getCategories());
  }, []);

  useEffect(() => {
    const mainCategoryList = categoryList.filter(
      category => category.categoryLevel === MainCategoryLevel,
    );
    if (mainCategoryList.length === LevelOneCountMax) {
      setFormActive(false);
      setLevelOneActive(false);
    }
  }, [categoryList]);

  //TODO Add New Level One Category
  //CategoryLevel = 1
  const handleAddNewCategory = () => {
    setFormActive(true);
    let newCategory = { ...currentCategoryData };
    newCategory.categoryLevel = MainCategoryLevel;
    setCurrentCategoryData(newCategory);
  };

  // TODO Add New Category Button
  //CategoryLevel = Selected Category Level = 1 ? 2 : 3
  const handleAddSubCategory = () => {
    if (currentCategoryRef.current === null) {
      alert(AlertText.add);
      return;
    }
    setFormActive(true);
    let newSubCategory = { ...currentCategoryData };
    currentCategoryData.categoryLevel === 1
      ? (newSubCategory.categoryLevel = 2)
      : (newSubCategory.categoryLevel = 3);
  };

  //TODO Category Delete Button
  //Show Modal to ask
  // Call Back End to Remove
  const handleDeleteCategory = () => {
    if (currentCategoryRef.current === null) {
      alert(AlertText.delete);
      return;
    }
    handleDeleteModal(isDeleteModalShow);
  };

  //TODO Category Move Up
  const moveUpCategory = () => {
    // currentCategory Ref Check
    // currentCategory === null?, do nothing ? Alert
    // currentCategory !== null, currentCategoryLevel Check
    // currentCategoryLevel !== 1? do nothing? Alert
  };

  //TODO Category Move Down
  const moveDownCategory = () => {};

  const handleDeleteModal = (isShow: boolean) => {
    if (isShow) setDeleteModalShow(false);
    else setDeleteModalShow(true);
  };

  return (
    <Container>
      <Header />
      <CategoryHeader date={currentDate} setDate={setDate} />
      <CategoryContainer>
        <CategoryMenuContainer>
          <CategoryMenuButtonsContainer>
            <CategoryControlButtonsContainer>
              <CategoryControlButtons>
                <Button onClick={handleAddSubCategory}>{ButtonText.add}</Button>
                <Button onClick={handleDeleteCategory}>
                  {ButtonText.delete}
                </Button>
              </CategoryControlButtons>
              <CategoryMoveButtons>
                <Button onClick={() => moveUpCategory()}>
                  <RiArrowUpSLine size={16} />
                </Button>
                <Button onClick={() => moveDownCategory()}>
                  <RiArrowDownSLine size={16} />
                </Button>
              </CategoryMoveButtons>
            </CategoryControlButtonsContainer>
            <AddLevelOneButton
              onClick={handleAddNewCategory}
              disabled={!isLevelOneActive}
            >
              {ButtonText.addLevelOne}
            </AddLevelOneButton>
          </CategoryMenuButtonsContainer>
          <CategoryList categories={categoryList} ref={currentCategoryRef} />
          <CategoryMenuHelperText />
        </CategoryMenuContainer>
        <CategoryForm
          isActive={isFormActive}
          currentCategoryData={currentCategoryData}
        />
      </CategoryContainer>
      {isDeleteModalShow && (
        <DeleteModal handleDeleteCategory={() => {}} onClose={() => {}} />
      )}
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  --cell-width: ${({ theme }) => theme.sizes.calendar.cellWidth.desktop};
  --cell-height: ${({ theme }) => theme.sizes.calendar.cellHeight.desktop};
  --memo-width: ${({ theme }) => theme.sizes.calendar.memoWidth.desktop};
  --line-gap: ${({ theme }) => theme.sizes.calendar.lineGap.desktop};
`;

const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  padding-top: 50px;
  z-index: 10;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const CategoryMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const CategoryMenuButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const CategoryControlButtonsContainer = styled.div`
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const CategoryControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CategoryMoveButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  font-weight: bold;
`;

const AddLevelOneButton = styled(Button)`
  border: none;
  margin: 8px 0;
  text-align: start;
  &:disabled {
    color: gray;
    cursor: default;
  }
`;
