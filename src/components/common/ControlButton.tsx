import { ReactNode } from 'react';
import styled from 'styled-components';

type ControlButtonProps = {
  onClick: () => void;
  title?: string;
  icon?: ReactNode;
};

const Button = styled.button`
  border: 1px solid gray;
  border-radius: 4px;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem;
`;
export default function ControlButton({
  onClick,
  title,
  icon,
}: ControlButtonProps) {
  return (
    <Button onClick={onClick}>
      {title ?? title}
      {icon ?? icon}
    </Button>
  );
}
