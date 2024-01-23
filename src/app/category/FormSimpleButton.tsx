import { FormEventHandler, ReactNode } from "react";
import styled from "styled-components";

const Container = styled.input`
  height: 1.75rem;
  line-height: 1.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  font-size: .75rem;
  font-weight: bold;
  background-color: white;
  padding: 0 .5rem;
  cursor: pointer;
`;

interface FormSimpleButtonProps {
  value: string;
  tabIndex: number;
}

export default function FormSimpleButton({
  value,
  tabIndex,
}: FormSimpleButtonProps) {
  return <Container type='submit' tabIndex={tabIndex} value={value} />
}