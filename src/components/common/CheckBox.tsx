import Svgs from "@/assets/Svgs";
import { ChangeEventHandler } from "react";
import styled from "styled-components";

const Label = styled.label.withConfig({
  shouldForwardProp: p => !['size'].includes(p),
})<{ size: CheckBoxSize }>`
  display: inline-block;
  height: ${({ size }) => size === 'big' ? '1.5rem' : '1.25rem'};
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  appearance: none;
`;

const CheckboxImage = styled.div.withConfig({
  shouldForwardProp: p => !['size'].includes(p),
})<{ size: CheckBoxSize }>`
  display: inline-block;
  width: ${({ size }) => size === 'big' ? '1.5rem' : '1.25rem'};
  height: ${({ size }) => size === 'big' ? '1.5rem' : '1.25rem'};
`;

type CheckBoxSize = 'big' | 'small';

interface CheckBoxProps {
  size?: CheckBoxSize;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
}

export default function CheckBox({
  size = 'small',
  checked,
  onChange,
  label,
}: CheckBoxProps) {
  return (
    <Label size={size}>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <CheckboxImage size={size}>
        <Svgs svgKey={`${size}CheckBox${checked ? 'Closed' : 'Open'}`} />
      </CheckboxImage>
    </Label>
  )
}