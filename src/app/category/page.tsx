'use client';

import CategoryForm from '@/components/category/CategoryForm';
import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryList from '@/components/category/CategoryList';
import CategoryMenuHelperText from '@/components/category/CategoryMenuHelperText';
import { ButtonText } from '@/components/category/constants';
import Header from '@/components/common/Header';
import time from '@/lib/time';
import { getCategories } from '@/lib/utils';
import { Category } from '@/types';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import styled from 'styled-components';

export default function CategoryPage() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [currentDate, setDate] = useState<string>(dayjs().format('YYYY. MM.'));
  const [isActive, setIsActive] = useState(false);
  const today = new Date();
  const [currentCategoryData, setCurrentCategoryData] = useState<Category>({
    categoryLevel: 0,
    categoryName: '',
    categoryVisible: true,
    categoryColor: 'blue',
    categoryDescription: '',
    categoryStartDate: dayjs().format('YYYY-MM-DD'),
    categoryEndDate: '2099-12-31',
  });

  console.log(currentCategoryData);

  useEffect(() => {
    setCategoryList(getCategories());
  }, []);

  useEffect(() => {
    const mainCategoryList = categoryList.filter(
      category => category.categoryLevel === 1,
    );
    if (mainCategoryList.length === 10) {
      setIsActive(false);
    }
  }, [categoryList]);

  // When Clicked Category in Category List, get Info from Server that Category
  const getCurrentCategoryData = () => {};

  //TODO Add New Level One Category
  //CategoryLevel = 1
  const addNewCategory = () => {
    setIsActive(true);
    let newCategory = { ...currentCategoryData };
    newCategory.categoryLevel = 1;
    setCurrentCategoryData(newCategory);
  };

  // TODO Add New Category Button
  //CategoryLevel = 2 or 3
  // How to add to Level 1?
  const addSubCategory = () => {
    setIsActive(true);
    // setCategoryLevel(2);
    // setCategoryLevel(3);
  };

  //TODO Category Delete Button
  //Show Modal to ask
  // Call Back End to Remove
  const deleteCategory = (e: any) => {
    console.log('delete btn clicked');
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

  return (
    <Container>
      <Header />
      <CategoryHeader date={currentDate} setDate={setDate} />
      <CategoryContainer>
        <CategoryMenuContainer>
          <CategoryMenuButtonsContainer>
            <CategoryControlButtonsContainer>
              <CategoryControlButtons>
                <Button onClick={addSubCategory}>{ButtonText.add}</Button>
                <Button onClick={e => deleteCategory(e.currentTarget.value)}>
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
            <AddLevelOneButton onClick={addNewCategory}>
              {ButtonText.addLevelOne}
            </AddLevelOneButton>
          </CategoryMenuButtonsContainer>
          <CategoryList categories={categoryList} />
          <CategoryMenuHelperText />
        </CategoryMenuContainer>
        <CategoryForm
          isActive={isActive}
          currentCategoryData={currentCategoryData}
        />
      </CategoryContainer>
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
`;
