import useDev from "@/hooks/useDev";
import useCategoriesByPeriodData from "@/swr/useCategoriesByPeriodData";
import { Dayjs } from "dayjs";
import { MutableRefObject, useCallback, useEffect, useMemo, useState } from "react";

export default function useCategoryListDropdown(
  startDate: Dayjs,
  endDate: Dayjs,
  isFirstLoad: MutableRefObject<boolean>,
  shouldSetCategoryIdx: boolean,
  isFixedCategory: (categoryId: string) => boolean
) {
  const { categoriesByPeriodData } = useCategoriesByPeriodData(startDate.year(), startDate.month(), endDate.year(), endDate.month());

  const [firstDropdownValues, setFirstDropdownValues] = useState<string[]>(['-']);
  const [firstCategoryIdx, setFirstCategoryIdx] = useState(0);
  const [secondDropdownValues, setSecondDropdownValues] = useState<string[]>(['-']);
  const [secondCategoryIdx, setSecondCategoryIdx] = useState(0);
  const [thirdDropdownValues, setThirdDropdownValues] = useState<string[]>(['-']);
  const [thirdCategoryIdx, setThirdCategoryIdx] = useState(0);

  const isDropdownDisabled = useMemo(() => {
    return !categoriesByPeriodData || categoriesByPeriodData.length === 0;
  }, [categoriesByPeriodData]);

  // 기간이 변경되면 새 카테고리 리스트를 가져옴
  useEffect(() => {
    // setCategoryList([]);
    setFirstCategoryIdx(0);
    setSecondCategoryIdx(0);
    setThirdCategoryIdx(0);
  }, [startDate, endDate]);

  useEffect(() => {
    if(!categoriesByPeriodData || categoriesByPeriodData.length === 0) {
      setFirstDropdownValues(['-']);
      setSecondDropdownValues(['-']);
      setThirdDropdownValues(['-']);
      return;
    }

    setFirstDropdownValues(['-', ...categoriesByPeriodData.map(c => c.categoryName)]);
    if(shouldSetCategoryIdx) {
      outer: for(let i0=0; i0<categoriesByPeriodData.length; i0++) {
        const c0 = categoriesByPeriodData[i0];
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
  }, [categoriesByPeriodData]);

  const handleFirstCategoryIdxChange = useCallback((idx: number) => {
    if(!categoriesByPeriodData) return;
    setFirstCategoryIdx(idx);
    setSecondCategoryIdx(0);
    setThirdCategoryIdx(0);
    setSecondDropdownValues(idx === 0 ? ['-'] : ['-', ...categoriesByPeriodData[idx-1].children.map(c => c.categoryName)]);
  }, [categoriesByPeriodData]);

  const handleSecondCategoryIdxChange = useCallback((idx: number) => {
    if(!categoriesByPeriodData) return;
    setSecondCategoryIdx(idx);
    setThirdCategoryIdx(0);
    setThirdDropdownValues(idx === 0 ? ['-'] : ['-', ...categoriesByPeriodData[firstCategoryIdx-1].children[idx-1].children.map(c => c.categoryName)]);
  }, [categoriesByPeriodData, firstCategoryIdx]);

  const handleThirdCategoryIdxChange = useCallback((idx: number) => {
    setThirdCategoryIdx(idx);
  }, []);

  return {
    categoriesByPeriodData,
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