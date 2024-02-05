import { categoryListDummyData } from "@/dummies/calendar";
import { CategoryDto } from "@/types";
import { Dayjs } from "dayjs";
import { MutableRefObject, useCallback, useEffect, useMemo, useState } from "react";

export default function useCategoryListDropdown(
  startDate: Dayjs,
  endDate: Dayjs,
  isFirstLoad: MutableRefObject<boolean>,
  shouldSetCategoryIdx: boolean,
  isFixedCategory: (categoryId: number) => boolean
) {
  const [categoryList, setCategoryList] = useState<CategoryDto[]>([]);
  const [firstDropdownValues, setFirstDropdownValues] = useState<string[]>(['-']);
  const [firstCategoryIdx, setFirstCategoryIdx] = useState(0);
  const [secondDropdownValues, setSecondDropdownValues] = useState<string[]>(['-']);
  const [secondCategoryIdx, setSecondCategoryIdx] = useState(0);
  const [thirdDropdownValues, setThirdDropdownValues] = useState<string[]>(['-']);
  const [thirdCategoryIdx, setThirdCategoryIdx] = useState(0);

  const isDropdownDisabled = useMemo(() => {
    return categoryList.length === 0;
  }, [categoryList]);

  // 기간이 변경되면 새 카테고리 리스트를 가져옴
  useEffect(() => {
    setCategoryList([]);
    setFirstCategoryIdx(0);
    setSecondCategoryIdx(0);
    setThirdCategoryIdx(0);

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
      setFirstDropdownValues(['-']);
      setSecondDropdownValues(['-']);
      setThirdDropdownValues(['-']);
      return;
    }

    setFirstDropdownValues(['-', ...categoryList.map(c => c.categoryName)]);
    if(shouldSetCategoryIdx) {
      outer: for(let i0=0; i0<categoryList.length; i0++) {
        const c0 = categoryList[i0];
        if(isFixedCategory(c0.categoryId)) {
          setFirstCategoryIdx(i0 + 1);
          setSecondDropdownValues(['-', ...c0.children.map(c => c.categoryName)]);
          isFirstLoad.current = false;
          break;
        }

        for(let i1=0; i1<c0.children.length; i1++) {
          const c1 = c0.children[i1];
          if(isFixedCategory(c1.categoryId)) {
            setFirstCategoryIdx(i0 + 1);
            setSecondDropdownValues(['-', ...c0.children.map(c => c.categoryName)]);
            setSecondCategoryIdx(i1 + 1);
            setThirdDropdownValues(['-', ...c1.children.map(c => c.categoryName)]);
            isFirstLoad.current = false;
            break outer;
          }

          for(let i2=0; i2<c1.children.length; i2++) {
            const c2 = c1.children[i2];
            if(isFixedCategory(c2.categoryId)) {
              setFirstCategoryIdx(i0 + 1);
              setSecondDropdownValues(['-', ...c0.children.map(c => c.categoryName)]);
              setSecondCategoryIdx(i1 + 1);
              setThirdDropdownValues(['-', ...c1.children.map(c => c.categoryName)]);
              setThirdCategoryIdx(i2 + 1);
              isFirstLoad.current = false;
              break outer;
            }
          }
        }
      }
    }
  }, [categoryList]);

  const handleFirstCategoryIdxChange = useCallback((idx: number) => {
    setFirstCategoryIdx(idx);
    setSecondCategoryIdx(0);
    setThirdCategoryIdx(0);
    setSecondDropdownValues(idx === 0 ? ['-'] : ['-', ...categoryList[idx-1].children.map(c => c.categoryName)]);
  }, [categoryList]);

  const handleSecondCategoryIdxChange = useCallback((idx: number) => {
    setSecondCategoryIdx(idx);
    setThirdCategoryIdx(0);
    setThirdDropdownValues(idx === 0 ? ['-'] : ['-', ...categoryList[firstCategoryIdx-1].children[idx-1].children.map(c => c.categoryName)]);
  }, [categoryList, firstCategoryIdx]);

  const handleThirdCategoryIdxChange = useCallback((idx: number) => {
    setThirdCategoryIdx(idx);
  }, []);

  return {
    categoryList,
    firstCategoryIdx,
    secondCategoryIdx,
    thirdCategoryIdx,
    firstDropdownValues,
    secondDropdownValues,
    thirdDropdownValues,
    isDropdownDisabled,
    handleFirstCategoryIdxChange,
    handleSecondCategoryIdxChange,
    handleThirdCategoryIdxChange,
  }
}