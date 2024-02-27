import { NewPopupInfo, PopupButtonType } from "@/types";
import styled from "styled-components"

const Container = styled.div`
  position: fixed;
  top: 15%;
  left: 50%;
  z-index: 15;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.white};
  width: 22.5rem;
  height: auto;
  border-radius: 8px;
  overflow: hidden;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 20rem;
  }
`;

const Body = styled.div`
  width: 100%;
  height: auto;
  padding: 1.25rem;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  overflow-wrap: break-word;
`;
  
const Description = styled.div`
  font-size: .9375rem;
  text-align: center;
  overflow: hidden;
  overflow-wrap: break-word;
  margin-top: 1.25rem;
`;

const Footer = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => `${theme.colors.black}1A`};
  height: 3.25rem;
`;
  
const Button = styled.button.withConfig({
  shouldForwardProp: p => !['type'].includes(p),
})<{ type: PopupButtonType }>`
  flex-grow: 1;
  cursor: pointer;
  color: ${({ type, theme }) => type === 'primary' ? theme.colors.primary : (type === 'cancel') ? `${theme.colors.black}80` : theme.colors.warningRed};
  font-size: 1.125rem;
  font-weight: ${({ type }) => type === 'primary' ? 'bold' : 'normal'};

  &+& {
    border-left: 1px solid ${({ theme }) => `${theme.colors.black}1A`};
  }
`;

export interface PopupProps {
  popupInfo: NewPopupInfo;
}

export default function Popup({
  popupInfo,
}: PopupProps) {
  const {title, description, buttons} = popupInfo;

  return (
    <Container>
      <Body>
        <Title>
          {title}
        </Title>
        <Description>
          {description}
        </Description>
      </Body>
      <Footer>
        {buttons.map((button, i) => (
          <Button key={`popup-button-${i}`} type={button.type}>{button.label}</Button>
        ))}
      </Footer>
    </Container>
  )
}