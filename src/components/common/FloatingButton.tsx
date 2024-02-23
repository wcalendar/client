import Svgs from "@/assets/Svgs";
import styled from "styled-components"

const Container = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 1.875rem;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default function FloatingButton() {
  return (
    <Container>
      <Svgs svgKey="union" />
    </Container>
  )
}