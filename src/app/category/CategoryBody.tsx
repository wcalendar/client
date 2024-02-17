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
import useDev from "@/hooks/useDev";
import { usePopup } from "@/providers/PopupProvider/usePopup";
import useCategoriesData from "@/swr/useCategoriesData";
import useExceptionPopup from "@/hooks/useExceptionPopup";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 2.5rem - var(--header-height));
  padding: 1.25rem;
  gap: 1.25rem;
  overflow-y: auto;

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: column;
    gap: 0;
  }
`;

const CategorySide = styled.div`
  display: flex;
  flex-direction: column;
  width: 17.5rem;
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
  const { isDev } = useDev();
  const openExceptionPopup = useExceptionPopup();
  const { openPopup, closePopup } = usePopup();
  const { categoriesData, iscategoriesDataLoading, mutateCategoriesData } = useCategoriesData();

  const formRef = useRef<HTMLFormElement>(null);

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [categoryIdToSelect, setCategoryIdToSelect] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const resetForm = useCallback(() => {
    formRef.current!.reset();
  }, []);

  const toCategoryList = useCallback((categoryDtoList: CategoryDto[]) => {
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

    return newCategoryList
  }, []);

  useEffect(() => {
    if(categoriesData) setCategoryList(toCategoryList(categoriesData));
  }, [categoriesData]);

  useEffect(() => {
    if(categoryIdToSelect) {
      const newSelectedCategory = categoryList.find(c => c.id === categoryIdToSelect);
      if(newSelectedCategory) {
        setSelectedCategory(newSelectedCategory);

        setCategoryIdToSelect(undefined);
      }
    }
  }, [categoryList, categoryIdToSelect])

  const handleCategoryCreate = useCallback(async () => {
    if(isDev()) return;
    if(!selectedCategory || selectedCategory.level >= 2) return;

    const firstChildIdx = categoryList.findIndex(c => c.parentId === selectedCategory.id);
    if(firstChildIdx > -1) {
      let lastChildIdx = firstChildIdx;
      for(let i = firstChildIdx+1; i<categoryList.length; i++) {
        if(categoryList[i].parentId === selectedCategory.id) {
          lastChildIdx = i;
        } else break;
      }

      const categoryCount = lastChildIdx - firstChildIdx + 1;

      if(categoryCount >= 10) {
        openPopup({
          title: '카테고리 생성 실패',
          description: <>카테고리는 단계당 최대 10개 까지 생성이 가능합니다</>,
          buttons: [{ label: '확인', onClick: closePopup }],
        });
  
        return;
      }
    }

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
      const response = await apis.addCategory(newCategoryDto);

      setCategoryIdToSelect(response.resultBody.categoryId);
      mutateCategoriesData();
    } catch(e) {
      const error = e as AxiosError<any>;
      openExceptionPopup(error);
    }
  }, [selectedCategory, currentDate, categoryList]);

  const deleteCategory = useCallback(async () => {
    closePopup();

    if(isDev()) return;

    try {
      await apis.deleteCategory(selectedCategory!.id, time.toString(currentDate, 'YYYY-MM-DD'));

      mutateCategoriesData();
      setSelectedCategory(null);
    } catch(e) {
      const error = e as AxiosError<any>;
      openExceptionPopup(error);
    }
  }, [selectedCategory, currentDate]);

  const handleCategoryDelete = useCallback(async () => {
    if(!selectedCategory) return;

    openPopup({
      title: '카테고리 삭제',
      description: <>카테고리를 삭제하시겠습니까?<br />삭제시 카테고리에 포함된 일정과 하위카테고리 모두 삭제됩니다</>,
      buttons: [
        { label: '삭제', onClick: deleteCategory, warning: true },
        { label: '취소', onClick: closePopup },
      ]
    });
  }, [selectedCategory]);

  const handleCategoryMove = useCallback(async (direction: number) => {
    if(isDev()) return;
    if(!selectedCategory) return;

    const { id: categoryId, level, parentId } = selectedCategory;

    let newOrderList: string[] = [];
    if(level === 0) {
      newOrderList = categoryList.filter(c => c.level === 0).map(c => c.id);
    } else {
      newOrderList = categoryList.filter(c => c.parentId === parentId).map(c => c.id);
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

      mutateCategoriesData();
    } catch(e) {
      const error = e as AxiosError<any>;
      openExceptionPopup(error);
    }
  }, [selectedCategory, categoryList, currentDate]);

  const handleCategoryMoveUp = useCallback(() => {
    handleCategoryMove(-1);
  }, [handleCategoryMove]);

  const handleCategoryMoveDown = useCallback(() => {
    handleCategoryMove(1);
  }, [handleCategoryMove]);

  const handleBaseCategoryCreate = useCallback(async () => {
    if(isDev()) return;

    const baseCategoryList = categoryList.filter(c => c.level === 0);
    if(baseCategoryList.length >= 10) {
      openPopup({
        title: '카테고리 생성 실패',
        description: <>카테고리는 단계당 최대 10개 까지 생성이 가능합니다</>,
        buttons: [{ label: '확인', onClick: closePopup }],
      });

      return;
    }

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
      const response = await apis.addCategory(newCategoryDto);

      setCategoryIdToSelect(response.resultBody.categoryId);
      mutateCategoriesData();
    } catch(e) {
      const error = e as AxiosError<any>;
      openExceptionPopup(error);
    }
  }, [currentDate, categoryList]);

  const handleCategoryUpdate = useCallback(() => {
    mutateCategoriesData();
  }, []);

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