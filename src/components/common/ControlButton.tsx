import styled from 'styled-components';

type ControlButtonProps = {
  onClick: () => void;
  title: string;
};

const Button = styled.button`
  border: 1px solid gray;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  padding: 0.5rem;

`;
export default function ControlButton({ onClick, title }: ControlButtonProps) {
  return <Button onClick={onClick}>{title}</Button>;
}
