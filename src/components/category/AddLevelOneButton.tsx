import styled from 'styled-components';

// 1단계 추가 버튼

type AddLevelOneButtonProps = {};

export default function AddLevelOneButton({}: AddLevelOneButtonProps) {
  const onAddButtonHandler = () => {
    // ref === null ? check
    // 선택된 카테고리 없을  때만 활성..?
  };

  return <Button onClick={onAddButtonHandler}>+ 1단계 카테고리 추가</Button>;
}

const Button = styled.button`
  background-color: transparent;
  border: none;
  margin: 8px 0;
  cursor: pointer;
`;
