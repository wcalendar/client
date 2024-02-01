import { categoryListDummyData } from "@/dummies/calendar";
import { CategoryDto } from "@/types";
import { Dayjs } from "dayjs";
import { MutableRefObject, useCallback, useEffect, useMemo, useState } from "react";

export default function useCategoryListDropdown(startDate: Dayjs, endDate: Dayjs, isFirstLoad: MutableRefObject<boolean>, shouldSetCategoryIdx: (categoryId: number) => boolean) {
  const [categoryList, setCategoryList] = useState<CategoryDto[]>([]);
  const [dropdownValues, setDropdownValues] = useState<string[]>(['-']);
  const [categoryIdx, setCategoryIdx] = useState(0);

  const isDropdownDisabled = useMemo(() => {
    return categoryList.length === 0;
  }, [categoryList]);

  // 기간이 변경되면 새 카테고리 리스트를 가져옴
  useEffect(() => {
    setCategoryList([]);
    setCategoryIdx(0);

    const getCategoryList = async () => {
      // TODO API
      setTimeout(() => {
        setCategoryList([...categoryListDummyData]);
      }, 1000);
    };
    
    getCategoryList();
  }, [startDate, endDate]);

  useEffect(() => {
    if(categoryList.length === 0) {
      setDropdownValues(['-']);
      return;
    }

    const result: string[] = ['-'];

    let idx = 1;
    categoryList.forEach(c1 => {
      result.push(c1.categoryName);
      if(shouldSetCategoryIdx(c1.categoryId)) {
        setCategoryIdx(idx);
        isFirstLoad.current = false;
      } 
      idx++;

      c1.children.forEach(c2 => {
        result.push(`  ${c2.categoryName}`);
        if(shouldSetCategoryIdx(c2.categoryId)) {
          setCategoryIdx(idx);
          isFirstLoad.current = false;
        } 
        idx++;

        c2.children.forEach(c3 => {
          result.push(`    ${c3.categoryName}`);
          if(shouldSetCategoryIdx(c3.categoryId)) {
            setCategoryIdx(idx);
            isFirstLoad.current = false;
          } 
          idx++;
        })
      })
    });

    setDropdownValues(result);
  }, [categoryList]);

  const handleCategoryIdxChange = useCallback((idx: number) => {
    setCategoryIdx(idx);
  }, []);

  return {
    categoryList,
    categoryIdx,
    dropdownValues,
    isDropdownDisabled,
    handleCategoryIdxChange,
  }
}