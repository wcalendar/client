'use client';

import CategoryControlButtons from '@/components/category/CategoryControlButtons';
import CategoryForm from '@/components/category/CategoryForm';
import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryList from '@/components/category/CategoryList';
import CategoryMenuHelperText from '@/components/category/CategoryMenuHelperText';
import Header from '@/components/common/Header';
import { getCategories } from '@/lib/utils';
import { Category } from '@/types';
import { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.main``;

const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const CategoryMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const CategoryListHeader = styled.h3`
  margin-bottom: 1rem;
`;

const CategoryListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 5px;
`;

export default function CategoryPage() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
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
  };

  const onUpHandler = () => {};

  const onDownHandler = () => {};

  const getCategoryDetail = () => {};

  return (
    <Container>
      <Header />
      <CategoryHeader
        saveHandler={event => {
          onSaveHandler(event);
        }}
        cancelHandler={onCancelHandler}
      />
      <CategoryContainer>
        <CategoryMenuContainer>
          <CategoryControlButtons
            addHandler={onAddHandler}
            deleteHandler={onDeleteHandler}
            upHandler={onUpHandler}
            downHandler={onDownHandler}
            isActive={!isActive}
          />
          <CategoryListContainer>
            <CategoryListHeader>카테고리 전체보기</CategoryListHeader>
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
