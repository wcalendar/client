import styled from "styled-components";

const Container = styled.div`
  --spinner-color: ${({ theme }) => theme.colors.primary};
  --spinner-color-20: ${({ theme }) => theme.colors.primary}20;

  width: 15px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;

  @keyframes l5 {
    0%  {box-shadow: 20px 0 var(--spinner-color), -20px 0 var(--spinner-color-20);background: var(--spinner-color) }
    33% {box-shadow: 20px 0 var(--spinner-color), -20px 0 var(--spinner-color-20);background: var(--spinner-color-20)}
    66% {box-shadow: 20px 0 var(--spinner-color-20),-20px 0 var(--spinner-color); background: var(--spinner-color-20)}
    100%{box-shadow: 20px 0 var(--spinner-color-20),-20px 0 var(--spinner-color); background: var(--spinner-color) }
  }
`;

export default function Spinner() {
  return <Container />
};