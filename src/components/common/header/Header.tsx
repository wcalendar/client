import styled from 'styled-components';
import Logo from './Logo';
import NavBar from './NavBar';
import Monthly from './Monthly';
import SearchBar from './SearchBar';
import { Dayjs } from 'dayjs';
import useDevice from '@/hooks/useDevice';

type HeaderProps = {
  date?: Dayjs;
  onDateChange?: (value: Dayjs) => void;
}

const Container = styled.header`
  --header-height: ${({ theme }) => theme.sizes.header.headerHeight.desktop};
  --header-padding: ${({ theme }) => theme.sizes.header.headerPadding.desktop};

  @media ${({ theme }) => theme.devices.tablet} {
    --header-height: ${({ theme }) => theme.sizes.header.headerHeight.tablet};
    --header-padding: ${({ theme }) => theme.sizes.header.headerPadding.tablet};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    --header-height: ${({ theme }) => theme.sizes.header.headerHeight.mobile};
    --header-padding: ${({ theme }) => theme.sizes.header.headerPadding.mobile};
  }

  width: 100%;
  height: var(--header-height);
  background: white;
  display: flex;
  padding: var(--header-padding);
  align-items: center;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const NavContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

export default function Header({
  date,
  onDateChange,
}: HeaderProps) {  
  const device = useDevice();

  return (
    <Container>
      <Logo />
      {(date && onDateChange) ? (
        <NavContainer>
          <Monthly value={date} onChange={onDateChange}/>
          {device === 'desktop' && (
            <SearchBar />
          )}
          <NavBar device={device} />
        </NavContainer>
      ) : (
        <NavBar device={device}/>
      )}
    </Container>
  );
}
