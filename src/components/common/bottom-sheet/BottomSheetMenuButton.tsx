import Svgs from "@/assets/Svgs";
import { ModalStatus } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BottomSheetMenu } from "./BottomSheet";

const Container = styled.button`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

const Menu = styled.div.withConfig({
  shouldForwardProp: p => !['status'].includes(p),
})<{ status: ModalStatus }>`
  position: absolute;
  right: 0;
  top: 2rem;
  width: 12.5rem;
  transform: translateY(${({ status }) => status === 'open' ? '0%' : '-10%'});
  opacity: ${({ status }) => status === 'open' ? 1 : 0};
  animation: ${({ status }) => status === 'open' ? 'fromUpOpen' : 'fromUpClose'} .25s;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: 15;
  padding: .75rem 0;
  box-shadow: 4px 4px 12px 0 ${({ theme }) => theme.colors.black12};
  cursor: default;
`;

const MenuItem = styled.div<{ warning: boolean }>`
  height: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 .5rem;
  font-size: .9375rem;
  line-height: .9375rem;
  gap: .25rem;
  color: ${({ theme, warning }) => warning ? theme.colors.warningRed : theme.colors.black};

  path {
    fill: ${({ theme, warning }) => warning ? theme.colors.warningRed : theme.colors.black};
  }
`;

interface BottomSheetMenuButtonProps {
  menus: BottomSheetMenu[],
}

export default function BottomSheetMenuButton({
  menus,
}: BottomSheetMenuButtonProps) {
  const [menuStatus, setMenuStatus] = useState<ModalStatus>('closed');

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuClose = useCallback(() => {
    setMenuStatus('closing');
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if(menuRef.current && !menuRef.current.contains(e.target as Node) && menuButtonRef.current && !menuButtonRef.current.contains(e.target as Node)) {
        handleMenuClose();
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, []);

  const handleClick = useCallback(() => {
    setMenuStatus('open');
  }, []);

  const handleMenuAnimationEnd = useCallback(() => {
    if(menuStatus === 'closing') setMenuStatus('closed');
  }, [menuStatus]);

  return (
    <Container ref={menuButtonRef} onClick={handleClick}>
      <Svgs svgKey='menu' />
      {menuStatus !== 'closed' && (
        <Menu ref={menuRef} status={menuStatus} onAnimationEnd={handleMenuAnimationEnd} onClick={(e) => e.stopPropagation()}>
          {menus.map((menu, i) => (
            <MenuItem key={`bs-menu-item-${i}`} warning={Boolean(menu.warning)} onClick={menu.onClick}>
              <Svgs svgKey={menu.icon} />
              {menu.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Container>
  );
}