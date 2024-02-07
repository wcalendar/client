import { mdiCheckCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: .5rem;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div<{ checked: number }>`
  flex: 1.125rem 0 0;
  height: 1.125rem;
  color: ${({ checked, theme }) => checked ? theme.colors.blue : theme.colors.gray};
  cursor: pointer;
  transition: color .25s ease;

  svg { color: inherit; }
  path { color: inherit; }
`;

const Title = styled.div<{ all: number }>`
  flex-grow: 1;
  ${({ all }) => all ? (`
  font-size: 1.125rem;
  `) : (`
  font-size: .875rem;
  `)}
`;

const MoreButton = styled(Link)`
  flex: 3.5rem 0 0;
  height: 1.5rem;
  line-height: 1.5rem;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 5px;
  cursor: pointer;
  font-size: .75rem;
  text-align: center;
  text-decoration: none;
`;

interface AgreeOptionProps {
  all?: boolean;
  value: boolean;
  onChange: () => void;
  href: string;
  children: ReactNode;
}

export default function AgreeOption({
  all,
  value,
  onChange,
  href,
  children,
}: AgreeOptionProps) {

  return (
    <Container>
      <IconWrapper checked={value ? 1 : 0} onClick={onChange}>
        <Icon path={mdiCheckCircleOutline} />
      </IconWrapper>
      <Title all={all ? 1 : 0}>
        {children}
      </Title>
      {!all && (<MoreButton href={href} target='_blank'>내용보기</MoreButton>)}
    </Container>
  )
}