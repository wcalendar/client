import styled from 'styled-components';
import Logo from './Logo';
import NavBar from './NavBar';
import Monthly from './Monthly';
import { Dayjs } from 'dayjs';
import useDevice from '@/hooks/useDevice';

type HeaderProps = {
  date: Dayjs;
  onDateChange: (value: Dayjs) => void;
}

const Container = styled.header`
  width: 100%;
  height: var(--header-height);
  background: white;
  padding: var(--header-padding);

  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  @media ${({ theme }) => theme.devices.mobile} {
    height: 50%;
  }
`;

const NavContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  @media ${({ theme }) => theme.devices.mobile} {
    justify-content: flex-end;
  }
`;

export default function Header({
  date,
  onDateChange,
}: HeaderProps) {
  const device = useDevice();

  return (
    <Container>
      <Row>
        <Logo />
        <NavContainer>
          {device !== 'mobile' && (<Monthly value={date} onChange={onDateChange}/>)}
          <NavBar />
        </NavContainer>
      </Row>
      {device === 'mobile' && (
        <Row>
          <Monthly value={date} onChange={onDateChange}/>
        </Row>
      )}
    </Container>
  );
}
