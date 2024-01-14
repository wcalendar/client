'use client';

import AddButton from '@/components/category/AddButton';
import CategoryForm from '@/components/category/CategoryForm';
import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryList from '@/components/category/CategoryList';
import CategoryMenuHelperText from '@/components/category/CategoryMenuHelperText';
import DeleteButton from '@/components/category/DeleteButton';
import MoveButton from '@/components/category/MoveButton';
import Header from '@/components/common/Header';
import { getCategories } from '@/lib/utils';
import { Category } from '@/types';
import dayjs from 'dayjs';
import { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

export default function CategoryPage() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [currentDate, setDate] = useState<string>(dayjs().format('YYYY. MM.'));
  const [isActive, setIsActive] = useState(true);
  const [categoryData, setCategoryData] = useState<Category>();

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

  const onSaveHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submit btn clicked');
  };

  const onCancelHandler = () => {
    console.log('Cancel btn clicked');
  };

  const onAddHandler = () => {
    console.log('Add btn clicked');
  };

  const onDeleteHandler = () => {
    console.log('Delete btn clicked');
    // 모달 실행
  };

  const onUpHandler = () => {
    // 선택된 카테고리 없으면 경고? or Do nothing?
  };

  const onDownHandler = () => {};

  const getCategoryDetail = () => {
    console.log('btn clicked');
  };

  return (
    <Container>
      <Header />
      <CategoryHeader date={currentDate} setDate={setDate} />
      <CategoryContainer>
        <CategoryMenuContainer>
          <CategoryControlButtons>
            <AddButton />
            <DeleteButton />
          </CategoryControlButtons>
          <CategoryMoveButtons>
            <MoveButton />
            <MoveButton />
          </CategoryMoveButtons>

          <CategoryListContainer>
            <CategoryList
              categories={categoryList}
              getCategory={getCategoryDetail}
            />
          </CategoryListContainer>
          <CategoryMenuHelperText />
        </CategoryMenuContainer>
        <CategoryForm
          isActive={isActive}
          color={''}
          name={''}
          description={''}
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

const CategoryListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-right: 40px;
  border: 1px solid black;
  border-radius: 5px;
`;

const CategoryControlButtons = styled.div``;

const CategoryMoveButtons = styled.div``;
