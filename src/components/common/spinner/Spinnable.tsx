import { ReactNode } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

type SpinnableProps = {
  isLoading: boolean;
  height?: string;
  children: ReactNode;
}

const SpinnerWrapper = styled.div<{ $height: string }>`
  position: absolute;
  z-index: 20;
  width: 100%;
  height: ${({ $height }) => $height};
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;

export default function Spinnable({
  isLoading,
  height,
  children,
}: SpinnableProps) {
  return (
    <>
      {children}
      {isLoading &&
        <SpinnerWrapper $height={height || '100%'}>
          <Spinner />
        </SpinnerWrapper>
      }
    </>
  )
}