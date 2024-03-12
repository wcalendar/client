import { usePopup } from "@/providers/PopupProvider/usePopup";
import { PopupInfo } from "@/types";
import { useCallback } from "react";
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
  min-width: 20rem;
  width: auto;
  height: auto;
  max-height: 90vh;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0px 2px 4px 1px ${({ theme }) => theme.colors.black50};
  transform-origin: left;
  border: 1px solid ${({ theme }) => theme.colors.black20};
  padding: 1rem;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: .875rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.div`
  width: 100%;
  font-size: .75rem;
  line-height: .875rem;
  margin-bottom: 1rem;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: .5rem;
`;

const Button = styled.button<{ warning: number }>`
  width: auto;
  padding: .5rem .625rem;
  border: 1px solid ${({ theme }) => theme.colors.black50};
  border-radius: 10px;
  font-size: .875rem;
  line-height: .875rem;
  font-weight: bold;
  cursor: pointer;
  ${({ theme, warning }) => warning ? `
  color: ${theme.colors.warningRed};
  font-weight: bold; 
  ` : ''}
`;

export interface PopupProps {
  popupInfo: PopupInfo;
}

export default function Popup({
  popupInfo,
}: PopupProps) {
  const { title, description, buttons } = popupInfo;
  const { closePopup } = usePopup();

  const handleBackgroundClick = useCallback(() => {
    closePopup();
  }, []);

  return (
    <>
      <Background onClick={handleBackgroundClick} />
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Buttons>
          {buttons.map((button, i) => (
            <Button key={`pb-${button.label}`} warning={button.warning ? 1 : 0} onClick={button.onClick}>{button.label}</Button>
          ))}
        </Buttons>
      </Container>
    </>
  )
}