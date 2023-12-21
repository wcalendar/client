import styled from 'styled-components';

const PRIORITY_TEXT = '우선순위';

const PriorityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
`;

const PriorityTitle = styled.span`
  font-size: 1rem;
`;
export default function Priority() {
  return (
    <PriorityContainer>
      <PriorityTitle>{PRIORITY_TEXT}</PriorityTitle>
    </PriorityContainer>
  );
}
