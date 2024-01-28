import { CategoryModalInfo } from "@/types";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";
import FloatingModal from "../floating-modal/FloatingModal";
import { useCallback, useState } from "react";
import { useModal } from "@/providers/ModalProvider/useModal";

export type CategoryModalProps = {
  categoryModalInfo: CategoryModalInfo;
}

const Header = styled.div`
  width: 100%;
  padding: .75rem;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
`;

const Title = styled.div`
  flex-grow: 1;
  font-size: .875rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  flex-basis: 13px;
  flex-shrink: 0;
  height: 13px;
  margin-left: .25rem;
  border: none;
  background: white;
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  padding: .5rem;
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  padding: 0 1rem;
`;

const Label = styled.div`
  flex-basis: 20%;
  flex-grow: 0;
  flex-shrink: 0;
  min-height: 1rem;
  line-height: 1rem;
  font-size: .75rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const Value = styled.div`
  min-height: 1rem;
  font-size: .75rem;
  line-height: 1rem;
`;

export default function CategoryModal({
  categoryModalInfo,
}: CategoryModalProps) {
  const { closeModal } = useModal();

  const [modalInfo, setModalInfo] = useState(categoryModalInfo);
  const { x, y, category } = modalInfo;

  const handleClose = useCallback(() => {
    closeModal();
  }, []);
  
  return (
    <FloatingModal x={x} y={y} onClose={handleClose}>
      <Header>
        <Title>{category.name}</Title>
        <CloseButton onClick={handleClose}>
          <Icon path={mdiClose} />
        </CloseButton>
      </Header>
      <Body>
        <Line>
          <Label>비고</Label>
          <Value>{category.description}</Value>
        </Line>
      </Body>
    </FloatingModal>
  );
}