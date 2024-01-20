import { ModalStatus } from "@/types";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

interface MenuProps {
  status: ModalStatus,
}

export default function Menu({
  status,
}: MenuProps) {
  return (
    <Container>

    </Container>
  );
}