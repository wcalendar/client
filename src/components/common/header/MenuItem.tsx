import Link from "next/link";
import { MouseEventHandler, ReactNode, useCallback } from "react";
import styled, { css } from "styled-components";

const buttonStyle = css`
  position: relative;
  display: block;
  width: auto;
  background-color: white;
  border: none;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: .875rem;
  font-weight: bold;
  text-align: left;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
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