import { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

export type ModalButton = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

type FixedModalProps = {
  width: string;
  title: string;
  buttonList: ModalButton[];

  children: ReactNode;

  onClose: () => void;
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div<{ theme: DefaultTheme, $width: string }>`
  width: ${({ $width }) => $width};
  height: auto;
  border-radius: 10px;
  overflow: hidden;
  opacity: 1;
  animation-duration: .25s;
  animation-name: open;
  background-color: white;
  box-shadow: 0px 2px 4px 2px ${({ theme }) => theme.colors.gray};

  @keyframes open {
    from {
      opacity: 0;
      transform: translateY(5%);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div<{ theme: DefaultTheme }>`
  position: relative;
  width: 100%;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 0 1rem;
  user-select: none;

  font-size: .875rem;
  font-weight: bold;
  color: white;
  line-height: 2.5rem;
`;

const ButtonList = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  gap: 1rem;
  padding-right: 1rem;
`;

const Button = styled.button`
  width: auto;
  padding: 0 .5rem;
  height: 1.875rem;
  line-height: 1.875rem;
  border: none;
  border-radius: 10px;
  background: white;
  font-weight: bold;
  font-size: .875rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 1rem;
`;

/**
 * 화면 정중앙에 위치가 고정된 Modal
 * @param width Modal의 width를 단위까지 포함한 문자열
 * @param title Modal의 상단에 표시되는 이름
 * @param buttonList Modal의 상단에 위치할 버튼들의 리스트
 * @param onClose Modal의 바깥을 클릭했을 때 호출될 함수
 * @param children Modal 내부의 컴포넌트
 * @returns 
 */
export default function FixedModal({
  width,
  title,
  buttonList,

  children,

  onClose,
}: FixedModalProps) {
  return (
    <Container onClick={onClose}>
      <Box $width={width} onClick={(e) => {e.stopPropagation();}}>
        <ModalHeader>
          {title}
          <ButtonList>
            {buttonList.map((button, i) => (
              <Button key={`hb-${i}`} onClick={button.onClick}>
                {button.text}
              </Button>
            ))}
          </ButtonList>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </Box>
    </Container>
  );
}