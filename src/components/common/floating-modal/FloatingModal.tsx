import { ReactNode, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

type FloatingModalProps = {
  x: number;
  y: number;
  onClose: () => void;
  children: ReactNode;
}

const Container = styled.div<{ $x: string, $y: string }>`
  position: absolute;
  left: ${({ $x }) => $x};
  top: ${({ $y }) => $y};
  width: 16.875rem;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  background-color: white;
  user-select: none;
  z-index: 15;

  @media ${({ theme }) => theme.devices.mobile} {
    left: calc(50% - (16.875rem / 2));
  }
`;

export default function FloatingModal({
  x,
  y,
  onClose,
  children,
}: FloatingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const renderX = useMemo(() => {
    if(x > (window.innerWidth / 2)) return `calc(${x}px - 16.875rem)`;
    else return `${x}px`;
  }, [x]);

  const renderY = useMemo(() => {
    if((y + 150) > window.innerHeight) return `calc(${y}px - 6.875rem)`;
    else return `${y}px`;
  }, [y]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if(modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }

  }, []);

  return (
    <Container $x={renderX} $y={renderY} ref={modalRef}>
      {children}
    </Container>
  )
}