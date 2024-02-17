import { useModal } from "@/providers/ModalProvider/useModal";
import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import { useCallback } from "react";
import styled from "styled-components";

const Container = styled.button`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  background-color: white;
  border: none;
  transition: color ease .25s;

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }

  svg {
    color: inherit;
  }

  path {
    color: inherit;
  }
`;

export default function SearchButton() {
  const { addModal } = useModal();

  const handleClick = useCallback(() => {
    addModal({ key: 'search', modalProps: {} });
  }, []);

  return (
    <Container onClick={handleClick}>
      <Icon path={mdiMagnify} />
    </Container>
  );
}