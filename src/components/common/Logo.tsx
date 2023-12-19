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
`;
function Logo() {
  return (
    <LogoContainer>
      <Title>W Planner</Title>
    </LogoContainer>
  );
}

export default Logo;
