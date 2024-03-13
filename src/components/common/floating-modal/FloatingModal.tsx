import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

type MobilePos = 'center' | 'inherit';

const Container = styled('div').withConfig({
  shouldForwardProp: p => !['mobilePos', 'x', 'y'].includes(p)
})<{ x: string, y: string, mobilePos: MobilePos }>`
  position: absolute;
  left: ${({ x }) => x};
  top: ${({ y }) => y};
  width: 16.875rem;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  background-color: white;
  user-select: none;
  z-index: 15;

  @media ${({ theme, mobilePos }) => theme.devices.mobile} {
    ${({ mobilePos }) => mobilePos === 'center' ? `
    left: calc(50% - (16.875rem / 2));
    ` : `
    width: 12.5rem;
    `}
  }
`;

interface FloatingModalProps {
  mobilePos: MobilePos;
  x: number;
  y: number;
  onClose: () => void;
  children: ReactNode;
}

export default function FloatingModal({
  mobilePos,
  x,
  y,
  onClose,
  children,
}: FloatingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const renderX = useMemo(() => {
    if(x > (window.innerWidth / 2)) return `calc(${x}px - 270px)`;
    else return `${x}px`;
  }, [x]);

  const renderY = useMemo(() => {
    if(y + 75 > window.innerHeight) return `calc(${y}px - 75px)`;
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
    <Container mobilePos={mobilePos} x={renderX} y={renderY} ref={modalRef}>
      {children}
    </Container>
  )
}