import CategoryList from "@/app/category/CategoryList";
import Tips from "@/app/category/Tips";
import time from "@/lib/time";
import { Category, CategoryDto } from "@/types";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import Icon from "@mdi/react";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SimpleButton from "./SimpleButton";
import { calendarDummyData } from "@/dummies/calendar";
import { Dayjs } from "dayjs";
import CategoryForm from "./CategoryForm";

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

interface CategoryBodyProps {
  currentDate: Dayjs;
}

export default function CategoryBody({
  currentDate,
}: CategoryBodyProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [categoryDtoList, setCategoryDtoList] = useState<CategoryDto[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const resetForm = useCallback(() => {
    formRef.current!.reset();
  }, []);

  const getCategories = useCallback(async (y: number, m: number) => {
    // TODO API
    setCategoryDtoList(calendarDummyData[m].resultBody);
  }, []);

  useEffect(() => {
    getCategories(currentDate.year(), currentDate.month());
  }, [currentDate]);

  useEffect(() => {
    const newCategoryList: Category[] = [];

    categoryDtoList.forEach(c1 => {
      newCategoryList.push({
        id: c1.categoryId,
        name: c1.categoryName,
        level: c1.categoryLevel,
        color: c1.categoryColor,
        startDate: time.fromString(c1.categoryStartDate),
        endDate: time.fromString(c1.categoryEndDate),
        description: c1.categoryDescription,
        isVisible: c1.categoryVisible,
        schedules: [],
      });

      c1.children.forEach(c2 => {
        newCategoryList.push({
          id: c2.categoryId,
          name: c2.categoryName,
          level: c2.categoryLevel,
          color: c2.categoryColor,
          startDate: time.fromString(c2.categoryStartDate),
          endDate: time.fromString(c2.categoryEndDate),
          description: c2.categoryDescription,
          isVisible: c2.categoryVisible,
          schedules: [],
        });

        c2.children.forEach(c3 => {
          newCategoryList.push({
            id: c3.categoryId,
            name: c3.categoryName,
            level: c3.categoryLevel,
            color: c3.categoryColor,
            startDate: time.fromString(c3.categoryStartDate),
            endDate: time.fromString(c3.categoryEndDate),
            description: c3.categoryDescription,
            isVisible: c3.categoryVisible,
            schedules: [],
          });
        })
      })
    });

    setCategoryList(newCategoryList);
  }, [categoryDtoList]);

  const handleCategoryItemClick = useCallback((category: Category) => {
    if(selectedCategory && selectedCategory.id === category.id) setSelectedCategory(null);
    else setSelectedCategory({...category});
  }, [selectedCategory]);

  return (
    <Container>
      <CategorySide>
        <ControlBox>
          <ControlRow>
            <ButtonBox>
              <SimpleButton onClick={() => {}} disabled={!Boolean(selectedCategory)}>추가</SimpleButton>
              <SimpleButton onClick={() => {}}>삭제</SimpleButton>
            </ButtonBox>
            <ButtonBox>
              <Button onClick={() => {}}>
                <Icon path={mdiChevronUp} />
              </Button>
              <Button onClick={() => {}}>
              <Icon path={mdiChevronDown} />
              </Button>
            </ButtonBox>
          </ControlRow>
          <AddBaseCategoryButton
            onClick={() => {}}
            disabled={false}
          >
            + 1단계 카테고리 추가
          </AddBaseCategoryButton>
        </ControlBox>
        <CategoryList categoryList={categoryList} selectedCategory={selectedCategory} onCategoryItemClick={handleCategoryItemClick}/>
        <Tips />
      </CategorySide>
      <CategoryForm
        selectedCategory={selectedCategory}
        resetForm={resetForm}
        ref={formRef}
      />
    </Container>
  )
}