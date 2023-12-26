import { CategoryColor } from '@/types/Category';
import styled from 'styled-components';

const CategoryFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const TitleLabel = styled.label`
  width: 4rem;
`;

const CustomSelect = styled.select`
  display: flex;
`;

const TextInput = styled.input`
  width: 344px;
  height: 28px;
  padding-left: 4px;
`;

type CategoryOption = {
  name: string;
  color: CategoryColor;
};

const options: CategoryOption[] = [
  {
    name: 'Main',
    color: 'blue',
  },
  {
    name: 'Sub',
    color: 'green',
  },
];

export default function CategoryForm() {
  return (
    <CategoryFormContainer>
      <ContentContainer>
        <TitleLabel>제목</TitleLabel>
        <TextInput type="text" />
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>비고</TitleLabel>
        <TextInput
          type="text"
          placeholder="카테고리 관련 메모 입력(마감일, 주기 등)"
        />
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>표시여부</TitleLabel>
        <label>
          <input type="radio" name="display" value="show" />
          표시
        </label>
        <label>
          <input type="radio" name="display" value="hide" />
          숨기기
        </label>
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>범주</TitleLabel>
        <section data-role="selectbox">
          <button>색상 선택</button>
          <ul>
            {options.map(option => (
              <li key={option.name}>
                <div>{option.name}</div>
              </li>
            ))}
          </ul>
        </section>
      </ContentContainer>
    </CategoryFormContainer>
  );
}
