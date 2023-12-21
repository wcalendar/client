import styled from 'styled-components';

const helperText: string[] = [
  '카테고리 이동은 카테고리 그룹 순서 이동만 가능합니다.',
  '1단계 카테고리는 총 10개까지 생성 가능합니다.',
  '각각의 하위 카테고리는 총 10개까지 생성 가능합니다.',
  '카테고리는 3단계까지 생성 가능합니다.',
  '카테고리 제목과 일정은 수정 시, 전 기간에 반영됩니다.',
  '카테고리 추가/삭제는 해당 월부터 반영됩니다.',
];

const CategoryHelperTextContainer = styled.ul`
  font-size: 10px;
  padding: 1rem;
`;
export default function CategoryMenuHelperText() {
  return (
    <CategoryHelperTextContainer>
      {helperText.map(text => (
        <li key={text}>{text}</li>
      ))}
    </CategoryHelperTextContainer>
  );
}
