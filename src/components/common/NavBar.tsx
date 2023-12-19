import { ReactNode } from 'react';
import styled from 'styled-components';
import { RiUser3Line, RiSettings5Line } from 'react-icons/ri';
import Link from 'next/link';

type NavBarProps = {
  title: string;
  href: string;
  icon: ReactNode;
};

const userMenus: NavBarProps[] = [
  { title: 'user', href: '/user', icon: <RiUser3Line size={24} /> },
  { title: 'setting', href: '/setting', icon: <RiSettings5Line size={24} /> },
];

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavItem = styled.li`
  list-style: none;

  & > a {
    color: black;
    &:hover {
      color: blue;
    }
  }
`;

const getMenus = (menus: NavBarProps[]) => {
  return (
    <NavLinks>
      {menus.map(m => (
        <NavItem key={m.title}>
          <Link href={m.href} passHref>
            {m.icon}
          </Link>
        </NavItem>
      ))}
    </NavLinks>
  );
};
function NavBar() {
  return <NavBarContainer>{getMenus(userMenus)}</NavBarContainer>;
}

export default NavBar;
