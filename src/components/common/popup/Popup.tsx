import { PopupKey } from "@/types";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 25;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;

const Container = styled.div`
  position: fixed;
  top: 15%;
  left: 50%;
  z-index: 25;
  transform: translateX(-50%);
  width: auto;
  height: auto;
  max-height: 90vh;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0px 2px 4px 1px ${({ theme }) => theme.colors.gray};
  transform-origin: left;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export interface PopupProps {
  popup: PopupKey;
}

export default function Popup({
  popup,
}: PopupProps) {
  return (
    <>
      <Background />
      <Container>asdfasdf</Container>
    </>
  )
}