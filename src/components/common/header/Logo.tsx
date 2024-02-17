import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  --logo-width: ${({ theme }) => theme.sizes.calendar.categoryCellWidth.desktop};

  @media ${({ theme }) => theme.devices.tablet} {
    --logo-width: ${({ theme }) => theme.sizes.calendar.categoryCellWidth.tablet};
  }
  
  @media ${({ theme }) => theme.devices.mobile} {
    --logo-width: ${({ theme }) => theme.sizes.calendar.categoryCellWidth.mobile};
  }

  flex-basis: calc(var(--logo-width) - var(--header-padding));
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  user-select: none;
  & > a {
    text-decoration: none;
  }
`;

export default function Logo() {
  return (
    <Container>
      <Title>
        <Link href="/">W Planner</Link>
      </Title>
    </Container>
  );
}
