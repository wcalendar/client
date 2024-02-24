import { CategoryColor } from "@/types";
import styled from "styled-components";

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['width', 'color', 'bold'].includes(p),
})<{ width: string, color: CategoryColor, bold: boolean }>`
  width: ${({ width }) => width};
  height: 1.25rem;
  background-color: ${({ theme, color }) => theme.colors.newCategory(color, 2)};
  color: ${({ theme, color }) => theme.colors.newCategory(color, 0)};
  font-size: .6875rem;
  line-height: 1.25rem;
  font-weight: ${({ bold }) => bold ? 'bold' : 'normal'};
  border-radius: 4px;
  user-select: none;
  padding: 0 .5rem;

  ${({ width }) => width === 'auto' ? '' : `
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  `}
`;

interface ChipProps {
  width?: string;
  color: CategoryColor;
  label: string;
  bold?: boolean;
}

export default function Chip({
  width = 'auto',
  color,
  label,
  bold,
}: ChipProps) {
  return (
    <Container width={width} color={color} bold={Boolean(bold)}>
      {label}
    </Container>
  );
}