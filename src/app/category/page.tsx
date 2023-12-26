'use client';

import CategoryControlButtons from '@/components/category/CategoryControlButtons';
import CategoryForm from '@/components/category/CategoryForm';
import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryList from '@/components/category/CategoryList';
import CategoryMenuHelperText from '@/components/category/CategoryMenuHelperText';
import Header from '@/components/common/Header';
import { getCategories } from '@/lib/utils';
import { Category } from '@/types/Category';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.main``;

const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
`;

const CategoryMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const CategoryListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-right: 4rem;
  border: 1px solid black;
  border-radius: 5px;
`;
const defaultCategoryList: Category[] = [
  { id: 0, name: 'Test1', color: 'red', level: 0 },
  { id: 1, name: 'Test2', color: 'green', level: 1 },
  { id: 2, name: 'Test3', color: 'green', level: 2 },
];

export default function CategoryPage() {
  const [categoryList, setCategoryList] =
    useState<Category[]>(defaultCategoryList);

  useEffect(() => {
    const categories = getCategories();
    setCategoryList(categories);
  }, []);

  const onSaveHandler = () => {
    console.log('Save btn clicked');
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

  return (
    <Container>
      <Header />
      <CategoryHeader
        saveHandler={onSaveHandler}
        cancelHandler={onCancelHandler}
      />
      <CategoryContainer>
        <CategoryMenuContainer>
          <CategoryControlButtons
            addHandler={onAddHandler}
            deleteHandler={onDeleteHandler}
            upHandler={onUpHandler}
            downHandler={onDownHandler}
          />
          <CategoryListContainer>
            <h3>카테고리 전체보기</h3>
            <CategoryList categories={categoryList} />
          </CategoryListContainer>
          <CategoryMenuHelperText />
        </CategoryMenuContainer>
        <CategoryForm />
      </CategoryContainer>
    </Container>
  );
}
