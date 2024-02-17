import { ModalStatus } from "@/types";
import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div<{ $status: ModalStatus }>`
  position: absolute;
  right: 0;
  top: 1.5rem;
  width: max-content;
  transform: translateY(${({ $status }) => $status === 'open' ? '0%' : '-10%'});
  opacity: ${({ $status }) => $status === 'open' ? 1 : 0};
  animation: ${({ $status }) => $status === 'open' ? 'fromUpOpen' : 'fromUpClose'} .25s;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
  padding: 1rem;
  box-shadow: 0 2px 4px 1px ${({ theme }) => theme.colors.gray};
  cursor: default;
`;

interface MenuProps {
  status: ModalStatus,
  children: ReactNode,
  onAnimationEnd: () => void;
  onClose: () => void;
}

export default function Menu({
  status,
  children,
  onAnimationEnd,
  onClose,
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if(menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, []);

  return (
    <Container $status={status} ref={menuRef} onAnimationEnd={onAnimationEnd} onClick={(e) => e.stopPropagation()}>
      {children}
    </Container>
  );
}