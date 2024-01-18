import styled from 'styled-components';

export default function CategoryHeader() {
  return (
    <Container>
      <Title>카테고리 관리</Title>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  background-color: white;
`;

const Title = styled.h2`
  font-size: .875rem;
  text-indent: 1.25rem;
`;
