import styled from "styled-components";

const Container = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  z-index: 20;
  animation: rotate 1s linear infinite;

  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.colors.primary};
    animation: prixClipFix 4s linear infinite;
  }

  @keyframes rotate {
    100%   {transform: rotate(360deg);}
  }

  @keyframes prixClipFix {
      0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
      25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
      50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
      75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
      100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
  }
`;

export default function Spinner() {
  return <Container />
};