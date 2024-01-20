import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiAccount, mdiCog } from '@mdi/js';

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
`;

const NavItem = styled.button`
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

    svg {
      color: inherit;
    }

    path {
      color: inherit;
    }
  }
`;

export default function NavBar() {
  return (
    <NavBarContainer>
      <NavItem>
        <Icon path={mdiCog} />
      </NavItem>
      <NavItem>
        <Icon path={mdiAccount} />
      </NavItem>
    </NavBarContainer>
  );
}