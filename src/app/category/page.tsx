'use client';

import CategoryControlButtons from '@/components/category/CategoryControlButtons';
import CategoryForm from '@/components/category/CategoryForm';
import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryList from '@/components/category/CategoryList';
import CategoryMenuHelperText from '@/components/category/CategoryMenuHelperText';
import Header from '@/components/common/Header';
import styled from 'styled-components';

const Container = styled.main`
`;

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

export default function Category() {
  return (
    <Container>
      <Header />
      <CategoryHeader />
      <CategoryContainer>
        <CategoryMenuContainer>
          <CategoryControlButtons />
          <CategoryListContainer>
            <h3>카테고리 전체보기</h3>
            <CategoryList />
          </CategoryListContainer>
          <CategoryMenuHelperText />
        </CategoryMenuContainer>
        <CategoryForm />
      </CategoryContainer>
    </Container>
  );
}
