import Link from "next/link";
import { MouseEventHandler, ReactNode, useCallback } from "react";
import styled, { css } from "styled-components";

const buttonStyle = css`
  position: relative;
  display: block;
  width: 200px;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0 .5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: .9375rem;
  text-align: left;
  cursor: pointer;
  transition: background-color .25s ease;

  &+& {
    border-top: 1px solid ${({ theme }) => theme.colors.black10};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.black05};
  }
`;

const ButtonContainer = styled.button`
  ${buttonStyle}
`;

const AnchorContainer = styled(Link)`
  ${buttonStyle}
  text-decoration: none;
`;

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
}

export default function MenuItem({
  children,
  onClick,
  href,
}: MenuItemProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.stopPropagation();

    if(onClick) onClick();
  }, [onClick]);

  return (
    <>
      {onClick ? (
        <ButtonContainer onClick={handleClick}>
          {children}
        </ButtonContainer>
      ) : ( href !== undefined ? (
        <AnchorContainer href={href} target="_blank">
          {children}
        </AnchorContainer>
      ) : <></>)}
    </>
  );
}