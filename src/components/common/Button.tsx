import Svgs from "@/assets/Svgs";
import svgs, { SVGKey } from "@/assets/Svgs";
import React, { ReactNode, SVGProps } from "react";
import styled from "styled-components";

const Container = styled.button.withConfig({
  shouldForwardProp: p => !['width', 'size', 'type', 'disabled'].includes(p),
})<{ width: string, size: ButtonSize, type: ButtonType, disabled: boolean }>`
  --color: ${({ type, theme, disabled }) => type === 'primary' ? theme.colors.white : (disabled ? `${theme.colors.black}20` : `${theme.colors.black}cc`)};

  display: flex;
  justify-content: center;
  gap: .5rem;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ size }) => size === 'small' ? '2.5rem' : (size === 'medium' ? '3.75rem' : '4.5rem')};
  background-color: ${({ type, theme, disabled }) => type === 'primary' ? `${theme.colors.primary}${disabled ? '33' : ''}` : (disabled ? `${theme.colors.black}0d` : theme.colors.white)};
  color: var(--color);
  border: ${({ type, theme, disabled }) => type === 'primary' || disabled ? 'none' : `1px solid ${theme.colors.black}33`};
  border-radius: 8px;
  font-size: ${({ size }) => size === 'small' ? '.9375rem' : (size === 'medium' ? '1.25rem' : '1.375rem')};
  transition: .25s background-color ease;
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};

  ${({ disabled, type, theme }) => disabled ? '' : `
  &:hover {
    background-color: ${type === 'primary' ? theme.colors.primaryHover : theme.colors.whiteHover};
  }
  `}

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  path {
    fill: var(--color);
  }
`;

type ButtonSize = 'big' | 'medium' | 'small';
type ButtonType = 'primary' | 'white';

interface ButtonProps {
  width?: string;
  size?: ButtonSize;
  type?: ButtonType;
  icon?: SVGKey;
  disabled?: boolean;
  children: ReactNode;
}

export default function Button({
  width = '100%',
  size = 'small',
  type = 'primary',
  icon,
  disabled,
  children,
}: ButtonProps) {
  return (
    <Container width={width} size={size} type={type} disabled={Boolean(disabled)}>
      {icon && <Svgs svgKey={icon} />}
      {children}
    </Container>
  );
}