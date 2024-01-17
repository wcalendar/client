import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { RiSearchLine } from 'react-icons/ri';
import styled from 'styled-components';

const Container = styled.form`
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

export default function SearchBar() {
  return (
    <Container>
      <IconWrapper>
        <Icon path={mdiMagnify} />
      </IconWrapper>
    </Container>
  );
}
