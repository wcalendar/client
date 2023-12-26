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
`;

export default function CategoryForm() {
  return (
    <CategoryFormContainer>
      <ContentContainer>
        <TitleLabel>제목</TitleLabel>
        <TextInput type="text" />
      </ContentContainer>
      <ContentContainer>
        <TitleLabel>비고</TitleLabel>
        <TextInput type="text" />
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
        <CustomSelect name="languages" id="lang">
          <option value="javascript">JavaScript</option>
          <option value="php">PHP</option>
          <option value="java">Java</option>
          <option value="golang">Golang</option>
          <option value="python">Python</option>
          <option value="c#">C#</option>
          <option value="C++">C++</option>
          <option value="erlang">Erlang</option>
        </CustomSelect>
      </ContentContainer>
    </CategoryFormContainer>
  );
}
