import { ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import { ModalStatus } from "@/types";
import Svgs, { SVGKey } from "@/assets/Svgs";
import Menu from "./Menu";

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['isOpen'].includes(p),
})<{ isOpen: number }>`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  background-color: white;
  border: none;
  transition: color ease .25s;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  path {
    fill: ${({ theme }) => theme.colors.black};
  }

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface MenuButtonProps {
  icon: SVGKey;
  children: ReactNode;
}

export default function MenuButton({
  icon,
  children,
}: MenuButtonProps) {
  const [status, setStatus] = useState<ModalStatus>('closed');

  const handleClick = useCallback(() => {
    if(status === 'closed') setStatus('open');
    else if(status === 'open') setStatus('closing');
  }, [status]);

  const handleAnimationEnd = useCallback(() => {
    if(status === 'closing') setStatus('closed');
  }, [status]);

  const handleClose = useCallback(() => {
    if(status === 'open') setStatus('closing');
  }, [status]);

  return (
    <Container isOpen={status !== 'closed' ? 1 : 0} onClick={handleClick}>
      <Svgs svgKey={icon} />
      {status !== 'closed' && (
        <Menu status={status} onAnimationEnd={handleAnimationEnd} onClose={handleClose}>{children}</Menu>
      )}
    </Container>
  )
}