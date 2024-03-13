import { SVGKey } from "@/assets/Svgs";
import { ModalStatus } from "@/types";
import { ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import Button, { ButtonType } from "../Button";
import BottomSheetMenuButton from "./BottomSheetMenuButton";

const Background = styled.div.withConfig({
  shouldForwardProp: p => !['status'].includes(p),
})<{ status: string }>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black50};
  opacity: ${({ status }) => status === 'open' ? '.5' : '0'};
  animation: ${({ status }) => status === 'open' ? 'fadeIn' : 'fadeOut'} .25s ease-out;
`;

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['status'].includes(p),
})<{ status: string }>`
  --modal-width: 51.25rem;
  --modal-height: 7.5rem;

  @media ${({ theme }) => theme.devices.tablet} {
    --modal-width: 48.125rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    --modal-width: 100%;
    --modal-height: 3.75rem;
  }

  position: fixed;
  top: var(--modal-height);
  left: 50%;
  z-index: 10;
  transform: ${({ status }) => status === 'open' ? 'translateY(0)' : 'translateY(25%)'} translateX(-50%);
  width: var(--modal-width);
  height: calc(100vh - var(--modal-height));
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  opacity: ${({ status }) => status === 'open' ? '1' : '0'};
  animation: ${({ status }) => status === 'open' ? 'bottomSheetOpen' : 'bottomSheetClose'} .25s ease-out;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  flex: auto 0 0;
`;

const MobileBar = styled.div`
  display: none;
  height: 2rem;
  padding-top: .75rem;

  @media ${({ theme }) => theme.devices.mobile} {
    display: block;
  }

  div {
    width: 7.5rem;
    height: .5rem;
    border-radius: 10px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.black20};
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  padding: 0 2rem;
  font-size: 1.375rem;
  font-weight: bold;
`;

const Body = styled.div`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 4.5rem 0 0;
  padding: 0 2rem;
  gap: .75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.black20};

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: column;
    gap: .5rem;
    padding: .5rem 1.25rem;
  }
`;

const ButtonWrapper = styled.div`
  width: 5rem;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;
  }
`;

export interface BottomSheetButton {
  label: string;
  onClick: () => void;
  type: ButtonType;
}

export interface BottomSheetMenu {
  label: string;
  icon: SVGKey;
  warning?: boolean;
  onClick: () => void;
}

interface BottomSheetProps {
  title: string;
  menus?: BottomSheetMenu[];
  buttons?: BottomSheetButton[];
  children: ReactNode;
}

export default function BottomSheet({
  title,
  menus,
  buttons,
  children,
}: BottomSheetProps) {
  const [status, setStatus] = useState<ModalStatus>('open');

  const handleClose = useCallback(() => {
    setStatus('closing');
  }, []);

  const handleAnimationEnd = useCallback(() => {
    if(status === 'closing') setStatus('closed');
  }, [status]);

  return (
    <>
      <Background status={status} onClick={handleClose} onAnimationEnd={handleAnimationEnd} />
      <Container status={status} >
        <Header>
          <MobileBar><div /></MobileBar>
          <Title>
            {title}
            {menus && (
              <BottomSheetMenuButton menus={menus}/>
            )}
          </Title>
        </Header>
        <Body>
          {children}
        </Body>
        {buttons && (
          <Footer>
            {buttons.map((button, i) => (
              <ButtonWrapper key={`button-${i}`}>
                <Button type={button.type} onClick={button.onClick}>{button.label}</Button>
              </ButtonWrapper>
            ))}
          </Footer>
        )}
      </Container>
    </>
  );
}