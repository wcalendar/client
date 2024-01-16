import styled from 'styled-components';
import { ButtonText } from './constants';

type DeleteModalProps = {
  handleDeleteCategory: () => void;
  onClose: () => void;
};

export default function DeleteModal({
  handleDeleteCategory,
  onClose,
}: DeleteModalProps) {
  return (
    <DeleteModalContainer>
      <Title>카테고리 삭제</Title>
      <DeleteModalContent>
        카테고리를 삭제하시겠습니까?
        <br />
        삭제 시 카테고리에 포함된 일정 및 하위 카테고리가 모두 삭제됩니다.
      </DeleteModalContent>
      <DeleteModalFooter>
        <DeleteButton onClick={handleDeleteCategory}>
          {ButtonText.delete}
        </DeleteButton>
        <Button onClick={onClose}>{ButtonText.cancel}</Button>
      </DeleteModalFooter>
    </DeleteModalContainer>
  );
}

const DeleteModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 20;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border: 1px solid black;
  border-radius: 8px;
`;

const Title = styled.h2``;

const DeleteModalContent = styled.p`
  font-size: 14px;
`;

const DeleteModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 16px;
`;

const Button = styled.button`
  background-color: white;
  border-radius: 8px;
  border: 1px solid gray;
  padding: 4px 2px;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  color: orangered;
`;
