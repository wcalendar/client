import CategoryForm from "@/app/category/CategoryForm";
import CategoryList from "@/app/category/CategoryList";
import Tips from "@/app/category/Tips";
import { AlertText } from "@/components/category/constants";
import time from "@/lib/time";
import { getCategories } from "@/lib/utils";
import { Category } from "@/types";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SimpleButton from "./SimpleButton";

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1.25rem;
  gap: 1.25rem;
`;

const CategorySide = styled.div`
  display: flex;
  flex-direction: column;
  width: 19.375rem;
`;

const ControlBox = styled.div`

`;

const ControlRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: .75rem;
`;

const Button = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: .25rem;
  cursor: pointer;
`;

const AddBaseCategoryButton = styled.button`
  width: 100%;
  height: 1.125rem;
  border: none;
  border-radius: .25rem;
  margin-top: 1rem;
  margin-bottom: .5rem;
  text-align: start;
  background-color: white;
  font-size: .75rem;
  font-weight: bold;
  text-indent: 1rem;
  cursor: pointer;
  transition: background-color ease .25s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};
    color: white;
  }

  &:disabled {
    color: gray;
    cursor: default;
  }
`;

export default function CategoryBody() {
  const currentCategoryRef = useRef<HTMLLIElement>(null);

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  // Initial Category Data
  const [currentCategoryData, setCurrentCategoryData] = useState<Category>({
    categoryLevel: 0,
    categoryName: '',
    categoryVisible: true,
    categoryColor: 'blue',
    categoryDescription: '',
    categoryStartDate: time.toString(time.now(), 'YYYY-MM-DD'),
    categoryEndDate: '2099-12-31',
  });
  // Category Form Active
  const [isFormActive, setFormActive] = useState(false);
  // Level One Category Button Active
  const [isLevelOneActive, setLevelOneActive] = useState(true);

  // Delete Modal Show
  const [isDeleteModalShow, setDeleteModalShow] = useState<boolean>(false);

  useEffect(() => {
    setCategoryList(getCategories());
  }, []);

  useEffect(() => {
    const mainCategoryList = categoryList.filter(
      category => category.categoryLevel === 0,
    );
    // TODO MAXLENGTH 저장
    if (mainCategoryList.length === 10) {
      setFormActive(false);
      setLevelOneActive(false);
    }
  }, [categoryList]);

  // TODO Add New Category Button
  //CategoryLevel = Selected Category Level = 1 ? 2 : 3
  const handleAddSubCategory = () => {
    if (currentCategoryRef.current === null) {
      alert('하위 카테고리를 추가할 상위 카테고리를 선택하세요.');
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

  //TODO Add New Level One Category
  //CategoryLevel = 1
  const handleAddNewCategory = () => {
    setFormActive(true);
    let newCategory = { ...currentCategoryData };
    newCategory.categoryLevel = 0;
    setCurrentCategoryData(newCategory);
  };

  const handleDeleteModal = (isShow: boolean) => {
    if (isShow) setDeleteModalShow(false);
    else setDeleteModalShow(true);
  };

  return (
    <Container>
      <CategorySide>
        <ControlBox>
          <ControlRow>
            <ButtonBox>
              <SimpleButton onClick={handleAddSubCategory}>추가</SimpleButton>
              <SimpleButton onClick={handleDeleteCategory}>삭제</SimpleButton>
            </ButtonBox>
            <ButtonBox>
              <Button onClick={moveUpCategory}>
                <Icon path={mdiChevronUp} />
              </Button>
              <Button onClick={moveDownCategory}>
              <Icon path={mdiChevronDown} />
              </Button>
            </ButtonBox>
          </ControlRow>
          <AddBaseCategoryButton
            onClick={handleAddNewCategory}
            disabled={!isLevelOneActive}
          >
            + 1단계 카테고리 추가
          </AddBaseCategoryButton>
        </ControlBox>
        <CategoryList categories={categoryList} ref={currentCategoryRef} />
        <Tips />
      </CategorySide>
      <CategoryForm
        isActive={isFormActive}
        currentCategoryData={currentCategoryData}
      />
    </Container>
  )
}