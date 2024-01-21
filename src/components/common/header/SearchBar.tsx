import { useModal } from '@/providers/ModalProvider/useModal';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { useCallback } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import styled from 'styled-components';

const Container = styled.div`
  width: 25rem;
  height: 1.875rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  cursor: text;
  position: relative;
`;

const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: .5rem;
  top: calc(50% - .75rem);
  color: ${({ theme }) => theme.colors.gray};

  svg {
    color: inherit;
  }

  path {
    color: inherit;
  }
`;

interface SearchBarProps {
}

export default function SearchBar({
}: SearchBarProps) {
  const { addModal } = useModal();

  const handleClick = useCallback(() => {
    addModal({ key: 'search', modalProps: {} });
  }, []);

  return (
    <Container onClick={handleClick}>
      <IconWrapper>
        <Icon path={mdiMagnify} />
      </IconWrapper>
    </Container>
  );
}
