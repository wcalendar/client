import Link from 'next/link';
import styled from 'styled-components';

const LogoContainer = styled.div`
  --logo-width: ${({ theme }) => theme.sizes.calendar.categoryCellWidth.desktop};

  @media ${({ theme }) => theme.devices.tablet} {
    --logo-width: ${({ theme }) => theme.sizes.calendar.categoryCellWidth.tablet};
  }
  
  @media ${({ theme }) => theme.devices.mobile} {
    --logo-width: ${({ theme }) => theme.sizes.calendar.categoryCellWidth.mobile};
  }

  flex-basis: calc(var(--logo-width) - 1rem);
  flex-grow: 0;
  flex-shrink: 0;
  height: 30px;
`;
const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  height: 1.875rem;
  line-height: 1.875rem;
  & > a {
    text-decoration: none;
  }
`;
export default function Logo() {
  return (
    <LogoContainer>
      <Title>
        <Link href="/">W Planner</Link>
      </Title>
    </LogoContainer>
  );
}
