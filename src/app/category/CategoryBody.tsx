import CategoryList from "@/app/category/CategoryList";
import Tips from "@/app/category/Tips";
import time from "@/lib/time";
import { Category, CategoryDto, NewCategoryDto } from "@/types";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import Icon from "@mdi/react";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SimpleButton from "./SimpleButton";
import { Dayjs } from "dayjs";
import CategoryForm from "./CategoryForm";
import { apis } from "@/lib/apis";
import { AxiosError } from "axios";

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

  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightGray};
    cursor: default;
  }
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
    try {
      const response = await apis.getCategories(y, m);
      console.log(response);

      setCategoryDtoList(response.resultBody);
    } catch(e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
    }
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
        parentId: null,
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
          parentId: c1.categoryId,
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
            parentId: c2.categoryId,
            schedules: [],
          });
        })
      })
    });

    setCategoryList(newCategoryList);
  }, [categoryDtoList]);

  const handleCategoryCreate = useCallback(async () => {
    if(!selectedCategory || selectedCategory.level >= 2) return;

    const newCategoryDto: NewCategoryDto = {
      categoryColor: selectedCategory.color,
      categoryDescription: '',
      categoryStartDate: time.toString(currentDate, 'YYYY-MM-DD'),
      categoryLevel: selectedCategory.level + 1,
      categoryName: '새 카테고리',
      categoryParentId: selectedCategory.id,
      categoryVisible: selectedCategory.isVisible,
    };

    try {
      await apis.addCategory(newCategoryDto);

      getCategories(currentDate.year(), currentDate.month());
    } catch(e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
      return;
    }
  }, [selectedCategory, currentDate]);

  const handleCategoryDelete = useCallback(async () => {
    if(!selectedCategory) return;

    try {
      await apis.deleteCategory(selectedCategory.id, time.toString(currentDate, 'YYYY-MM-DD'));

      getCategories(currentDate.year(), currentDate.month()); 
    } catch(e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
    }
  }, [selectedCategory, currentDate]);

  const handleCategoryMove = useCallback(async (direction: number) => {
    if(!selectedCategory) return;

    const { id: categoryId, level, parentId } = selectedCategory;

    let newOrderList: string[] = [];
    if(level === 0) {
      newOrderList = categoryDtoList.map(c => c.categoryId);
    } else {
      outer: for(const c0 of categoryDtoList) {
        if(level === 1) {
          if(c0.categoryId === parentId) {
            newOrderList = c0.children.map(c => c.categoryId);
            break;
          }
        } else {
          for(const c1 of c0.children) {
            if(c1.categoryId === parentId) {
              newOrderList = c1.children.map(c => c.categoryId);
              break outer;
            }
          }
        }
      }
    }

    // newOrderList = selectedCategory 가 속한 리스트의 id 목록
    const maxOrder = newOrderList.length - 1;
    const currentOrder = newOrderList.findIndex(id => id === categoryId);
    if(currentOrder === -1) return;

    const newOrder = currentOrder + direction;
    if(newOrder < 0 || newOrder > maxOrder) return;

    const tmp = newOrderList[newOrder];
    newOrderList[newOrder] = newOrderList[currentOrder];
    newOrderList[currentOrder] = tmp;

    try {
      await apis.moveCategory(newOrderList);

      getCategories(currentDate.year(), currentDate.month());
    } catch(e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
    }
  }, [selectedCategory, categoryDtoList, currentDate]);

  const handleCategoryMoveUp = useCallback(() => {
    handleCategoryMove(-1);
  }, [handleCategoryMove]);

  const handleCategoryMoveDown = useCallback(() => {
    handleCategoryMove(1);
  }, [handleCategoryMove]);

  const handleBaseCategoryCreate = useCallback(async () => {
    const newCategoryDto: NewCategoryDto = {
      categoryColor: 'red',
      categoryDescription: '',
      categoryStartDate: time.toString(currentDate, 'YYYY-MM-DD'),
      categoryLevel: 0,
      categoryName: '새 카테고리',
      categoryParentId: null,
      categoryVisible: true,
    };

    try {
      await apis.addCategory(newCategoryDto);

      getCategories(currentDate.year(), currentDate.month());
    } catch(e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
      return;
    }

  }, [currentDate]);

  const handleCategoryUpdate = useCallback(() => {
    getCategories(currentDate.year(), currentDate.month());
  }, [currentDate]);

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
              <SimpleButton onClick={handleCategoryCreate} disabled={!Boolean(selectedCategory)}>추가</SimpleButton>
              <SimpleButton onClick={handleCategoryDelete} disabled={!Boolean(selectedCategory)}>삭제</SimpleButton>
            </ButtonBox>
            <ButtonBox>
              <Button onClick={handleCategoryMoveUp} disabled={!Boolean(selectedCategory)}>
                <Icon path={mdiChevronUp} />
              </Button>
              <Button onClick={handleCategoryMoveDown} disabled={!Boolean(selectedCategory)}>
                <Icon path={mdiChevronDown} />
              </Button>
            </ButtonBox>
          </ControlRow>
          <AddBaseCategoryButton
            onClick={handleBaseCategoryCreate}
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
        onCategoryUpdate={handleCategoryUpdate}
        ref={formRef}
      />
    </Container>
  )
}