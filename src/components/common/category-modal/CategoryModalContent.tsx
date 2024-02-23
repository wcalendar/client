import { Category } from "@/types";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  padding: .75rem;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.oldWhite};
`;

const Title = styled.div`
  flex-grow: 1;
  font-size: .875rem;
  font-weight: bold;
  overflow-x: hidden;
  overflow-wrap: break-word;
`;

const CloseButton = styled.button`
  flex-basis: 13px;
  flex-shrink: 0;
  height: 13px;
  margin-left: .25rem;
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
  overflow-x: hidden;
  overflow-wrap: break-word;
`;

interface CategoryModalContentProps {
  category: Category;
  onClose?: () => void;
}

export default function CategoryModalContent({
  category,
  onClose,
}: CategoryModalContentProps) {
  return (
    <>
      <Header>
        <Title>{category.name}</Title>
        {onClose && (
          <CloseButton onClick={onClose}>
            <Icon path={mdiClose} />
          </CloseButton>
        )}
      </Header>
      <Body>
        <Line>
          <Label>비고</Label>
          <Value>{category.description}</Value>
        </Line>
      </Body>
    </>
  );
}