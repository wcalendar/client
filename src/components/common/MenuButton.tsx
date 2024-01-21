import Icon from "@mdi/react";
import { ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import Menu from "./menu/Menu";
import { ModalStatus } from "@/types";

const Container = styled.div<{ $is_open: number }>`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  background-color: white;
  border: none;
  transition: color ease .25s;
  color: ${({ theme, $is_open }) => $is_open ? theme.colors.blue : theme.colors.black};

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }

  svg {
    color: inherit;
  }

  path {
    color: inherit;
  }
`;

interface MenuButtonProps {
  icon: string;
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
    setStatus('closing');
  }, []);

  return (
    <Container $is_open={status !== 'closed' ? 1 : 0} onClick={handleClick}>
      <Icon path={icon} />
      {status !== 'closed' && (
        <Menu status={status} onAnimationEnd={handleAnimationEnd} onClose={handleClose}>{children}</Menu>
      )}
    </Container>
  )
}