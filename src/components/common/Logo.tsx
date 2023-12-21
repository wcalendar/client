import Link from 'next/link';
import styled from 'styled-components';

const LogoContainer = styled.div`
  flex-basis: 16%;
  height: 30px;
`;
const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  width: 101px;
  height: 30px;
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
