import { ReactNode } from 'react';
import styled from 'styled-components';

type ControlButtonProps = {
  onClick: () => void;
  icon?: ReactNode;
};

const Button = styled.button`
  border: 1px solid gray;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function ArrowButton({
  onClick,
  icon,
}: ControlButtonProps) {
  return (
    <Button onClick={onClick}>
      {icon}
    </Button>
  );
}
