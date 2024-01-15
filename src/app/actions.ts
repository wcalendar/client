'use server';

import { validateString } from '@/lib/utils';

const MAX_LENGTH = 20;
export async function postNewCategory(
  formData: FormData,
  selectedColor: string,
) {
  const categoryTitle = formData.get('categoryTitle');
  const categoryDescription = formData.get('categoryDescription');
  const categoryIsShow = formData.get('display');
  const categoryColor = selectedColor;

  if (!validateString(categoryTitle, MAX_LENGTH)) {
    return {
      error: '유효하지 않은 제목입니다.',
    };
  }

  if (!validateString(categoryDescription, MAX_LENGTH)) {
    return {
      error: '유효하지 않은 내용입니다.',
    };
  }

  try {
    const response = await fetch('');
    console.log(response);
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
}
